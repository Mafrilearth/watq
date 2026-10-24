# **WATQ: BRAND & BUSINESS REQUIREMENTS DOCUMENT (BRD)**

> **ID & Version:** `WATQ-BRD-01` │ `v1.0.0` │ `LOCKED`  
> **Authority & Owner:** Fauzul (Platform Lead) │ **Standard:** `ISO 20671` │ `WIPO Classes 9 & 42`  
> **SSOT Domain:** Brand Identity, Sundanese Watek Origin, Lens Geometry, Color Palette, Trademark Governance  
> **Target Code:** [`apps/web/src/components/brand/WatqLogo.tsx`](file:///d:/watq/apps/web/src/components/brand/WatqLogo.tsx) │ [`apps/web/public/brand/`](file:///d:/watq/apps/web/public/brand/)

---

# **1. SOFTWARE NAMING ARCHITECTURE & ONTOLOGY (THE "WHY")**

## **1.1 Etymological Origin: The Sundanese "Watek" Root**
* **The Root Meaning (*Watak & Tabiat Fitrah*):**  
  The brand name **Watq** originates directly from the Sundanese word **"Watek"**, which signifies an individual's innate character, inborn disposition, authentic temperament, and primordial nature (*watak / tabiat asli bawaan lahir*). It embodies the unadulterated, unconditioned self before external societal conditioning and masks (*persona*) distort human expression.
* **The Phonetic Stylization Naming Pattern (Like Flickr from Flicker):**  
  Following the celebrated tradition of modern technology naming conventions (such as **Flickr** from *Flicker*, **Tumblr** from *Tumbler*, and **Scribd** from *Scribed*), the Sundanese word *Watek* is phonetically compressed into **Watq** (logotype: **WATQ**):
  - **Zero Generic Suffixes:** Rejects trendy, disposable naming cliches like `-ly`, `-io`, or generic prefixes.
  - **Preserved Pronunciation:** The spelling is modernized into 4 monolithic letters (**Watq**), yet the vocal pronunciation remains faithful to the original root: pronounced **"Watek"** (`/wɑtək/` or `/wɑtk/`).
* **Why This Outperforms Other Names (Trademark & Strategic Authority):**
  - **Rejection of Descriptive Names (*PersonalityTest, PsychoQuiz*):** Descriptive names fail global trademark registration (WIPO/USPTO) as *merely descriptive* on the Abercrombie spectrum and convey low-trust clickbait quizzes.
  - **The Power of "Watq":** Classified legally as a *Fanciful Mark* (highest tier of intellectual property protectability), enjoying instant monosyllabic punch, 100% dictionary uniqueness, and zero SEO competition.

### **1.1.1 Official Sundanese Lexicographical Comparative Audit (Root Words)**
To ensure linguistic authenticity, official dictionaries (**Kamus Basa Sunda R.A. Danadibrata**, **R. Satjadibrata**, and **Balai Bahasa Provinsi Jawa Barat / Kemendikbudristek**) were audited for un-affixed root words (kata dasar murni 4–5 huruf):

| Candidate Root | Length | Official Lexical Meaning (Danadibrata / Balai Bahasa) | Scientific Scope Alignment & Evaluation |
| :---: | :---: | :--- | :--- |
| **`WATEK`** | **5 letters** | *Tabéat, watak, atawa sifat batin jelema nu aya di jero diri nu bisa mangaruhan sakabéh pikiran jeung panggawéna; karakter bawaan lahir.* | **100% MATCH (SELECTED).** Verbatim equivalent of Personality & Cognitive Typology in differential psychology. Un-affixed root word. |
| **`SIPAT`** | 5 letters | *Kaadaan, rupa, ciri khas lahiriah atawa batiniah nu napel dina hiji hal/makhluk.* | **GENERIC.** Applies to non-living matter and physical traits (*sipat cai, sipat batu*), lacking psychometric focus. |
| **`BUDI`** | 4 letters | *Perangai, laku lampah, akal karsa, tata krama, atawa budi pekerti.* | **ETHICAL/MORAL.** Heavily skewed towards social etiquette and manners (*budi pekerti*), not cognitive architecture. |
| **`SURTI`** | 5 letters | *Paham, ngarti, awas, tanggap kana isarah/perasaan batur tanpa kudu diucapkeun langsung.* | **INTUITIVE BIAS.** Strong for emotional empathy, but lacks coverage for causal logic (*Thinking*) and execution structure. |
| **`SIDIK`** | 5 letters | *Tétéla, nyata, jelas, kabukti benerna sabada ditalungtik sacara jero tur taliti.* | **DECODING ACTION.** Aligns with the investigative verb "to decode", but describes the diagnostic action rather than the inner persona. |
| **`TEGES`** | 5 letters | *Jelas, terang benderang, nyata, atawa harti nu saenyana (hakikat).* | **SEMANTIC CLARITY.** Signifies certainty and truth, but lacks innate psychological dimensions. |

### **1.1.2 The 6-Pattern Industry Naming Taxonomy & Selection Rationale**
To establish an iconic, defensible brand, Fauzul evaluated the 6 premier naming patterns utilized in global software engineering and trademark jurisprudence:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                       FAUZUL'S SOFTWARE BRAND NAMING AUDIT MATRIX                           │
├────┬─────────────────────────────┬──────────────────────────┬───────────────────────────────┤
│ NO │ NAMING PATTERN MECHANISM    │ GLOBAL TECH EXAMPLES     │ EVALUATION FOR Watq           │
├────┼─────────────────────────────┼──────────────────────────┼───────────────────────────────┤
│ 01 │ VOWEL ELISION (COMPRESSION) │ Flickr, Tumblr, Scribd   │ SELECTED (PRIMARY ARCHITECTURE│
│    │ Removes internal vowel      │ (Flicker, Tumbler)       │ Watek ➔ Watq (/wɑtək/)        │
├────┼─────────────────────────────┼──────────────────────────┼───────────────────────────────┤
│ 02 │ CONSONANT STYLIZATION       │ Compaq, Xerox, Lyft      │ SELECTED (TERMINAL 'Q')       │
│    │ Replaces terminal consonant │ (Compact, Xeros, Lift)   │ Glottal cadence + Tech Aura   │
├────┼─────────────────────────────┼──────────────────────────┼───────────────────────────────┤
│ 03 │ ACRONYMIC / BACKRONYM       │ SWIFT, SATA, SPARC       │ REJECTED (ANTI-PATTERN)       │
│    │ Expands to long sentences   │                          │ Causes tight-coupling to 1 mod│
├────┼─────────────────────────────┼──────────────────────────┼───────────────────────────────┤
│ 04 │ MORPHEMIC PORTMANTEAU       │ Instagram, Pinterest     │ REJECTED                      │
│    │ Blends two distinct words   │ (Instant + Telegram)     │ Too clunky for raw root word  │
├────┼─────────────────────────────┼──────────────────────────┼───────────────────────────────┤
│ 05 │ NEOLOGISM / FANCIFUL MARK   │ Kodak, Rolex, Exxon      │ SELECTED (WIPO SUPREMACY)     │
│    │ Coined word, 0 dictionary   │                          │ Highest trademark rank, 0 SEO │
├────┼─────────────────────────────┼──────────────────────────┼───────────────────────────────┤
│ 06 │ MONOSYLLABIC FOOTPRINT      │ Slack, Stripe, Figma     │ SELECTED (WEB URL & PKG)      │
│    │ 1-2 cadence, 4-5 letters    │ Vercel, Next.js          │ Monolithic 4-char, `watq.app` │
└────┴─────────────────────────────┴──────────────────────────┴───────────────────────────────┘
```

* **Fauzul's Architectural Synthesis:**  
  Fauzul synthesized Patterns 1, 2, 5, and 6 to transform the authentic Sundanese root **"Watek"** into **Watq** (logotype: **WATQ**). This guarantees cultural depth, visual modernism, maximum legal defensibility, and complete web developer ergonomics (`@watq/web`, `watq.mafrilearth.com`).

## **1.2 Standalone Sovereign Wordmark Architecture (Zero-Acronym Principle)**
* **Not an Acronym or Abbreviation:**  
  **Watq is strictly a single, sovereign wordmark—NOT an acronym, backronym, or abbreviation of longer words.** In accordance with the naming architecture of premier global technology products (such as *Figma*, *Stripe*, *Vercel*, *Flickr*, and *Slack*), the name stands autonomously as a pure proper noun.
* **True Model-Agnostic Decoupling:**  
  By deliberately rejecting artificial acronymic expansions (e.g., claiming each letter stands for a specific trait), the platform avoids *tight coupling* to any single psychological instrument. Because the name means human personality itself (*Watek*), the software architecture remains genuinely model-agnostic—equally capable of hosting the 16 Cognitive Types reference runner, Big Five (OCEAN 5-factor model), DISC behavioral profiles, Enneagram typologies, or Holland RIASEC career trajectories without architectural conflict.

## **1.3 Phonetic Articulation & Orthographic Precision (The Terminal "Q")**
* **Preserved Root Sound:**  
  Spoken naturally and identically to the Sundanese root: **"Watek"** (`/wɑtək/`).
* **Orthographic Function of the Terminal 'Q':**  
  The terminal capital 'Q' is an orthographic stylization that captures the crisp Sundanese glottal cadence while transforming a traditional cultural root into a sleek, monolithic 4-character software mark.
* **Legal Distinctiveness (WIPO / Abercrombie Spectrum):**  
  As a coined sovereign wordmark (*Fanciful Mark*), **Watq** possesses the highest legal defensibility under WIPO Nice Classification (Class 9: Diagnostic Software, Class 42: SaaS), completely free from descriptive trademark vulnerabilities and SEO collision.

### **1.3.1 The 3-Surface Typographic Casing Architecture**
To eliminate any lingering misconception that the name is an acronym, Fauzul established the **3-Surface Casing Standard** (matching the conventions of *Flickr*, *Figma*, and *Vercel*):

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                       FAUZUL'S 3-SURFACE BRAND CASING STANDARD                              │
├─────────────────────┬──────────────────┬────────────────────────────────────────────────────┤
│ SURFACE CONTEXT     │ CASING FORMAT    │ OPERATIONAL RULE & COGNITIVE RATIONALE             │
├─────────────────────┼──────────────────┼────────────────────────────────────────────────────┤
│ 1. Editorial & Prose│ Watq             │ Mandatory Title Case in all body text, UI copy,    │
│    (Human Reading)  │ (Title Case)     │ and documentation. Signals a proper noun, instantly│
│                     │                  │ dismantling the assumption of an acronym.          │
├─────────────────────┼──────────────────┼────────────────────────────────────────────────────┤
│ 2. Visual Logotype  │ WATQ             │ All-Caps permitted exclusively in geometric vector │
│    (Graphic Mark)   │ (All-Caps)       │ logotypes, badges, and headers for optical balance │
│                     │                  │ and DIN 1450 structural symmetry.                  │
├─────────────────────┼──────────────────┼────────────────────────────────────────────────────┤
│ 3. Web URLs & Pkg   │ watq             │ All-Lowercase in web URLs (`watq.mafrilearth.com`),│
│    (System Space)   │ (Lowercase)      │ web packages (`@watq/web`), and Web Storage keys.  │
└─────────────────────┴──────────────────┴────────────────────────────────────────────────────┘
```

## **1.4 The Inverted Pyramid Scientific & Software Taxonomy**
Watq is mapped according to the rigorous, standard inverted pyramid taxonomy of science and software engineering:

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
                              ├─ Reference Driver 01 (MVP): 16 Cognitive Types (Carl Jung 1921)
                              ├─ Catalog Driver 02 (Phase 2): Big Five Factor Model (OCEAN)
                              ├─ Catalog Driver 03 (Phase 2): Enneagram 9-Type Spectrum
                              ├─ Catalog Driver 04 (Phase 3): DISC Behavioral Matrix
                              └─ Catalog Driver 05 (Phase 3): Holland RIASEC Vocational Interests
                              │
                              ▼ [LEVEL 6: DIAGNOSTIC & VOCATIONAL DELIVERABLES] (Synthesized Output)
                                    Cognitive Polarity Radar, Stress Antidotes,
                                    UNESCO ISCED-F 2013 Academic Majors & ILO ISCO-08 Careers
```

### **1.4.1 Two Primary System Actors (Target Personas)**
Watq is engineered with a strict 2-actor system boundary:
1. **Actor 1: The Individual User (Self-Explorer):**
   - Accesses the high-speed 24-item diagnostic runner (`/assess`).
   - Receives their personal **Cognitive Operating Manual** (`/result`): 4-polarity radar, stress overload triggers & recovery antidotes, authentic communication patterns, and academic/career alignments (UNESCO ISCED-F 2013 / ILO ISCO-08).
   - Manages personal assessment records and progress tracking (`/history`).
2. **Actor 2: The System Administrator (Fauzul / Platform Lead):**
   - Accesses the back-office **Admin Question Studio** (`/admin`).
   - Executes full CRUD operations on assessment items (Create, Read, Update, Delete questions dynamically in the question store).
   - Audits psychometric balance across all 4 cognitive axes ($E \leftrightarrow I, S \leftrightarrow N, T \leftrightarrow F, J \leftrightarrow P$).

* **Official Software Slogan:** *Personality Decoded.*  
* **Fauzul's Brand Domain Distinction:** The brand domain is human personality itself, not merely an assessment test. The assessment runner is strictly the diagnostic gateway into lifelong cognitive decoding, stress overload recovery antidotes, and vocational trajectory navigation (UNESCO ISCED-F 2013 & ILO ISCO-08).
* **Master Software Archetype:** *The Sage-Architect* (A synthesis between an Empirical Researcher seeking scientific truth and a Systems Architect structuring intuitive order).

## **1.5 The Core Architecture: Personal Cognitive Suite & Phased Scalability**
Watq follows a disciplined, phased progression—perfecting the individual user experience before scaling outwards:

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                       WATQ PERSONAL COGNITIVE PLATFORM ARCHITECTURE                         │
├──────────────────────────────┬──────────────────────────────┬───────────────────────────────┤
│ [PHASE 1: INDIVIDUAL CORE]   │ [PHASE 1: INDIVIDUAL CORE]   │ [PHASE 1: INDIVIDUAL CORE]    │
│ 01. Diagnostic Gateway       │ 02. Personal Cognitive Radar │ 03. Life & Career Trajectory  │
│ Multi-Model Runners          │ Polarity Radar, Stress       │ Academic Majors (UNESCO) &    │
│ (Jungian, Big Five, DISC)    │ Triggers & Recovery Antidote │ Global Professions (ILO ISCO) │
├──────────────────────────────┼──────────────────────────────┼───────────────────────────────┤
│ [PHASE 1: INDIVIDUAL CORE]   │ [PHASE 2: RELATIONAL HORIZON]│ [PHASE 3: ECOSYSTEM HORIZON]  │
│ 04. Digital Cognitive Card   │ 05. WATQ Silih (Pair Matrix) │ 06. Team Harmony & Dev API    │
│ Elegant, Shareable Personal  │ 1-on-1 Communication &       │ Collective Cognitive Map,     │
│ Profile Badge for Portfolios │ Conflict Mitigation Playbook │ Embeddable Diagnostic Widgets │
└──────────────────────────────┴──────────────────────────────┴───────────────────────────────┘
```

1. **Pillar 01: Multi-Model Diagnostic Engine (Phase 1 Core):** High-speed, distraction-free assessment runners (Jung 16, Big Five, DISC) running 100% client-side with zero latency and zero-database privacy.
2. **Pillar 02: Deep Cognitive Radar & Mental Manual (Phase 1 Core):** Multidimensional polarity visualization, decision-making style, stress overload warning signs, and personalized mental recovery routines.
3. **Pillar 03: Vocational & Academic Trajectory (Phase 1 Core):** Algorithmic alignment with UNESCO ISCED-F 2013 academic disciplines and ILO ISCO-08 occupational standards—empowering students and professionals to navigate career paths matching their natural wiring.
4. **Pillar 04: Digital Cognitive ID & Shareable Card (Phase 1 Core):** Clean, aesthetic personal summary badge easily downloadable or attachable to CVs, LinkedIn, and personal engineering portfolios.
5. **Pillar 05: WATQ Silih — Pairwise Synergy (Phase 2 Modular Horizon):** Lightweight 1-on-1 collaboration simulator analyzing communication harmony, potential friction points, and constructive feedback strategies between two profiles.
6. **Pillar 06: Team Culture & Ecosystem API (Phase 3 Future Horizon):** Collective cognitive diversity heatmaps for organizations and embeddable developer SDKs for EdTech/HRTech integrations.

---

# **2. RESPONSIVE WEB GUI ICONOGRAPHY & VIEWPORT ARCHITECTURE**

Watq is engineered exclusively as a pure, responsive web platform running in the browser across all viewports:

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Browser Favicon │ Desktop Navbar  │ Runner 680px    │ Mobile Web Bar  │ Web App PWA     │
│ Pixel-Snapped   │ Horizontal Lock │ Focused Corridor│ Compact Inline  │ Web Manifest    │
│ 16px, 32px, 48px│ Mark + Logotype │ Single-Question │ 24px Mark + Type│ 192px & 512px   │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

## **2.1 Master GUI Insignia Coordinates ($500 \times 500\text{px}$)**
```svg
<svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Facet 1: Cognition (Apex Keystone, 90.00°) -->
  <path d="M 310.14 203.73 L 381.58 162.49 Q 391.97 156.49 385.02 146.71 A 170 170 0 0 0 114.98 146.71 Q 108.03 156.49 118.42 162.49 L 189.86 203.73 Q 200.26 209.73 208.63 201.17 A 64 64 0 0 1 291.37 201.17 Q 299.74 209.73 310.14 203.73 Z" fill="currentColor" />
  <!-- Facet 2: Affect (Bottom-Left Keystone, 210.00°) -->
  <path d="M 179.86 221.05 L 108.42 179.81 Q 98.03 173.81 93.04 184.72 A 170 170 0 0 0 228.06 418.58 Q 240.00 419.71 240.00 407.71 L 240.00 325.21 Q 240.00 313.21 228.39 310.24 A 64 64 0 0 1 187.02 238.59 Q 190.26 227.05 179.86 221.05 Z" fill="currentColor" />
  <!-- Facet 3: Conation (Bottom-Right Keystone, 330.00°) -->
  <path d="M 260.00 325.21 L 260.00 407.71 Q 260.00 419.71 271.94 418.58 A 170 170 0 0 0 406.96 184.72 Q 401.97 173.81 391.58 179.81 L 320.14 221.05 Q 309.74 227.05 312.98 238.59 A 64 64 0 0 1 271.61 310.24 Q 260.00 313.21 260.00 325.21 Z" fill="currentColor" />
  <!-- Singularity Core: Das Selbst / Authentic Self -->
  <circle cx="250" cy="250" r="24" fill="currentColor" />
</svg>
```

## **2.2 Web Iconography & Viewport Scaling Matrix**

| Web Surface | Render Size | Asset Source | Rendering & Pixel Alignment Specs |
| :--- | :---: | :--- | :--- |
| **Browser Favicon** | `16x16px`, `32x32px`, `48x48px` | `watq-favicon.svg` | Crisp $20\text{px}$ optical corridor prevents keystone blurring; pure `#FFFFFF`. |
| **Mobile Web Header** | `24x24px` | `watq-mark.svg` | Inline vector, `currentColor` reactive to dark/light theme context. |
| **Desktop Global Navbar** | `32x32px` (Mark) / $160\text{px}$ (Lockup) | `watq-logo-full.svg` | Symmetrical optical axis $Y = 80\text{px}$, vertical hairline separator $45\%$ height. |
| **Modal / FSM State Loader** | `48x48px` | `watq-mark.svg` | Smooth continuous pulse animation: `animation: pulse 2s ease-in-out infinite;`. |
| **Hero Interactive Lens** | `320px`–`440px` | Interactive SVG | Full hover interactivity per facet displaying psychological faculty telemetry. |
| **Web App Manifest (PWA)** | `192x192px`, `512x512px` | `watq-app-icon.svg` | Continuous squircle container on `#12151D` with Citron & White optical balance. |
| **Focused Runner Corridor** | `max-w-[680px]` | CSS Container | Bringhurst-compliant single-focus tunnel; 65 CPL maximum line length. |
| **Responsive Web Layouts** | Viewport width | CSS Grid / Flexbox | Mobile ($375\text{px}$), Tablet ($768\text{px}$), Laptop ($1024\text{px}$), Ultra-Wide ($\ge 1440\text{px}$). |

## **2.3 Software UI Icon Family (1.5px Hairline Standard)**
* **Grid Standard:** Master $24 \times 24\text{px}$ bounding box with $2\text{px}$ interior padding.
* **Stroke Weight:** Exactly $1.5\text{px}$ hairline vectors with round stroke caps (`stroke-linecap="round"` and `stroke-linejoin="round"`).
* **Prohibited Iconography:** Banned filled solid glyphs, cartoon emojis, or thick $2.5\text{px}+$ strokes.

## **2.4 Logo Clearspace & Minimum Sizing Rules ($X$-Clearance)**
To maintain visual authority, the insignia and logotype are surrounded by a mandatory exclusion zone free of text, borders, or intersecting graphics:
* **The $X$-Clearance Standard:** The clearance margin is defined as $1X$, where $X$ equals the diameter of the central core singularity ($2r_c = 48\text{px}$) in master coordinate space, or $25\%$ of the total lockup height in responsive containers.
* **Minimum Size Guardrails:**
  * **Favicon / Browser Tab:** Exactly $16 \times 16\text{px}$ (pixel-aligned single-vector monochrome or citron).
  * **Mobile Web Navbar:** Minimum $24 \times 24\text{px}$ (mark-only).
  * **Desktop Global Navbar:** Minimum $32 \times 32\text{px}$ (mark) with $140\text{px}$ minimum lockup width.
  * **Hero Visual Prism:** $320 \times 320\text{px}$ up to $480 \times 480\text{px}$.
  * **Absolute Minimum Threshold:** Rendering below $16\text{px}$ is **STRICTLY PROHIBITED** because the parallel optical corridors drop below $1.0\text{px}$ physical device pixel threshold, inducing destructive sub-pixel aliasing.

---

# **3. 3-TIER DESIGN TOKEN ARCHITECTURE (DTCG COMPLIANT)**

Following the W3C Design Tokens Community Group (DTCG) specification, Watq structures all software styles into three decoupled layers:

```
[ Tier 1: Primitive Tokens ] ──> [ Tier 2: Semantic Tokens ] ──> [ Tier 3: Component Tokens ]
   (Raw Hex / Math Units)          (Intent & Purpose in UI)         (Scoped Component Props)
   e.g. #D4F024, 680px              e.g. --interactive-accent       e.g. --btn-primary-bg
```

### **Complete CSS Token Tree**

```css
:root {
  /* ==========================================================
     TIER 1: PRIMITIVE TOKENS (RAW MATHEMATICAL VALUES)
     ========================================================== */
  --primitive-basalt-950: #08090C;       /* hsl(225, 20%, 4%) */
  --primitive-slate-900: #12151D;        /* hsl(224, 23%, 9%) */
  --primitive-slate-800: #181C26;        /* hsl(223, 22%, 12%) */
  --primitive-slate-700: #1E293B;        /* hsl(222, 47%, 17%) */
  --primitive-slate-400: #94A3B8;        /* hsl(215, 20%, 65%) */
  --primitive-slate-500: #64748B;        /* hsl(215, 16%, 47%) */
  --primitive-white: #FFFFFF;            /* hsl(0, 0%, 100%) */
  --primitive-citron-500: #D4F024;       /* hsl(68, 88%, 54%) */
  --primitive-citron-400: #E2FE52;       /* hsl(69, 98%, 66%) */
  --primitive-cobalt-500: #2E68FF;       /* hsl(223, 100%, 59%) */
  --primitive-amber-500: #FF7A00;        /* hsl(29, 100%, 50%) */
  --primitive-emerald-500: #10B981;      /* hsl(160, 84%, 39%) */
  --primitive-rose-500: #F43F5E;         /* hsl(349, 89%, 60%) */

  /* ==========================================================
     TIER 2: SEMANTIC TOKENS (THE 60-30-10 SOFTWARE HIERARCHY)
     ========================================================== */
  --surface-canvas: var(--primitive-basalt-950);   /* 60%: Base Deep Obsidian */
  --surface-card: var(--primitive-slate-900);     /* 30%: Structural Containers */
  --surface-elevated: var(--primitive-slate-800); /* Modals, Dropdowns, Popovers */
  --surface-sunken: #040507;                      /* Terminal Boxes, Code Blocks */

  --interactive-accent: var(--primitive-citron-500); /* 10%: Primary Interaction */
  --interactive-hover: var(--primitive-citron-400);
  --interactive-focus: var(--primitive-citron-500);
  --interactive-glow: rgba(212, 240, 36, 0.20);

  --text-primary: var(--primitive-white);          /* 19.09:1 Contrast AAA */
  --text-secondary: var(--primitive-slate-400);    /* 7.42:1 Contrast AAA */
  --text-tertiary: var(--primitive-slate-500);     /* 4.60:1 Micro-Metadata */

  --border-subtle: rgba(255, 255, 255, 0.08);     /* Machined Bezel Hairline */
  --border-active: rgba(212, 240, 36, 0.40);
  --border-focus: var(--primitive-citron-500);

  --axis-energy: var(--primitive-cobalt-500);     /* Sumbu E/I */
  --axis-info: var(--primitive-emerald-500);      /* Sumbu S/N */
  --axis-decision: var(--primitive-citron-500);   /* Sumbu T/F */
  --axis-lifestyle: var(--primitive-amber-500);   /* Sumbu J/P */

  /* ==========================================================
     TIER 3: COMPONENT TOKENS (SCOPED COMPONENT PROPERTIES)
     ========================================================== */
  --btn-primary-bg: var(--interactive-accent);
  --btn-primary-fg: var(--surface-canvas);
  --btn-primary-hover-bg: var(--interactive-hover);
  --btn-primary-radius: 9999px; /* Pill Architecture */

  --runner-max-width: 680px;
  --runner-progress-height: 6px;
  --likert-tile-min-height: 52px;
  --likert-tile-radius: 12px;
  --card-outer-radius: 20px;
  --card-inner-radius: 14px;
}
```

## **3.1 Dual-Mode Chromatic Architecture (Dark Mode & Light Mode)**

Watq color tokens are decoupled via W3C DTCG Semantic Mapping, allowing seamless dual-mode execution without compromising the platform's rare, high-contrast, psychometric brand aesthetic:

```
┌─────────────────────────────────┬───────────────────────────────┬───────────────────────────────┐
│ DTCG SEMANTIC ROLE (60-30-10)   │ DARK MODE (FOCUS TUNNEL)      │ LIGHT MODE (EDITORIAL SPEC)   │
├─────────────────────────────────┼───────────────────────────────┼───────────────────────────────┤
│ 60% Canvas (--surface-canvas)   │ Cold Basalt (#08090C)         │ Alabaster White (#F8F9FA)     │
│ 30% Container (--surface-card)  │ Titanium Slate (#12151D)      │ Pure Ceramic White (#FFFFFF)  │
│ Elevated (--surface-elevated)   │ Obsidian Surface (#181C26)    │ Elevated White (#FFFFFF)      │
│ 10% Accent (--interactive-accent│ Radioactive Citron (#D4F024)  │ Kinetic Citron (#D4F024 Pill) │
│ Primary Ink (--text-primary)    │ Polar Snow (#F8FAFC)          │ Deep Basalt Ink (#08090C)     │
│ Secondary Ink (--text-secondary)│ Muted Slate (#94A3B8)         │ Slate Gray (#475569)          │
│ Micro Hairline (--border-subtle)│ White 8% (rgba 255..0.08)     │ Basalt 8% (rgba 8, 9, 12, 0.08│
└─────────────────────────────────┴───────────────────────────────┴───────────────────────────────┘
```

### **The Dual-Mode Optical Invariant Rules:**
1. **WCAG 2.2 AAA Contrast Invariant:**
   - In Dark Mode: Polar Snow text on Cold Basalt yields a **19.09:1** contrast ratio (Pass AAA).
   - In Light Mode: Deep Basalt Ink text on Alabaster White yields an **18.50:1** contrast ratio (Pass AAA).
2. **The Radioactive Citron Inverted Pill Rule:**
   - Citron (`#D4F024`) on pure white yields a forbidden **1.22:1** ratio if rendered as bare text.
   - Therefore, in Light Mode, Citron is strictly deployed as an **enclosed pill container** with Deep Basalt Ink (`#08090C`) text inside, yielding a blistering **15.67:1** AAA contrast ratio.
3. **Ergonomic Default Rationale:**
   - The default theme is set to **Dark Mode (Cold Basalt)** to maximize pupil stability, reduce ocular strain (asthenopia) during 24-item cognitive evaluations, and maintain the 680px distraction-free focus tunnel.

## **3.2 8-Point Spatial Grid & 5-Tier Elevation Depth Hierarchy**

All layout spacing, margins, paddings, and gap distances follow an uncompromising **8-point linear grid system** (with a $4\text{px}$ half-step for micro-badges and icon alignment):

```
┌────────────────────┬───────────┬────────────────────────────────────────────────────────────┐
│ SPATIAL STEP       │ VALUE     │ PRIMARY APPLICATION IN WEB GUI                             │
├────────────────────┼───────────┼────────────────────────────────────────────────────────────┤
│ --space-1 (0.5x)   │ 4px       │ Micro-badge padding, inline icon gaps, keycap offsets      │
│ --space-2 (1.0x)   │ 8px       │ Likert tile gaps, compact list item paddings               │
│ --space-3 (1.5x)   │ 12px      │ Card interior element separation, chip button horizontal   │
│ --space-4 (2.0x)   │ 16px      │ Standard card padding (mobile), navbar item gaps           │
│ --space-6 (3.0x)   │ 24px      │ Desktop card interior padding, section sub-headers         │
│ --space-8 (4.0x)   │ 32px      │ Modal container padding, bento grid row gap                │
│ --space-12 (6.0x)  │ 48px      │ Section divider spacing, major content module separation   │
│ --space-16 (8.0x)  │ 64px      │ Hero vertical padding, landing page block rhythm           │
└────────────────────┴───────────┴────────────────────────────────────────────────────────────┘
```

### **The 5-Tier Surface Elevation Stack:**
* **Level 0 (Canvas):** `bg-[#08090C]` (Deepest mineral substrate, $Z = 0$).
* **Level 1 (Card / Container):** `bg-[#12151D]` + `border-white/[0.08]` (Machined enclosures, $Z = 1$).
* **Level 2 (Hover & Active Surfaces):** `bg-[#181C26]` + `border-white/[0.16]` ($Z = 2$).
* **Level 3 (Elevated Overlays):** `bg-[#181C26]/95` + `backdrop-blur-md` (Sticky navbar, drawer flyouts, $Z = 50$).
* **Level 4 (System Modals & Telemetry Toasts):** `bg-[#12151D]` + `shadow-2xl` + `ring-1 ring-white/10` ($Z = 100$).

## **3.3 Daltonism (Color Blindness) Accessibility & Optical Redundancy Matrix**

Watq enforces the **Dual-Coding Ergonomic Principle**: *Color must NEVER be the sole carrier of semantic information.* Every trait, axis, and metric pairs hue with shape, position, or explicit text labels:

| Cognitive Axis | Primary Color | Protanopia / Deuteranopia Fallback Redundancy | Tritanopia Fallback Redundancy |
| :--- | :--- | :--- | :--- |
| **Energy (E/I)** | `#818CF8` (Soft Indigo) | Distinct Left/Right Polarized Layout + Letter Mark (`E` vs `I`) | High luminance contrast ($L \approx 48\%$) against Basalt |
| **Information (S/N)**| `#2DD4BF` (Teal) | Hexagonal glyph badge + Percentage score readout | Optical brightness difference ($L \approx 72\%$) |
| **Decision (T/F)** | `#D4F024` (Citron) | Monolithic diamond icon + Direct text trait label | Maximum peak spectral sensitivity ($555\text{nm}$) |
| **Lifestyle (J/P)** | `#FF7A00` (Amber) | Square anchor glyph + Ordinal score tracker | High chromatic saturation differential |

---

# **4. DIGITAL COMPONENT ANATOMY & PATTERNS**

## **4.1 Button-in-Button "Island" CTA Architecture**
Watq primary buttons feature a distinct nested kinetic icon container:
* **Outer Pill:** Height $48\text{px}$, padding `px-6 py-3.5`, background `bg-[#D4F024]`, text `text-[#08090C]`, font `font-bold text-sm`, radius `rounded-full`.
* **Nested Icon Disc:** Trailing circular container (`w-7 h-7 rounded-full bg-black/10 flex items-center justify-center`).
* **Kinetic Hover Physics:** On hover, the nested disc translates $2\text{px}$ diagonally (`group-hover:translate-x-0.5 group-hover:-translate-y-0.5`).
* **Active Press Physics:** Entire pill compresses slightly (`active:scale-[0.98]`) simulating physical key depression.

## **4.2 The Double-Bezel Hardware Card (*Doppelrand Machine Aesthetic*)**
Cards never sit flatly on backgrounds. They emulate machined hardware enclosures:
* **Outer Frame:** Background `bg-white/[0.04]`, hairline border `border border-white/[0.08]`, padding `p-2`, radius `rounded-[20px]`.
* **Inner Core:** Background `#12151D`, inner highlight `box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08);`, padding `p-6`, concentric radius `rounded-[14px]`.

## **4.3 The 5-Point Likert Radio Tile Group**
* **Tile Dimensions:** Minimum touch target $52\text{px}$ height, horizontal spacing $8\text{px}$ (`gap-2 sm:gap-3`).
* **Selection State:** Active border `#D4F024`, background `rgba(212, 240, 36, 0.08)`, text `#FFFFFF`.
* **Physical Keyboard Keycap Badge:** Bottom-right corner includes a micro keycap (`1`–`5`) in *JetBrains Mono*, visually confirming desktop keyboard binding.

## **4.4 The 6-State Interactive Component Standard & Focus Ring Architecture**

Every interactive web element (buttons, tiles, inputs, toggles) must strictly implement all 6 canonical states:

```
┌─────────────────┬───────────────────────────────────┬────────────────────────────────────────┐
│ COMPONENT STATE │ VISUAL SPECIFICATION (DARK MODE)  │ INTERACTION & ACCESSIBILITY CONTRACT   │
├─────────────────┼───────────────────────────────────┼────────────────────────────────────────┤
│ 1. DEFAULT      │ Resting border, subtle background │ Standard state awaiting user intent    │
│ 2. HOVER        │ Border-white/20, scale(1.005)     │ Pointer feedback, 120ms ease-out       │
│ 3. FOCUS-VISIBLE│ 2px solid #D4F024 + 2px offset    │ Mandatory keyboard TAB navigation ring │
│ 4. ACTIVE/PRESS │ scale(0.98), border-#D4F024       │ 120ms psychomotor depression feedback  │
│ 5. DISABLED     │ opacity: 0.40, cursor: not-allowed│ Pointer events disabled, aria-disabled │
│ 6. LOADING      │ Subtle pulse / spinning glyph     │ aria-busy="true", aria-live="polite"   │
└─────────────────┴───────────────────────────────────┴────────────────────────────────────────┘
```

---

# **5. DIGITAL TYPOGRAPHIC RENDERING & ERGONOMICS**

## **5.1 Screen Rendering Engine Configuration**
```css
html, body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: 'cv02' 1, 'cv03' 1, 'cv04' 1, 'cv11' 1, 'tnum' 1;
}
```

## **5.2 Modular Screen Typographic Hierarchy**

| CSS Token | Size / Line-Height | Typeface & Weight | Tracking | Functional Software Role |
| :--- | :---: | :--- | :---: | :--- |
| `text-display` | `56px / 64px` | Space Grotesk Bold 800 | `-0.035em` | Hero landing titles & 4-letter archetype codes (`INTJ`). |
| `text-h1` | `36px / 44px` | Space Grotesk Bold 700 | `-0.025em` | Primary route headings (`/assess`, `/result`, `/dashboard`). |
| `text-h2` | `24px / 32px` | Space Grotesk SemiBold 600 | `-0.015em` | Bento section cards, modal dialog titles. |
| `text-question` | `20px / 30px` | Plus Jakarta Sans Medium 500 | `-0.010em` | Assessment item prompts (high-clarity reading). |
| `text-body` | `16px / 24px` | Plus Jakarta Sans Regular 400 | `0.000em` | Archetype summary narratives, vocational descriptions. |
| `text-caption` | `14px / 20px` | Plus Jakarta Sans Medium 500 | `+0.010em` | Likert scale labels, breadcrumbs, button text. |
| `text-mono-data` | `12px / 16px` | JetBrains Mono Medium 500 | `+0.040em` | Tabular percentage scores, ISO hashes, coordinate tags. |
| `text-tagline` | `11px / 14px` | Plus Jakarta Sans SemiBold 600 | `+0.220em` | Uppercase brand slogan, status badges ("LATEST v1.0.0"). |

## **5.3 Robert Bringhurst's Law (65 CPL Focus Constraint)**
Lines of text are constrained to **45–75 characters per line (CPL)**, with optimal reading centered at **65 CPL**. This directly mandates the **680px** assessment runner container (`max-w-[680px] mx-auto`), eliminating ocular saccadic fatigue.

---

# **6. INTERACTIVE MOTION & TIMING PHYSICS**

Watq interfaces reject default linear animations. Motion simulates mass and spring physics:

```css
/* Core Motion Timing Tokens */
--motion-snap: 120ms cubic-bezier(0.16, 1, 0.3, 1);      /* Button press, tile select */
--motion-settle: 180ms cubic-bezier(0.25, 0.1, 0.25, 1); /* Question step progression */
--motion-modal: 240ms cubic-bezier(0.16, 1, 0.3, 1);     /* Modal open/close */
--motion-progress: 350ms cubic-bezier(0.4, 0, 0.2, 1);   /* Linear progress bar fill */
```

### **The 180ms Psychomotor Confirmation Window**
When a respondent selects a Likert tile:
1. **$t = 0\text{ms}$:** Tile immediately illuminates with Radioactive Citron border and audio haptic triggers.
2. **$t = 0\text{ms}$ to $180\text{ms}$:** State transition is deliberately held for $180\text{ms}$. This confirms reception in the user's visual cortex and **prevents accidental double-clicks**.
3. **$t = 180\text{ms}$:** The runner fluidly steps to the subsequent question item.

---

# **7. AUDITORY HAPTICS & SOUND IDENTITY (WEB AUDIO API ENGINE)**

Watq generates all auditory feedback mathematically via client-side Web Audio API oscillators ($0\text{ KB}$ network overhead):

```javascript
// Standalone Web Audio Synth Engine
const FREQ_MAP = {
  1: 220.00, // Strongly Disagree (A3)
  2: 261.63, // Disagree (C4)
  3: 329.63, // Neutral (E4)
  4: 392.00, // Agree (G4)
  5: 440.00  // Strongly Agree (A4)
};

export function triggerAuditoryHaptic(optionIndex) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(FREQ_MAP[optionIndex] || 329.63, ctx.currentTime);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.10);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.10);
  } catch (err) {
    // Silent degradation if browser blocks autoplay
  }
}
```

---

# **8. SOFTWARE ERROR BOUNDARIES & EMPTY STATES**

1. **404 Route Not Found:** Cold Basalt canvas, subtle $120^\circ$ radial compass watermark, Space Grotesk header `"ROUTE_OUT_OF_BOUNDS"`, and nested Citron button returning to `/`.
2. **Corrupted Session State:** Automated Web Crypto verification check. If `localStorage` payload fails integrity validation:  
   `"State reconciliation failed. Reset session or export cryptographic log."`
3. **Offline Mode Active:** Floating pill indicator top-right:  
   `"Offline mode active. Cryptographic session persists locally."`
4. **Zero-Session Empty State (`/result` without assessment):**  
   Centered focused container directing the user to start their diagnostic assessment.

## **8.1 Open Graph (OG) Social Card Specification ($1200 \times 630\text{px}$) & Metadata**

Whenever links to `watq.mafrilearth.com` are shared across social platforms (Twitter/X, LinkedIn, WhatsApp, Discord, Slack), the web crawler consumes the standardized Open Graph card:
* **Canvas Dimension:** Exactly $1200 \times 630\text{px}$ ($1.91:1$ aspect ratio).
* **Background:** Cold Basalt (`#08090C`) with a $35\%$ opacity $120^\circ$ radial compass prism watermark centered at $(X = 960, Y = 315)$.
* **Typography:**
  * Slogan / Pre-header: `14px` JetBrains Mono ALL-CAPS in Radioactive Citron (`#D4F024`), tracking `+0.20em`: `"WATQ // PERSONALITY DECODED"`.
  * Headline: `56px / 64px` Space Grotesk Bold 700 in Polar Snow (`#FFFFFF`): `"Cognitive Profiling & Vocational Trajectories."`.
  * Sub-text: `22px / 32px` Plus Jakarta Sans Regular 400 in Slate 400 (`#94A3B8`): `"Model-agnostic personality architecture grounded in Jungian typology, UNESCO ISCED-F 2013, and ILO ISCO-08."`.
* **Badge Footer:** Live status badge: `v1.0.0 • Enterprise Cloud Persistence • Zero Jargon`.

## **8.2 Editorial Voice, Tone Spectrum & Copywriting Lexicon**

Watq maintains an uncompromising **Sage-Architect** editorial voice across all web surfaces. Copy must be analytical, grounded, respectful, and completely devoid of unscientific pop-psychology:

```
┌──────────────────────────────┬──────────────────────────────────────────────────────────────┐
│ BRAND VOICE SPECTRUM         │ EDITORIAL MANIFESTO & WRITING RULES                          │
├──────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ 1. Rigorous & Mathematical   │ Ground explanations in cognitive axes, distributions, ratios │
│ 2. Objective & Non-Judging   │ Never frame any archetype as "superior" or "toxic"           │
│ 3. Actionable & Vocational   │ Connect every trait to concrete UNESCO majors & ILO careers  │
│ 4. Sparse & High-Density     │ Ban conversational filler; prioritize information density    │
└──────────────────────────────┴──────────────────────────────────────────────────────────────┘
```

### **The Official Web Copywriting Lexicon (Approved vs Banned):**

| Forbidden Cliché / Anti-Pattern | Approved Watq Terminology | Cognitive Rationale |
| :--- | :--- | :--- |
| ❌ *"Take our fun, magical quiz!"* | ✅ *"Initialize 24-item cognitive assessment."* | Preserves psychometric dignity and scientific validity. |
| ❌ *"Find your true soulmate / horoscope"* | ✅ *"Explore interpersonal communication dynamics."* | Watq is not an astrology dating app; it is a cognitive lens. |
| ❌ *"Your personality is 100% fixed"* | ✅ *"Baseline cognitive polarity preferences."* | Acknowledges neuroplasticity and situational adaptation. |
| ❌ *"You failed / wrong answer"* | ✅ *"Reverse-keyed polarity distribution."* | Psychological preferences have no correct or incorrect answers. |
| ❌ *"Good luck on your journey!"* | ✅ *"Review your Personal Cognitive Operating Manual."* | Focuses on utility, stress antidotes, and career trajectory. |

## **8.3 WCAG 2.2 AAA Keyboard Navigation & ARIA Accessibility Contract**

Every web surface must be fully operable without pointing hardware (mouse/trackpad):
1. **Keyboard Keycap Bindings (`/assess`):**
   * Keys `1`, `2`, `3`, `4`, `5`: Directly select Likert scale options $1$ to $5$ with live audio feedback.
   * Key `Enter`: Confirms and advances to the next question.
   * Key `Backspace` or `ArrowLeft`: Navigates back to the preceding question item.
   * Key `Escape`: Dismisses active modals and dialog drawers.
2. **Focus-Visible Indicator:**
   * Universal focus outline: `outline: 2px solid #D4F024; outline-offset: 2px;` activated strictly via `:focus-visible` (suppressed on pointer clicks to eliminate visual clutter).
3. **Screen Reader Semantic Roles & Landmarks:**
   * Assessment runner is encapsulated in `<main role="main">` with `<fieldset role="radiogroup" aria-labelledby="question-prompt">`.
   * Live question step counter uses `<div aria-live="polite" class="sr-only">Question 3 of 24</div>` to announce step progress without interrupting screen reader speech.

---

# **9. WEB ARCHITECTURE IMPLEMENTATION CONTRACTS (NEXT.JS 16 APP ROUTER)**

### **9.1 Master React 19 / Next.js 16 Navigation Component**
```tsx
import { WatqPrismMark, WatqLogotype } from '@/components/brand/WatqLogo';
import Link from 'next/link';

export function NavigationHeader() {
  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#08090C]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4F024]">
          <WatqPrismMark size={32} className="text-[#D4F024] group-hover:drop-shadow-[0_0_12px_rgba(212,240,36,0.5)] transition-all duration-200" />
          <WatqLogotype height={20} className="text-white" />
        </Link>
        <nav className="flex items-center gap-4 text-xs font-mono text-[#94A3B8]">
          <span className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.03]">v1.0.0</span>
          <span className="text-[#D4F024]">• Enterprise Cloud Persistence</span>
        </nav>
      </div>
    </header>
  );
}
```

### **9.2 Focused 680px Assessment Runner Layout (Strict Single-Focus Corridor)**
```tsx
'use client';
import { useState, useEffect } from 'react';

export default function AssessmentRunner() {
  const [activeItem, setActiveItem] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Psychomotor latch & desktop keyboard shortcut listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isLocked) return;
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        handleScoreSelect(parseInt(e.key, 10));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, activeItem]);

  return (
    <main className="min-h-screen bg-[#08090C] text-white flex flex-col items-center justify-center p-4">
      {/* Strict 680px Focus Corridor (Hick-Hyman Cognitive Tunnel) */}
      <div className="w-full max-w-[680px] bg-[#12151D] border border-white/[0.08] rounded-2xl p-8 relative overflow-hidden">
        <div className="text-xs font-mono text-[#D4F024] mb-2">ITEM {activeItem + 1} OF 24</div>
        <h2 className="text-xl font-medium mb-6">Saya lebih memilih merencanakan langkah secara terstruktur sebelum bertindak.</h2>
      </div>
    </main>
  );
}
```

### **9.3 Web Storage API Session Persistence Contract (Zero-Backend Engine)**
```ts
export interface WatqAssessmentSession {
  sessionId: string;           // RFC 9562 UUID v4
  startedAt: number;           // Unix epoch timestamp
  completedAt?: number;
  activeQuestionIndex: number; // 0..23
  responses: Record<number, 1 | 2 | 3 | 4 | 5>;
  calculatedScores?: {
    EI: number; // -12 .. +12
    SN: number; // -12 .. +12
    TF: number; // -12 .. +12
    JP: number; // -12 .. +12
  };
  mbtiResult?: string;         // e.g. "INTJ"
}

const STORAGE_KEY = 'watq_mvp_session_v1';

export function saveSession(session: WatqAssessmentSession): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function loadSession(): WatqAssessmentSession | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : null;
}
```

### **9.4 Web Audio API Synthetic Haptic Sound System**
```ts
class WatqWebAudioSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  public playLikertTone(score: number): void {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const freqs: Record<number, number> = { 1: 220.0, 2: 261.63, 3: 329.63, 4: 392.0, 5: 440.0 };
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freqs[score] || 329.63, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }
}
export const watqAudio = new WatqWebAudioSynth();
```

---

# **10. SINGLE SOURCE OF TRUTH DIRECTORY**

| Specification Domain | File Path | Media Domain |
| :--- | :--- | :--- |
| **Master Software Manual** | [`docs/01-brd.md`](file:///d:/watq/docs/01-brd.md) | Single Source of Truth |
| **Interactive Guidelines Portal** | [`apps/web/public/brand/brand-guidelines.html`](file:///d:/watq/apps/web/public/brand/brand-guidelines.html) | Standalone HTML5/CSS/JS Lab |
| **Master React Component** | [`apps/web/src/components/brand/WatqLogo.tsx`](file:///d:/watq/apps/web/src/components/brand/WatqLogo.tsx) | Production Next.js 16 Component |
| **Production Vector Catalog** | [`apps/web/public/brand/`](file:///d:/watq/apps/web/public/brand/) | 10 Canonical SVG Assets (Dark & Light Variants) |
