import { PostHog } from "posthog-node";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let serverClient: PostHog | null = null;

export function getServerAnalytics(): PostHog | null {
  if (!POSTHOG_KEY) return null;
  if (!serverClient) {
    serverClient = new PostHog(POSTHOG_KEY, {
      host: POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return serverClient;
}

export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, unknown>,
) {
  const client = getServerAnalytics();
  if (client) {
    client.capture({
      distinctId,
      event,
      properties,
    });
    await client.shutdown();
  }
}
