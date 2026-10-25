import type { NextConfig } from "next";

export const securityHeaders = [
  // Enforces HTTPS for 2 years, including subdomains, with HSTS preload
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevents MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Prevents clickjacking by disabling iframing from any third-party domain
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Defense-in-depth XSS filter
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // Controls referrer information leaked when navigating away
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disables sensitive browser device APIs (camera, mic, geolocation, ad topics)
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Comprehensive Content Security Policy (CSP)
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://us.i.posthog.com https://us-assets.i.posthog.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com https://*.ingest.sentry.io https://*.arcjet.com https://*.betterstack.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

export const baseNextConfig: NextConfig = {
  // Remove X-Powered-By: Next.js to prevent framework fingerprinting
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

import bundleAnalyzer from "@next/bundle-analyzer";

export const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export function withBaseConfig(customConfig?: Partial<NextConfig>): NextConfig {
  const merged = {
    ...baseNextConfig,
    ...customConfig,
  };

  return withBundleAnalyzer(merged);
}
