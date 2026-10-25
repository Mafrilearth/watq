const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const turnstilePath = path.resolve(__dirname, "../../../packages/security/src/turnstile.ts");
const storageClientPath = path.resolve(__dirname, "../../../packages/storage/src/client.ts");
const nextConfigPath = path.resolve(__dirname, "../next.config.ts");

test("Cloudflare Turnstile: Server-side token validation invariants", () => {
  const content = fs.readFileSync(turnstilePath, "utf-8");

  assert.ok(
    content.includes("https://challenges.cloudflare.com/turnstile/v0/siteverify"),
    "Must target official Cloudflare siteverify endpoint",
  );
  assert.ok(
    content.includes("trimmedToken.length > 2048"),
    "Must enforce Cloudflare 2048 character token limit",
  );
  assert.ok(content.includes("idempotency_key"), "Must support idempotency key for safe retries");
  assert.ok(
    content.includes("timeout-or-duplicate"),
    "Must handle single-use token expiration and replay prevention",
  );
});

test("Cloudflare Turnstile: Error message sanitization prevents technical leakage", () => {
  const content = fs.readFileSync(turnstilePath, "utf-8");

  assert.ok(
    content.includes("export function getTurnstileErrorMessage"),
    "Must export user-friendly error message formatter",
  );
  assert.ok(
    content.includes("The security challenge has expired or was already used"),
    "Must convert timeout-or-duplicate to executive copy",
  );
  assert.ok(
    content.includes("Security challenge token was missing or malformed"),
    "Must convert invalid-input-response to executive copy",
  );
});

test("Cloudflare R2: S3-compatible zero egress object storage architecture", () => {
  const content = fs.readFileSync(storageClientPath, "utf-8");

  assert.ok(
    content.includes(".r2.cloudflarestorage.com"),
    "Must point to Cloudflare R2 storage domain",
  );
  assert.ok(
    content.includes("createUploadPresignedUrl"),
    "Must export presigned PUT URL generator for direct client uploads",
  );
  assert.ok(
    content.includes("createDownloadPresignedUrl"),
    "Must export presigned GET URL generator for secure downloads",
  );
  assert.ok(
    content.includes("checkObjectExists"),
    "Must support HeadObjectCommand for object existence verification",
  );
  assert.ok(
    content.includes("listObjects"),
    "Must support ListObjectsV2Command for bucket contents enumeration",
  );
});

test("Cloudflare Edge Network: HTTP security headers in next.config.ts", () => {
  const content = fs.readFileSync(nextConfigPath, "utf-8");

  // HSTS 2-Year preload for Cloudflare Proxy
  assert.ok(
    content.includes("max-age=63072000; includeSubDomains; preload"),
    "Must configure 2-year HSTS preload for Cloudflare Edge SSL/TLS",
  );
  // Anti-sniffing & anti-clickjacking
  assert.ok(content.includes("X-Content-Type-Options"), "Must include X-Content-Type-Options");
  assert.ok(content.includes("X-Frame-Options"), "Must include X-Frame-Options: DENY");
  assert.ok(content.includes("poweredByHeader: false"), "Must disable X-Powered-By fingerprinting");
});

test("Cloudflare CSP Integration: Whitelisting Turnstile and Web Analytics", () => {
  const content = fs.readFileSync(nextConfigPath, "utf-8");

  // Script-src whitelisting
  assert.ok(
    content.includes("https://challenges.cloudflare.com"),
    "CSP script-src must permit Cloudflare Turnstile challenges",
  );
  assert.ok(
    content.includes("https://static.cloudflareinsights.com"),
    "CSP script-src must permit Cloudflare Web Analytics beacon",
  );
  // Frame-src whitelisting
  assert.ok(
    content.includes("frame-src 'self' https://challenges.cloudflare.com"),
    "CSP frame-src must permit Cloudflare Turnstile widget iframe",
  );
  // Connect-src whitelisting
  assert.ok(
    content.includes("https://cloudflareinsights.com"),
    "CSP connect-src must permit Cloudflare Web Analytics telemetry ingestion",
  );
});
