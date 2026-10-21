# **WATQ — MASTER DOCUMENTATION SUITE (MVP v1.0)**

> **Official Tagline:** *Personality Decoded.*  
> **Repository Status:** Clean MVP Specification Suite (Zero Bloat, Zero Overlap, Scalable Architecture)  
> **Core Architecture:** Single-Instrument Client-Driven Architecture (16 Cognitive Types)  
> **Suite Version:** `1.2.0` │ **Status:** `MVP_LOCKED`

---

## **1. DOCUMENTATION PHILOSOPHY & STANDARDS (THE "WHY")**

The Watq documentation suite is engineered to meet the highest standards of modern software engineering and multidisciplinary research:
1. **Concise & Direct:** Eliminates redundant bureaucracy, repetitive jargon, and unnecessary narrative prose.
2. **Zero Overlap & Non-Redundant:** Each document holds exclusive Single Source of Truth (SSOT) authority. No data or rules are duplicated across files.
3. **Uniform & Predictable Structure (The Universal 4-Chapter Blueprint):** Every specification document follows an identical 4-chapter anatomy.
4. **Scalable & Modular:** The architecture allows future extensions (v2.0+) without altering the validated MVP foundation.
5. **100% Pure Global English:** Standardized across all technical documentation, component schemas, tokens, and build configurations.

---

## **2. OFFICIAL 5-PILLAR DOCUMENTATION INDEX**

| No | Specification File | Global Industry Equivalents & Standards | Single Source of Truth (SSOT) Domain |
| :---: | :--- | :--- | :--- |
| **01** | [`01-brand.md`](file:///d:/watq/docs/01-brand.md) | **BRD & Brand Identity System** (`WIPO Classes 9, 16, 35, 41, 42`, `ISO 20671`, `ISO 10668`, `ISO 12647-2`, `DIN 5008`, `DIN 1450`, `WCAG 2.2 AAA`) | Brand DNA, Nomenclature, Tagline, Archetype, Tone of Voice, Geometric Construction of *The Psychometric Prism*, Cross-Medium Color System (Screen, Print, RAL, Madeira), Typographic Scale, Physical Stationery, and Strict Guardrails. |
| **02** | [`02-prd.md`](file:///d:/watq/docs/02-prd.md) | **PRD (Product Requirements Document)** (`Jung 1921`, `Likert 1932`, `APA Standards`, `UNESCO ISCED-F 2013`, `ILO ISCO-08`) | MVP Scope Boundaries, 16 Cognitive Types Model, 24-Item Question Catalog, 50/50 Balanced Keying, Deterministic Scoring Formula & Proof Table, 16 Archetype Vocational Matrix, and Offline/Physical Testing Specs. |
| **03** | [`03-srs.md`](file:///d:/watq/docs/03-srs.md) | **SRS (Software Requirements Specification)** (`IEEE 830`, `ISO/IEC 25010:2023`, `Fitts's Law`, `Hick-Hyman Law`, `Bringhurst's Law`, `RFC 9562`, `W3C Web Vitals`) | 3-Screen Sitemap (`/`, `/assess`, `/result`), Finite State Machine (FSM), Client Session Contract (`watq_mvp_session_v1`), Desktop Keyboard Navigation, 6 Critical Edge Cases Mitigation, and Non-Functional Budgets. |
| **04** | [`04-design-system.md`](file:///d:/watq/docs/04-design-system.md) | **Design System & Tokens (DTCG)** (`W3C DTCG`, `WCAG 2.2 AAA`, `Bringhurst's Law`, `Weber-Fechner Law`, `Fitts's Law`, `Hick-Hyman Law`, `Miller's Law`, `DIN 1450`) | Atomic Component Hierarchy, 680px Focus Container, Slate & Deep Indigo Palettes, 4 Polarity Axis Tokens, 12-Dimensional Chart Spectrum, Inter `tnum` Typography, Micro-Motion Timing (120ms/180ms), and Reduced Motion. |
| **05** | [`05-agentic-sdlc.md`](file:///d:/watq/docs/05-agentic-sdlc.md) | **Agentic SDLC & Multi-Agent Governance** (`ISO/IEC/IEEE 12207`, `CMMI v2.0`, `OWASP SAMM v2.0.1`, `Google SRE`, `SemVer 2.0.0`) | 8-Stage Agentic SDLC Matrix, Skill Mapping & Non-Overlapping Boundaries, Mandatory Deliverables, Cowboy Coding Anti-Patterns, and Continuous Closed-Loop Feedback Architecture. |

---

## **3. THE UNIVERSAL 4-CHAPTER BLUEPRINT**

Every document in this suite strictly adheres to a uniform structure:

```text
Header Metadata Box  ──> Document ID, Version (1.2.0), Status (MVP_LOCKED), Global Standards, SSOT, Code Links
Chapter 1: FOUNDATION & PRINCIPLES (The "Why")           ──> Background, philosophy, and scope boundaries
Chapter 2: CORE TECHNICAL SPECIFICATIONS (The "What/How") ──> Detailed specifications, data, and computation logic
Chapter 3: GUARDRAILS, INTEGRITY & EDGE CASES            ──> Compliance standards, validation, and error mitigation
Chapter 4: CODE IMPLEMENTATION MAPPING (The "Where")     ──> Source code paths (src/), data contracts, and acceptance
```

---

## **4. SEPARATION OF CONCERNS MAPPING**

```
┌────────────────────────────────────────────────────────────────────────┐
│                              01-BRAND.MD                               │
│   "Who is Watq?" -> Brand DNA, Logo, Colors, Physical Print, Voice     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                              02-PRD.MD                                 │
│   "What is Built?" -> 16 Types, 24 Items, Scoring Math, Archetypes    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                              03-SRS.MD                                 │
│   "How Does It Work?" -> 3 Screens, FSM, LocalStorage, 6 Edge Cases    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                         04-DESIGN-SYSTEM.MD                            │
│   "How Does It Look & Move?" -> 680px Layout, CSS Tokens, Micro-Motion │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                         05-AGENTIC-SDLC.MD                             │
│   "How is it Engineered?" -> 8-Stage SDLC, Agent Skills, Closed Loop   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## **5. FUTURE SCALABILITY & EXTENSIBILITY**

While MVP v1.0 is strictly locked to the 16 Cognitive Types model with 3 screens and $0 database OpEx:
* **Adding New Instruments (v2.0+):** Simply introduce a new item catalog file under `src/data/assessments/` and register a scoring calculator in `src/lib/scoring/` without modifying core runner logic.
* **Adding Cloud Database Persistence:** Can be integrated as an additional storage adapter under `src/lib/storage/` without breaking the standardized `WatqAssessmentSession` data contract.
