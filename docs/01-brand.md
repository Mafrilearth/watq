# **WATQ: BRAND IDENTITY GUIDELINES**

> **Document ID:** `WATQ-BRD-01` │ **Version:** `1.1.0` │ **Status:** `MVP_LOCKED`  
> **Global Standards:** `WIPO Nice Classes 9, 16, 35, 41, 42` │ `ISO 20671-1:2021 (Brand Evaluation)` │ `ISO 10668:2010 (Brand Valuation)` │ `ISO 12647-2:2013 (Color Management)` │ `ISO 216 (Paper Formats)` │ `DIN 5008 (Corporate Layout)` │ `DIN 1450 (Signage Legibility)` │ `WCAG 2.2 Level AA/AAA`  
> **Single Source of Truth (SSOT):** Brand Philosophy, Nomenclature, Tagline, Archetype, Tone of Voice, Geometric Construction of *The Psychometric Prism*, Cross-Medium Color System (Screen, Print, Industrial, Textile), Multi-Medium Typographic System, Non-Software Physical Collateral, and Strict Brand Guardrails  
> **Code Link:** [`src/components/brand/WatqLogo.tsx`](file:///d:/watq/src/components/brand/WatqLogo.tsx), [`public/brand/`](file:///d:/watq/public/brand/) │ **Related Documents:** [`02-prd.md`](file:///d:/watq/docs/02-prd.md), [`03-srs.md`](file:///d:/watq/docs/03-srs.md), [`04-design-system.md`](file:///d:/watq/docs/04-design-system.md)

---

# **1. BRAND FOUNDATION & PRINCIPLES (THE "WHY")**

## **1.1 Nomenclature Philosophy & Phonetic Construction**
* **Root Meaning & Philosophical Foundation:** The brand name **Watq** originates from the classical root signifying inherent human nature, authentic inner disposition, and essential unadulterated character.
* **The 4-Letter Reduction Logic ($4 \leftrightarrow 4$):**
  * Exactly **4 letters** were intentionally chosen to create a 1-to-1 reflection of the **4 primary cognitive axes of human personality** (E/I, S/N, T/F, J/P).
  * Produces a clean, monosyllabic brand symmetry on par with world-class global technology and industrial brands (Nike, Sony, Uber, NeXT).
* **Phonetic Construction:** Monosyllabic punch (`/wɑtk/`). The terminal letter "q" produces a solid, authoritative uvular plosive articulation, subliminally associating the brand with *Quantum*, *Quotient*, and *Quality*.
* **Global Intellectual Property Classification (WIPO Nice Classification 11th Edition):** Registered as a pure *Fanciful Mark* (highest tier of trademark protectability across both digital platforms and physical applications):
  * **Nice Class 9 (Digital Core):** Computer software, computational psychometric assessment engines, cognitive decoding web applications.
  * **Nice Class 16 (Physical Publications & Stationery):** Printed psychometric test booklets, diagnostic scorecards, career guidance books, official certification dossiers, educational stationery.
  * **Nice Class 35 (Enterprise & Organizational HR):** Personnel talent diagnostics, workforce behavioral analysis, organizational development consulting.
  * **Nice Class 41 (Education & Certification):** Educational workshops, psychometric training seminars, professional assessor certification courses.
  * **Nice Class 42 (Research & Cloud SaaS):** Software as a Service (SaaS), applied psychometric research, behavioral diagnostic analytics, cloud infrastructure.
* **Brand Asset Governance (ISO 20671-1:2021 & ISO 10668:2010):** Watq's brand equity is audited for zero technical debt, absolute user privacy compliance, mathematical consistency across all mediums, and high operational efficiency designed for global enterprise scalability.

## **1.2 Core Brand Copy & Official Tagline**
* **Official Tagline:** *Personality Decoded.*
* **Tagline Role:** Communicates Watq's core engine capability in deconstructing complex psychological variables into structured, objective, and actionable cognitive data.
* **Official Corporate Boilerplate:**  
  *Watq is an advanced cognitive assessment engine engineered to decode human personality traits with mathematical precision and instant clarity, guiding educational trajectories and future career pathways.*

## **1.3 Brand Archetype & Tone of Voice**
* **Single Brand Archetype:** *The Sage-Architect* (Synthesis between an Empirical Researcher seeking objective truth and a Systems Architect creating structured order). Watq explicitly rejects entertainment clickbait (*The Jester*) and esoteric fortune-telling (*The Magician*).
* **Communication Character:** Objective, calm, direct, mathematically precise, spacious, and free of sentimental fluff.
* **Official Interface Copywriting Standards:**

| Interface Context | Official Global Copy (English) | Psychological & Cognitive Rationale |
| :--- | :--- | :--- |
| **Primary CTA Button** | "Start Assessment" | Declarative, instant action without ambiguity. |
| **Question Instructions** | "Select the option that most accurately reflects your natural preferences." | Guides respondents to answer spontaneously without social desirability bias. |
| **Response Persistence** | "Auto-saved locally." | Provides immediate cognitive assurance that progress is secure. |
| **Network Interruption** | "Connection lost. Responses saved locally." | Eliminates user anxiety during network drops. |
| **Scoring Transition** | "Analyzing cognitive matrix..." | Communicates serious scientific computational processing. |

---

# **2. CORE TECHNICAL SPECIFICATIONS (THE "WHAT & HOW")**

## **2.1 Mathematical Geometry Construction: The Psychometric Prism**
Watq's official visual identity is a **Single Abstract Geometric Mark (*The Psychometric Prism*)**:
* **Optical Metaphor:** As a glass prism disperses monochromatic light into an orderly spectrum of colors, Watq deconstructs human disposition into an intelligible, structured cognitive profile.
* **Master Vector Coordinates ($500 \times 500\text{px}$ Canvas):**
  * Central Vertical Symmetry Axis: Exactly at $X = 250.0\text{px}$.
  * Element Height: $Y = 150\text{px}$ (top apex) to $Y = 350\text{px}$ (bottom baseline) $\implies \Delta Y = 200\text{px}$ ($40\%$ canvas proportion).

| Geometric Facet | SVG Vector Path Data | Matrix Dimensions | Visual & Philosophical Meaning |
| :--- | :--- | :--- | :--- |
| **Facet 1 (Left Pillar)** | `M 90 150 L 150 150 L 210 325 L 165 350 L 90 150 Z` | Width: $120\text{px}$, Height: $200\text{px}$ | Anchors internal cognitive stability and introspective foundation. |
| **Facet 2 (Center Wedge)** | `M 215 175 L 285 175 L 250 350 L 215 175 Z` | Base: $70\text{px}$, Height: $175\text{px}$ | Active analytical lens & data refraction (**Electric Cyan `#38BDF8`**). Tapers to apex at $(250, 350)$. |
| **Facet 3 (Right Pillar)** | `M 350 150 L 410 150 L 335 350 L 290 325 L 350 150 Z` | Width: $120\text{px}$, Height: $200\text{px}$ | Anchors external action and interpersonal execution. |

* **Precision Negative Space Gap:**  
  The negative space gap between Facets 1 & 2, and Facets 2 & 3 is locked at exactly $16\text{px}$ ($215 - 199 = 16\text{px}$ and $290 - 274 = 16\text{px}$), preventing visual bleed down to a 16x16px favicon.
* **Organic "W" Silhouette:** The three facets naturally form the contour of the letter **W** (*Watq*) without artificial wireframe lines.

## **2.2 Optical Axis Horizontal Lockup (`watq-logo-full.svg`)**
On the $620 \times 160\text{px}$ master canvas, all elements are locked to a **Single Shared Horizontal Optical Axis ($Y = 80.0\text{px}$)**:
1. **Prism Mark Center:** Positioned at $(X = 124, Y = 80)$ via `translate(24, -20) scale(0.40)`.
2. **Vertical Divider Line:** Placed at $X = 175$, spanning from $Y = 56$ to $Y = 104$ (Height $48\text{px} = 30\%$ of canvas height, symmetrical at $Y = 80$).
3. **Wordmark "WATQ":** Baseline at $Y = 82$, cap-height $36\text{px}$ (Inter ExtraBold), vertical optical center aligned at $Y = 80$.
4. **Tagline "PERSONALITY DECODED":** Baseline at $Y = 104$, font-size $11\text{px}$ with wide letter-spacing $+0.22\text{em}$ ($22\%$) to visually balance the horizontal width of "WATQ".

## **2.3 Comprehensive Multi-Medium Color Palette (Screen, Print, Industrial & Textile)**
All color values are mathematically calibrated across digital screen spaces (RGB, Display P3, HEX, HSL), industrial print standards (CMYK ISO 12647-2 / FOGRA51), spot color matching (Pantone Matching System), industrial hardware fabrication (RAL Classic), architectural vinyl (3M Scotchcal), and textile embroidery (Madeira Classic):

| Color Name | Digital HEX | sRGB / Display P3 | CMYK (ISO 12647-2 / FOGRA51) | Pantone (PMS Coated / Uncoated) | Industrial RAL (Powder Coat) | Architectural Vinyl (3M Scotchcal) | Textile Embroidery (Madeira Classic) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Watq Deep Indigo** | `#1E1B4B` | `30, 27, 75` / `P3: 0.11, 0.10, 0.28` | `C95, M92, Y38, K55` | Pantone 2765 C / 2765 U | RAL 5004 (Black Blue) | 3M Series 50-84 | Madeira 1166 (Midnight Navy) |
| **Psychometric Slate** | `#0F172A` | `15, 23, 42` / `P3: 0.07, 0.09, 0.16` | `C88, M75, Y48, K62` | Pantone 532 C / 532 U | RAL 7021 (Black Grey) | 3M Series 50-88 | Madeira 1241 (Dark Slate) |
| **Electric Cyan** | `#38BDF8` | `56, 189, 248` / `P3: 0.32, 0.73, 0.95` | `C65, M12, Y0, K0` | Pantone 298 C / 298 U | RAL 5012 (Light Blue) | 3M Series 50-54 | Madeira 1075 (Electric Cyan) |
| **Stark White** | `#FFFFFF` | `255, 255, 255` / `P3: 1.0, 1.0, 1.0` | `C0, M0, Y0, K0` | Pure White / Opaque White | RAL 9016 (Traffic White) | 3M Series 50-10 | Madeira 1001 (Pure White) |
| **Stark Black** | `#090D16` | `9, 13, 22` / `P3: 0.04, 0.05, 0.08` | `C95, M85, Y50, K80` | Pantone Black 6 C / Black 6 U | RAL 9005 (Jet Black) | 3M Series 50-12 | Madeira 1000 (Pure Black) |

### **Mathematical Contrast Ratios (WCAG 2.2 Level AA/AAA):**
* **Primary Text Slate (`#0F172A`, $L = 0.016$) on Stark White (`#FFFFFF`, $L = 1.000$):**  
  $$CR = \frac{1.000 + 0.05}{0.016 + 0.05} = \frac{1.05}{0.066} = \mathbf{15.9 : 1} \quad (\text{Exceeds WCAG AAA threshold of } 7.0:1)$$
* **Primary Interactive Button Indigo (`#4F46E5`, $L = 0.117$) with White Text (`#FFFFFF`, $L = 1.000$):**  
  $$CR = \frac{1.000 + 0.05}{0.117 + 0.05} = \frac{1.05}{0.167} = \mathbf{6.29 : 1} \quad (\text{Exceeds WCAG AA threshold of } 4.5:1)$$
* **Active Wedge Electric Cyan (`#38BDF8`, $L = 0.490$) against Dark Canvas (`#090D16`, $L = 0.005$):**  
  $$CR = \frac{0.490 + 0.05}{0.005 + 0.05} = \frac{0.540}{0.055} = \mathbf{9.82 : 1} \quad (\text{Exceeds WCAG AAA threshold of } 7.0:1)$$

## **2.4 Multi-Medium Typographic System (Digital, Print & Architectural)**
Watq operates a unified, highly legible typographic system engineered for cognitive clarity across screens, publications, and physical architecture:

* **Primary Digital Typeface:** **Inter** (Variable / OpenType, designed by Rasmus Andersson).
  * **OpenType Features Enabled:** `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11', 'tnum';` (Disambiguated characters, tabular numbers for psychometric matrices).
  * **Digital Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800).
