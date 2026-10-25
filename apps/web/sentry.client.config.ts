import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN =
  process.env.NEXT_PUBLIC_SENTRY_DSN ||
  "https://f9e0a1a1964c640f8dce20e274a38b1f@o4512243903758336.ingest.us.sentry.io/4512314372653056";

Sentry.init({
  dsn: SENTRY_DSN,
  environment: process.env.NODE_ENV || "development",
  // Performance Monitoring: Adjust sample rate in production
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Session Replay: Privacy-preserving session recording
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.feedbackIntegration({
      autoInject: false,
      colorScheme: "dark",
      themeDark: {
        background: "#08090C",
        foreground: "#FFFFFF",
        accentBackground: "#D4F024",
        accentForeground: "#08090C",
      },
    }),
  ],

  // Scrub sensitive local tokens or secrets before sending
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
