# CLAUDE.md — Watq Repository Guidelines

This repository follows the universal agentic engineering standard defined in **`AGENTS.md`**.

## Key Commands
- **Install dependencies:** `pnpm install`
- **Start dev server:** `pnpm dev`
- **Build production bundle:** `pnpm build`
- **Lint code:** `pnpm lint`

## Architecture & Code Guidelines
- **Universal Directives:** Refer to [`AGENTS.md`](./AGENTS.md) for complete agent directives, SOP, and conventions.
- **Specification Suite:** Refer to [`docs/README.md`](./docs/README.md) for the 4 SSOT pillars:
  - Brand Guidelines: `docs/01-brand.md`
  - PRD & Psychometrics: `docs/02-prd.md`
  - SRS & State Machine: `docs/03-srs.md`
  - Design Tokens & Layout: `docs/04-design-system.md`
- **Architecture:** 100% Client-driven execution ($0 database OpEx). No backend database.
- **Language:** Strict 100% English for code, comments, UI, and commits.
- **Security & Privacy:** Enforce enterprise HTTP headers in `next.config.ts`, GitHub Secret Scanning Push Protection, branch immutability on `main`, and zero telemetry.
- **Version Synchronization:** Ensure identical SemVer across `package.json`, `CHANGELOG.md`, `/changelog`, and GitHub Releases without version spamming on micro-edits.
- **Deployment:** Vercel auto-deployment is decoupled from git pushes. Only push to GitHub unless directed.