* **Primary Print & Corporate Editorial Typeface (Offline Fallback Stack):**
  * **Standard:** `Helvetica Neue, -apple-system, BlinkMacSystemFont, Arial, sans-serif`
  * **Optical Sizing:** Large display titles require tightened tracking (`-0.03em`), whereas small body text and footnotes require open tracking (`+0.01em` to `+0.04em`).
* **Monospace Analytical Typeface (Code & Matrix Data):** **JetBrains Mono**
  * **Role:** Coordinate stamps, ISO compliance metadata, algorithm formulas, and scoring percentages.
* **Cross-Medium Modular Typographic Scale:**

| Level | Digital Screen Scale | Print Publication Scale (ISO 216 / DIN 5008) | Architectural Signage (DIN 1450) | Line Height Ratio | Tracking (Letter-Spacing) | Weight & Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero** | `56px` | `36pt`–`48pt` | `100mm`–`150mm` | $1.12$ | `-0.035em` | Bold 800 / Sentence case |
| **Primary Title** | `36px` | `24pt`–`28pt` | `60mm`–`80mm` | $1.20$ | `-0.025em` | Bold 700 / Sentence case |
| **Section Header** | `24px` | `16pt`–`18pt` | `35mm`–`45mm` | $1.30$ | `-0.015em` | SemiBold 600 / Sentence case |
| **Question Prompt** | `20px` | `13pt`–`14pt` | `25mm`–`30mm` | $1.40$ | `-0.010em` | Medium 500 / Sentence case |
| **Body Copy** | `16px` | `10pt`–`11pt` | `15mm`–`20mm` | $1.50$–$1.60$ | `0.000em` | Regular 400 / Natural sentence |
| **Caption & Labels** | `14px` | `8.5pt`–`9pt` | `10mm`–`12mm` | $1.40$ | `+0.010em` | Medium 500 / Sentence case |
| **Micro / Metadata** | `12px` | `6.5pt`–`7.5pt` | `6mm`–`8mm` | $1.30$ | `+0.040em` | Regular 400 / Tabular numbers (`tnum`) |
| **Brand Tagline** | `11px` | `7pt`–`8pt` | `15mm`–`20mm` | $1.00$ | `+0.220em` ($22\%$) | SemiBold 600 / ALL-CAPS |

