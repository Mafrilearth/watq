import type { NextConfig } from "next";

const securityHeaders = [
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
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "frame-src 'self' https://challenges.cloudflare.com",
      "connect-src 'self' https://us.i.posthog.com https://us-assets.i.posthog.com https://*.ingest.sentry.io https://*.arcjet.com https://*.betterstack.com https://*.neon.tech https://challenges.cloudflare.com https://cloudflareinsights.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Remove X-Powered-By: Next.js to prevent framework fingerprinting
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
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

export default nextConfig;
