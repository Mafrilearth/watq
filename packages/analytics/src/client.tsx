"use client";

import posthog from "posthog-js";
import { type ReactNode, useEffect } from "react";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let isInitialized = false;

export function initAnalytics() {
  if (typeof window === "undefined" || isInitialized) return;
  if (!POSTHOG_KEY) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: false,
  });

  isInitialized = true;
}

export function useAnalytics() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return {
    capture: (eventName: string, properties?: Record<string, unknown>) => {
      if (typeof window !== "undefined" && isInitialized) {
        posthog.capture(eventName, properties);
      }
    },
    identify: (distinctId: string, userProperties?: Record<string, unknown>) => {
      if (typeof window !== "undefined" && isInitialized) {
        posthog.identify(distinctId, userProperties);
      }
    },
    reset: () => {
      if (typeof window !== "undefined" && isInitialized) {
        posthog.reset();
      }
    },
  };
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initAnalytics();
  }, []);

  return <>{children}</>;
}

export { posthog };