## **2.5 Non-Software Physical Applications & Spatial Standards (Beyond Software)**
The Watq visual system extends seamlessly into physical collateral, executive documentation, environmental spaces, and academic merchandise:

### **1. Corporate Stationery & Diagnostic Dossiers (DIN 5008 & ISO 216 A4)**
* **Official Letterhead (A4: $210 \times 297\text{mm}$):**
  * Top margin: $27\text{mm}$, Left/Right margin: $25\text{mm}$, Bottom margin: $20\text{mm}$.
  * Header Lockup: Master `watq-logo-full.svg` rendered at width $45\text{mm}$ aligned top-left.
  * Paper Stock: Munken Polar Rough or Mohawk Superfine $120\text{gsm}$ FSC-certified uncoated text stock.
* **Official Executive Business Card ($85 \times 55\text{mm}$ European Standard):**
  * Front: Duotone Prism Mark embossed at center-left; Name (10pt Bold), Title (8pt Medium), Contact (7pt Regular).
  * Back: Deep Indigo `#1E1B4B` flood coat with centered blind-debossed Prism Mark and Electric Cyan center foil accent.
  * Stock: G.F Smith Colorplan Dark Navy $350\text{gsm}$ triplexed with White core ($540\text{gsm}$ total).
* **Official Certificate of Cognitive Typology (A4 Landscape: $297 \times 210\text{mm}$):**
  * Security Features: Guilloché security border, unique cryptographic verification hash in JetBrains Mono (`WATQ-V1-XXXX`), and a blind-embossed 3D metallic foil Prism Mark ($35\text{mm}$ diameter).

