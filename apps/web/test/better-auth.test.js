const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

// Resolve auth package file
const authIndexPath = path.resolve(__dirname, "../../../packages/auth/src/index.ts");
const authClientPath = path.resolve(__dirname, "../../../packages/auth/src/client.ts");

test("Better Auth Config: Email and password authentication invariants", () => {
  const authContent = fs.readFileSync(authIndexPath, "utf-8");

  // Verify emailAndPassword configuration
  assert.ok(authContent.includes("emailAndPassword:"), "Must configure emailAndPassword");
  assert.ok(
    authContent.includes("minPasswordLength: 8"),
    "Must enforce minimum 8 characters for password",
  );
  assert.ok(authContent.includes("maxPasswordLength: 128"), "Must limit maximum password length");
  assert.ok(authContent.includes("autoSignIn: true"), "Must enable autoSignIn for seamless UX");
});

test("Better Auth Security: Cryptographic scrypt password hashing hook", () => {
  const authContent = fs.readFileSync(authIndexPath, "utf-8");

  // Verify custom scrypt password hashing hook
  assert.ok(authContent.includes("hashPassword(password)"), "Must use salted scrypt hash hook");
  assert.ok(
    authContent.includes("verifyPassword(password, hash)"),
    "Must use constant-time verify hook",
  );
});

test("Better Auth RBAC: Role protection & client input injection prevention", () => {
  const authContent = fs.readFileSync(authIndexPath, "utf-8");

  // Verify role field cannot be set directly from client input
  assert.ok(
    authContent.includes("input: false"),
    "Role must not be modifiable by arbitrary client input",
  );
  assert.ok(
    authContent.includes('defaultValue: "MEMBER"'),
    "Default registered role must be MEMBER",
  );

  // Verify server-side role check helpers exist
  assert.ok(authContent.includes("requireAuth"), "Must provide requireAuth helper");
  assert.ok(authContent.includes("requireAdmin"), "Must provide requireAdmin helper");
});

test("Better Auth Session: Cookie cache & lifecycle duration rules", () => {
  const authContent = fs.readFileSync(authIndexPath, "utf-8");

  // 7 days = 604800 seconds
  assert.ok(authContent.includes("expiresIn: 60 * 60 * 24 * 7"), "Session must expire in 7 days");
  assert.ok(
    authContent.includes("cookieCache:"),
    "Must configure cookieCache to reduce database load",
  );
  assert.ok(authContent.includes("useSecureCookies:"), "Must enforce secure cookies in production");
});

test("Better Auth Rate Limiting & Next.js Handler Mounting", () => {
  const authContent = fs.readFileSync(authIndexPath, "utf-8");
  const authClientContent = fs.readFileSync(authClientPath, "utf-8");

  // Verify rate limiting
  assert.ok(authContent.includes("rateLimit:"), "Must configure rateLimit protection");
  assert.ok(
    authContent.includes("toNextJsHandler"),
    "Must export toNextJsHandler for Next.js Route Handlers",
  );

  // Verify client hooks
  assert.ok(
    authClientContent.includes("createAuthClient"),
    "Client must initialize createAuthClient",
  );
  assert.ok(authClientContent.includes("useSession"), "Must export useSession hook");
});
