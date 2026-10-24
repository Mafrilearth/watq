import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().optional(),
    BETTER_AUTH_SECRET: z.string().min(1).optional(),
    BETTER_AUTH_URL: z.string().url().optional(),
    ARCJET_KEY: z.string().min(1).optional(),
    RESEND_API_KEY: z.string().min(1).optional(),
    CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
    R2_ACCESS_KEY_ID: z.string().optional(),
    R2_SECRET_ACCESS_KEY: z.string().optional(),
    R2_BUCKET_NAME: z.string().default("watq-storage"),
    BETTERSTACK_SOURCE_TOKEN: z.string().optional(),
    LOGTAIL_SOURCE_TOKEN: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().default("https://watq.mafrilearth.com"),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().url().default("https://us.i.posthog.com"),
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
