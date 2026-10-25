# **WATQ — INITIAL PUBLIC MVP SPECIFICATION (STAGE 1 SCOPE)**

> **Document ID:** `WATQ-MVP-V1` │ **Version:** `1.0.0` │ **Status:** `LOCKED`  
> **Authority & Owner:** Fauzul (Platform Lead & Architect)  
> **Domain:** Personality & Cognitive Assessment (Universal Self-Report Inventory)  
> **Standard:** `ISO 9241-110:2020` │ `ITC/APA Computer-Based Testing` │ `GDPR Art. 5` │ `UU PDP No. 27/2022` │ `Likert (1932)`  
> **Core Principle:** Gampang, Mudah, Tanpa Ribet (Zero-Friction Public Personality Test)

---

## **1. EXECUTIVE SUMMARY & ARCHITECTURAL EQUILIBRIUM**

This specification defines the absolute minimal, non-reducible, zero-bloat foundation for the initial public release of **WATQ**. It establishes the exact role definition, 3-step linear userflow, functional features (bilingual: human-readable and technical equivalents), non-functional quality gates, and legal/psychometric justifications.

---

## **2. THE ROLE SPECIFICATION**

* **Role Identifier:** **`USER`**
* **Human Description:** Public visitor who takes the assessment to discover their personality and cognitive traits.
* **Technical Definition:** Anonymous Client / Public Guest operating via ephemeral client-side session state without requiring mandatory authentication or credential storage.

---

## **3. THE 3-STEP LINEAR USERFLOW**

```
┌─────────────────────────────────┐
│  STEP 1: ENTRY / HERO SECTION   │
│  User visits ➔ Reads 3s intro   │
│  ➔ Clicks "Mulai Tes"           │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│  STEP 2: ASSESSMENT RUNNER      │
│  Question by question (1 to 24) │
│  ➔ 5-Point Likert rating        │
│  ➔ Real-time progress bar       │
└────────────────┬────────────────┘
                 │
┌────────────────▼────────────────┐
│  STEP 3: DIAGNOSTIC DOSSIER     │
│  Instant personality archetype  │
│  ➔ Core traits & strengths      │
│  ➔ Action: "Ulangi Tes"         │
└─────────────────────────────────┘
```

---

## **4. EXPLICIT FUNCTIONAL FEATURES MATRIX**

| ID | Feature Name | Human / Plain Language Description | Technical Specification (Software Architecture) |
| :-: | :--- | :--- | :--- |
| **F-01** | **Hero & Start Action** | Halaman depan dengan judul tes, info waktu pengerjaan (~3 menit), dan tombol *"Mulai Tes"* tanpa formulir pendaftaran. | Zero-barrier landing view with client-side event trigger dispatching assessment mount (`isStarted: true`). |
| **F-02** | **Item Presentation** | Kalimat pernyataan situasi kehidupan sehari-hari disajikan satu per satu dengan tipografi nyaman dan fokus. | Single-item reactive view component bound to active item pointer index (`items[currentIndex]`). |
| **F-03** | **5-Point Response Scale** | Pilihan derajat persetujuan: *Sangat Tidak Setuju (1)* sampai *Sangat Setuju (5)*. | 5-point Likert scale controlled radio input group with keyboard shortcuts (`1` to `5`). |
| **F-04** | **Progress Tracking** | Garis visual dan teks penanda (contoh: *"Soal 5 dari 24"*) agar pengguna mengetahui posisi mereka. | Real-time progress indicator derived from `(currentIndex / totalItems) * 100%`. |
| **F-05** | **Bidirectional Navigation** | Tombol mundur untuk mengoreksi jawaban sebelumnya tanpa menghilangkan isian yang sudah dipilih. | State pointer decrement (`currentIndex - 1`) preserving answer map dictionary in local state. |
| **F-06** | **Completion Guard** | Mencegah hasil terbit jika ada pertanyaan yang terlewat atau belum dijawab tuntas. | Invariant validation gate (`Object.keys(responses).length === totalItems`). |
| **F-07** | **Instant Scoring Engine** | Mengolah seluruh jawaban menjadi tipe kepribadian matematis dalam tempo instan (<5 milidetik). | Client-side deterministic psychometric scoring algorithm execution. |
| **F-08** | **Personality Dossier** | Kartu kepribadian menampilkan nama arketipe, deskripsi karakter utama, dan gaya bersikap sehari-hari. | Diagnostic presentation component mapping dominant trait scores to archetype dossiers. |
| **F-09** | **Retake Action** | Tombol *"Ulangi Tes"* di bawah hasil untuk mengosongkan jawaban dan mengulang tes dari nomor satu. | State reset handler reinitializing responses to `{}` and setting pointer index to `0`. |

