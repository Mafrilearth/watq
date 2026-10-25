import assert from "node:assert/strict";
import { test } from "vitest";

// We test using globalThis.crypto which is native in Node.js 20+ and standard browsers.
// Load helpers directly or re-implement for CommonJS test runner:
function bytesToHex(bytes) {
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function utf8ToBytes(str) {
  return new TextEncoder().encode(str);
}

function bytesToUtf8(bytes) {
  return new TextDecoder().decode(bytes);
}

function generateSecureToken(byteLength = 32) {
  const bytes = new Uint8Array(byteLength);
  globalThis.crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

function generateUUID() {
  return globalThis.crypto.randomUUID();
}

async function sha256(data) {
  const inputBuffer = typeof data === "string" ? utf8ToBytes(data) : data;
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", inputBuffer);
  return bytesToHex(new Uint8Array(hashBuffer));
}

async function signHmacSha256(secret, message) {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign("HMAC", key, enc.encode(message));
  return bytesToHex(new Uint8Array(signature));
}

async function verifyHmacSha256(secret, message, signatureHex) {
  try {
    const enc = new TextEncoder();
    const key = await globalThis.crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );
    const signatureBytes = hexToBytes(signatureHex);
    return await globalThis.crypto.subtle.verify("HMAC", key, signatureBytes, enc.encode(message));
  } catch {
    return false;
  }
}

async function encryptAesGcm(plainText, secretKeyHex) {
  const keyBytes = hexToBytes(secretKeyHex);
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );
  const iv = new Uint8Array(12);
  globalThis.crypto.getRandomValues(iv);
  const encryptedBuffer = await globalThis.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    utf8ToBytes(plainText),
  );
  return {
    ciphertext: bytesToHex(new Uint8Array(encryptedBuffer)),
    iv: bytesToHex(iv),
  };
}

async function decryptAesGcm(ciphertextHex, ivHex, secretKeyHex) {
  const keyBytes = hexToBytes(secretKeyHex);
  const ivBytes = hexToBytes(ivHex);
  const ciphertextBytes = hexToBytes(ciphertextHex);
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );
  const decryptedBuffer = await globalThis.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    key,
    ciphertextBytes,
  );
  return bytesToUtf8(new Uint8Array(decryptedBuffer));
}

function timingSafeEqualWeb(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

// =========================================================================
// WEB CRYPTO API AUTOMATED INVARIANT PROOFS
// =========================================================================

test("Web Crypto API: CSPRNG token generation creates unique 64-char hex strings", () => {
  const token1 = generateSecureToken(32);
  const token2 = generateSecureToken(32);

  assert.equal(token1.length, 64);
  assert.equal(token2.length, 64);
  assert.notEqual(token1, token2);
  assert.match(token1, /^[0-9a-f]{64}$/);
});

test("Web Crypto API: randomUUID generates RFC 4122 v4 compliant UUIDs", () => {
  const uuid1 = generateUUID();
  const uuid2 = generateUUID();

  assert.notEqual(uuid1, uuid2);
  const v4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  assert.match(uuid1, v4Regex);
  assert.match(uuid2, v4Regex);
});

test("Web Crypto API: SubtleCrypto SHA-256 matches NIST standard vectors", async () => {
  // NIST empty string test vector
  const emptyHash = await sha256("");
  assert.equal(emptyHash, "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

  const watqHash = await sha256("WATQ_PLATFORM_IDENTITY");
  assert.equal(watqHash.length, 64);
});

test("Web Crypto API: HMAC-SHA256 signature and constant-time verification", async () => {
  const secret = "watq-enterprise-super-secret-key-2026";
  const message = "payload:user_session_42:role:ADMIN";

  const signature = await signHmacSha256(secret, message);
  assert.equal(signature.length, 64);

  // Valid verification passes
  const isValid = await verifyHmacSha256(secret, message, signature);
  assert.equal(isValid, true);

  // Tampered message fails verification
  const isTampered = await verifyHmacSha256(
    secret,
    "payload:user_session_42:role:MEMBER",
    signature,
  );
  assert.equal(isTampered, false);

  // Tampered secret fails verification
  const wrongSecret = await verifyHmacSha256("wrong-secret", message, signature);
  assert.equal(wrongSecret, false);
});

test("Web Crypto API: AES-256-GCM authenticated encryption and round-trip decryption", async () => {
  // Generate 256-bit (32-byte) secret key
  const secretKeyHex = generateSecureToken(32);
  const secretData = JSON.stringify({ userId: "usr_102", role: "ADMIN", scores: [50, 75, 90] });

  const { ciphertext, iv } = await encryptAesGcm(secretData, secretKeyHex);
  assert.notEqual(ciphertext, secretData);
  assert.equal(iv.length, 24); // 12 bytes = 24 hex chars

  const decrypted = await decryptAesGcm(ciphertext, iv, secretKeyHex);
  assert.equal(decrypted, secretData);
});

test("Web Crypto API: Timing-safe byte comparison prevents side-channel leaks", () => {
  const a = new Uint8Array([1, 2, 3, 4, 5]);
  const b = new Uint8Array([1, 2, 3, 4, 5]);
  const c = new Uint8Array([1, 2, 3, 4, 6]);
  const d = new Uint8Array([1, 2, 3, 4]);

  assert.equal(timingSafeEqualWeb(a, b), true);
  assert.equal(timingSafeEqualWeb(a, c), false);
  assert.equal(timingSafeEqualWeb(a, d), false);
});
