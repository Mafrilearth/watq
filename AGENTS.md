<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# **WATQ — AGENTIC AI WORKFLOW & REPOSITORY DIRECTIVES**

> **Standard:** Universal Agentic Engineering SOP (for Cursor, Claude Code, Copilot, Antigravity, Devin, Codex, and custom AI agents).  
> **Repository:** `Mafrilearth/watq` │ **Live URL:** [https://watq.mafrilearth.com](https://watq.mafrilearth.com)  
> **Brand & Tagline:** *Watq — Personality Decoded.*  
> **Platform Domain:** Universal Personality & Cognitive Decoding Platform (Model-Agnostic Sovereign Standard)  
> **Primary Authority:** All agents must read and adhere to the Single Source of Truth (SSOT) documents in [`docs/`](file:///d:/watq/docs/README.md) before implementing changes.

---

## **1. SYSTEM ARCHITECTURE & PHILOSOPHY**

1. **Universal Personality Architecture (Model-Agnostic):**
   - **Overarching Brand Domain:** Human personality itself (*Personality Decoded*), not merely a "testing tool". The assessment runner is the diagnostic gateway into lifelong self-decoding, cognitive understanding, and vocational mastery.
   - **Psychological Grounding:** Grounded in the Universal Psychological Triad (Cognition, Affect, Conation) and Authentic Self (*Das Selbst / Wathiqa*).
   - **MVP Phasing:** Initialized with the 16 Cognitive Types public-domain instrument (Carl Gustav Jung 1921 / 24-item Likert scale) as the reference implementation, architected with modular catalog support for future instruments (Big Five OCEAN, Enneagram, DISC, Holland RIASEC).
2. **Enterprise Cloud Persistence & Cryptographic Security:**
   - Production persistence powered by **Neon Serverless PostgreSQL** via Prisma ORM.
   - User credentials secured using one-way cryptographic salted hashing (`scryptSync` with 16-byte random salt and `timingSafeEqual`).
   - Session tokens stored securely in PostgreSQL and managed via secure `HttpOnly` cookies.
   - Zero hardcoding of user roles or accounts; zero demo bypasses.
3. **Deterministic Monorepo Separation (`apps/web` vs `apps/app`):**
   - **Public Gateway (`apps/web`):** Executive Landing (`/`), Focused Assessment Runner (`/assess`), Executive Diagnostic Dossier (`/result`), and Authentication Gateways (`/login` & `/register`).
   - **Private Workspace (`apps/app`):** Dedicated authenticated enterprise application. Member profile & assessment sync at `/`, Administrative Governance Studio at `/admin`.
4. **Zero Technical Jargon in User-Facing UI:**
   - Never surface internal developer terminology, database names (Neon, PostgreSQL, Prisma), cloud infrastructure regions, or technical acronyms (RBAC, WAF, OpEx) on user screens.
   - All client copy must be polished, natural, and executive-ready.
5. **100% Global English Standard:**
   - All code, UI copy, button labels, error toasts, commit messages, and documentation must be written in **standard British/American English**. No Indonesian or mixed slang in code or user-facing interfaces.

---

## **2. DOCUMENTATION SUITE (SSOT DIRECTORY)**

Whenever modifying any domain, the agent **MUST** reference its respective SSOT file:

| Domain | SSOT Document | Key Information |
| :--- | :--- | :--- |
| **Brand & Business** | [`docs/01-brd.md`](file:///d:/watq/docs/01-brd.md) | Universal personality philosophy, Watek etymology, Fanciful Mark status, The Universal Personality Lens geometry, Cold Basalt & Citron palette. |
| **Product & Psychometrics** | [`docs/02-prd.md`](file:///d:/watq/docs/02-prd.md) | Universal platform vision, MVP 16 Cognitive Types catalog, scoring formula, 16 archetype matrix, UNESCO/ILO career mapping. |
| **Software Specs & SRS** | [`docs/03-srs.md`](file:///d:/watq/docs/03-srs.md) | Monorepo domain routing (`apps/web` vs `apps/app`), Finite State Machine (FSM), local storage schema, 6 critical edge cases. |
| **Design Tokens & System** | [`docs/04-dts.md`](file:///d:/watq/docs/04-dts.md) | 680px layout container, DTCG CSS tokens, micro-motion timings (120ms/180ms), WCAG 2.2 AAA accessibility. |
| **Software Architecture** | [`docs/05-sad.md`](file:///d:/watq/docs/05-sad.md) | Next-Forge monorepo boundaries, Neon Serverless PostgreSQL pooling, Prisma ORM schema, ADRs, $0 OpEx toolchain. |
| **Test Plan & QA** | [`docs/06-stp.md`](file:///d:/watq/docs/06-stp.md) | Master testing strategy, 55/55 automated test proofs (brand geometry, scoring invariants, Zod schemas, Zustand stores, nuqs parsers, Web Crypto API, Neon Serverless, Prisma ORM), release gates. |
| **Security & Cryptography** | [`docs/07-sec.md`](file:///d:/watq/docs/07-sec.md) | Salted `scrypt` hashing with `timingSafeEqual`, strict 2-Role RBAC (`ADMIN` vs `MEMBER`), HTTP security headers (`HSTS`, `CSP`, `DENY`). |
| **Operations & Observability** | [`docs/08-ops.md`](file:///d:/watq/docs/08-ops.md) | Dual-branch Git release flow (`dev` ➔ `main`), SemVer 2.0.0 4-surface synchronization, telemetry, closed-loop incident triage. |
| **Security Policy** | [`.github/SECURITY.md`](file:///d:/watq/.github/SECURITY.md) | Responsible disclosure terms, 48h SLA, private reporting channel. |

---

## **3. SECURITY & CONFIDENTIALITY PROTOCOL**

All agents must strictly preserve platform security across all layers:

1. **Zero Secret Disclosure:**
   - **NEVER** expose API keys, tokens, credentials, private emails, internal server IPs, or unpatched vulnerabilities in commit messages, documentation, or public web pages.
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
- Micro-changes accumulate in Git commits (following Conventional Commits).
- Version numbers are bumped **ONLY** when bundling an intentional milestone release for users.

### **B. Semantic Versioning Rules (SemVer 2.0.0):**
- **PATCH (`1.0.0` ➔ `1.0.1`):** Backwards-compatible bug fixes, security hardening, or layout stabilization bundles.
- **MINOR (`1.0.1` ➔ `1.1.0`):** New backwards-compatible user-facing features (e.g., PDF report export, bilingual language support).
- **MAJOR (`1.x.x` ➔ `2.0.0`):** Breaking changes or architectural redesigns incompatible with prior sessions.

### **C. The 4-Surface Version Synchronization Rule:**
Whenever a release is published, the agent **MUST** ensure the version string matches identically across all 4 surfaces:
1. **`package.json`**: `"version": "X.Y.Z"` across root and all workspace packages (`@watq/web`, `@watq/app`, etc.)
2. **Master Documentation Suite (`docs/README.md`)**: `Suite Version: X.Y.Z` and `docs/02-prd.md`
3. **Root README (`README.md`)**: Release badge `Release-vX.Y.Z`
4. **GitHub Releases & Git Tag**: Tag `vX.Y.Z` pushed to remote, and official GitHub Release published with `make_latest: true`.

---

## **5. FEATURE ROLLOUT & ZERO-BLOAT SOP**

When shipping notable user-facing features or major updates:
1. **Enterprise Cleanliness:** Zero intrusive popups or disruptive modals on user screens. All public updates must preserve focus and executive polish.
2. **Update Documentation Suite:** Reflect changes in [`docs/02-prd.md`](file:///d:/watq/docs/02-prd.md), [`docs/03-srs.md`](file:///d:/watq/docs/03-srs.md), and related SSOT documents.
3. **Update [`src/app/sitemap.ts`](file:///d:/watq/src/app/sitemap.ts):** Ensure all public routes are registered with appropriate change frequencies.

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

---

## **7. THE AGENTIC SDLC 8-STAGE FRAMEWORK & SKILL MAPPING**

All engineering workflows in this repository operate under the **8-Stage Agentic SDLC** governed by [`docs/08-ops.md`](file:///d:/watq/docs/08-ops.md) and [`docs/README.md`](file:///d:/watq/docs/README.md). AI agents must strictly invoke the corresponding specialized skill before executing work in each domain:

| Stage | Phase | Primary Skill | Operational Scope & Non-Overlapping Boundary |
| :---: | :--- | :--- | :--- |
| **01** | **Discovery** | `product-discovery-research` | Market benchmarking, user persona formulation, JTBD, problem validation. *No code or technical architecture.* |
| **02** | **Architecture** | `system-architecture-spec` | PRD formulation, Architecture Decision Records (ADRs), FSM models, data schemas. *No implementation code.* |
| **03** | **Visual System** | `design-taste-frontend`<br>`brandkit`<br>`stitch-design-taste` | Brand identity, DIN 1450 / Inter typography, DTCG tokens, SVG prism construction, clean spacious layouts. |
| **04** | **Implementation** | `nextjs-app-router-expert` | Production Next.js 16+ App Router, React Server Components (RSC), Client Components, session state. |
| **05** | **Verification** | `testing-and-qa` | Test-Driven Development (TDD), Vitest unit tests, scoring algorithm proofs, edge case invariants. |
| **06** | **Security** | `security-audit-hardening` | OWASP Top 10 prevention, secret scrubbing, HTTP security headers (`HSTS`, `CSP`, `X-Frame-Options: DENY`). |
| **07** | **Release** | `devops-ci-cd-release` | Dual-branch Git flow (`dev` ➔ `main`), SemVer 2.0.0 4-surface synchronization, GitHub Release, Vercel deployment. |
| **08** | **Observability** | `systematic-debugging-observability` | Scientific RCA (reproduce, isolate, fix), Core Web Vitals profiling, Sentry log triaging, closed-loop feedback into Stage 1. |

### **Agent Execution Rules:**
1. **Never Cowboy Code:** Agents must not write feature code without an established architecture specification (Stage 2).
2. **Deterministic Deliverables:** Every stage must output auditable proof (specification doc, passing test suite, or verified build).
3. **Continuous Closed Loop:** Any bug triaged in Stage 8 must be transformed into a regression test in Stage 5 before being resolved.

