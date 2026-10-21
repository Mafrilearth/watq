# **WATQ — PERSONALITY DECODED**

> **Tagline:** *Personality Decoded.*  
> **Status:** MVP v1.0 — Private & Proprietary (Closed-Source)  
> **Governance:** Internal Development Only — External Contributions Prohibited  
> **Distribution:** End-User Software Application Only  
> **Stack:** Next.js 15 (App Router) + TypeScript + Tailwind CSS

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