---

## **5. NON-FUNCTIONAL REQUIREMENTS & QUALITY GATES**

| ID | Quality Attribute | Human / User Experience Impact | Global Standard & Technical Target |
| :-: | :--- | :--- | :--- |
| **NF-01** | **Instant Performance** | Halaman terbuka cepat di HP dan tombol langsung merespons tanpa jeda loading. | *Google Core Web Vitals:* FCP < 0.8s, LCP < 1.2s, INP < 50ms, 60 FPS transitions. |
| **NF-02** | **Privacy by Design** | Pengguna aman: zero pencatatan email, nama, atau nomor telepon. Bebas was-was. | *GDPR Art. 5(1)(c) & UU PDP No. 27/2022:* Zero PII collection on anonymous assessment runs. |
| **NF-03** | **Fluid Ergonomics** | Tombol nyaman dipencet jempol di layar HP kecil (320px) hingga monitor desktop 4K. | *Apple HIG & Android Material:* Minimum touch target $44 \times 44\text{px}$. |
| **NF-04** | **Optical Accessibility** | Teks jelas, kontras tinggi, tidak menyilaukan mata, dan mudah dibaca siang/malam. | *W3C WCAG 2.2 Level AA / AAA:* Contrast ratio $\ge 7:1$ on core text surfaces. |

---

## **6. BOUNDARY ANALYSIS & JUSTIFICATION**

### **A. Why It CANNOT Be Reduced (Failure Simulation)**
* **Eliminating Step 1 (Hero):** Users landing directly on Question 1 without context experience high disorientation, resulting in $>60\%$ bounce rate.
* **Eliminating Step 2 (Questions):** Eliminates diagnostic data collection entirely.
* **Eliminating Step 3 (Result Dossier):** Denies value realization to the user.
* **Eliminating Back Navigation (F-05):** Traps users when touching the wrong option, causing immediate abandonment.
* **Eliminating Retake Action (F-09):** Creates a terminal dead-end requiring manual browser address bar reload.

### **B. Why It MUST NOT Be Expanded (Bloat Simulation)**
* **Adding Forced Authentication (Sign Up / Sign In):** Introduces massive onboarding friction, reducing completion rate by $70\%-80\%$.
* **Adding Payment / Paywall:** Destroys organic viral curiosity before the user experiences product value.
* **Adding Complex Social Share Integrations:** Inflates client bundle size without validated demand.

---

## **7. INTERNATIONAL STANDARDS CONFORMANCE**

1. **Psychometrics:** Conforms to *International Test Commission (ITC)* and *APA Standards for Psychological Testing* regarding item disclosure, completion verification, and meaningful trait interpretation.
2. **Interaction Design:** Conforms to *ISO 9241-110:2020* and *Jakob Nielsen's Usability Heuristics* (Visibility of System Status, User Freedom and Control, Error Prevention).
3. **Legal Compliance:** Complies fully with *GDPR Data Minimization* and *Indonesian Personal Data Protection Law (UU PDP)* through zero-PII anonymous execution.

---

*Certified & permanently locked as the official Stage 1 engineering baseline for Fauzul.*
