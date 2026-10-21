# **WATQ — SPECIFICATION 05: AGENTIC SOFTWARE DEVELOPMENT LIFE CYCLE (SDLC)**

> **Document ID:** `WATQ-SDLC-01` │ **Version:** `1.0.0` │ **Status:** `LOCKED`  
> **Global Standards:** `ISO/IEC/IEEE 12207:2017`, `CMMI v2.0`, `OWASP SAMM v2.0.1`, `Google SRE Handbook`, `SemVer 2.0.0`  
> **Authority Domain:** Single Source of Truth (SSOT) for Autonomous AI Agent Engineering, Multi-Stage SDLC Workflows, Skill Execution Boundaries, and Continuous Feedback Loops.  
> **Target Systems:** Antigravity IDE, Cursor, Claude Code, Copilot, Devin, Codex, and Autonomous Subagent Orchestrators.

---

## **CHAPTER 1: FOUNDATION & PRINCIPLES (THE "WHY")**

### **1.1 The Agentic Engineering Paradigm**
Traditional software development assumes human cognitive continuity across planning, coding, and testing. In contrast, AI agent workflows face unique challenges:
1. **Context Compaction & Memory Loss:** Subagents or resumed turns lose conversational state.
2. **Premature Implementation Bias:** Agents tend to write code before validating problem definitions or defining data models.
3. **Boundary Bleed & Scope Drift:** Without rigid stage boundaries, an agent debugging a CSS typo might refactor the database layer.
4. **Superficial "Completion" Illusions:** Declaring a task complete without automated test proof or security verification.

To eliminate these vulnerabilities, Watq enforces an **8-Stage Agentic SDLC**. Every code modification or feature addition must originate from a distinct stage, utilize its dedicated specialized skill, and produce auditable deliverables before progressing to the next stage.

---

### **1.2 Core Architectural Axioms**
1. **No Code Before Architecture:** Never touch source code in `apps/` or `packages/` without an approved PRD or technical specification.
2. **Single Source of Skill Authority:** Each SDLC phase maps to exactly one primary skill. Skills have non-overlapping boundaries.
3. **Deterministic Verification:** Every stage produces a verifiable artifact (markdown spec, passing test suite, security audit log, or Git release tag).
4. **Closed-Loop Feedback:** Production defects and runtime errors triaged in Stage 8 are systematically transformed into regression test cases and fed back into Stage 1, preventing recurring defects.

---

## **CHAPTER 2: THE 8-STAGE AGENTIC SDLC MATRIX (THE "WHAT & HOW")**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   THE AGENTIC SDLC LIFECYCLE                                    │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
  [ Stage 1: Discovery ]       ──> product-discovery-research (JTBD, Personas, Benchmark)
            │
  [ Stage 2: Architecture ]    ──> system-architecture-spec (PRD, SRS, FSM, Data Contracts)
            │
  [ Stage 3: Visual System ]   ──> design-taste-frontend / brandkit (DTCG Tokens, Swiss Layouts)
            │
  [ Stage 4: Implementation ]  ──> nextjs-app-router-expert (TypeScript, RSC, Turbopack)
            │
  [ Stage 5: Verification ]    ──> testing-and-qa (TDD, Unit Tests, Edge Case Invariants)
            │
  [ Stage 6: Security ]        ──> security-audit-hardening (HSTS, CSP, Secret Scrubbing)
            │
  [ Stage 7: Release ]         ──> devops-ci-cd-release (SemVer 2.0.0, 4-Surface Sync, Vercel)
            │
  [ Stage 8: Observability ]   ──> systematic-debugging-observability (Root Cause, Feedback Loop)
            │
            └───────────────────────> Feeds back to Stage 1 (Continuous Evolution)