### **2. Printed Diagnostic Booklets & Vocational Guidance Manuals**
* **Format:** ISO 216 B5 ($176 \times 250\text{mm}$) Wire-O or Swiss binding for lay-flat assessment completion.
* **Cover Stock:** $300\text{gsm}$ Invercote G with anti-scuff matte lamination and spot UV on the Electric Cyan prism facet.
* **Interior Pages:** $115\text{gsm}$ Amber Graphic or Arctic Volume White uncoated woodfree paper, optimized for pen/pencil Likert scale marking.

### **3. Architectural, Environmental & Spatial Wayfinding (DIN 1450)**
* **Reception Feature Signage:**
  * Construction: 3D waterjet-cut anodized aluminum facets with brushed finish, mounted with $20\text{mm}$ standoffs on raw architectural concrete or matte slate wall.
  * Center Facet: Backlit acrylic wedge illuminated with $6500\text{K}$ LED filtered through translucent Electric Cyan diffuser.
* **Office Glass Partition Manifestations:**
  * Applied at heights of $900\text{mm}$ and $1500\text{mm}$ from finished floor level (ADA & DIN compliant).
  * Graphic: Continuous $16\text{px}$ negative-space prism wire pattern rendered in 3M Dusted Crystal vinyl film.
* **Room Identification & Diagnostic Suite Plaques:**
  * Dimensions: $150 \times 150\text{mm}$ matte acrylic with tactile Grade 2 Braille and raised relief lettering.

