# Changelog

All notable changes to the **Watq** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-21

### Summary
Initial production-grade release of the **Watq Cognitive Typology Platform** (MVP). Watq is a frictionless, client-driven psychometric instrument deconstructing 16 cognitive types to guide higher-education academic majors and professional vocational trajectories with zero server overhead and 100% client privacy.

---

### Added

#### Core Psychometric & Scoring Engine
- **24-Item Focused Instrument:** Implemented a balanced 24-item psychometric Likert scale targeting 4 Jungian bipolar cognitive axes (Energy Orientation: E/I, Information Processing: S/N, Decision Architecture: T/F, Lifestyle Execution: J/P).
- **Classical Test Theory (CTT) Keying:** Engineered a strict 50% reverse-keying distribution (3 forward, 3 reversed per dimension) to systematically eliminate acquiescence response bias ($X_{adj} = 6 - X$).
- **Deterministic Scoring Algorithm:** Pure mathematical normalization generating scores from 0% to 100% with a deterministic tie-breaking convention ($\ge 50\%$ maps to primary polarity).
- **Vocational & Academic Alignment Matrix:**
  - 16 distinct archetype profiles with psychological summaries and cognitive dynamics.
  - Aligned higher-education fields mapped to **UNESCO ISCED-F 2013** international educational standards.
  - Aligned career trajectories mapped to **ILO ISCO-08** international occupational standards.

#### Client-Driven Session Architecture ($0 OpEx)
- **Local Persistence (`watq_mvp_session_v1`):** Completely client-side session store using browser `localStorage` with RFC 9562 UUID v4 session tokens.
- **Reactive State Listener:** Implemented `subscribeSession` with memoized snapshot reference caching to guarantee zero infinite-loop re-renders under React 19 `useSyncExternalStore`.
- **Fault-Tolerant Session Resumption:** Users can refresh or close their browser at any point and resume from their exact question index.

#### Multi-Screen User Flow
- **Screen 1: Landing & Orientation (`/`):**
  - Brand hero presentation with Bringhurst typography hierarchy.
  - Dynamic session-aware action button (`Start Assessment` vs `Resume Assessment (Question X of 24)` vs `View Cognitive Profile ({typeCode})`).
  - Key specification metric grid ($2 \times 2$ on mobile, $1 \times 4$ on desktop) covering Duration, Model, Latency, and Privacy.
  - Core instrument overview card and feature pillars.
- **Screen 2: Focused Assessment Runner (`/assess`):**
  - Bringhurst's Law 680px constrained focus container with real-time linear progress bar.
  - Fitts's Law compliant 5-point Likert option targets ($\ge 48\text{px}$ touch targets).
  - 180ms psychomotor delay between question selection (100ms optical highlight + 80ms anticipation buffer).
  - Desktop physical keyboard navigation (`1`–`5` for instant selection, `Backspace`/`ArrowLeft` to navigate back, `Escape` to return home).
- **Screen 3: Diagnostic Report & Vocational Alignment (`/result`):**
  - Archetype Hero Banner with 4-letter type code and archetype title.
  - 4 interactive bipolar polarity percentage bars.
  - Curated academic majors and aligned career trajectories.
  - Single-click **Copy Report** feature formatted for clipboard sharing.
  - Safe **Retake Assessment** action.

#### Versioned Release Announcement Modal
- **`WhatsNewModal` Component:** Non-intrusive dark glassmorphism modal presenting new platform features to first-time visitors with an 800ms entrance delay.
- **Versioned Single-Time Persistence:** Keyed by `watq_announcement_seen_v1_0` in `localStorage` to ensure the modal displays exactly once per user until a new version is explicitly released.

#### Brand Identity & Design System
- **The Psychometric Prism:** Geometric architectural mark decoding the human cognitive spectrum with Electric Cyan (`#38BDF8`) focal wedge.
- **Contrast & Ergonomics:** WCAG 2.2 AAA compliant color palette ($15.9:1$ contrast ratio on deep obsidian background `#090D16`).
- **Typography:** Configured Next.js typography with Geist Sans and Geist Mono.

#### Infrastructure, DNS & CI/CD
- **Custom Subdomain:** Configured dedicated subdomain `watq.mafrilearth.com`.
- **Authoritative DNS:** Created CNAME DNS record in Cloudflare pointing to Vercel Anycast edge network.
- **Automated Deployments:** Full GitHub integration with Vercel for instant preview and production builds.
- **Automated SSL/TLS:** A+ rated Let's Encrypt certificates managed automatically.

---

### Changed
- Standardized and harmonized all platform button copy, confirmation modals, badges, and footer terminology across all screens.
- Refactored mobile viewport responsiveness:
  - Header logo hides tagline on viewports $< 640\text{px}$ to preserve single-line navigation buttons.
  - Typography scales down gracefully on small smartphone screens ($360\text{px}$–$390\text{px}$).
  - Metric specifications convert to structured $2 \times 2$ glassmorphism cards.

---

### Security & Privacy
- **Zero Telemetry & Zero PII Collection:** The application does not collect names, emails, IP addresses, or analytics cookies.
- **Proprietary & Closed-Source Governance:** Repository marked `"private": true` with `"license": "UNLICENSED"`. Internal brand showcase tools isolated from public serving directory.
