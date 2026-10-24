import arcjet, { detectBot, slidingWindow, validateEmail, shield } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY || "ajkey_placeholder_local_dev",
  rules: [
    // 1. WAF & Common Web Attack Shield
    shield({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
    }),
    // 2. Bot Protection (Blocks malicious scrapers and automated threats)
    detectBot({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"], // Allows verified search engine crawlers for SEO
    }),
    // 3. Rate Limiting (Maximum 60 requests per minute per IP for general endpoints)
    slidingWindow({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      interval: "1m",
      max: 60,
    }),
  ],
});

// Dedicated protection guard for authentication and assessment submission forms
export const authProtection = arcjet({
  key: process.env.ARCJET_KEY || "ajkey_placeholder_local_dev",
  rules: [
    shield({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
    }),
    detectBot({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      allow: [],
    }),
    validateEmail({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      deny: ["DISPOSABLE", "NO_MX_RECORDS"],
    }),
    slidingWindow({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      interval: "10m",
      max: 10,
    }),
  ],
});

export * from "@arcjet/next";

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
