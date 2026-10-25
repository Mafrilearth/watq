import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN =
  process.env.NEXT_PUBLIC_SENTRY_DSN ||
  "https://f9e0a1a1964c640f8dce20e274a38b1f@o4512243903758336.ingest.us.sentry.io/4512314372653056";

Sentry.init({
  dsn: SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Scrub server headers
  beforeSend(event) {
    if (event.request?.headers) {
      // biome-ignore lint/performance/noDelete: Scrub sensitive auth header from telemetry
      delete event.request.headers.authorization;
      // biome-ignore lint/performance/noDelete: Scrub sensitive cookie header from telemetry
      delete event.request.headers.cookie;
    }
    return event;
  },
});
