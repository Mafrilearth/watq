import * as Sentry from "@sentry/nextjs";

export function captureException(error: unknown, context?: Record<string, unknown>) {
  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureException(error);
    });
  } else {
    Sentry.captureException(error);
  }
}

export function captureMessage(message: string, level: Sentry.SeverityLevel = "info") {
  Sentry.captureMessage(message, level);
}

export { Sentry };
