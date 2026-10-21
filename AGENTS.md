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
3. **100% Global English Standard:**
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

---

## **3. CODEBASE CONVENTIONS & STACK RULES**

* **Framework:** Next.js 15 (App Router, React 19).
* **Language:** TypeScript with strict typing. Never use `any` unless absolutely unavoidable and documented.
* **Styling:** Tailwind CSS with custom design tokens. Mobile-first responsive styling:
  - Header actions: hide non-essential taglines on `< sm` viewports to avoid button wrapping.
  - Buttons: adhere to harmonized terminology (`Start Assessment`, `Resume Assessment`, `Retake Assessment`, `Copy Report`).
* **Icons:** `lucide-react`.
* **Package Management:** Use `pnpm` exclusively (`pnpm install`, `pnpm dev`, `pnpm build`).

---

## **4. FEATURE ROLLOUT & ANNOUNCEMENT SOP**

When shipping notable user-facing features or major updates:
1. **Update [`src/components/modals/WhatsNewModal.tsx`](file:///d:/watq/src/components/modals/WhatsNewModal.tsx):**
   - Add the new feature cards with clear titles, descriptions, and tag labels (`NEW`, `IMPROVEMENT`, `FIX`).
   - Bump the `STORAGE_KEY` version string (e.g., `watq_announcement_seen_v1_1`) so that returning users are presented with the popup exactly once.
2. **Update [`CHANGELOG.md`](file:///d:/watq/CHANGELOG.md):**
   - Follow Keep a Changelog and SemVer 2.0.0 guidelines under `[Unreleased]` or the targeted version.

---

## **5. GIT & DEPLOYMENT PROTOCOL**

1. **Commit Message Format:**
   - Adhere strictly to Conventional Commits: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`.
2. **Decoupled Deployment Policy:**
   - Automatic deployment on `git push origin main` is intentionally **DISABLED**.
   - Pushing code to GitHub updates the remote repository only.
   - Do **NOT** trigger production deployments to Vercel unless explicitly commanded by the user.
3. **Repository Metadata Preservation:**
   - GitHub **About** must remain universal and high-level:  
     `Watq — Modern cognitive assessment and personality typology platform.`
   - Do not pollute GitHub About or Topics with temporary micro-feature lists.

