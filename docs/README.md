# **WATQ — MASTER DOCUMENTATION SUITE (ENTERPRISE SaaS v1.0.0)**

> **Suite ID & Version:** `WATQ-DOCS-INDEX` │ `v1.0.0` │ `LOCKED`  
> **Authority & Owner:** Fauzul (Platform Lead) │ **Repository:** `Mafrilearth/watq`  
> **SSOT Domain:** Master Index of 8 Non-Overlapping SDLC Specifications  
> **Live Platform:** [https://watq.mafrilearth.com](https://watq.mafrilearth.com)

---

## **1. DOCUMENTATION ARCHITECTURE & ZERO-OVERLAP PRINCIPLE**

The Watq documentation suite adheres to the highest global software engineering standards (`ISO/IEC/IEEE`, `W3C`, `OWASP`, `NIST`):
1. **Strictly Non-Overlapping (Zero Overlap):** Each document possesses exclusive Single Source of Truth (SSOT) authority. No rule or data is duplicated across documents.
2. **Standard International Nomenclature:** All specification files use recognized global acronyms (`BRD`, `PRD`, `SRS`, `DTS`, `SAD`, `STP`, `SEC`, `OPS`).
3. **100% Pure Global English:** Standardized across all technical documentation, component schemas, tokens, and build configurations.
4. **The Universal 4-Chapter Blueprint:** Every specification document follows an identical 4-chapter structure (Foundation, Core Specs, Guardrails, Code Mapping).

---

## **2. OFFICIAL MASTER DOCUMENTATION INDEX (8 CORE SDLC SPECIFICATIONS)**

| No | File Path | Standard Document Title | Governing Global Standards | Single Source of Truth (SSOT) Domain |
| :-: | :--- | :--- | :--- | :--- |
| **01** | [`01-brd.md`](file:///d:/watq/docs/01-brd.md) | **Brand & Business Requirements Document (BRD)** | `ISO 20671`, `ISO 10668`, `WIPO Classes 9 & 42` | Brand DNA, Sundanese *Watek* root etymology, legal Fanciful Mark status, *The Universal Personality Lens* geometric construction, color palette, and business vision. |
| **02** | [`02-prd.md`](file:///d:/watq/docs/02-prd.md) | **Product Requirements Document (PRD)** | `APA/ITC 2014`, `Jung 1921`, `Likert 1932`, `ILO ISCO-08`, `UNESCO ISCED-F` | 16 Cognitive Types construct, 24-item balanced Likert catalog, deterministic scoring formula ($S_{\text{dim}} \in [6, 30]$), and 16 archetype vocational matrix. |
| **03** | [`03-srs.md`](file:///d:/watq/docs/03-srs.md) | **Software Requirements Specification (SRS)** | `ISO/IEC/IEEE 29148:2018`, `IEEE 830`, `ISO/IEC 25010:2023` | Monorepo domain routing (`apps/web` vs `apps/app`), Finite State Machine (FSM), keyboard navigation contract, and 6 critical edge cases mitigation. |
| **04** | [`04-dts.md`](file:///d:/watq/docs/04-dts.md) | **Design Tokens Specification (DTS)** | `W3C DTCG Standard`, `WCAG 2.2 AAA`, `Bringhurst's Law` | DTCG token architecture, 680px distraction-free focus container derivation ($65\text{ CPL}$ measure), micro-motion curves (120ms/180ms), and ARIA accessibility. |
| **05** | [`05-sad.md`](file:///d:/watq/docs/05-sad.md) | **Software Architecture Document (SAD)** | `ISO/IEC/IEEE 42010:2011`, `NIST SP 800-145` | Next-Forge monorepo structure, Neon Serverless PostgreSQL pooling, Prisma ORM schema, Architecture Decision Records (ADRs), and $0 OpEx toolchain. |
| **06** | [`06-stp.md`](file:///d:/watq/docs/06-stp.md) | **Software Test Plan & Quality Assurance (STP)** | `ISO/IEC/IEEE 29119:2022`, `IEEE 730-2014` | Master testing strategy, 27/27 automated test proofs (brand geometry, scoring invariants, response validity), and release acceptance gates. |
| **07** | [`07-sec.md`](file:///d:/watq/docs/07-sec.md) | **Security, Cryptography & Governance Policy (SEC)** | `OWASP Top 10 (2021)`, `ISO/IEC 27001`, `GDPR Art. 17/20` | Salted `scrypt` hashing with `timingSafeEqual`, strict 2-Role RBAC (`ADMIN` vs `MEMBER`), HTTP security headers (`HSTS`, `CSP`, `DENY`), and zero secret disclosure. |
| **08** | [`08-ops.md`](file:///d:/watq/docs/08-ops.md) | **Operations & Observability Manual (OPS)** | `Google SRE Handbook`, `SemVer 2.0.0`, `ISO/IEC/IEEE 12207` | Dual-branch Git flow (`dev` ➔ `main`), SemVer 2.0.0 4-surface synchronization, telemetry infrastructure (Sentry, Better Stack, PostHog), and closed-loop triage runbook. |

---

## **3. THE UNIVERSAL 4-CHAPTER BLUEPRINT**

Every specification document in this suite strictly adheres to a uniform structure:

```text
Header Metadata Box  ──> Document ID (WATQ-XXX-0N), Version (1.0.0), Status (PRODUCTION_INITIAL_RELEASE_LOCKED), Global Standards, SSOT Authority, Code Links
Chapter 1: FOUNDATION & PRINCIPLES (The "Why")           ──> Philosophical grounding, scientific rationale, and scope boundaries
Chapter 2: CORE TECHNICAL SPECIFICATIONS (The "What/How") ──> Exhaustive data schemas, mathematical formulas, and contract specifications
Chapter 3: GUARDRAILS, INTEGRITY & EDGE CASES            ──> Security invariants, validation constraints, and defensive mitigations
Chapter 4: CODE IMPLEMENTATION MAPPING (The "Where")     ──> Monorepo source code links (apps/ and packages/), acceptance criteria
```

---

## **4. SEPARATION OF CONCERNS MATRIX (ZERO OVERLAP)**

```
┌────────────────────────────────────────────────────────────────────────┐
│                              01-BRD.MD                                 │
│   "Who is Watq?" -> Brand DNA, Watek Origin, Logo Geometry, Vision     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                              02-PRD.MD                                 │
│   "What is Built?" -> 16 Types, 24 Items, Scoring Math, Archetypes    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                              03-SRS.MD                                 │
│   "How Does It Work?" -> Route FSM, State Machine, 6 Edge Cases        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                              04-DTS.MD                                 │
│   "How Does It Look & Move?" -> 680px Container, DTCG Tokens, Motion   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                              05-SAD.MD                                 │
│   "Where Does It Run?" -> Next-Forge Monorepo, Neon DB, Prisma, ADRs   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                              06-STP.MD                                 │
│   "How is It Proven?" -> 27/27 Tests, Mathematical Scoring Proofs      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                              07-SEC.MD                                 │
│   "How is It Defended?" -> Scrypt Crypto, 2-Role RBAC, HSTS/CSP Headers │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                              08-OPS.MD                                 │
│   "How is It Operated?" -> Dual-Branch Git, SemVer, Sentry, Telemetry   │
└────────────────────────────────────────────────────────────────────────┘
```
