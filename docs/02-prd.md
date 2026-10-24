# **WATQ: PRODUCT REQUIREMENTS DOCUMENT (PRD)**

> **ID & Version:** `WATQ-PRD-02` │ `v1.2.0` │ `LOCKED`  
> **Authority & Owner:** Fauzul (Platform Lead) │ **Standard:** `APA/ITC 2014` │ `Jung 1921` │ `Likert 1932` │ `ILO ISCO-08`  
> **SSOT Domain:** 16 Cognitive Types Construct, 24 Balanced Likert Items, Scoring Algorithm Math, 16 Archetype Trajectories  
> **Target Code:** [`apps/web/src/data/assessments/jungian16.ts`](file:///d:/watq/apps/web/src/data/assessments/jungian16.ts) │ [`apps/web/src/lib/scoring/jungian.ts`](file:///d:/watq/apps/web/src/lib/scoring/jungian.ts)

---

# **1. PRODUCT FOUNDATION & PRINCIPLES (THE "WHY")**

## **1.1 Product Background & Vision: The Sovereign Personality SaaS Ecosystem**
Watq (*Personality Decoded*) is engineered as a **Universal Personality Platform & SaaS Ecosystem**. The platform operates on the foundational thesis that *a psychometric test is merely an initial diagnostic gateway, while the true domain of the brand is the holistic decoding, navigation, and application of human personality across all facets of life and work*.

Unlike traditional applications narrowly restricted to a single test or proprietary MBTI clones, Watq is architected as an extensible, model-agnostic operating system for human personality. It unifies the fundamental psychological triad (Cognition, Affect, Conation) across Jungian cognitive typology, the Big Five (OCEAN), Enneagram, DISC, Holland RIASEC, VIA Strengths, and international occupational frameworks (ILO ISCO-08 & UNESCO ISCED-F 2013).

### **1.1.1 Fauzul's Brand Architecture & Zero-Acronym Sovereign Rationale**
Fauzul formulated the platform's brand identity under strict software engineering and linguistic governance:
1. **Linguistic Origin (Sundanese Root "Watek"):**  
   Audited against authoritative lexicography (*Danadibrata* & *Balai Bahasa Jabar*), the un-affixed root word **"Watek"** (5 letters: *watak, tabiat batin bawaan lahir*) is the exact equivalent of *Personality & Cognitive Typology*.
2. **Naming Pattern (Vowel Elision & Terminal Stylization):**  
   Adopting the Silicon Valley product naming tradition (*Flickr* from *Flicker*, *Tumblr* from *Tumbler*), the word is compressed into **Watq** (logotype: **WATQ**), pronounced identically as `/wɑtək/`.
3. **The Zero-Acronym Principle (Eliminating Tight-Coupling):**  
   Fauzul explicitly rejected treating Watq as an acronym or backronym. By establishing Watq as a **single, standalone proper noun (Sovereign Wordmark)**, the brand avoids architectural lock-in to any single psychometric model, guaranteeing total modular flexibility to host the 16 Cognitive Types, Big Five (OCEAN 5-factor model), DISC, Enneagram, and Holland RIASEC without contradiction.
4. **Legal & Trademark Supremacy:**  
   Classified under WIPO Nice Classes 9 & 42 as a **Fanciful Mark** (Abercrombie Spectrum), enjoying the highest tier of intellectual property protectability and zero search collision.

### **1.1.2 Fauzul's Product Scope Thesis: Why "Just a Test" is Insufficient (The Beyond-a-Quiz Mandate)**
Fauzul formulated the core thesis on product value, user retention, and real-world utility:
1. **Rejection of the Transient Quiz Commodity Trap:**  
   Conventional personality quizzes suffer from a 99.9% churn rate because they treat testing as an ephemeral parlor game—users spend 3 minutes clicking choices, glance at an arbitrary 4-letter acronym, and permanently close the tab. In software product terms, an assessment runner is strictly a *data acquisition mechanism*, never the valuable outcome itself.
2. **The "So What?" Real-World Utility Barrier:**  
   Receiving an abstract personality label solves zero life problems unless coupled with actionable guidance. Users undertake psychometric evaluations seeking answers to high-stakes decisions: *"Which university major aligns with my cognitive strengths? Which global engineering or vocational careers offer high fulfillment and low burnout? How do I recover when experiencing mental exhaustion?"*
3. **The 4-Tier Cognitive Value Progression:**  
   Watq elevates the assessment runner into an indispensable **Personal Cognitive Operating Manual**:
   - **Level 1 (Data Capture):** High-speed 24-item Likert assessment runner (< 3 minutes, zero-friction client execution).
   - **Level 2 (Diagnostic Profile):** Continuous 4-axis polarity radar ($E \leftrightarrow I, S \leftrightarrow N, T \leftrightarrow F, J \leftrightarrow P$) replacing crude binary pigeonholing.
   - **Level 3 (Mental Resilience):** Lead cognitive function identification, stress overload warning triggers, and psychological recovery antidotes.
   - **Level 4 (Vocational Trajectory):** Concrete, internationally standardized academic majors (**UNESCO ISCED-F 2013**) and global career trajectories (**ILO ISCO-08**).
4. **Engineering Portfolio Caliber:**  
   This multidimensional vocational mapping elevates Watq from an ordinary "quiz tutorial" into a production-grade **Cognitive Decision Support System**, demonstrating advanced software architecture, rigorous ontological mapping, and deterministic client-side scoring coupled with secure enterprise cloud persistence.

## **1.2 The Inverted Pyramid Scientific & Software Taxonomy**
Watq maps its product domain to the established inverted pyramid taxonomy of behavioral science and software engineering:

```
▼ [LEVEL 1: SCIENTIFIC DISCIPLINE] ───────────────── (Apex Knowledge Domain)
      Behavioral & Cognitive Science
      │
      ▼ [LEVEL 2: DISCIPLINE BRANCH] ──────────────── (Specific Field of Study)
            Personality & Differential Psychology
            │
            ▼ [LEVEL 3: METHODOLOGICAL STANDARD] ─── (How Data is Measured)
                  Psychometrics & Standardized Assessment (APA / ITC Standard)
                  │
                  ▼ [LEVEL 4: SOVEREIGN SOFTWARE PLATFORM] ── (Operating System & Gateway)
                        Watq — Personality Decoded.
                        │
                        ▼ [LEVEL 5: MODULAR PSYCHOMETRIC CATALOG] (Pluggable Engine Drivers)
                              ├─ Catalog Driver 01: 16 Cognitive Types (Carl Jung 1921 / Cognitive Wiring)
                              ├─ Catalog Driver 02: Big Five Factor Model (Goldberg 1992 / Empirical Traits)
                              ├─ Catalog Driver 03: Enneagram of Personality (9 Types / Core Motivations)
                              ├─ Catalog Driver 04: DISC Workplace Behavioral Assessment (Marston 1928 / Team Dynamics)
                              └─ Catalog Driver 05: Holland Codes RIASEC Model (Holland 1997 / Vocational Pathways)
                              │
                              ▼ [LEVEL 6: DIAGNOSTIC & VOCATIONAL DELIVERABLES] (Synthesized Output)
                                    Cognitive Polarity Radar, Stress Antidotes,
                                    UNESCO ISCED-F 2013 Academic Majors & ILO ISCO-08 Careers
```

## **1.3 Two Immutable System Roles (Strict Non-Alterable RBAC)**
Watq is engineered with a strict, immutable 2-role system boundary:
1. **Actor 1: The Member (`MEMBER` — Registered Platform User):**
   - Accesses the high-speed diagnostic runner (`/assess`).
   - Receives their personal **Cognitive Operating Manual** (`/result`): polarity balance, strengths, stress recovery antidotes, interpersonal communication advice, and academic/career alignments (UNESCO ISCED-F 2013 / ILO ISCO-08).
   - Manages personal profile and synchronized assessment records securely in cloud storage (`/dashboard` or `apps/app`).
   - **Immutable Boundary:** Strictly restricted from administrative oversight. Roles are fixed upon registration and cannot be altered via UI.
2. **Actor 2: The System Administrator (`ADMIN` — Fauzul / Platform Lead):**
   - Dedicated sovereign platform authority held exclusively by **Fauzul**.
   - Accesses the dedicated **Administration Studio** (`apps/app/admin` or `/admin`).
   - Global Directory Governance: Audits active platform members and monitors completion health telemetry.
   - Account Moderation: Safely deactivates or removes malicious/spam accounts.
   - **Immutable Boundary:** Zero dynamic role alteration or promotion/demotion (`MEMBER` ↔ `ADMIN`) in UI. Eliminates privilege escalation vulnerabilities and administrative misconfigurations.

## **1.4 Phase 1 Implementation Scope (MVP Focus: 1 Active Assessment Model)**
To guarantee high execution velocity, zero latency, and an uncompromising, clean enterprise user experience:
1. **Sole Active Assessment Gateway:** 16 Cognitive Types public-domain instrument (Carl Gustav Jung 1921), measuring 4 cognitive polarity axes with balanced positive and reversed keying. Direct modern enterprise evolution of Fauzul's foundational `df-mbti` architecture.
2. **Dynamic Question Service:** Assessment runner loads items dynamically from Neon PostgreSQL via Next.js Server Actions (`getPublicAssessmentQuestionsAction`).
3. **Enterprise Cloud Persistence & Cryptographic Security:**
   - User credentials protected with salted `scrypt` hashing (16-byte random salt + `timingSafeEqual`).
   - User sessions and completed assessment dossiers persistently stored in Neon Serverless PostgreSQL.
   - Deterministic client-side scoring computation (< 5ms calculation latency).
4. **Monorepo Domain Separation:**
   - **Public Gateway (`apps/web`):** Executive Landing (`/`), Focused Assessment Runner (`/assess`), Executive Diagnostic Dossier (`/result`), and Authentication Gateways (`/login` & `/register`).
   - **Private Workspace (`apps/app`):** Member Workspace (`/`) and Administration Studio (`/admin`).

## **1.5 The 7 Core Enterprise SaaS Modules & Granular Functional Features**
The platform architecture is strictly partitioned into 7 modular domains with official global enterprise naming:

### **Module 1: `Authentication` (Pintu Masuk & Identitas Akun)**
* **`User Registration`**: Self-service onboarding for new members with encrypted credentials.
* **`User Login`**: Secure authentication gateway restoring access to personal assessment records.
* **`Guest Assessment Access`**: Frictionless evaluation without mandatory upfront account creation.
* **`Secure Logout`**: Instant session invalidation preventing unauthorized access on shared devices.
* **`Friendly Input Alert`**: Human-centered inline validation guidance for syntax and credential errors.

### **Module 2: `Assessment Runner` (Ruang Pengerjaan Tes)**
* **`Distraction-Free Test Screen`**: Isolated single-item focus presentation stripped of extraneous navigation chrome.
* **`Auto-Next Question Progression`**: Fluid, immediate transition to the next prompt upon response selection.
* **`Keyboard Shortcuts Interaction`**: Desktop ergonomics enabling rapid completion via physical number keys (`1-5`).
* **`Auto-Save Answer Resilience`**: Immediate local-first state capture preventing data loss during network disruptions.
* **`Progress & Completion Indicator`**: Clear linear progress visualization eliminating user pacing uncertainty.
* **`Safe Exit Warning`**: Gentle exit confirmation safeguarding partially completed diagnostic sessions.

### **Module 3: `Diagnostic Report` (Buku Panduan Karakter Diri)**
* **`Personality Profile Summary`**: Executive title and synthesized cognitive archetype overview.
* **`Mindset & Energy Balance Visual`**: Balanced polarity gauges visualizing Energy, Information, Decisions, and Lifestyle.
* **`Natural Strengths Breakdown`**: In-depth analysis of innate behavioral and cognitive advantages.
* **`Stress Triggers Warning`**: Proactive identification of mental exhaustion triggers.
* **`Mental Recharge Antidotes`**: Actionable psychological restoration guidance.
* **`Teamwork & Communication Advice`**: Practical collaboration protocols for interpersonal friction reduction.

### **Module 4: `Career Guidance` (Panduan Jurusan & Karier Masa Depan)**
* **`Academic Major Match List`**: Curated university disciplines matched to the member's cognitive wiring.
* **`Career Path Matching`**: High-fulfillment, low-burnout occupational trajectories mapped to real-world industries.
* **`Instant Career Search Box`**: Real-time interactive filter testing cognitive compatibility against aspirational roles.
* **`Work Environment Fit Description`**: Concrete description of operational workplace conditions required for peak productivity.

### **Module 5: `Document Export` (Pusat Dokumen Resmi)**
* **`PDF Report Download`**: One-click generation of a publication-grade A4 dossier ready for HR, recruitment, or academic submission.
* **`Unbranded Clean Layout`**: Watermark-free, authoritative styling suitable for formal corporate and institutional evaluation.
* **`Official Verification Link`**: Tamper-evident permanent URL verifying report provenance and authenticity.

### **Module 6: `Member Portal` (Ruang Riwayat Pribadi — Khusus `MEMBER`)**
* **`Test History Archive`**: Chronological log of historical assessment completions.
* **`Past Report Opener`**: Instant access to previous diagnostic reports without requiring re-assessment.
* **`Basic Profile Settings`**: Self-service management for display name and credential updates.

### **Module 7: `Admin Studio` (Pusat Kendali Pengelola — Khusus `ADMIN` / Fauzul)**
* **`Global Member Master Table`**: Centralized, real-time registry of all registered platform members.
* **`Live Keyword Member Search`**: Instant zero-reload filtering across member names and emails.
* **`Completion Status Audit Tag`**: Clear visual indicators auditing member assessment completion.
* **`Aggregate Personality Pie Chart`**: Macroscopic distribution analytics summarizing platform-wide cognitive typology.
* **`Account Safety & Moderation`**: Defensible session revocation and account suspension for abusive/spam entries, strictly maintaining immutable role boundaries.

## **1.6 Architectural Scope Governance & Out-of-Scope Rationales**
To ensure an ultra-lean enterprise SaaS MVP and prevent scope creep, alternative features are explicitly governed:
* ❌ **Subscription Billing & Paywalls (Eliminated):** Upfront monetization barriers severely depress early product adoption. MVP prioritizes unencumbered value validation.
* ❌ **Multi-Tenant Corporate Workspaces (Deferred):** Complex B2B organization trees, seat allocation, and department tagging add unnecessary overhead prior to individual user-market validation.
* ❌ **Live Colleague/Team Matrix Comparison (Deferred):** Requires simultaneous cohort completion within a single group; optimal for Phase 2 expansion.
* ❌ **Dynamic Question Editor / CRUD in Admin (Permanently Rejected):** Psychometric instruments are scientifically calibrated mathematical scales. Ad-hoc admin editing invalidates construct reliability.
* ❌ **AI Chatbot / Unstructured Conversational Agents (Eliminated):** Introduces token cost overhead, latency, and non-deterministic psychological hallucinations. Structured executive reports deliver superior enterprise authority.
* ❌ **Dynamic Role Editing in UI (Permanently Rejected):** Eliminates privilege escalation attack surfaces; roles remain strictly fixed as `ADMIN` and `MEMBER`.

---

# **2. CORE TECHNICAL SPECIFICATIONS (THE "WHAT & HOW")**

## **2.1 4 Cognitive Dimensions & 5-Point Likert Scale**
Watq MVP measures 4 mental polarity preference axes:
1. **Energy Orientation:** Extraversion (**E**) vs Introversion (**I**)
2. **Information Perception:** Sensing (**S**) vs Intuition (**N**)
3. **Decision Making:** Thinking (**T**) vs Feeling (**F**)
4. **Lifestyle Orientation:** Judging (**J**) vs Perceiving (**P**)

Each dimension is measured by **6 questionnaire items** (total $4 \times 6 = 24$ items).  
Respondents evaluate each item using a standard 5-point Likert scale:
* `1` = Strongly Disagree
* `2` = Disagree
* `3` = Neutral
* `4` = Agree
* `5` = Strongly Agree

## **2.2 Official Question Item Catalog (24 Items — Global English Standard)**

### **Dimension 1: Extraversion (E) vs Introversion (I)**
| No | ID | Axis | Keying | Psychometric Item Prompt (Global English Standard) | Cognitive Measurement Target |
| :---: | :---: | :---: | :---: | :--- | :--- |
| 1 | `EI-01` | E (+) | Positive | I feel energized and stimulated when engaging in vibrant social interactions. | Sociable energy recharge; external environmental activation. |
| 2 | `EI-02` | E (+) | Positive | I tend to express my thoughts spontaneously during group discussions. | Spontaneous external verbalization; real-time conversational processing. |
| 3 | `EI-03` | E (+) | Positive | I enjoy being the center of attention in various social settings. | Social prominence comfort; communal visibility preference. |
| 4 | `EI-04` | I (-) | Reversed | After intense socializing, I require solitary time to recharge my mental energy. | Introverted energy depletion; quiet solitary restoration requirement. |
| 5 | `EI-05` | I (-) | Reversed | I prefer a small, intimate circle of close friends over a broad, casual network. | Depth of interpersonal intimacy over superficial breadth. |
| 6 | `EI-06` | I (-) | Reversed | I process ideas and feelings internally in silence before sharing them with others. | Internal reflective deliberation prior to outward verbal expression. |

### **Dimension 2: Sensing (S) vs Intuition (N)**
| No | ID | Axis | Keying | Psychometric Item Prompt (Global English Standard) | Cognitive Measurement Target |
| :---: | :---: | :---: | :---: | :--- | :--- |
| 7 | `SN-01` | S (+) | Positive | I prefer practical, factual instructions with clear step-by-step procedures. | Concrete operational clarity; sequential procedure adherence. |
| 8 | `SN-02` | S (+) | Positive | I focus on current reality and tangible facts rather than speculative future possibilities. | Empirical present grounding; tangible factual orientation. |
| 9 | `SN-03` | S (+) | Positive | I trust firsthand empirical evidence over theoretical hunches. | Observational verification over theoretical presuppositions. |
| 10 | `SN-04` | N (-) | Reversed | I frequently become absorbed in abstract ideas, philosophical concepts, and future visions. | Abstract conceptual absorption; long-range theoretical forecasting. |
| 11 | `SN-05` | N (-) | Reversed | I am intrigued by hidden meanings and patterns rather than surface details. | Latent pattern recognition; systemic conceptual synthesis. |
| 12 | `SN-06` | N (-) | Reversed | I enjoy envisioning novel, untried solutions rather than relying on established conventions. | Divergent innovation; unconventional problem-solving appetite. |

### **Dimension 3: Thinking (T) vs Feeling (F)**
| No | ID | Axis | Keying | Psychometric Item Prompt (Global English Standard) | Cognitive Measurement Target |
| :---: | :---: | :---: | :---: | :--- | :--- |
| 13 | `TF-01` | T (+) | Positive | When making critical decisions, I prioritize objective logical analysis over emotional sentiments. | Objective deductive logic over interpersonal sentiment. |
| 14 | `TF-02` | T (+) | Positive | For me, upholding consistent truth and justice is more important than maintaining temporary harmony. | Principled adherence to impartial truth over artificial consensus. |
| 15 | `TF-03` | T (+) | Positive | I can evaluate arguments critically and dispassionately without being swayed by personal sympathies. | Detached analytical scrutiny; dispassionate argument critique. |
| 16 | `TF-04` | F (-) | Reversed | I am deeply attuned to how others feel and actively strive to cultivate interpersonal empathy. | Affective empathy sensitivity; communal harmony cultivation. |
| 17 | `TF-05` | F (-) | Reversed | Human values, personal welfare, and compassionate impact serve as my primary guiding compass. | Humanistic ethical alignment; compassionate welfare prioritization. |
| 18 | `TF-06` | F (-) | Reversed | I feel uncomfortable and burdened if my decision risks hurting someone's personal feelings. | Relational distress avoidance; preservation of individual dignity. |

### **Dimension 4: Judging (J) vs Perceiving (P)**
| No | ID | Axis | Keying | Psychometric Item Prompt (Global English Standard) | Cognitive Measurement Target |
| :---: | :---: | :---: | :---: | :--- | :--- |
| 19 | `JP-01` | J (+) | Positive | I feel most comfortable when my schedule is well-structured with clearly planned milestones. | Methodical temporal structuring; organized milestone planning. |
| 20 | `JP-02` | J (+) | Positive | I prefer completing obligations well ahead of deadlines rather than working under last-minute pressure. | Anticipatory task completion; proactive deadline management. |
| 21 | `JP-03` | J (+) | Positive | I experience peace of mind once a closure is reached and decisions are finalized. | Cognitive closure drive; decisive stabilization satisfaction. |
| 22 | `JP-04` | P (-) | Reversed | I prefer keeping schedules flexible and spontaneous, allowing plans to evolve naturally. | Temporal spontaneity preference; fluid opportunistic scheduling. |
| 23 | `JP-05` | P (-) | Reversed | I often postpone final closure to keep exploring alternative options and emergent data. | Open-ended information exploration; deferred decisive closure. |
| 24 | `JP-06` | P (-) | Reversed | I thrive on bursts of adaptive energy when navigating emergent challenges without rigid blueprints. | Adaptive situational improvisation; dynamic high-pressure resilience. |

## **2.3 Deterministic Scoring Algorithm & Mathematical Proof**
1. **Item Normalization Formula ($X \in \{1, 2, 3, 4, 5\}$):**
   * Positive Keying (`is_reversed: false`): $S_{\text{item}} = X$
   * Reversed Keying (`is_reversed: true`): $S_{\text{item}} = 6 - X$
2. **Dimension Score Accumulation ($S_{\text{dim}}$):**
   $$S_{\text{dim}} = \sum_{i=1}^6 S_{\text{item}, i}$$
   * Theoretical Minimum: $6 \times 1 = 6$ (Absolute Secondary Pole).
   * Neutral Median: $6 \times 3 = 18$ (Exact 50/50 Equidistant Midpoint).
   * Theoretical Maximum: $6 \times 5 = 30$ (Absolute Primary Pole).
   * Total Range ($\Delta S$): $30 - 6 = 24$.
3. **Linear Polarity Percentage Mapping:**
   $$\text{Score}_{\text{primary}}\% = \left( \frac{S_{\text{dim}} - 6}{24} \right) \times 100\%$$
   $$\text{Score}_{\text{secondary}}\% = 100\% - \text{Score}_{\text{primary}}\%$$
4. **Deterministic Tie-Breaking ($\ge 50\%$ Threshold Rule):**
   * $\text{Score}_E\% \ge 50\% \implies \mathbf{E}$, otherwise $\mathbf{I}$.
   * $\text{Score}_S\% \ge 50\% \implies \mathbf{S}$, otherwise $\mathbf{N}$.
   * $\text{Score}_T\% \ge 50\% \implies \mathbf{T}$, otherwise $\mathbf{F}$.
   * $\text{Score}_J\% \ge 50\% \implies \mathbf{J}$, otherwise $\mathbf{P}$.

* **Boundary Condition Proof Table:**

| Cumulative Dimension Score ($S_{\text{dim}}$) | Primary Pole % | Secondary Pole % | Assigned Type Letter | State Description |
| :---: | :---: | :---: | :---: | :--- |
| **$S_{\text{dim}} = 6$** | $0.0\%$ | $100.0\%$ | Secondary (I, N, F, P) | Absolute secondary polarity saturation. |
| **$S_{\text{dim}} = 12$** | $25.0\%$ | $75.0\%$ | Secondary (I, N, F, P) | Moderate secondary leaning. |
| **$S_{\text{dim}} = 18$** | $50.0\%$ | $50.0\%$ | Primary (E, S, T, J) | **Equidistant Median:** Deterministically breaks to primary pole. |
| **$S_{\text{dim}} = 24$** | $75.0\%$ | $25.0\%$ | Primary (E, S, T, J) | Moderate primary leaning. |
| **$S_{\text{dim}} = 30$** | $100.0\%$ | $0.0\%$ | Primary (E, S, T, J) | Absolute primary polarity saturation. |

## **2.4 Definitive 16 Archetype Matrix, College Majors & Career Trajectories**
All recommendations are strictly mapped against international standards: **UNESCO ISCED-F 2013** (Fields of Education) and **ILO ISCO-08** (International Standard Classification of Occupations):

| Type | Archetype Title | Cognitive Focus | Recommended College Majors (UNESCO ISCED-F 2013) | Aligned Career Trajectories (ILO ISCO-08) |
| :---: | :--- | :--- | :--- | :--- |
| **INTJ** | *The Strategic Architect* | Systemic strategic thinker, independent analytical visionary. | Computer Science (0613), Informatics, Applied Mathematics (0541), Electrical Engineering (0714). | Software Architect (2511), Data Scientist (2521), Systems Analyst (2511), R&D Specialist. |
| **INTP** | *The Conceptual Logician* | First-principles thinker, theoretical innovator, seeker of abstract precision. | Computer Science (0613), Theoretical Physics (0533), Software Engineering, Philosophy (0223). | Algorithm Engineer (2512), AI Researcher (2519), Security Researcher, Backend Systems Engineer. |
| **ENTJ** | *The Executive Commander* | Decisive results-driven leader, structural efficiency organizer, vision executor. | Industrial Engineering (0710), Business Management (0413), Economics (0311), Information Systems. | Engineering Manager (1321), Chief Technology Officer (CTO) (1120), Product Manager, Management Consultant (2421). |
| **ENTP** | *The Visionary Explorer* | Lateral problem solver, dialectical debater, cross-disciplinary concept catalyst. | Computer Science (0613), International Relations (0312), Product Design (0212), Tech Entrepreneurship. | Venture Architect, Product Innovator, Tech Evangelist, Startup Founder (1120). |
| **INFJ** | *The Insightful Counselor* | Humanistic visionary, subconscious pattern observer, personal growth mentor. | Psychology (0313), Visual Communication Design (0211), Human-Computer Interaction (HCI). | UX Strategist (2513), Cognitive Ergonomist, Educational Designer (2351), Clinical Counselor. |
| **INFP** | *The Harmonic Idealist* | Authentic values guardian, deeply creative, empathetic conceptual healer. | Visual Communication Design (0211), Literature & Linguistics (0232), Psychology (0313), Digital Arts. | UX Writer (2641), Content Strategist, Creative Brand Designer, Humanitarian Advocate. |
| **ENFJ** | *The Inspiring Mentor* | Human potential catalyst, charismatic communicator, collaborative team unifier. | Organizational Psychology (0313), Mass Communication (0321), Education Management (0413). | Agile Coach (2423), People Development Director (1212), Community Lead, Academic Director. |
| **ENFP** | *The Catalyst Innovator* | Enthusiastic social creator, pattern-spotting explorer of emergent connections. | Visual Communication Design (0211), Communications (0320), Digital Marketing (0414). | Creative Director (1222), Product Marketing Manager (2431), Growth Strategist. |
| **ISTJ** | *The Reliable Inspector* | Methodical order maintainer, committed to empirical facts and procedure integrity. | Accounting (0411), Information Systems (0612), Civil Engineering (0732), Applied Statistics (0542). | Database Administrator (2522), QA Automation Engineer (2519), Compliance Officer (2422), Financial Auditor. |
| **ISFJ** | *The Dedicated Protector* | Diligent practical caretaker, guardian of team stability with high personal attention. | Health Information Management (0919), Nursing (0913), Primary Education (0112), Applied Psychology. | Healthcare Data Specialist, Technical Support Lead (3512), Operations Coordinator. |
| **ESTJ** | *The Systematic Director* | Assertive administrator, measurable standards enforcer, reliable logistics organizer. | Industrial Engineering (0710), Operations Management (0413), Management Accounting (0411). | Operations Director (1219), Project Management Officer (PMO), QA Director, Supply Chain Lead. |
| **ESFJ** | *The Harmonic Coordinator* | Team harmony facilitator, practical, acutely responsive to community needs. | Human Resource Management (0413), Hospitality (1013), Education (0111), Corporate Communications. | HR Operations Specialist (2423), Client Success Director, Corporate Event Lead. |
| **ISTP** | *The Practical Craftsman* | Pragmatic technical troubleshooter, composed in high-pressure mechanical crises. | Mechanical Engineering (0715), Electrical Engineering (0714), Cybersecurity Operations (0619). | DevOps Engineer (2512), Security Incident Responder (2529), Embedded Systems Engineer. |
| **ISFP** | *The Aesthetic Explorer* | Sensual harmony artist, responsive to spatial visual aesthetics and quiet action. | Product Design (0212), Interior Architecture (0731), Fine Arts (0213), 3D Digital Animation. | UI Designer (2513), 3D Modeler, Visual Concept Artist, Motion Graphics Designer. |
| **ESTP** | *The Dynamic Pragmatist* | Agile field executor, tactical risk-taker, real-time crisis problem solver. | Mining Engineering (0724), Sports Business (1014), International Trade Logistics (0413). | Tech Sales Specialist (2433), Crisis Operations Manager, Logistics Coordinator (4323). |
| **ESFP** | *The Spontaneous Performer* | Energetic atmosphere builder, highly attuned to live audience dynamics. | Visual Communication Design (0211), Public Relations (0321), Performing Arts (0215), Interactive Media. | Interactive Media Presenter (2656), Event Producer, Social Media Director. |

---

# **3. PRODUCT GUARDRAILS, DATA INTEGRITY & PHYSICAL SPECIFICATIONS (THE "GUARDRAILS")**

## **3.1 Psychometric Integrity & Anti-Acquiescence Standard**
* **Balanced Keying (Exact 50/50 Distribution):** Each cognitive dimension contains exactly 3 positively keyed and 3 reverse-keyed items. This mathematically eliminates *acquiescence response bias* (the human tendency to habitually agree with statements regardless of content).
* **Statistical Target Benchmarks (APA Testing Standards):**
  * Subscale Internal Consistency Reliability: Target Cronbach's Alpha benchmark $\alpha \ge 0.70$ across each of the 4 dimensions.
  * Standard Error of Measurement (SEM): Scaled to maintain stable classification repeatability across retest intervals.
* **Deterministic Tie-Breaking:** No undefined or hanging state can occur. A score of exactly $50\%$ deterministically maps to the primary polarity pole (E, S, T, J).

## **3.2 Questionnaire Input Validation**
* **Zero Unanswered Items:** All 24 items must be evaluated before scoring computation executes.
* **Payload Verification:** Scoring engines will strictly reject calculation requests if the response map length $\ne 24$ or if any score value $X \notin \{1, 2, 3, 4, 5\}$.
* **Anti-Automation Speed Guard:** Submissions completed in $< 45\text{ seconds}$ total duration trigger a rapid-completion warning flag (*speeding response mitigation*).

## **3.3 Offline & Physical Testing Specifications (Beyond Software)**
The 24-item Watq assessment can be administered offline without digital hardware:
* **Physical Format:** Single-sheet double-sided ISO 216 A4 ($210 \times 297\text{mm}$) assessment questionnaire.
* **Grid Layout:** 24 items printed in high-contrast Psychometric Slate (`#0F172A`) on Stark White $100\text{gsm}$ uncoated paper.
* **Physical Scoring Template:** Transparent overlay grid with pre-marked positive ($X$) and reversed ($6 - X$) point conversion columns, enabling rapid manual tallying in $< 60\text{ seconds}$ per respondent in classroom or seminar settings.

---

# **4. CODE IMPLEMENTATION MAPPING (THE "WHERE")**

## **4.1 Source Code File Mapping (`src/`)**
* **Item Catalog & Archetype Definitions:** [`src/data/assessments/jungian16.ts`](file:///d:/watq/src/data/assessments/)
* **Deterministic Scoring Engine:** [`src/lib/scoring/jungian.ts`](file:///d:/watq/src/lib/scoring/)

## **4.2 Client Session Data Contract (`WatqAssessmentSession`)**
```typescript
/**
 * Core Assessment Session Contract
 * Document: WATQ-PRD-02 // Product Requirements Document
 */
interface WatqAssessmentSession {
  sessionId: string;                 // UUID v4
  instrumentId: string;              // "jungian-16"
  startedAt: string;                 // ISO 8601 UTC
  updatedAt: string;                 // ISO 8601 UTC
  completedAt?: string;              // ISO 8601 UTC
  currentIndex: number;              // 0 to 23
  responses: Record<string, number>; // Map: { "EI-01": 5, "SN-01": 2, ... }
  result?: {
    typeCode: string;                // e.g. "INTJ"
    scores: {
      E: number; I: number;          // Percentages (0 to 100)
      S: number; N: number;
      T: number; F: number;
      J: number; P: number;
    };
    archetypeTitle: string;          // e.g. "The Strategic Architect"
    summary: string;
    majors: string[];                // UNESCO ISCED-F 2013 aligned
    careers: string[];               // ILO ISCO-08 aligned
  };
}
```

## **4.3 Scalability to Multi-Instrument Framework (v2.0+ Extensibility)**
While MVP v1.0 is locked to the 16 Cognitive Types model:
* The assessment interface is decoupled via the `instrumentId` attribute.
* Future instruments (Big Five OCEAN, RIASEC, DISC) implement the identical `WatqAssessmentSession` contract simply by providing a catalog file in `src/data/assessments/` and registering a calculator in `src/lib/scoring/`.

## **4.4 MVP Acceptance Criteria Checklist**
- [x] All 24 questionnaire items defined in Global English with unique IDs, axis labels, and keying direction.
- [x] Deterministic scoring calculation verified mathematically across all boundary scores ($S_{\text{dim}} \in [6, 30]$).
- [x] 16 archetypes exhaustively defined with titles, cognitive descriptions, college majors (ISCED-F), and careers (ISCO-08).
- [x] Session data contract typed with TypeScript and stored in client session with cloud synchronization to Neon PostgreSQL.