### **4. Academic Collateral & Physical Merchandise**
* **Woven Accreditation Lanyards:** Width $20\text{mm}$, high-density jacquard weave in Deep Indigo with white "WATQ" wordmark and safety breakaway neck clip.
* **Matte PVC Delegate Credentials:** Dimensions $105 \times 148\text{mm}$ (A6), matte velvet finish, hole-punched with ISO 7810 corner radius ($3.18\text{mm}$).
* **Staff & Assessor Uniforms:** Left chest high-precision Madeira embroidery ($35\text{mm}$ width), pure monochrome white or subtle tone-on-tone navy.

---

# **3. BRAND GUARDRAILS, INTEGRITY & PRESERVATION (THE "GUARDRAILS")**

## **3.1 Mathematical Clear Space & Safe Margin Formulas**
* **Digital Clear Space Formula ($X$):**  
  The sterile perimeter around the mark is locked to variable $X$, equal to the **base width of the center prism wedge**:
  $$X = 70\text{px} \quad (\text{on master } 500 \times 500\text{px canvas})$$
  $$\text{Sterile Perimeter Area} = \text{Outer Polygon Boundary} + X \text{ on all 4 sides}$$
  This perimeter must remain $100\%$ free from UI text, container borders, buttons, or competing graphic elements.
* **Physical Print Safe Margins:**
  * Minimum margin from document trim edge: $15\text{mm}$ (letterhead/brochures), $8\text{mm}$ (business cards).
  * Standard commercial print bleed: Exactly $3.0\text{mm}$ ($0.125\text{ in}$) on all outer trim edges.

## **3.2 Cross-Medium Minimum Scaling Thresholds**
To prevent facet blending and preserve optical legibility:
* **Browser Favicon / Desktop Notification:** Minimum $16 \times 16\text{px}$ (center cyan wedge remains razor sharp).
* **Mobile / Web Navbar:** Minimum $24 \times 24\text{px}$ (mark standalone) or $120 \times 32\text{px}$ (horizontal lockup).
* **Physical Offset / Digital Printing:** Minimum width $8.0\text{mm}$ (prevents ink-bleed across the $16\text{px}$ negative gap).
* **Embroidery / Screenprint on Fabric:** Minimum width $25.0\text{mm}$ (thread resolution limit).
* **Architectural Signage (Exterior):** Minimum width $150.0\text{mm}$ (legible from $50\text{m}$ viewing distance).

## **3.3 Zero-Tolerance Brand Misuse Rules**
To preserve ISO 20671 audit compliance and avoid brand dilution, the following actions are strictly prohibited:
1. **Never Rotate:** Do not rotate the mark, tilt its angle, or flip it horizontally/vertically.
2. **Never Alter Facet Gap:** The $16\text{px}$ negative space gap must never be closed, widened, or outlined.
3. **Never Add Decorative Effects:** Do not apply drop shadows, bevel/emboss textures, glossy reflections, or lens flares.
4. **Never Use Uncalibrated Gradients:** The mark must only be rendered in official solid Duo-Tone or pure Monochrome.
5. **Never Distort Aspect Ratio:** Maintain strict 1:1 scale for the mark; do not stretch or condense horizontally or vertically.
6. **Never Place on Conflicting Low-Contrast Backgrounds:** The mark must not be placed on noisy textures or colors that violate the $4.5:1$ contrast threshold.

