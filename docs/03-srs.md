# **WATQ: SOFTWARE REQUIREMENTS SPECIFICATION (SRS)**

> **Document ID:** `WATQ-SRS-01` │ **Version:** `1.3.0` │ **Status:** `MVP_LOCKED`  
> **Global Standards:** `IEEE 830` │ `ISO/IEC/IEEE 29148:2018 (Requirements Engineering)` │ `ISO/IEC 25010:2023 (Systems & Software Quality)` │ `W3C HTML5 & Web Storage API` │ `W3C Web Vitals` │ `RFC 9562 (UUID v4)` │ `ISO 8601:2019 (Timestamping)` │ `WCAG 2.2 Level AA/AAA` │ `Fitts's Law (1954)` │ `Hick-Hyman Law (1952)` │ `Robert Bringhurst's Law of Typographic Measure`  
> **Single Source of Truth (SSOT):** 3-Screen Routing Architecture, Finite State Machine (FSM), Client Session State Contract (`localStorage`), 6 Critical Edge Cases Mitigation, Psychomotor Micro-Timing, and Non-Functional Performance Budgets  
> **Code Link:** [`src/app/page.tsx`](file:///d:/watq/src/app/page.tsx), [`src/app/assess/page.tsx`](file:///d:/watq/src/app/), [`src/app/result/page.tsx`](file:///d:/watq/src/app/), [`src/lib/storage/session.ts`](file:///d:/watq/src/lib/) │ **Related Documents:** [`01-brand.md`](file:///d:/watq/docs/01-brand.md), [`02-prd.md`](file:///d:/watq/docs/02-prd.md), [`04-design-system.md`](file:///d:/watq/docs/04-design-system.md)

---

# **1. SYSTEM FOUNDATION & ARCHITECTURE (THE "WHY")**

## **1.1 Client-Driven Zero-Backend Architecture ($0 OpEx)**
Watq MVP v1.0 is engineered with a pure client-side web architecture using Next.js App Router. The entire computation pipeline, state processing, and data persistence execute inside the user's browser runtime:
* **Zero Server Infrastructure:** No external database dependencies, API servers, authentication backends, or third-party cookies ($0 monthly server operating expenses).
* **High Availability & Instant Latency:** Delivers $99.99\%$ operational availability and near-$0\text{ms}$ computational scoring latency.
* **Complete User Data Sovereignty:** Assessment responses never leave the respondent's device. No telemetry tracking or third-party behavioral profiling.

## **1.2 Definitive Technology Stack Matrix**
The MVP technical stack is strictly audited to eliminate runtime bloat, external network calls, and third-party vendor lock-in:

| Architecture Layer | Technology & Version | Engineering Rationale & Governance |
| :--- | :--- | :--- |
| **Web Framework** | **Next.js 15 (App Router)** | Strict route segmentation, static rendering optimization, zero routing latency. |
| **Core UI Library** | **React 19** | Concurrent rendering primitives, efficient DOM reconciliation, zero layout shifts. |
| **Programming Language** | **TypeScript 5.x** | Strict static type checking (`strict: true`), zero `any`, deterministic state schemas. |
| **Styling & Tokens** | **Vanilla CSS + Tailwind CSS v3** | CSS Variables (`globals.css`), CSS `@layer`, zero runtime CSS-in-JS overhead. |
| **Client State & Storage** | **React useReducer + Web Storage API** | Deterministic state machine + synchronous `localStorage` (`watq_mvp_session_v1`). |
| **Typography System** | **Inter (Variable) + JetBrains Mono** | Next Font optimization (`next/font/google`), OpenType features (`cv02-cv04`, `tnum`). |
| **Vector Iconography** | **Native Inline SVG Components** | Custom SVG vectors (`WatqLogo.tsx`), zero external icon font/package bundle bloat. |
| **Session Identification** | **Web Crypto API (`crypto.randomUUID`)** | Cryptographically secure UUID v4 generation conforming to RFC 9562. |
| **Hosting & Deployment** | **Vercel Edge Network / Static Export** | Static export capable (`output: 'export'`), global CDN caching, $0 operating expenses. |

## **1.3 Definitive 3-Screen Sitemap & Step-by-Step User Flow**
Application navigation is strictly constrained to 3 isolated screens without sub-routes or unmanaged redirects:

### **A. Isolated Sitemap Hierarchy:**
```
[ROOT: watq.mafrilearth.com / localhost:3000]
│
├── Screen 1: Landing & Orientation (/)
│   └── Brand Header, Value Proposition, Assessment Info (24 Items ~3 Min), & Action Button
│
├── Screen 2: Focused Assessment Runner (/assess)
│   └── 680px Focus Mode, Progress Bar, Question Runner (1 to 24), & Keyboard Shortcuts
│
└── Screen 3: Diagnostic Synthesis & Vocational Report (/result)
    └── Archetype Hero, 4 Polarity Bars, Recommended Majors & Careers, & Reset Button
```

### **B. Step-by-Step User Journey Flow:**
```
  [USER ARRIVES AT ROOT: /]
             │
             ▼
  ┌────────────────────────────────────────────────────────┐
  │ Screen 1: Landing & Orientation (/)                    │
  │ • Inspects Value Proposition & Test Overview           │
  │ • System inspects localStorage for active session:      │
  │   - If clean: CTA = "Start Assessment"                 │
  │   - If in-progress: CTA = "Resume Assessment (Q X/24)" │
  └──────────────────────────┬─────────────────────────────┘
                             │
            Click Primary CTA│ (Generates RFC 9562 UUID v4 if new)
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ Screen 2: Focused 680px Runner (/assess)               │
  │ • Question currentIndex (1 to 24) displayed            │
  │ • Respondent selects option (1 to 5 via Tap / Keyboard)│
  │ • Selection state highlights immediately (<50ms)       │
  │ • Synchronous write to localStorage                    │
  │ • 180ms Psychomotor Delay (100ms visual + 80ms buffer) │
  │                                                        │
  │   [Is currentIndex < 23?]                              │
  │   ├── YES ──> Advance to currentIndex + 1              │
  │   └── NO  ──> Trigger Deterministic Scoring Engine     │
  └──────────────────────────┬─────────────────────────────┘
                             │
       Scoring Completed (<5ms)
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │ Screen 3: Diagnostic Synthesis Report (/result)        │
  │ • Archetype Hero Displayed (e.g., INTJ - The Architect)│
  │ • 4 Polarity Percentage Bars Animate (E/I, S/N, T/F, J/P)│
  │ • UNESCO ISCED-F 2013 College Majors Recommended       │
  │ • ILO ISCO-08 Aligned Career Trajectories Recommended   │
  │ • Action: "Copy Summary" (Clipboard) or "Retake" (Reset)│
  └────────────────────────────────────────────────────────┘
```

## **1.4 Three Laws of User Interaction Flow**
1. **Zero-Onboarding Friction:** Respondents are never required to register accounts, verify emails, input phone numbers, or solve CAPTCHAs. Assessment starts in a single click.
2. **Cognitive Tunneling (Distraction-Free Focus Mode):** The runner interface completely eliminates external links, global navbars, and promotional footers during questionnaire execution to prevent cognitive distraction.
3. **Deterministic Continuity:** Response data is never lost upon browser reload, accidental tab closure, or network disconnection due to immediate synchronous `localStorage` persistence.

---

# **2. FUNCTIONAL REQUIREMENTS (THE "WHAT & HOW")**

## **2.1 Screen 1: Landing & Orientation (`/`)**
* **FR-1.1 Master Brand Header:** Displays the official Watq horizontal lockup (*The Psychometric Prism* + Logotype, optical axis $Y=80\text{px}$) and official tagline *Personality Decoded*.
* **FR-1.2 Value Proposition Summary:** Explains that the assessment deconstructs 16 Cognitive Types via 24 fast Likert-5 items (~3 minutes) to guide academic major selection and career trajectories.
* **FR-1.3 Single-Click Session Initialization:**
  * Primary CTA button `"Start Assessment"` generates a cryptographic `sessionId` (RFC 9562 UUID v4 via `crypto.randomUUID()`), initializes state in `localStorage`, and triggers instant client navigation to `/assess`.
  * **Dynamic Session Resumption:** If an uncompleted session exists in `localStorage`, the CTA dynamically adapts to `"Resume Assessment (Question X of 24)"` alongside a secondary text button `"Start Over"`.

## **2.2 Screen 2: Focused Assessment Runner (`/assess`)**
* **FR-2.1 Distraction-Free 680px Container (Bringhurst's Law):** Global headers and navigation are hidden to maintain full respondent focus (*cognitive tunneling*). Container width is mathematically derived from Robert Bringhurst's Law ($65\text{ CPL} \times 9.6\text{px} + 56\text{px} = 680\text{px}$) to minimize ocular scanning fatigue.
* **FR-2.2 Linear Progress Indicator:**
  * Top progress bar with real-time completion formula:
    $$P = \left( \frac{\text{currentIndex} + 1}{24} \right) \times 100\% \quad (\text{Bounded strictly in } [4.17\%, 100.00\%])$$
  * Metric counter: `"Question {currentIndex + 1} of 24"`.
* **FR-2.3 5-Point Likert Scale Selection (Hick-Hyman & Miller's Laws):**
  * 5 options arranged responsively with clear labels: *Strongly Disagree (1)*, *Disagree (2)*, *Neutral (3)*, *Agree (4)*, *Strongly Agree (5)*.
  * Bounded choice set conforms to Hick-Hyman Law ($RT = b \log_2(6) \approx 2.58b$) and Miller's Law ($7 \pm 2$ chunks), keeping cognitive friction to a minimum.
  * All interactive tiles maintain minimum touch height of $W \ge 48\text{px}$ (Fitts's Law).
  * Instant visual selection feedback ($<50\text{ms}$).
  * **Psychomotor Auto-Advance Timing:** Exactly $180\text{ms}$ delay post-selection before automatically transitioning to the next item:
    * $100\text{ms}$: Human optical confirmation of selection state highlight.
    * $80\text{ms}$: Micro-anticipation buffer preventing cognitive disorientation.
* **FR-2.4 Desktop Keyboard Shortcuts:**
  * Pressing physical numeric keys `1`, `2`, `3`, `4`, or `5` selects the corresponding option and triggers auto-advance.
  * Pressing `Backspace` or `ArrowLeft` navigates to the previous question (*Undo Navigation*).
  * Pressing `Escape` triggers a confirmation prompt to return to the landing page.
* **FR-2.5 Previous Item Navigation:**
  * `"Back"` button always available at the bottom-left of the container (disabled on item 1), allowing respondents to revise earlier answers without resetting session progress.
* **FR-2.6 Automatic Scoring on Final Item:**
  * Upon answering the 24th item, the system executes deterministic scoring calculations (`WATQ-PRD-01`), stores results in `localStorage`, sets `completedAt`, and navigates to `/result`.

## **2.3 Screen 3: Diagnostic Report & Recommendations (`/result`)**
* **FR-3.1 Route Protection (Redirect Guard):** Navigating directly to `/result` without valid completed assessment data in `localStorage` safely performs an immediate client redirect to `/`.
* **FR-3.2 Primary Archetype Hero:** Renders 4-letter type code (e.g., `INTJ`), official archetype title (*The Strategic Architect*), and executive personality summary.
* **FR-3.3 4 Cognitive Polarity Axis Bars:**
  * 4 horizontal visualization bars displaying exact percentage balances:
    1. **E vs I:** Extraversion vs Introversion.
    2. **S vs N:** Sensing vs Intuition.
    3. **T vs F:** Thinking vs Feeling.
    4. **J vs P:** Judging vs Perceiving.
* **FR-3.4 Vocational Guidance Matrix:**
  * List of relevant College Majors (UNESCO ISCED-F 2013 aligned interactive badges).
  * Aligned Professional Career Trajectories (ILO ISCO-08 aligned career pathways).
* **FR-3.5 Action Bar:**
  * `"Copy Summary"`: Copies formatted text summary to clipboard with 120ms visual tooltip confirmation.
  * `"Retake Assessment"`: Displays confirmation modal, clears existing session from `localStorage`, and restarts at item 1.

---

# **3. FINITE STATE MACHINE, INTEGRITY & EDGE CASES (THE "GUARDRAILS")**

## **3.1 Finite State Machine (FSM) Transition Diagram**

```
 [IDLE] 
   │
   ▼ (Click "Start Assessment")
 [INITIALIZING] ──> Generate UUID v4, set currentIndex = 0, write to localStorage
   │
   ▼
 [IN_PROGRESS] ◄──┐ (Display Question [currentIndex])
   │              │
   ├── (Select 1-5 / Press numeric key)
   │        │
   │        ▼
   │  [RECORDING_RESPONSE] ──> Save response to localStorage
   │        │
   │        ├── (currentIndex < 23) ──> 180ms delay ──> currentIndex++ ──┘
   │        │
   │        └── (currentIndex == 23) ──> [EVALUATING_SCORING]
   │                                            │
   │                                            ▼
   │                                  [SCORING_FINALIZED] ──> Set completedAt
   │                                            │
   │                                            ▼
   └─────────────────────────────────> [NAVIGATE_TO_RESULT]
```

## **3.2 Client Local Storage Data Contract (`watq_mvp_session_v1`)**
* **Storage Key:** `watq_mvp_session_v1`
* **JSON Schema Definition (RFC 9562 & ISO 8601):**
  ```json
  {
    "sessionId": "4f9d8a31-7e2b-4c0a-9d62-1a2b3c4d5e6f",
    "instrumentId": "jungian-16",
    "startedAt": "2026-10-21T06:20:00.000Z",
    "updatedAt": "2026-10-21T06:22:30.000Z",
    "completedAt": "2026-10-21T06:23:15.000Z",
    "currentIndex": 23,
    "responses": {
      "EI-01": 5, "EI-02": 4, "EI-03": 4, "EI-04": 2, "EI-05": 1, "EI-06": 2,
      "SN-01": 4, "SN-02": 5, "SN-03": 4, "SN-04": 2, "SN-05": 2, "SN-06": 1,
      "TF-01": 5, "TF-02": 5, "TF-03": 4, "TF-04": 2, "TF-05": 1, "TF-06": 2,
      "JP-01": 5, "JP-02": 4, "JP-03": 5, "JP-04": 2, "JP-05": 1, "JP-06": 2
    },
    "result": {
      "typeCode": "INTJ",
      "archetypeTitle": "The Strategic Architect",
      "scores": {
        "E": 25, "I": 75,
        "S": 29, "N": 71,
        "T": 83, "F": 17,
        "J": 79, "P": 21
      },
      "summary": "Systemic strategic thinker, independent analytical visionary.",
      "majors": ["Computer Science", "Informatics", "Applied Mathematics", "Electrical Engineering"],
      "careers": ["Software Architect", "Data Scientist", "Systems Analyst", "R&D Specialist"]
    }
  }
  ```

## **3.3 Resolution of 6 Critical System Edge Cases**

| Edge Case Scenario | System Detection & Resolution Mechanism | ISO/IEC 25010 Dimension |
| :--- | :--- | :--- |
| **1. Browser Reload Mid-Session** | Component reads `currentIndex` and `responses` from `localStorage` on mount. Respondent resumes immediately at the exact unanswered question. | Reliability (Fault Tolerance) |
| **2. Direct Access to `/result`** | Route guard inspects `result` object. If `null`, router issues an immediate client-side `router.replace('/')` to preserve clean navigation history. | Security & Integrity |
| **3. Private Browsing / Storage Quota Error** | Storage access is wrapped in a fail-safe `try/catch` block. On quota or security exception, system seamlessly falls back to *In-Memory React State*. | Usability & Availability |
| **4. Rapid Multi-Tapping / Double-Click** | Input buttons lock during the 180ms transition window via `isSubmitting: boolean` state guard, completely preventing accidental question skipping. | Usability & Data Integrity |
| **5. Small Mobile Viewport (<380px)** | Container applies `w-full max-w-[680px] px-4` with touch target heights $\ge 48\text{px}$ (conforming to Fitts's Law and WCAG 2.5.8). | Accessibility & Ergonomics |
| **6. Complete Network Disconnection** | The entire assessment runtime is client-bundled. An active browser session operates $100\%$ offline without failure, displaying an *"Offline Mode Active — Data Saved Locally"* indicator. | Availability & Autonomy |

---

# **4. CODE IMPLEMENTATION MAPPING (THE "WHERE")**

## **4.1 Source Code Route & Module Mapping (`src/`)**
* **Landing Page (`/`):** [`src/app/page.tsx`](file:///d:/watq/src/app/page.tsx)
* **Assessment Runner (`/assess`):** [`src/app/assess/page.tsx`](file:///d:/watq/src/app/)
* **Diagnostic Report (`/result`):** [`src/app/result/page.tsx`](file:///d:/watq/src/app/)
* **Session Storage Adapter:** [`src/lib/storage/session.ts`](file:///d:/watq/src/lib/)
* **Deterministic Scoring Calculator:** [`src/lib/scoring/jungian.ts`](file:///d:/watq/src/lib/)
* **Brand Lockup Component:** [`src/components/brand/WatqLogo.tsx`](file:///d:/watq/src/components/brand/WatqLogo.tsx)

## **4.2 Non-Functional Performance Budgets (ISO/IEC 25010 & W3C Web Vitals)**
* **First Contentful Paint (FCP):** $\le 0.8\text{ seconds}$ on standard 4G mobile connections.
* **Largest Contentful Paint (LCP):** $\le 1.2\text{ seconds}$ (optimal Google Core Web Vitals rating).
* **Cumulative Layout Shift (CLS):** Exactly $0.00$ (Container enforces fixed min-height avoiding content jumps).
* **Interaction to Next Paint (INP):** $< 50\text{ms}$ on all button taps and keyboard selections.
* **Scoring Calculation Duration:** $< 5\text{ms}$ (pure linear CPU cycle across 24 integer inputs).
* **Client JavaScript Bundle:** $\le 85\text{ KB}$ gzipped.
* **Accessibility (WCAG 2.2 Level AA / AAA):** High contrast ratio $\ge 7:1$, full keyboard navigation support (`Tab`, `Space`, `1`–`5`, `Backspace`).

## **4.3 Verification & Quality Checklist**
- [x] Strict 3-screen sitemap enforced without secondary or unmanaged routes.
- [x] Client session schema typed with TypeScript, supporting clean JSON serialization.
- [x] Fitts's Law 180ms psychomotor auto-advance delay implemented and verified.
- [x] All 6 critical edge cases mapped with automated fail-safes and fallback mechanisms.
- [x] 100% Pure Global English enforced across all functional requirements and technical contracts.
