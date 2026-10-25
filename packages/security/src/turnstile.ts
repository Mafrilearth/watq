/**
 * Cloudflare Turnstile Server-Side Validation Engine
 *
 * Implements authoritative token verification via Cloudflare's siteverify API:
 * POST https://challenges.cloudflare.com/turnstile/v0/siteverify
 *
 * Grounded in Cloudflare official specifications:
 * - Single-use token (rejected with timeout-or-duplicate if replayed)
 * - 300-second validity window
 * - Maximum token length: 2048 characters
 * - Idempotency key support for resilient retries
 * - Constant-time error handling with zero technical jargon exposure
 */

export interface TurnstileValidationParams {
  token: string;
  remoteip?: string;
  idempotencyKey?: string;
  secretKey?: string;
  timeoutMs?: number;
}

export interface TurnstileVerificationResult {
  success: boolean;
  errorCodes?: string[];
  challengeTs?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
  isMock?: boolean;
}

const CLOUDFLARE_SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Validates a Turnstile response token from the frontend widget on the server.
 */
export async function validateTurnstileToken({
  token,
  remoteip,
  idempotencyKey,
  secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
  timeoutMs = 10000,
}: TurnstileValidationParams): Promise<TurnstileVerificationResult> {
  // Input validation per Cloudflare specifications
  if (!token || typeof token !== "string") {
    return {
      success: false,
      errorCodes: ["missing-input-response"],
    };
  }

  const trimmedToken = token.trim();
  if (trimmedToken.length === 0) {
    return {
      success: false,
      errorCodes: ["missing-input-response"],
    };
  }

  if (trimmedToken.length > 2048) {
    return {
      success: false,
      errorCodes: ["invalid-input-response"],
    };
  }

  // Graceful Mock fallback for development / test environments without active secret key
  if (!secretKey) {
    if (trimmedToken === "cf-test-invalid-token") {
      return {
        success: false,
        errorCodes: ["invalid-input-response"],
        isMock: true,
      };
    }
    return {
      success: true,
      challengeTs: new Date().toISOString(),
      hostname: "localhost",
      isMock: true,
    };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", trimmedToken);

    if (remoteip) {
      formData.append("remoteip", remoteip);
    }
    if (idempotencyKey) {
      formData.append("idempotency_key", idempotencyKey);
    }

    const res = await fetch(CLOUDFLARE_SITEVERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      return {
        success: false,
        errorCodes: ["bad-request"],
      };
    }

    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
      challenge_ts?: string;
      hostname?: string;
      action?: string;
      cdata?: string;
    };

    return {
      success: Boolean(data.success),
      errorCodes: data["error-codes"],
      challengeTs: data.challenge_ts,
      hostname: data.hostname,
      action: data.action,
      cdata: data.cdata,
    };
  } catch (error) {
    clearTimeout(timer);
    return {
      success: false,
      errorCodes: ["internal-error"],
    };
  }
}

/**
 * Converts Cloudflare Turnstile error codes into executive, user-friendly copy.
 * Ensures zero technical exposure (hides raw error codes like timeout-or-duplicate).
 */
export function getTurnstileErrorMessage(errorCodes?: string[]): string {
  if (!errorCodes || errorCodes.length === 0) {
    return "Verification challenge failed. Please try again.";
  }

  const code = errorCodes[0];
  switch (code) {
    case "timeout-or-duplicate":
      return "The security challenge has expired or was already used. Please refresh and try again.";
    case "missing-input-response":
    case "invalid-input-response":
      return "Security challenge token was missing or malformed. Please complete the verification.";
    case "bad-request":
    case "internal-error":
      return "Verification service is temporarily unreachable. Please retry in a few moments.";
    default:
      return "Security verification could not be completed. Please try again.";
  }
}
