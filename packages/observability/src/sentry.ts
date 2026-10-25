import * as Sentry from "@sentry/nextjs";

/**
 * Capture an unexpected runtime error and transmit to Sentry telemetry with contextual metadata.
 */
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

/**
 * Capture an informational or warning telemetry message in Sentry.
 */
export function captureMessage(message: string, level: Sentry.SeverityLevel = "info") {
  Sentry.captureMessage(message, level);
}

/**
 * Attach sanitized user identity to Sentry scope for session correlation.
 */
export function setUser(
  user: { id?: string; email?: string; username?: string; role?: string } | null,
) {
  if (user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
      segment: user.role,
    });
  } else {
    Sentry.setUser(null);
  }
}

/**
 * Attach key-value indexable tag to the active Sentry transaction/event.
 */
export function setTag(key: string, value: string) {
  Sentry.setTag(key, value);
}

/**
 * Attach structured contextual data dictionary to the active Sentry scope.
 */
export function setContext(name: string, context: Record<string, unknown>) {
  Sentry.setContext(name, context);
}

/**
 * Record a manual breadcrumb event leading up to potential anomalies.
 */
export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
  Sentry.addBreadcrumb(breadcrumb);
}

/**
 * Execute a function wrapped in a custom Sentry performance tracing span.
 */
export async function withSpan<T>(
  name: string,
  op: string,
  callback: () => Promise<T> | T,
): Promise<T> {
  return Sentry.startSpan({ name, op }, async () => {
    return await callback();
  });
}

export { Sentry };
