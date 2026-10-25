import arcjet, {
  type ArcjetDecision,
  detectBot,
  request,
  sensitiveInfo,
  shield,
  slidingWindow,
  tokenBucket,
  validateEmail,
} from "@arcjet/next";

const arcjetMode =
  process.env.NODE_ENV === "production" && process.env.ARCJET_KEY ? "LIVE" : "DRY_RUN";
const arcjetKey = process.env.ARCJET_KEY || "ajkey_placeholder_watq_dev";

/**
 * 1. Gateway Defense (General routes & static assets)
 * Shields against WAF threats, allows verified SEO search bots, applies 60 req/min sliding window rate limit.
 */
export const aj = arcjet({
  key: arcjetKey,
  rules: [
    shield({ mode: arcjetMode }),
    detectBot({
      mode: arcjetMode,
      allow: ["CATEGORY:SEARCH_ENGINE"], // Googlebot, Bingbot, etc.
    }),
    slidingWindow({
      mode: arcjetMode,
      interval: "1m",
      max: 60,
    }),
  ],
});

/**
 * 2. Authentication & Sign-In Defense
 * Strict bot block, WAF shield, 10 attempts per 10 minutes sliding window to stop brute force.
 */
export const authProtection = arcjet({
  key: arcjetKey,
  rules: [
    shield({ mode: arcjetMode }),
    detectBot({
      mode: arcjetMode,
      allow: [], // Zero bots on auth forms
    }),
    slidingWindow({
      mode: arcjetMode,
      interval: "10m",
      max: 10,
    }),
  ],
});

/**
 * 3. Sign-Up & Registration Defense
 * Includes strict email validation (blocks disposable email providers & domains with no MX records).
 */
export const signupProtection = arcjet({
  key: arcjetKey,
  rules: [
    shield({ mode: arcjetMode }),
    detectBot({
      mode: arcjetMode,
      allow: [],
    }),
    validateEmail({
      mode: arcjetMode,
      deny: ["DISPOSABLE", "NO_MX_RECORDS", "INVALID"],
    }),
    slidingWindow({
      mode: arcjetMode,
      interval: "10m",
      max: 5, // Max 5 registration attempts per 10 minutes per IP
    }),
  ],
});

/**
 * 4. Psychometric Assessment Submission Defense
 * Token bucket rate limiting (capacity: 20 tokens, refills 10 per minute) + sensitiveInfo filtering (credit card block).
 */
export const submissionProtection = arcjet({
  key: arcjetKey,
  rules: [
    shield({ mode: arcjetMode }),
    detectBot({
      mode: arcjetMode,
      allow: [],
    }),
    tokenBucket({
      mode: arcjetMode,
      refillRate: 10,
      interval: "1m",
      capacity: 20,
    }),
    sensitiveInfo({
      mode: arcjetMode,
      deny: ["CREDIT_CARD_NUMBER"],
    }),
  ],
});

/**
 * Formats a user-friendly security error message from an Arcjet decision without technical leakage.
 */
export function getArcjetErrorMessage(decision: ArcjetDecision): string | null {
  if (!decision.isDenied()) return null;

  if (decision.reason.isBot()) {
    return "Automated requests from bots or scrapers are not permitted.";
  }
  if (decision.reason.isRateLimit()) {
    return "Rate limit exceeded. Please wait a few moments before trying again.";
  }
  if (decision.reason.isEmail()) {
    return "The provided email address is invalid, temporary, or cannot receive mail.";
  }
  if (decision.reason.isSensitiveInfo()) {
    return "Sensitive data was detected in the payload and blocked.";
  }
  if (decision.reason.isShield()) {
    return "Suspicious activity detected and blocked by security filters.";
  }

  return "Request was blocked by security policies.";
}

export { request };
export * from "@arcjet/next";
export * from "./webcrypto";

import crypto from "node:crypto";

/**
 * Hashes a plaintext password using cryptographic scrypt with a unique 16-byte salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Timing-safe password verification preventing side-channel analysis.
 */
export function verifyPassword(password: string, combined: string): boolean {
  try {
    const [salt, key] = combined.split(":");
    if (!salt || !key) return false;
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(key, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}