```

---

### **2.1 Stage-by-Stage Operational Specifications**

| Stage | Phase Name | Primary Skill | Scope & Non-Overlapping Boundary | Mandatory Deliverables |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **Research & Problem Discovery** | `product-discovery-research` | Market benchmark, user persona formulation, Jobs-to-be-Done (JTBD), problem validation, regulatory/scientific constraints. *No code or technical architecture.* | Discovery Markdown artifact, Persona & JTBD matrix, Competitor comparison table. |
| **02** | **Planning & Architecture** | `system-architecture-spec` | PRD formulation, Architecture Decision Records (ADRs), Finite State Machine (FSM) models, data schemas, and API contracts. *No implementation code.* | Specification document (`docs/`), ADR record, TypeScript interface contracts. |
| **03** | **Visual Design & Tokens** | `design-taste-frontend`<br>`brandkit`<br>`stitch-design-taste` | Brand identity, typography scales (DIN 1450, Inter), DTCG design tokens, geometric logo construction, spacious layout grids. *No business logic.* | CSS variables, design token documentation, SVG vector assets. |
| **04** | **Framework & Code Engineering** | `nextjs-app-router-expert` | Implementation of React Server Components (RSC), Client Components (`'use client'`), Web Audio synthesis, session persistence. *Strictly within architectural bounds.* | Production TypeScript code (`apps/web`, `packages/core`), zero lint/type errors. |
| **05** | **Quality Assurance & Testing** | `testing-and-qa` | Test-Driven Development (TDD), unit testing scoring algorithms, mocking browser storage, edge case validation (0, neutral, tie-break). *No production features.* | Passing test suites (`pnpm test`), test coverage report, edge case proof matrix. |
| **06** | **Security & System Hardening** | `security-audit-hardening` | OWASP Top 10 prevention, dependency CVE audits, zero secret disclosure, HTTP security headers (`HSTS`, `CSP`, `X-Frame-Options: DENY`), git push protection. | Clean audit report, zero secrets committed, verified security headers. |
| **07** | **DevOps, CI/CD & Production Release** | `devops-ci-cd-release` | Dual-branch flow (`dev` ➔ `main`), SemVer 2.0.0 release synchronization across all 4 surfaces, Git tagging, GitHub Release, and Vercel production deployment. | 4-surface version sync, Git tag `vX.Y.Z`, GitHub Release, Vercel `READY` status. |
| **08** | **Observability & Feedback Looping** | `systematic-debugging-observability` | Scientific root cause analysis (reproduce, isolate, fix), Core Web Vitals profiling, Sentry log triaging, feeding lessons learned back to Stage 1. | Incident post-mortem, regression test case, updated SSOT documentation. |

---

## **CHAPTER 3: GOVERNANCE, INTEGRITY & GUARDRAILS (THE "INTEGRITY")**

### **3.1 Anti-Patterns & Prohibited Agent Actions**
1. **The Cowboy Coder Anti-Pattern:** Jumping directly to coding (Stage 4) when the user requests a new feature or structural revision. The agent must pause and verify Stage 1 and Stage 2 criteria first.
2. **The "Silent Done" Fallacy:** Marking a task done without executing build verification (`pnpm --filter web build`) or test verification (`pnpm test`).
3. **The Multi-Disciplinary Leak:** Embedding styling rules inside business logic or introducing cloud dependencies when the platform philosophy dictates $0 database OpEx.
4. **Version Spamming:** Bumping SemVer numbers for routine bug fixes or refactoring. Version bumps occur ONLY when publishing intentional user-facing releases following Chapter 4 of [`AGENTS.md`](file:///d:/watq/AGENTS.md).

---

### **3.2 The Closed Feedback Loop Mechanism**
When a production defect or runtime anomaly is identified in Stage 8:
1. **Reproduce & Isolate:** Write a failing test in Stage 5 proving the defect exists.
2. **Trace Root Cause:** Identify whether the failure stems from flawed discovery (Stage 1), underspecified architecture (Stage 2), or an implementation bug (Stage 4).
3. **Patch & Verify:** Apply the minimal contiguous fix, verify all tests pass, and conduct a security audit (Stage 6).
4. **Update SSOT:** Document the edge case in [`docs/03-srs.md`](file:///d:/watq/docs/03-srs.md) or [`AGENTS.md`](file:///d:/watq/AGENTS.md) so subsequent AI agents never repeat the mistake.

---

## **CHAPTER 4: TOOLING & ENVIRONMENT MAPPING (THE "WHERE")**

### **4.1 Customization Roots & Skill File Paths**
The AI agent discovers skills from two standard customization roots:
- **Global Customizations Root:** `C:\Users\MaFrileartHXVI\.gemini\config\skills\`
- **Workspace Customizations Root:** `d:\watq\.agents\skills\` (project-specific overrides)

```text
C:\Users\MaFrileartHXVI\.gemini\config\skills\
├── product-discovery-research/     ──> Stage 1 Skill (JTBD, Validation)
├── system-architecture-spec/      ──> Stage 2 Skill (ADR, PRD, FSM)
├── design-taste-frontend/         ──> Stage 3 Skill (Visual UI, Anti-Slop)
├── brandkit/                      ──> Stage 3 Skill (Brand Identity)
├── nextjs-app-router-expert/      ──> Stage 4 Skill (Next.js 16, RSC)
├── testing-and-qa/                ──> Stage 5 Skill (Vitest, Playwright)
├── security-audit-hardening/      ──> Stage 6 Skill (OWASP, Security Headers)
├── devops-ci-cd-release/          ──> Stage 7 Skill (CI/CD, SemVer 2.0.0)
└── systematic-debugging-observability/ ──> Stage 8 Skill (RCA, Observability)
```

### **4.2 Enforcement Across Agent Types**
This framework applies universally across:
- **Google Antigravity:** Guided by `antigravity-guide` and skill frontmatter YAML metadata.
- **Claude Code:** Guided by `CLAUDE.md` and repository instructions.
- **Cursor / Copilot:** Guided by `.cursorrules` and `AGENTS.md`.
- **Codex / Devin:** Guided by `AGENTS.md` and root architectural directives.
