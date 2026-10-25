import { db } from "@watq/database";
import { hashPassword, verifyPassword } from "@watq/security";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { toNextJsHandler } from "better-auth/next-js";

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "watq_fallback_dev_secret_32_characters_long",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    password: {
      hash: async (password: string) => hashPassword(password),
      verify: async ({ hash, password }: { hash: string; password: string }) =>
        verifyPassword(password, hash),
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "MEMBER",
        input: false, // Don't allow client to arbitrarily set their own role
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days session lifetime
    updateAge: 60 * 60 * 24, // 1 day update window
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes cache
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});

export const authHandlers = toNextJsHandler(auth.handler);
export { toNextJsHandler };

/**
 * Server-side session fetcher for Next.js Server Components, Actions, and Route Handlers.
 */
export async function getServerSession(headers: Headers) {
  return await auth.api.getSession({
    headers,
  });
}

/**
 * Enforces authenticated member session on Server Actions.
 */
export async function requireAuth(headers: Headers) {
  const session = await getServerSession(headers);
  if (!session || !session.user) {
    throw new Error("UNAUTHORIZED: Active session required.");
  }
  return session;
}

/**
 * Enforces ADMIN role authorization on Administrative Server Actions.
 */
export async function requireAdmin(headers: Headers) {
  const session = await requireAuth(headers);
  if (session.user.role !== "ADMIN") {
    throw new Error("FORBIDDEN: Administrative privileges required.");
  }
  return session;
}

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session;
