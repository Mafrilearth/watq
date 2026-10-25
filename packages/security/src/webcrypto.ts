/**
 * ============================================================================
 * WATQ UNIVERSAL WEB CRYPTO API SUITE
 * ============================================================================
 * Standards-compliant, Edge-ready, zero-dependency cryptographic utilities
 * powered by globalThis.crypto and SubtleCrypto (W3C Web Cryptography API).
 *
 * Compatible with Node.js 20+, Cloudflare Workers, Vercel Edge Runtime, and modern browsers.
 */

// Helper to convert Uint8Array to hexadecimal string
export function bytesToHex(bytes: Uint8Array): string {
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i]!.toString(16).padStart(2, "0");
  }
  return hex;
}

// Helper to convert hexadecimal string to Uint8Array
export function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

// Helper to convert string to UTF-8 Uint8Array
export function utf8ToBytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Helper to convert UTF-8 Uint8Array to string
export function bytesToUtf8(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

/**
 * 1. Cryptographically Secure Random Byte Generation
 * Uses crypto.getRandomValues (CSPRNG)
 */
export function generateSecureRandomBytes(byteLength: number): Uint8Array {
  const bytes = new Uint8Array(byteLength);
  globalThis.crypto.getRandomValues(bytes);
  return bytes;
}

/**
 * 2. High-Entropy Secure Token Generator
 * Returns a cryptographically secure random hexadecimal string.
 */
export function generateSecureToken(byteLength = 32): string {
  const bytes = generateSecureRandomBytes(byteLength);
  return bytesToHex(bytes);
}

/**
 * 3. RFC 4122 v4 UUID Generator
 * Direct hardware-backed CSPRNG via crypto.randomUUID()
 */
export function generateUUID(): string {
  return globalThis.crypto.randomUUID();
}

/**
 * 4. SHA-256 Digest
 * Computes standard SHA-256 cryptographic hash using SubtleCrypto.
 */
export async function sha256(data: string | Uint8Array): Promise<string> {
  const inputBuffer = typeof data === "string" ? utf8ToBytes(data) : data;
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", inputBuffer as BufferSource);
  return bytesToHex(new Uint8Array(hashBuffer));
}

/**
 * 5. SHA-512 Digest
 * Computes standard SHA-512 cryptographic hash using SubtleCrypto.
 */
export async function sha512(data: string | Uint8Array): Promise<string> {
  const inputBuffer = typeof data === "string" ? utf8ToBytes(data) : data;
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-512", inputBuffer as BufferSource);
  return bytesToHex(new Uint8Array(hashBuffer));
}

/**
 * 6. HMAC-SHA256 Message Signature
 * Creates authenticated HMAC signature using SubtleCrypto.
 */
export async function signHmacSha256(secret: string, message: string): Promise<string> {
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

/**
 * 7. HMAC-SHA256 Signature Verification
 * Hardware-accelerated, constant-time verification preventing timing side-channel attacks.
 */
export async function verifyHmacSha256(
  secret: string,
  message: string,
  signatureHex: string,
): Promise<boolean> {
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
    return await globalThis.crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as BufferSource,
      enc.encode(message),
    );
  } catch {
    return false;
  }
}

/**
 * 8. AES-256-GCM Authenticated Encryption
 * Standard authenticated symmetric encryption with 96-bit random IV.
 */
export async function encryptAesGcm(
  plainText: string,
  secretKeyHex: string,
): Promise<{ ciphertext: string; iv: string }> {
  const keyBytes = hexToBytes(secretKeyHex);
  if (keyBytes.length !== 32) {
    throw new Error("Secret key must be exactly 32 bytes (256 bits) in hex format");
  }

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    keyBytes as BufferSource,
    { name: "AES-GCM" },
    false,
    ["encrypt"],
  );

  // 96-bit (12-byte) initialization vector is standard for GCM
  const iv = generateSecureRandomBytes(12);

  const encryptedBuffer = await globalThis.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv as BufferSource },
    key,
    utf8ToBytes(plainText) as BufferSource,
  );

  return {
    ciphertext: bytesToHex(new Uint8Array(encryptedBuffer)),
    iv: bytesToHex(iv),
  };
}

/**
 * 9. AES-256-GCM Authenticated Decryption
 * Verifies authenticity tag and decrypts payload.
 */
export async function decryptAesGcm(
  ciphertextHex: string,
  ivHex: string,
  secretKeyHex: string,
): Promise<string> {
  const keyBytes = hexToBytes(secretKeyHex);
  const ivBytes = hexToBytes(ivHex);
  const ciphertextBytes = hexToBytes(ciphertextHex);

  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    keyBytes as BufferSource,
    { name: "AES-GCM" },
    false,
    ["decrypt"],
  );

  const decryptedBuffer = await globalThis.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes as BufferSource },
    key,
    ciphertextBytes as BufferSource,
  );

  return bytesToUtf8(new Uint8Array(decryptedBuffer));
}

/**
 * 10. PBKDF2 Key Derivation Function (Web Crypto Standard)
 * Derives cryptographic key bits from password and salt using HMAC-SHA256.
 */
export async function derivePbkdf2Key(
  password: string,
  salt: Uint8Array,
  iterations = 100_000,
  keyLengthBits = 256,
): Promise<Uint8Array> {
  const baseKey = await globalThis.crypto.subtle.importKey(
    "raw",
    utf8ToBytes(password) as BufferSource,
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const derivedBits = await globalThis.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations,
      hash: "SHA-256",
    },
    baseKey,
    keyLengthBits,
  );

  return new Uint8Array(derivedBits);
}

/**
 * 11. Timing-Safe Constant-Time Comparison
 * Universal byte comparison preventing timing attacks across all runtimes.
 */
export function timingSafeEqualWeb(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a[i]! ^ b[i]!;
  }
  return diff === 0;
}
