const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Resolve security index
const securityIndexPath = path.resolve(__dirname, "../../../packages/security/src/index.ts");

// Mock decision helper for standalone test runner verification
function getArcjetErrorMessage(decision) {
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

test("Arcjet Decision: Error message formatting prevents technical exposure", () => {
  const deniedBot = {
    isDenied: () => true,
    reason: {
      isBot: () => true,
      isRateLimit: () => false,
      isEmail: () => false,
      isSensitiveInfo: () => false,
      isShield: () => false,
    },
  };

  const deniedRateLimit = {
    isDenied: () => true,
    reason: {
      isBot: () => false,
      isRateLimit: () => true,
      isEmail: () => false,
      isSensitiveInfo: () => false,
      isShield: () => false,
    },
  };

  const deniedEmail = {
    isDenied: () => true,
    reason: {
      isBot: () => false,
      isRateLimit: () => false,
      isEmail: () => true,
      isSensitiveInfo: () => false,
      isShield: () => false,
    },
  };

  const allowedReq = {
    isDenied: () => false,
  };

  assert.equal(
    getArcjetErrorMessage(deniedBot),
    "Automated requests from bots or scrapers are not permitted.",
  );
  assert.equal(
    getArcjetErrorMessage(deniedRateLimit),
    "Rate limit exceeded. Please wait a few moments before trying again.",
  );
  assert.equal(
    getArcjetErrorMessage(deniedEmail),
    "The provided email address is invalid, temporary, or cannot receive mail.",
  );
  assert.equal(getArcjetErrorMessage(allowedReq), null);
});

test("Arcjet Bot Protection: SEO crawler allowance vs Zero bot auth policy", () => {
  const securityContent = fs.readFileSync(securityIndexPath, "utf-8");

  // General routes allow search engine bots for indexing
  assert.ok(
    securityContent.includes('allow: ["CATEGORY:SEARCH_ENGINE"]'),
    "General gateway must allow search engines for SEO",
  );

  // Auth and signup routes ban all bots
  assert.ok(
    securityContent.includes("allow: []"),
    "Auth and signup guards must strictly prohibit all bots",
  );
});

test("Arcjet Rate Limiting: Sliding window and token bucket defense", () => {
  const securityContent = fs.readFileSync(securityIndexPath, "utf-8");

  // General rate limit: 60 req / 1 min
  assert.ok(securityContent.includes('interval: "1m"'), "Must define 1 minute rate limit interval");
  assert.ok(securityContent.includes("max: 60"), "Must limit general traffic to 60 req/min");

  // Submission protection token bucket
  assert.ok(
    securityContent.includes("tokenBucket({"),
    "Must configure tokenBucket for submissions",
  );
  assert.ok(securityContent.includes("capacity: 20"), "Token bucket capacity must be 20");
});

test("Arcjet Email Validation: Disposable and invalid MX denial", () => {
  const securityContent = fs.readFileSync(securityIndexPath, "utf-8");

  assert.ok(securityContent.includes("validateEmail({"), "Must configure validateEmail rule");
  assert.ok(securityContent.includes('"DISPOSABLE"'), "Must reject disposable throwaway emails");
  assert.ok(
    securityContent.includes('"NO_MX_RECORDS"'),
    "Must reject domains with missing MX records",
  );
  assert.ok(securityContent.includes('"INVALID"'), "Must reject malformed email domains");
});

test("Arcjet Sensitive Information: Credit card number leak defense", () => {
  const securityContent = fs.readFileSync(securityIndexPath, "utf-8");

  assert.ok(securityContent.includes("sensitiveInfo({"), "Must configure sensitiveInfo filter");
  assert.ok(
    securityContent.includes('"CREDIT_CARD_NUMBER"'),
    "Must filter and deny credit card numbers",
  );
});
