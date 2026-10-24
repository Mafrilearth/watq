import { db } from "@watq/database";
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
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes cache
    },
  },
});

export const authHandlers = toNextJsHandler(auth.handler);
export { toNextJsHandler };
