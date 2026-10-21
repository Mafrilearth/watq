<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# **WATQ — AGENTIC AI WORKFLOW & REPOSITORY DIRECTIVES**

> **Standard:** Universal Agentic Engineering SOP (for Cursor, Claude Code, Copilot, Antigravity, Devin, Codex, and custom AI agents).  
> **Repository:** `Mafrilearth/watq` │ **Live URL:** [https://watq.mafrilearth.com](https://watq.mafrilearth.com)  
> **Brand & Tagline:** *Watq — Personality Decoded.*  
> **Primary Authority:** All agents must read and adhere to the Single Source of Truth (SSOT) documents in [`docs/`](file:///d:/watq/docs/README.md) before implementing changes.

---

## **1. SYSTEM ARCHITECTURE & PHILOSOPHY**

1. **Zero-Database OpEx ($0 Infra Overhead):**
   - The assessment runner, session state machine, scoring calculation, and reporting engine execute **100% client-side**.
   - Session persistence uses browser `localStorage` + Web Crypto API (`watq_mvp_session_v1`).
   - Do **NOT** introduce cloud database dependencies (Supabase, Neon, Firebase, etc.) unless the user explicitly requests a database migration.
2. **Deterministic & Isolated 3-Screen Architecture:**
   - **Landing (`/`):** Universal brand pitch, clear single CTA (`Start Assessment`), responsive metrics grid.
   - **Runner (`/assess`):** Centered 680px focus container, 24-item 5-point Likert scale (Jungian 1921 / 16 Cognitive Types), zero header distraction, desktop keyboard navigation (`1`-`5`, `Enter`, `Back`).
   - **Diagnosis & Vocational Report (`/result`):** High-density archetypal profile, 4-polarity radar, career trajectories (ILO ISCO-08 & UNESCO ISCED-F 2013 alignment).
3. **Dedicated Public Changelog (`/changelog`):**
   - User-facing timeline documenting platform iterations, psychometric engine calibrations, and architectural updates.
   - Synchronized with `CHANGELOG.md` and GitHub Releases.
4. **100% Global English Standard:**
   - All code, UI copy, button labels, error toasts, commit messages, and documentation must be written in **standard British/American English**. No Indonesian or mixed slang in code or user-facing interfaces.

---

## **2. DOCUMENTATION SUITE (SSOT DIRECTORY)**

Whenever modifying any domain, the agent **MUST** reference its respective SSOT file:

| Domain | SSOT Document | Key Information |
| :--- | :--- | :--- |
| **Brand & Design** | [`docs/01-brand.md`](file:///d:/watq/docs/01-brand.md) | Logo construction, Slate (`#0B0F19`) & Indigo palette, typography, tone of voice. |
| **Psychometrics & PRD** | [`docs/02-prd.md`](file:///d:/watq/docs/02-prd.md) | 24-item question catalog, scoring formula, 16 archetype matrix. |
| **Software Specs & SRS** | [`docs/03-srs.md`](file:///d:/watq/docs/03-srs.md) | Finite State Machine (FSM), local storage schema, 6 critical edge cases. |
| **Design System Tokens** | [`docs/04-design-system.md`](file:///d:/watq/docs/04-design-system.md) | 680px layout container, CSS tokens, micro-motion timings (120ms/180ms), WCAG 2.2 AA. |
| **Release History** | [`CHANGELOG.md`](file:///d:/watq/CHANGELOG.md) | SemVer 2.0.0 changelog records for all published releases. |
| **Security Policy** | [`.github/SECURITY.md`](file:///d:/watq/.github/SECURITY.md) | Responsible disclosure terms, 48h SLA, private reporting channel. |

---

## **3. SECURITY & CONFIDENTIALITY PROTOCOL**

All agents must strictly preserve platform security across all layers:

1. **Zero Secret Disclosure:**
   - **NEVER** expose API keys, tokens, credentials, private emails, internal server IPs, or unpatched vulnerabilities in commit messages, documentation, `CHANGELOG.md`, or public web pages.
2. **HTTP Security Headers (`next.config.ts`):**
   - Maintain enterprise headers: Strict-Transport-Security (`HSTS` max-age 2 years with preload), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and Content Security Policy (`CSP`).
   - Keep `poweredByHeader: false` to strip `X-Powered-By: Next.js` technology stack fingerprinting.
3. **GitHub Repository Protections:**
   - **Secret Scanning & Push Protection:** Keep permanently active to block accidental credential leaks on push.
   - **Branch Protection on `main`:** Enforce `allow_force_pushes: false` and `allow_deletions: false` to protect commit history immutability.
   - **Private Vulnerability Reporting:** Keep enabled so security researchers disclose vulnerabilities privately via GitHub Security Advisories.
   - **Dependabot:** Keep `.github/dependabot.yml` active for automated npm vulnerability monitoring.
4. **Vercel Infrastructure Hardening:**
   - Keep **Git Fork Protection** enabled (`gitForkProtection: true`) to prevent malicious PRs from executing untrusted builds.
   - Keep **Protected Source Maps** enabled (`protectedSourcemaps: true`) so client-side JavaScript source maps cannot be scraped by unauthorized external parties.

---

## **4. RELEASE SYNCHRONIZATION & SEMVER 2.0.0 SOP**

### **A. Anti-Pattern: No Version Spamming for Micro-Revisions**
- **Do NOT bump version numbers for routine micro-edits** (e.g., CSS margin adjustments, minor typo fixes, internal refactoring).
- Micro-changes accumulate in Git commits (following Conventional Commits) or under `## [Unreleased]` in `CHANGELOG.md`.
- Version numbers are bumped **ONLY** when bundling an intentional milestone release for users.

### **B. Semantic Versioning Rules (SemVer 2.0.0):**
- **PATCH (`1.0.0` ➔ `1.0.1`):** Backwards-compatible bug fixes, security hardening, or layout stabilization bundles.
- **MINOR (`1.0.1` ➔ `1.1.0`):** New backwards-compatible user-facing features (e.g., PDF report export, bilingual language support).
- **MAJOR (`1.x.x` ➔ `2.0.0`):** Breaking changes or architectural redesigns incompatible with prior sessions.

### **C. The 4-Surface Version Synchronization Rule:**
Whenever a release is published, the agent **MUST** ensure the version string matches identically across all 4 surfaces:
1. **`package.json`**: `"version": "X.Y.Z"`
2. **`CHANGELOG.md`**: `## [X.Y.Z] - YYYY-MM-DD`
3. **Web Changelog (`src/app/changelog/page.tsx`)**: Entry card with identical release notes, badges, and link to GitHub tag.
4. **GitHub Releases & Git Tag**: Tag `vX.Y.Z` pushed to remote, and official GitHub Release published with `make_latest: true`.

---

## **5. FEATURE ROLLOUT & ANNOUNCEMENT SOP**

When shipping notable user-facing features or major updates:
1. **Update [`src/components/modals/WhatsNewModal.tsx`](file:///d:/watq/src/components/modals/WhatsNewModal.tsx):**
   - Add the new feature cards with clear titles, descriptions, and tag labels (`NEW`, `IMPROVEMENT`, `FIX`).
   - Bump the `STORAGE_KEY` version string (e.g., `watq_announcement_seen_v1_1`) so that returning users are presented with the popup exactly once.
2. **Update [`CHANGELOG.md`](file:///d:/watq/CHANGELOG.md) & [`src/app/changelog/page.tsx`](file:///d:/watq/src/app/changelog/page.tsx):**
   - Maintain identical notes under `Added`, `Changed`, `Fixed`, and `Security` sections.
3. **Update [`src/app/sitemap.ts`](file:///d:/watq/src/app/sitemap.ts):**
   - Ensure all public routes are registered with appropriate change frequencies.

---

## **6. GIT & DEPLOYMENT PROTOCOL**

1. **Dual-Branch Enterprise Architecture (Global Standard):**
   - **`main` (Production & Public Default):** The official production release branch. Directly serves the live platform on Vercel ([https://watq.mafrilearth.com](https://watq.mafrilearth.com)). Code ONLY enters `main` via audited, fast-forward merges or release PRs from `dev`. Both force-pushes and branch deletions are strictly disabled.
   - **`dev` (Development & Active Staging):** The active engineering branch. All daily commits, feature development, bug fixes, and agent workflows execute on `dev`.
   - **Release Flow:** Work on `dev` ➔ Verify build & tests ➔ Merge `dev` into `main` ➔ Tag SemVer `vX.Y.Z` ➔ Deploy production bundle.
2. **Commit Message Format:**
   - Adhere strictly to Conventional Commits: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`.
3. **Decoupled Deployment Policy:**
   - Automatic deployment on routine developer pushes is **DISABLED**.
   - Production releases are intentional milestones deployed from `main`.
4. **Repository Metadata Preservation:**
   - GitHub **About** must remain universal and high-level:  
     `Watq — Modern cognitive assessment and personality typology platform.`
   - Do not pollute GitHub About or Topics with temporary micro-feature lists.
