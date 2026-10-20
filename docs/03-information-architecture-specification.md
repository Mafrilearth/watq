# **WATQ: OFFICIAL UNIVERSAL INFORMATION ARCHITECTURE SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-03` │ **Versi:** `1.0.0` │ **Status:** `MVP_ACTIVE`  
> **Standar Global:** `W3C Schema.org (JSON-LD)` │ `RFC 3986 (URI Syntax)` │ `Open Graph Protocol (OGP)`  
> **Otoritas Tunggal (SSOT):** Taksonomi Sistem 5-Tier, Perutean Next.js App Router, Skema Rendering, & Metadata SEO  
> **Implementasi Kode:** [`src/app/(marketing)/`](file:///d:/watq/src/app/), [`src/app/(assessment)/`](file:///d:/watq/src/app/) │ **Terkait:** [`WATQ-DOC-02`](file:///d:/watq/docs/02-mvp-feature-specification.md), [`WATQ-DOC-04`](file:///d:/watq/docs/04-user-flow-specification.md)

---

# **1\. FONDASI, TUJUAN & HIERARKI SISTEM MULTI-TIER**

## **1.1 Taksonomi Sistem 5-Tier (Sitemap Arsitektural)**

Arsitektur informasi Watq disusun secara hierarkis dalam 5 tingkatan simpul logis (*node tiers*) guna memisahkan ranah pemasaran publik, alur asesmen terfokus 680px, laporan diagnostik permanen, komparasi relasional, dan tata kelola psikometrik:

```
[ROOT: watq.io]
│
├── Tier 1: Public Discovery & Empirical Foundation (Halaman Terbuka)
│   ├── / ............................... Landing Page & Multi-Instrument Selector
│   ├── /science ........................ Metodologi, Validitas Psikometri, & Standar Riset
│   ├── /instruments .................... Direktori Katalog Instrumen Psikometrik Universal
│   │   └── /instruments/[slug] ......... Detail Instrumen (Big Five, MBTI, DISC, Enneagram, RIASEC)
│   ├── /privacy ........................ Kebijakan Privasi & Kedaulatan Data Responden
│   └── /terms .......................... Ketentuan Layanan & Standar Lisensi Asesmen
│
├── Tier 2: Universal Assessment Delivery Engine (Zona Pengerjaan Terisolasi 680px)
│   └── /assess/[instrument_slug] ....... Inisialisasi Sesi Pengerjaan Instan (Guest-First)
│       └── [session_token] ............. State Pengerjaan Butir Soal (Distraction-Free Mode)
│
├── Tier 3: Diagnostic Synthesis & Permanent Results (Laporan Hasil & Arsip)
│   └── /results/[attempt_uuid] ......... Profil Kepribadian Komprehensif & Visualisasi Polar
│       ├── /export/pdf ................. Endpoint Unduh Dokumen Vektor PDF Standar A4
│       ├── /export/card ................ Endpoint Unduh Kartu Visual Resolusi Tinggi (Retina PNG)
│       └── /verify ..................... Verifikasi Integritas Hasil & Stempel Waktu Kriptografis
│
├── Tier 4: Relational Comparison & Dyadic Dynamics (Sistem Analisis Komparatif)
│   └── /compare/[uuid_a]/[uuid_b] ...... Analisis Komparasi Interpersonal 2 Profil
│
└── Tier 5: Administrative Governance & Psychometric Registry (Tata Kelola Tertutup)
    └── /admin .......................... Konsol Administrasi & Telemetri Kohort
        ├── /admin/instruments .......... Manajemen Butir Pertanyaan & Kunci Skoring
        └── /admin/analytics ............ Metrik Latensi, Completion Rate, & Kurva Distribusi Populasi
```

---

# **2\. SPESIFIKASI TEKNIS DEFINITIF PERUTEAN & KONTEN**

## **2.1 Skema Perutean URL & Strategi Caching (Next.js App Router)**

Mengadopsi pemisahan fisik tata letak (*Route Groups*) `(marketing)` dan `(assessment)`:

| Pola Rute URL | Tipe Rendering | Strategi Caching & Runtime | Otorisasi / Batasan Akses | Peruntukan Fungsional |
| :--- | :--- | :--- | :--- | :--- |
| `/` | SSG / ISR | Cache Tag: `landing-page` (Revalidasi 86400s) | Publik Bebas | Etalase utama, ringkasan proposisi nilai, dan pemilih instrumen. |
| `/instruments` | SSG / ISR | Cache Tag: `instrument-catalog` (Revalidasi 86400s) | Publik Bebas | Indeks katalog 5 model instrumen psikometrik universal. |
| `/instruments/[slug]` | SSG / ISR | Dynamic ISR berparameter slug valid | Publik Bebas | Edukasi landasan teori, jumlah butir, estimasi durasi, dan Cronbach's Alpha. |
| `/assess/[instrument_slug]` | Dynamic SSR | Edge Runtime, `no-store` (Inisialisasi `attempt_id`) | Publik / Anonim (Guest) | Inisialisasi baris pengerjaan baru di PostgreSQL dan sesi lokal. |
| `/results/[attempt_uuid]` | Dynamic SSR | Cached via SWR / Edge Cache Tag: `results-[uuid]` | Publik / Pemegang UUID | Visualisasi radar 12 dimensi, narasi kekuatan, blindspots, dan ekosistem kerja. |
| `/api/og/[attempt_id]` | Edge API | Vercel OG Satori, Immutable Cache 31536000s | Publik | Kompilasi otomatis kartu pratinjau sosial 1200x630px. |
| `/compare/[uuid_a]/[uuid_b]` | Dynamic SSR | Edge Runtime, kueri gabungan 2 baris `results` | Publik / Pemegang UUID | Pemetaan matriks kompatibilitas interpersonal 2 profil. |
| `/admin/*` | Dynamic SSR | Node.js Runtime, Private Middleware Protection | Khusus Akun Admin | Pengelolaan katalog instrumen, bank soal, dan analitik riset. |

## **2.2 Ontologi Entitas Psikometrik & Pemetaan 5 Model**

```
[CATALOG INSTRUMENT] (Big Five, MBTI, DISC, Enneagram, RIASEC)
   │
   └── [DIMENSIONAL DOMAIN / AXIS] (e.g., Extraversion, Thinking-Feeling, Dominance)
         │
         └── [FACET / SUB-SCALE] (e.g., Assertiveness, Gregariousness)
               │
               └── [QUESTION ITEM ENTITY] (order, prompt, polarity, modality)
```

1. **Big Five (IPIP-50 OCEAN):** 5 domain kontinu persentase 0–100%.
2. **Jungian (MBTI-Equivalent):** 4 aksis dikotomi polaritas menghasilkan 1 dari 16 kode (misal: INTJ).
3. **DISC Assessment:** 4 kuadran perilaku via diferensial Most minus Least.
4. **Enneagram:** 9 tipe karakter utama + sayap *adjacent* (*Wings*).
5. **Holland RIASEC:** 6 tema minat kerja menghasilkan 3 huruf skor teratas (*Holland Code*, misal: IAE).

## **2.3 Inventaris Konten Halaman Inti**

* **Halaman Pengerjaan (`/assess/[slug]`):**  
  * Fixed Top Metric Bar: Logo Monogram W+Q 24px, label instrumen, counter `24 / 50`, estimasi waktu.  
  * Progress Track Bar: Garis linier setinggi 6px (`h-1.5`) transisi 200ms.  
  * Focused Question Card: Kontainer 680px terpusat, teks soal 18px Inter Medium, tile opsi interaktif.  
  * Floating Sync Banner: Pita status persistensi lokal otomatis.  
* **Halaman Laporan Hasil (`/results/[uuid]`):**  
  * Hero Archetype Banner: Judul arketipe Heading 1 Bold 30px dan ringkasan eksekutif 2 paragraf.  
  * Polar Radar Canvas: Poligon SVG Recharts multi-aksis mengikat `--chart-dim-1` s.d. `--chart-dim-12`.  
  * Actionable Behavioral Matrix: Kartu Kekuatan Kognitif, Titik Buta (Blindspots), dan Ekosistem Kerja.  
  * Action Bar: Tombol Salin Tautan, Sakelar Privasi, Unduh Laporan PDF A4, Unduh Kartu Visual Retina PNG.

---

# **3\. KASUS TEPI, VALIDITAS & ATURAN WAYFINDING**

## **3.1 Aturan Wayfinding & Proteksi Alur**

* **Strict Flow Isolation:** Selama berada di URL `/assess/*`, navigasi header dan footer disembunyikan 100%. Percobaan keluar memicu modal konfirmasi dialog bawaan peramban (*Unsaved Navigation Warning*).
* **Result Permalinks:** Rute `/results/[attempt_uuid]` bersifat permanen (*immutable*). Pengguna dapat kembali ke tautan kapan pun tanpa batas kedaluwarsa.
* **Breadcrumb Semantik:** Digunakan hanya pada halaman publik (`/instruments` → `/instruments/[slug]`) untuk mempermudah indeks mesin perayap (SEO).

---

# **4\. MATRIKS IMPLEMENTASI & INTEGRASI SISTEM**

## **4.1 Skema Data Terstruktur Schema.org (JSON-LD)**

* **Halaman Katalog (`/instruments/[slug]`):** Schema `Quiz` / `SoftwareApplication` (nama metodologi, jumlah butir, estimasi durasi).
* **Halaman Laporan (`/results/[uuid]`):** Schema `ProfilePage` (arketipe utama, deskripsi karakter terenkripsi).

## **4.2 Pemetaan Struktur Berkas Rute (`src/app/`)**

| Simpul Rute URL | Berkas Komponen Next.js | Peran Arsitektur |
| :--- | :--- | :--- |
| `/` | [`src/app/(marketing)/page.tsx`](file:///d:/watq/src/app/) | Landing Page Publik |
| `/instruments/[slug]` | [`src/app/(marketing)/instruments/[slug]/page.tsx`](file:///d:/watq/src/app/) | Detail Katalog Instrumen |
| `/assess/[slug]` | [`src/app/(assessment)/assess/[slug]/page.tsx`](file:///d:/watq/src/app/) | Kontainer Asesmen 680px |
| `/results/[uuid]` | [`src/app/(assessment)/results/[uuid]/page.tsx`](file:///d:/watq/src/app/) | Laporan Diagnostik Permanen |
| `/compare/[a]/[b]` | [`src/app/(assessment)/compare/[a]/[b]/page.tsx`](file:///d:/watq/src/app/) | Komparasi Interpersonal 2 Profil |
