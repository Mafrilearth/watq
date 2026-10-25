# **WATQ: SOFTWARE ARCHITECTURE DOCUMENT (SAD)**

> **ID & Version:** `WATQ-SAD-05` │ `v1.0.0` │ `LOCKED`  
> **Authority & Owner:** Fauzul (Platform Lead) │ **Standard:** `ISO/IEC/IEEE 42010:2011` │ `NIST SP 800-145`  
> **SSOT Domain:** Next-Forge Monorepo Boundaries, Neon Serverless PostgreSQL Pooling, Prisma Schema, $0 OpEx Stack  
> **Target Code:** [`packages/database/prisma/schema.prisma`](file:///d:/watq/packages/database/prisma/schema.prisma) │ [`turbo.json`](file:///d:/watq/turbo.json)

---

# **1. SCIENTIFIC FOUNDATION (INVERTED PYRAMID TAXONOMY)**
* **Level 1 (Knowledge Domain):** `5. Social Sciences` (OECD FOS / UNESCO ISCED-F).
* **Level 2 (Scientific Discipline):** `5.1 Psychology` (Quantitative & Differential Psychology).
* **Level 3 (Sub-Discipline):** `Psychometrics` (APA Division 5 — Evaluation, Measurement & Statistics).
* **Level 4 (Construct Domain):** `Personality Typology & Human Cognitive Functioning`.
* **Level 5 (Operational Model):** `16 Cognitive Types (Carl Gustav Jung 1921 / Public Domain)`.
* **Level 6 (Instrument Scale Format):** `5-Point Likert Scale (24 Balanced Items: 50% Positively Keyed, 50% Reversed)`.
* **Level 7 (Real-World Application):** `Vocational Alignment (ILO ISCO-08) & Academic Trajectories (UNESCO ISCED-F 2013)`.

---

# **2. SOFTWARE CLASSIFICATION IDENTIFIERS**
* **Software Category:** `Assessment & Diagnostic Software` (ISO/IEC 19770-2 & UNSPSC Code 43230000).
* **Software Type:** `Application Software` (IEEE Computer Society / SWEBOK v4.0).
* **Platform & Distribution Model:** `Cloud Web Application / Enterprise SaaS` (NIST SP 800-145).
* **Role-Based Access Control (RBAC — 2 Validated & Encrypted Roles):**
  * `ADMIN` (Dedicated Platform Authority: Fauzul — Administrative Studio in `apps/app`, member directory governance, aggregate typology telemetry, account moderation with strict immutable RBAC).
  * `MEMBER` (Registered Enterprise User — Execute assessments, access cognitive diagnostic archive, PDF report export, persistent synchronization in Neon PostgreSQL).

---

# **3. MASTER TECH STACK & TOOLCHAIN (1 SLOT = 1 DEFINITIVE STANDARD)**

| No | Architecture Layer | Selected Technology | Licensing & Free Tier Limit | Architecture Rationale (Zero Overlap) |
| :---: | :--- | :--- | :--- | :--- |
| 1 | **Programming Language** | **TypeScript 5.x** | Open Source (Apache 2.0) | Permanent Strict Mode; zero-any policy; end-to-end type safety. |
| 2 | **Runtime Engine** | **Node.js 22 LTS** | Open Source (MIT) | Stable V8 runtime; native fetch API; 100% Vercel Edge compatibility. |
| 3 | **Package Manager** | **pnpm (v9+)** | Open Source (MIT) | 70% disk efficiency via content-addressable store; zero phantom dependencies. |
| 4 | **Monorepo Orchestrator** | **Turborepo** | Vercel Open Source | Parallel pipeline caching; eliminates up to 90% of redundant rebuilds. |
| 5 | **Web Framework** | **Next.js 16 (App Router)** | Vercel Open Source | Hybrid React Server Components (RSC) + Server Actions; zero-API backend latency. |
| 6 | **UI Library** | **React 19** | Meta Open Source | Native Action State, useOptimistic, Suspense streaming SSR primitives. |
| 7 | **Schema Validation** | **Zod** | Open Source (MIT) | Strict runtime validation for assessment payloads, auth forms, and `.env` vars. |
| 8 | **Client State Machine** | **Zustand** | Open Source (MIT) | Micro state store (< 1 KB) for deterministic Likert assessment transitions. |
| 9 | **URL State Manager** | **NUQS** | Open Source (MIT) | Type-safe query string synchronization for search filters and report sharing. |
| 10 | **Client Session Crypto** | **Web Crypto API** | Native W3C Standard | Deterministic browser-side session integrity and state validation ($0 overhead). |
| 11 | **Database Engine** | **Neon Serverless PostgreSQL** | Cloud Free Tier | Official Vercel Storage Partner; Instant Branching and auto-scaling pooler. |
| 12 | **DB Connection Driver** | **`@neondatabase/serverless`** | Open Source (MIT) | WebSocket/HTTP connection pooling; immune to connection exhaustion. |
| 13 | **ORM Client** | **Prisma ORM** | Open Source (Apache 2.0) | Declarative schema, automated migrations, parameterized SQL injection immunity. |
| 14 | **Database GUI Studio** | **Prisma Studio** | Prisma Native (Free) | Local browser GUI via `apps/studio` without third-party desktop utilities. |
| 15 | **Authentication & RBAC** | **Better Auth & Scrypt Crypto** | Self-Hosted ($0 OpEx) | Self-hosted in PostgreSQL; HttpOnly secure cookies; salted scrypt passwords. |
| 16 | **Security & Defense** | **Arcjet** | 100,000 Requests/Mo Free | Bot detection, disposable email rejection, token-bucket rate limiting. |
| 17 | **HTTP Security Headers** | **Next.js Native Headers** | Native Engine | 2-year HSTS preload, strict CSP, X-Frame-Options: DENY, nosniff. |
| 18 | **CSS & Styling Engine** | **Tailwind CSS v4** | Open Source (MIT) | Rust-based zero-runtime compiler; native CSS variables; Citron/Basalt palette. |
| 19 | **Headless UI Primitives** | **Radix UI** | Open Source (MIT) | WCAG 2.2 Level AAA compliant; complete keyboard navigation accessibility. |
| 20 | **UI Component Pattern** | **shadcn/ui Pattern** | Open Source (MIT) | Sovereign components in `packages/design-system`; zero vendor lock-in. |
| 21 | **Vector Iconography** | **Lucide React** | Open Source (ISC) | Tree-shakeable SVG icons; ultra-lightweight and consistent visual weight. |
| 22 | **Typography System** | **`next/font` (Inter & Space Grotesk)** | Open Source (OFL) | Self-hosted by Vercel; zero external Google network requests; CLS = 0. |
| 23 | **Transactional Email API** | **Resend** | 3,000 Emails/Mo Free | Official Vercel partner; high-reputation dedicated IP delivery to primary inbox. |
| 24 | **Email Templates** | **React Email** | Open Source (MIT) | Component-driven React JSX templates; live local preview in `apps/email`. |
| 25 | **Object Storage & CDN** | **Cloudflare R2** | 10 GB Storage + $0 Egress | S3-compatible API; zero egress bandwidth fees for PDF dossier downloads. |
| 26 | **Public Documentation** | **Fumadocs** | Open Source (MIT) | Self-hosted in `apps/docs`; lightning-fast full-text search; zero subscriptions. |
| 27 | **Linter & Formatter** | **Biome** | Open Source (MIT) | 25x faster than ESLint/Prettier; all-in-one unified Rust compiler. |
| 28 | **Git Hook Manager** | **Lefthook** | Open Source (MIT) | Instant Go binary; executes lint and typecheck validations before commit. |
| 29 | **Unit Testing & V8 Coverage** | **Vitest v5 & @vitest/coverage-v8** | Open Source (MIT) | Native Vite-powered runner; 100/100 automated test proofs in <600ms; V8 AST code coverage. |
| 30 | **E2E Browser Automation** | **Playwright** | Open Source (Apache 2.0) | Headless browser verifying runner journey from Question 1 to Result Dossier. |
| 31 | **Error Tracking** | **Sentry** | 5,000 Errors & 10,000 Traces/Mo | Real-time crash monitoring with TypeScript source-map stack traces. |
| 32 | **Centralized Logging** | **Better Stack (Logtail)** | 1 GB Log Data/Mo Free | Live-tail interactive console; structured SQL log querying. |
| 33 | **Product Analytics** | **PostHog Analytics** | 1,000,000 Events/Mo Free | Privacy-preserving conversion funnels and assessment completion tracking. |
| 34 | **Session Replay** | **PostHog Session Replay** | 5,000 Recordings/Mo Free | Diagnostic cursor replay for user UX friction triage. |
| 35 | **Feature Flags** | **PostHog Feature Flags** | 1,000,000 Requests/Mo Free | Remote instrument catalog toggling without code re-deployments. |
| 36 | **Uptime Monitoring** | **Better Stack Uptime** | 10 Monitors @ 3-min ping | Immediate alert notifications via Webhook/Email during service degradation. |
| 37 | **CI Pipeline** | **GitHub Actions** | 2,000 Mins/Mo Free | Automated lint, typecheck, and test runner verification on every Pull Request. |
| 38 | **Edge Hosting** | **Vercel** | Global Edge Network | Automated serverless edge deployments; instant preview branches; zero downtime. |
| 39 | **Semantic Versioning** | **Changesets (SemVer 2.0.0)** | Open Source (MIT) | Automated version synchronization across `package.json`, docs, and Git tags. |

---

# **4. KEY ARCHITECTURAL DECISIONS (ADRs)**
1. **Cloudflare Turnstile Purged from Client:**
   * Handled transparently by **Arcjet** at the backend layer (*Server Actions*).
   * Rationale: Preserves a 100% frictionless, executive user experience without visual captcha puzzles disrupting the *Cold Basalt & Citron* aesthetic.
2. **Dual-Branch Enterprise Git Flow:**
   * Branch `dev`: Active staging and day-to-day engineering.
   * Branch `main`: Production release environment serving [watq.mafrilearth.com](https://watq.mafrilearth.com).
3. **Zero Secret Disclosure Protocol:**
   * Permanent enforcement of GitHub Secret Scanning & Push Protection.
   * Production secrets accessed strictly via Vercel Environment Variables.

---

# **5. OFFICIAL MONOREPO FOLDER STRUCTURE (NEXT-FORGE PRODUCTION STANDARD)**

```
watq/
├── apps/
│   ├── web/               # Public Gateway, 680px Assessment Runner, Result Dossier, Auth Gateways
│   ├── app/               # Authenticated Member Dashboard & Administration Studio (/admin)
│   ├── docs/              # Scientific Psychometric Docs, Mathematical Formulas & API Specs
│   ├── email/             # React Email Development Preview Server (Port 3003)
│   └── studio/            # Prisma Studio Database GUI Launcher (Port 5555)
├── packages/
│   ├── analytics/         # PostHog Client & Server Telemetry (@watq/analytics)
│   ├── auth/              # Better Auth Server, Client Hooks, RBAC, Cookies (@watq/auth)
│   ├── core/              # Psychological Engine, Scoring Math, 16 Archetype Matrix (@watq/core)
│   ├── database/          # Prisma 6.4 Client + Neon Serverless Pooler (@watq/database)
│   ├── design-system/     # Cold Basalt & Citron Radix Primitives & Tokens (@watq/design-system)
│   ├── email/             # Resend API Client & React Email Transactional Templates (@watq/email)
│   ├── next-config/       # Shared Next.js Config & Security Headers: HSTS, CSP, DENY (@watq/next-config)
│   ├── observability/     # Sentry Error Monitoring & Better Stack Logtail Logger (@watq/observability)
│   ├── security/          # Arcjet WAF Bot Defense, Rate Limiter & Email Validation (@watq/security)
│   └── storage/           # Cloudflare R2 S3-Compatible Object Storage Client (@watq/storage)
├── docs/                  # Single Source of Truth (SSOT) Architecture & Specifications
├── turbo.json             # Turborepo Build, Typecheck, Lint, Test Pipeline
├── biome.json             # Biome Rust Formatter & Linter Configuration
├── .env.example           # Master Environment Variables Manifest
├── pnpm-workspace.yaml    # Workspace Packages Definition & Supply-Chain Allowed Builds
└── package.json           # Root Monorepo Scripts
```

> **Monorepo Verification:** 100% Typechecked via `turbo typecheck` (All packages/apps pass with zero errors), 100% Production Built via `turbo build` (All apps compile cleanly), and all unit test suites 100% green.

---

# **6. ENTERPRISE DATA ARCHITECTURE & SCHEMA SPECIFICATION**

> **Persistence Engine:** Neon Serverless PostgreSQL (`@neondatabase/serverless`)  
> **ORM & Schema Authority:** Prisma ORM 6.4 (`packages/database/prisma/schema.prisma`)  
> **Naming Standard:** `snake_case` (PostgreSQL Tables & Columns via `@@map`) │ `camelCase` (Prisma Client Models & Fields)

### **6.1 Entity Relationship Hierarchy (ERD)**

```
┌──────────────────┐       1:N       ┌──────────────────┐
│   users (Core)   ├────────────────►│     sessions     │
└────────┬─────────┘                 └──────────────────┘
         │
         │ 1:N                       ┌──────────────────┐
         ├──────────────────────────►│     accounts     │
         │                           └──────────────────┘
         │
         │ 1:N (Nullable / SetNull)  ┌────────────────────────┐
         └──────────────────────────►│   assessment_results   │
                                     └────────────────────────┘

┌─────────────────────────┐ 1:N      ┌────────────────────────┐
│  psychometric_models    ├─────────►│       questions        │
└─────────────────────────┘          └────────────────────────┘

┌─────────────────────────┐
│      verifications      │ (Autonomous OTP / Email Verification Tokens)
└─────────────────────────┘
```

### **6.2 Definitive Table & Column Dictionary (7 Canonical Tables — Zero Bloat)**

| Table Name | Model Name | Primary Key | Key Columns & Global Standards | Architectural Boundary & Invariant |
| :--- | :--- | :--- | :--- | :--- |
| `users` | `User` | `id` (CUID) | `email` (RFC 5322 unique), `role` (`ADMIN` \| `MEMBER`), `emailVerified` (Boolean) | Sovereign identity root; zero hardcoded credentials; strict 2-role RBAC. |
| `sessions` | `Session` | `id` (CUID) | `userId` (FK), `token` (Unique bearer token), `expiresAt`, `ipAddress`, `userAgent` | Secure `HttpOnly` session tokens; automated cascade on user deletion. |
| `accounts` | `Account` | `id` (CUID) | `userId` (FK), `providerId` + `accountId` (Unique), `password` (scrypt hash) | RFC 6749 OAuth 2.0 & cryptographic salted hash credential store. |
| `verifications` | `Verification` | `id` (CUID) | `identifier` (Email/Phone), `value` (Cryptographic token), `expiresAt` | Ephemeral OTP & verification token TTL management. |
| `psychometric_models` | `PsychometricModel` | `id` (Kebab) | `name`, `framework`, `year` (1921), `itemCount` (24), `isActive` (Boolean) | APA/ITC psychometric catalog registry; reference model: `jung-16-types`. |
| `questions` | `Question` | `id` (Int) | `modelId` (FK), `prompt`, `dimension` (Enum), `pole` (E-P), `polarity` (+1/-1), `orderIndex` | Balanced item bank (50% keyed normal, 50% reversed); cascade deletion. |
| `assessment_results` | `AssessmentResult` | `id` (CUID) | `userId` (Nullable FK), `modelId`, `typeCode` (INTJ), `scoreEI`..`scoreJP`, `responses` (JSON) | Diagnostic dossier persistence; supports anonymous guest runs prior to registration. |

### **6.3 Cloud Infrastructure Limits & Cost Optimization Strategy (Scale to Zero & Quota Preservation)**

Following official Neon documentation (`docs/introduction/cost-optimization` & `docs/guides/scale-to-zero-guide`), the platform enforces five definitive cost-efficiency guardrails to ensure permanent Free Tier sustainability ($0 OpEx):

1. **Compute Unit (CU) Sizing & Scale to Zero:**
   * **Compute Size:** Strict bounds set to $\text{min\_cu} = 0.25$ and $\text{max\_cu} = 0.25$.
   * **CU-Hour Efficiency:** On $0.25\text{ CU}$, 4 active compute hours consume only $1.0\text{ CU-hour}$. Neon's 100 CU-hour monthly allowance provides up to **400 active compute hours per month**.
   * **Auto-Suspend:** Endpoints scale down to zero ($0\text{ CU}$) during inactivity, resuming in $< 500\text{ms}$ upon incoming queries.
2. **PgBouncer Transaction Pooling:**
   * Both `main` (`ep-misty-union-a1dh...`) and `dev` (`ep-twilight-tooth-a10l...`) endpoints have `pooler_enabled: true` in `transaction` mode.
   * Eliminates connection exhaustion and client connection setup latency across serverless function lifecycles.
3. **Storage Quota Preservation ($1\text{ GB}$ Limit):**
   * Total active relational data footprint is strictly optimized to $< 200\text{ kB}$ ($< 0.02\%$ of the $1\text{ GB}$ allowance).
   * Schema uses normalized relations with zero table bloat and zero redundant unindexed fields.
4. **Branch Lifecycle Governance:**
   * Strictly maintains only 2 active branches: `main` (Production) and `dev` (Staging), utilizing only 2 of the 10 allowed free branches ($20\%$).
   * Child development branches share base data via Copy-on-Write (CoW), incurring zero additional storage cost until mutated.
5. **Transport Layer Cryptography:**
   * All connection strings mandate `sslmode=require` and `channel_binding=require` for end-to-end cryptographic transit protection.