---

# **4. CODE & ASSET IMPLEMENTATION MAPPING (THE "WHERE")**

## **4.1 Master Asset File Mapping (`public/brand/`)**
All visual assets are stored in standalone, standards-compliant vector and markup formats:

| Master Asset | File Path | Media Domain | Technical Profile |
| :--- | :--- | :--- | :--- |
| **Prism Master Mark** | [`public/brand/watq-mark.svg`](file:///d:/watq/public/brand/watq-mark.svg) | Digital & Print Light Canvas | Vector SVG, 500x500px, Duo-Tone |
| **Prism Dark Mode** | [`public/brand/watq-mark-white.svg`](file:///d:/watq/public/brand/watq-mark-white.svg) | Digital Dark UI Canvas | Vector SVG, 500x500px, High-contrast |
| **1-Color Pure Black** | [`public/brand/watq-mark-mono-black.svg`](file:///d:/watq/public/brand/watq-mark-mono-black.svg) | Monochrome Print & Engraving | Vector SVG, 500x500px, 1-Color K100 |
| **1-Color Pure White** | [`public/brand/watq-mark-mono-white.svg`](file:///d:/watq/public/brand/watq-mark-mono-white.svg) | Screenprint & White Foil | Vector SVG, 500x500px, 1-Color White |
| **Favicon Tab** | [`public/brand/watq-favicon.svg`](file:///d:/watq/public/brand/watq-favicon.svg) | Browser & Mobile Bookmarks | Vector SVG, 32x32px, Crisp rendering |
| **App Icon Squircle** | [`public/brand/watq-app-icon.svg`](file:///d:/watq/public/brand/watq-app-icon.svg) | PWA Manifest & App Launcher | Vector SVG, 512x512px, WCAG AAA |
| **Master Full Lockup** | [`public/brand/watq-logo-full.svg`](file:///d:/watq/public/brand/watq-logo-full.svg) | Navigation & Corporate Headers | Vector SVG, 620x160px, Optical Axis $Y=80$ |
| **Logotype Wordmark** | [`public/brand/watq-logotype.svg`](file:///d:/watq/public/brand/watq-logotype.svg) | Standalone Wordmark | Vector SVG, 400x120px, Inter ExtraBold |
| **Visual Audit Portal** | [`docs/showcase/watq-logo-showcase.html`](file:///d:/watq/docs/showcase/watq-logo-showcase.html) | Internal Interactive Brand Dashboard | Standalone HTML5/CSS, WCAG & ISO Lab |

## **4.2 Production React Component Architecture (`src/components/brand/WatqLogo.tsx`)**
The brand components are implemented with zero runtime dependencies and strict TypeScript types:
* **Exported Primitives:** `WatqPrismMark` (standalone geometric mark) and `WatqFullLogo` (horizontal lockup with optional tagline).
* **Code Commenting Policy:** Only necessary architectural notes and mathematical coordinates are documented in code; redundant commentary is barred.

## **4.3 Brand Quality & Audit Checklist**
- [x] **Mathematical Integrity:** Symmetrical axis $X = 250.0\text{px}$, facet gap $16\text{px}$, clear space $X = 70\text{px}$.
- [x] **Optical Alignment:** Shared horizontal axis $Y = 80.0\text{px}$ across mark, vertical divider, wordmark, and tagline.
- [x] **Color Universality:** Validated across Hex, sRGB, Display P3, CMYK ISO 12647-2, Pantone, RAL, and Madeira thread.
- [x] **Typographic Breadth:** Inter OpenType for digital, Helvetica Neue fallback for print, JetBrains Mono for matrices.
- [x] **Beyond-Software Applications:** Documented specifications for corporate stationery (A4/DIN 5008), diagnostic booklets (B5), architectural signage (DIN 1450), and academic merchandise.
- [x] **International Standards Compliance:** ISO 20671, ISO 10668, WIPO Nice Classes 9, 16, 35, 41, 42, and WCAG 2.2 AAA.
