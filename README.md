# **WATQ — PERSONALITY DECODED**

<p align="left">
  <a href="https://watq.mafrilearth.com"><img src="https://img.shields.io/badge/Live%20Platform-watq.mafrilearth.com-4F46E5?style=flat-square" alt="Live Platform" /></a>
  <a href="https://github.com/Mafrilearth/watq"><img src="https://img.shields.io/badge/Release-v1.2.0-emerald?style=flat-square" alt="Version 1.2.0" /></a>
  <a href="AGENTS.md"><img src="https://img.shields.io/badge/Agentic%20AI-SOP%20Active-purple?style=flat-square" alt="Agentic AI SOP" /></a>
  <img src="https://img.shields.io/badge/Visibility-Public-blue?style=flat-square" alt="Visibility: Public" />
  <img src="https://img.shields.io/badge/License-Proprietary-slate?style=flat-square" alt="License: Proprietary" />
</p>

> **Tagline:** *Personality Decoded.*  
> **Repository:** [`Mafrilearth/watq`](https://github.com/Mafrilearth/watq) │ **Live URL:** [https://watq.mafrilearth.com](https://watq.mafrilearth.com)  
> **Status:** Lean Enterprise Cognitive Assessment SaaS  
> **Authority & Lead:** Fauzul (Muhammad Fauzul Hanif)  
> **Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Neon PostgreSQL + Prisma + Tailwind CSS

### ⚡ **Quick Navigation**
[**Live Platform**](https://watq.mafrilearth.com) │ [**AI Agent Directives (AGENTS.md)**](AGENTS.md) │ [**Master Docs Suite (docs/README.md)**](docs/README.md) │ [**Product Requirements (docs/02-prd.md)**](docs/02-prd.md)

---

## **1. PROJECT OVERVIEW**
**Watq** is an enterprise-grade cognitive assessment and personality decoding SaaS platform engineered to accurately decode natural cognitive preferences, communication styles, and career trajectories (ILO ISCO-08 & UNESCO ISCED-F 2013).

The platform strictly adheres to the **Lean Enterprise SaaS Core** philosophy:
* **Single Focused Model:** 16 Cognitive Types (Jungian Typology 1921 / Public Domain) evaluated via 24 calibrated 5-point Likert items.
* **4-Pillar Lean Core:** Public Gateway (`/`) $\rightarrow$ Focused 680px Runner (`/assess`) $\rightarrow$ Executive Cognitive Dossier (`/result`) $\rightarrow$ Enterprise Workspace (`apps/app`).
* **Cryptographic Enterprise Security:** Salted `scrypt` password hashing, HttpOnly session tokens, and persistent cloud storage powered by Neon Serverless PostgreSQL.
* **Strict 2-Role Governance:** `ADMIN` (Fauzul — Directory governance & telemetry) and `MEMBER` (Standard authenticated enterprise user).
* **Zero Technical Jargon:** Clean, executive-ready interface copy with zero internal developer or database terminology.

---

## **2. OFFICIAL DOCUMENTATION SUITE (`docs/`)**
All technical specifications and system designs are unified in the official SSOT suite:

1. **[`docs/01-brd.md`](file:///d:/watq/docs/01-brd.md)** (Brand & Business Requirements Document - BRD)  
   Sundanese *Watek* root etymology, legal Fanciful Mark status, *The Universal Personality Lens* geometry, Cold Basalt & Radioactive Citron palette, and business vision.
2. **[`docs/02-prd.md`](file:///d:/watq/docs/02-prd.md)** (Product Requirements Document - PRD)  
   16 Cognitive Types instrument construct, 24-item balanced Likert catalog, deterministic scoring algorithm ($S_{\text{dim}} \in [6, 30]$), and 16 archetype vocational matrix.
3. **[`docs/03-srs.md`](file:///d:/watq/docs/03-srs.md)** (Software Requirements Specification - SRS)  
   Monorepo domain routing (`apps/web` vs `apps/app`), Finite State Machine (FSM), client session contract (`localStorage`), and 6 critical edge cases mitigation.
4. **[`docs/04-dts.md`](file:///d:/watq/docs/04-dts.md)** (Design Tokens Specification - DTS)  
   DTCG tokens, 680px focus container derivation ($65\text{ CPL}$ measure), micro-motion curves (120ms/180ms), and WCAG 2.2 AAA accessibility audit.
5. **[`docs/05-sad.md`](file:///d:/watq/docs/05-sad.md)** (Software Architecture Document - SAD)  
   Next-Forge monorepo boundaries, Neon Serverless PostgreSQL pooling, Prisma ORM schema, Architecture Decision Records (ADRs), and $0 OpEx toolchain.
6. **[`docs/06-stp.md`](file:///d:/watq/docs/06-stp.md)** (Software Test Plan & Quality Assurance - STP)  
   Master testing strategy, 27/27 automated test proofs (brand geometry, scoring invariants, response validity), and release acceptance gates.
7. **[`docs/07-sec.md`](file:///d:/watq/docs/07-sec.md)** (Security, Cryptography & Governance Policy - SEC)  
   Salted `scrypt` hashing with `timingSafeEqual`, strict 2-Role RBAC (`ADMIN` vs `MEMBER`), HTTP security headers (`HSTS`, `CSP`, `X-Frame-Options: DENY`), and zero secret disclosure.
8. **[`docs/08-ops.md`](file:///d:/watq/docs/08-ops.md)** (Operations & Observability Manual - OPS)  
   Dual-branch Git flow (`dev` ➔ `main`), SemVer 2.0.0 4-surface synchronization, telemetry (Sentry, Better Stack, PostHog), and closed-loop triage runbooks.

---

## **3. LOCAL DEVELOPMENT**
```bash
pnpm install
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) for the public platform, or [http://localhost:3001](http://localhost:3001) for the private workspace app.
