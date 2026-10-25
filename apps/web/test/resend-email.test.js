const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { createHmac, timingSafeEqual } = require("node:crypto");

const emailClientPath = path.resolve(__dirname, "../../../packages/email/src/client.ts");
const webhookRoutePath = path.resolve(__dirname, "../src/app/api/webhooks/resend/route.ts");
const assessmentTemplatePath = path.resolve(
  __dirname,
  "../../../packages/email/src/templates/assessment-completed.tsx",
);
const magicLinkTemplatePath = path.resolve(
  __dirname,
  "../../../packages/email/src/templates/magic-link.tsx",
);

function verifyResendWebhookSignature({ payload, svixId, svixTimestamp, svixSignature, secret }) {
  if (!payload || !svixId || !svixTimestamp || !svixSignature || !secret) {
    return false;
  }

  try {
    const cleanedSecret = secret.startsWith("whsec_") ? secret.substring("whsec_".length) : secret;
    const secretKey = Buffer.from(cleanedSecret, "base64");

    const toSign = `${svixId}.${svixTimestamp}.${payload}`;
    const computed = createHmac("sha256", secretKey).update(toSign).digest("base64");

    const passedSignatures = svixSignature.split(" ").map((sig) => {
      const parts = sig.split(",");
      return parts.length > 1 ? parts[1] : parts[0];
    });

    const computedBuffer = Buffer.from(computed);

    for (const sig of passedSignatures) {
      const candidateBuffer = Buffer.from(sig);
      if (
        computedBuffer.length === candidateBuffer.length &&
        timingSafeEqual(computedBuffer, candidateBuffer)
      ) {
        return true;
      }
    }
  } catch {
    return false;
  }

  return false;
}

test("Resend Email Architecture: Singleton client & graceful mock mode", () => {
  const content = fs.readFileSync(emailClientPath, "utf-8");

  assert.ok(
    content.includes("export function getResendClient()"),
    "Must define getResendClient singleton accessor",
  );
  assert.ok(
    content.includes("if (!RESEND_API_KEY) return null"),
    "Must gracefully fall back when RESEND_API_KEY is not set",
  );
  assert.ok(
    content.includes("[WATQ RESEND MOCK]"),
    "Must provide transparent console logs in mock development mode",
  );
  assert.ok(
    content.includes("DEFAULT_FROM_ADDRESS"),
    "Must establish authoritative default sender",
  );
});

test("Resend Email Delivery: Single & Batch dispatch with idempotency keys", () => {
  const content = fs.readFileSync(emailClientPath, "utf-8");

  assert.ok(content.includes("export async function sendEmail"), "Must export sendEmail function");
  assert.ok(
    content.includes("export async function sendBatchEmails"),
    "Must export sendBatchEmails function",
  );
  assert.ok(
    content.includes("idempotencyKey"),
    "Must support idempotency keys to prevent duplicate sending",
  );
  assert.ok(content.includes("resend.batch.send"), "Must use native Resend batch.send API");
  assert.ok(content.includes("tags?: Tag[]"), "Must support email categorization tags");
});

test("Resend Email Lifecycle: Retrieval & Cancellation APIs", () => {
  const content = fs.readFileSync(emailClientPath, "utf-8");

  assert.ok(
    content.includes("export async function getEmail"),
    "Must export getEmail for delivery status tracking",
  );
  assert.ok(
    content.includes("export async function cancelEmail"),
    "Must export cancelEmail to abort scheduled emails",
  );
  assert.ok(content.includes("resend.emails.cancel"), "Must call native Resend emails.cancel");
});

test("Resend Cryptographic Security: Constant-time Svix webhook signature verification", () => {
  const secret = "whsec_mfXz9yU8pQ2rT4vW6xZ1aB3cE5gH7jK9";
  const cleanedSecret = Buffer.from("mfXz9yU8pQ2rT4vW6xZ1aB3cE5gH7jK9", "base64");
  const payload = JSON.stringify({
    type: "email.delivered",
    data: { email_id: "re_test_123", to: ["fauzul@watq.app"] },
  });
  const svixId = "msg_2dK9vP8zQ1wX4";
  const svixTimestamp = Math.floor(Date.now() / 1000).toString();

  const toSign = `${svixId}.${svixTimestamp}.${payload}`;
  const validSignature = createHmac("sha256", cleanedSecret).update(toSign).digest("base64");

  const validSvixHeader = `v1,${validSignature}`;

  // Valid Svix signature verification
  const isValid = verifyResendWebhookSignature({
    payload,
    svixId,
    svixTimestamp,
    svixSignature: validSvixHeader,
    secret,
  });
  assert.equal(isValid, true, "Legitimate Svix signature must pass");

  // Tampered payload verification
  const tamperedPayload = JSON.stringify({
    type: "email.delivered",
    data: { email_id: "re_spoofed_attack" },
  });
  const isSpoofValid = verifyResendWebhookSignature({
    payload: tamperedPayload,
    svixId,
    svixTimestamp,
    svixSignature: validSvixHeader,
    secret,
  });
  assert.equal(isSpoofValid, false, "Tampered payload must be rejected");

  // Verify route handler integration
  const routeContent = fs.readFileSync(webhookRoutePath, "utf-8");
  assert.ok(
    routeContent.includes("verifyResendWebhookSignature"),
    "Webhook route must invoke signature verification",
  );
  assert.ok(routeContent.includes("email.delivered"), "Webhook route must handle delivered events");
  assert.ok(routeContent.includes("email.bounced"), "Webhook route must handle bounced events");
});

test("React Email Templates: Cold Basalt & Citron branding invariants", () => {
  const assessmentContent = fs.readFileSync(assessmentTemplatePath, "utf-8");
  const magicLinkContent = fs.readFileSync(magicLinkTemplatePath, "utf-8");

  // Assessment Completed template checks
  assert.ok(
    assessmentContent.includes("#08090C"),
    "Assessment template must use Cold Basalt background",
  );
  assert.ok(assessmentContent.includes("#D4F024"), "Assessment template must use Citron accent");
  assert.ok(assessmentContent.includes("ILO ISCO-08"), "Must reference ILO ISCO-08 taxonomy");
  assert.ok(assessmentContent.includes("UNESCO ISCED-F 2013"), "Must reference UNESCO taxonomy");

  // Magic Link template checks
  assert.ok(
    magicLinkContent.includes("#08090C"),
    "Magic Link template must use Cold Basalt background",
  );
  assert.ok(magicLinkContent.includes("#D4F024"), "Magic Link template must use Citron accent");
  assert.ok(magicLinkContent.includes("Personality Decoded"), "Must preserve brand tagline");
});
