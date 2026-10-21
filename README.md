# **WATQ — PERSONALITY DECODED**

<p align="left">
  <a href="https://watq.mafrilearth.com"><img src="https://img.shields.io/badge/Live%20Platform-watq.mafrilearth.com-4F46E5?style=flat-square" alt="Live Platform" /></a>
  <a href="https://github.com/Mafrilearth/watq/releases/tag/v1.0.0"><img src="https://img.shields.io/badge/Release-v1.0.0-emerald?style=flat-square" alt="Version 1.0.0" /></a>
  <a href="CHANGELOG.md"><img src="https://img.shields.io/badge/Changelog-Keep%20a%20Changelog-blue?style=flat-square" alt="Changelog" /></a>
  <a href="AGENTS.md"><img src="https://img.shields.io/badge/Agentic%20AI-SOP%20Active-purple?style=flat-square" alt="Agentic AI SOP" /></a>
  <img src="https://img.shields.io/badge/License-Proprietary-slate?style=flat-square" alt="License: Proprietary" />
</p>

> **Tagline:** *Personality Decoded.*  
> **Repository:** [`Mafrilearth/watq`](https://github.com/Mafrilearth/watq) │ **Live URL:** [https://watq.mafrilearth.com](https://watq.mafrilearth.com)  
> **Status:** MVP v1.0 — Private & Proprietary (Closed-Source)  
> **Governance:** Internal Development Only — External Contributions Prohibited  
> **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS

### ⚡ **Quick Navigation**
[**Live Platform**](https://watq.mafrilearth.com) │ [**Latest Release Notes (v1.0.0)**](https://github.com/Mafrilearth/watq/releases/tag/v1.0.0) │ [**Full Changelog**](CHANGELOG.md) │ [**AI Agent Directives (AGENTS.md)**](AGENTS.md) │ [**Master Docs Suite**](docs/README.md)

---

## **1. PROJECT OVERVIEW**
**Watq** is a modern, client-driven cognitive assessment engine engineered to accurately decode natural personality tendencies and provide aligned college major recommendations and future career trajectories.

In **MVP v1.0**, Watq strictly adheres to the **Zero-Bloat MVP** philosophy:
* **Single Focused Model:** 16 Cognitive Types (Jungian Typology 1921 / Public Domain) evaluated via 24 5-point Likert items.
* **3 Isolated Screens:** Landing (`/`) $\rightarrow$ Focused 680px Runner (`/assess`) $\rightarrow$ Diagnostic Report & Vocational Synthesis (`/result`).
* **Zero Database Complexity ($0 OpEx):** Session persistence and scoring calculations execute client-side via Web Crypto API and `localStorage`.

---

## **2. OFFICIAL DOCUMENTATION SUITE (`docs/`)**
All technical specifications and system designs are unified in 4 official documents:

1. **[`docs/01-brand.md`](file:///d:/watq/docs/01-brand.md)** (Brand Guidelines & Visual Identity SSOT)  
   Standards for *The Psychometric Prism* mark, Psychometric Slate & Deep Indigo palette, and typography.
2. **[`docs/02-prd.md`](file:///d:/watq/docs/02-prd.md)** (PRD - Product Requirements Document)  
   16 Cognitive Types instrument, complete 24-item question catalog, scoring algorithm, and 16 archetype vocational matrix.
3. **[`docs/03-srs.md`](file:///d:/watq/docs/03-srs.md)** (SRS - Software Requirements Specification)  
   3-screen architecture, client session state machine, desktop keyboard navigation, and edge case mitigation.
4. **[`docs/04-design-system.md`](file:///d:/watq/docs/04-design-system.md)** (Design System & Design Tokens)  
   Atomic component hierarchy, 680px focus container, CSS tokens, micro-motion timing (120ms/180ms), and WCAG 2.2 AA audit.

---

## **3. LOCAL DEVELOPMENT**
```bash
pnpm install
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.
