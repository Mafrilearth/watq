# **WATQ: OFFICIAL UNIVERSAL MVP FEATURE SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-02` │ **Versi:** `1.0.0` │ **Status:** `MVP_ACTIVE`  
> **Standar Global:** `IPIP (Goldberg 1999)` │ `Jungian Types (1921)` │ `Marston DISC (1928)` │ `Holland RIASEC (1959)`  
> **Otoritas Tunggal (SSOT):** Spesifikasi Fungsional Fitur MVP, Cakupan 5 Instrumen Psikometri, & Logika 5 Modul Inti  
> **Implementasi Kode:** [`src/app/assess/`](file:///d:/watq/src/app/assess/), [`src/lib/scoring/`](file:///d:/watq/src/lib/scoring/) │ **Terkait:** [`WATQ-DOC-04`](file:///d:/watq/docs/04-user-flow-specification.md), [`WATQ-DOC-07`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md)

---

# **1\. FONDASI, TUJUAN & PRINSIP REKAYASA FITUR**

## **1.1 Prinsip Desain Rekayasa Fitur MVP**

Setiap fitur dalam spesifikasi MVP Watq dirancang untuk memenuhi tiga kriteria ketat rekayasa perangkat lunak:

* **Multi-Instrument Agnostic:** Arsitektur sistem dapat mengeksekusi beragam model psikometrik global tanpa mengubah struktur kode inti (*core engine*).  
* **Zero-Friction Execution:** Pengguna menyelesaikan asesmen tanpa tahapan registrasi akun di awal, tanpa CAPTCHA yang menghambat, dan dengan latensi sub-150ms.  
* **Deterministic Single Decision:** Seluruh pilihan teknis dikunci pada tepat satu solusi spesifik dengan keandalan produksi tertinggi.

## **1.2 Cakupan Bundel 5 Instrumen Inti MVP**

MVP Watq secara bawaan (*out-of-the-box*) menyertakan dukungan terhadap 5 model psikometri terkemuka:

1. **Model 1: Big Five Trait Spectrum (IPIP-50 OCEAN):** Mengukur 5 domain spektrum kepribadian berkelanjutan (*Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism*) via 50 butir skala Likert 5-poin.  
2. **Model 2: Tipologi Kognitif Jungian 16 Arketipe (MBTI-Equivalent):** Mengukur 4 aksis dikotomi preferensi mental (E-I, S-N, T-F, J-P) via 60 butir format pilihan biner paksa (*ipsative forced-choice*).  
3. **Model 3: Kuadran Dinamika Kerja DISC:** Mengukur 4 gaya perilaku lingkungan kerja (*Dominance, Influence, Steadiness, Compliance*) via 24 matriks 'Paling Menggambarkan (Most)' dan 'Paling Tidak Menggambarkan (Least)'.  
4. **Model 4: Motivasi Inti Enneagram 9 Tipe:** Memetakan motivasi bawah sadar dan fiksasi emosional ke dalam 9 tipe karakter utama via 36 butir evaluasi preferensi beserta analisis sayap (*adjacent wings*).  
5. **Model 5: Penyelarasan Karier Vokasional Holland (RIASEC):** Mengukur preferensi minat okupasional dalam 6 tema minat kerja (*Realistic, Investigative, Artistic, Social, Enterprising, Conventional*) via 48 butir asesmen.

---

# **2\. SPESIFIKASI TEKNIS DEFINITIF MODUL INTI MVP**

## **2.1 Modul 1: Universal Assessment Delivery Engine**

* **Fitur 1.1 Multi-Paradigm Item Dispatcher:**  
  * Format Skala Likert 5-poin & 7-poin beranimasi mikro (120ms) dengan pemetaan pintasan keyboard fisik numerik (`1`–`5` / `1`–`7`).  
  * Format Kartu Biner Komparatif Ipsatif (Pilihan A vs Pilihan B) untuk tipologi kognitif.  
  * Format Matriks Kuadran Seleksi Ganda (Most vs Least) untuk evaluasi DISC.  
  * Auto-Advance: Jeda visual presisi 180ms pasca-klik sebelum beralih ke butir berikutnya secara otomatis.  
* **Fitur 1.2 Guest-First Session Orchestrator:**  
  * Pembuatan pengenal sesi unik (`participant_id`) menggunakan Web Crypto API standar (`crypto.randomUUID()`) langsung di peramban klien.  
  * Inisialisasi baris sesi di basis data dengan status `in_progress` dan rekaman waktu `started_at` berbasis UTC.  
* **Fitur 1.3 Dual-Write IndexedDB & Offline Resilience:**  
  * Penulisan lokal instan (<10ms) ke IndexedDB peramban pada setiap klik butir soal sebelum dikirim ke API server.  
  * Antrean pengiriman latar belakang (*background sync queue*) dengan algoritma *exponential backoff* saat offline.  
* **Fitur 1.4 Dynamic Progress & Latency Tracker:**  
  * Formula Progres: $P = (Q_{\text{completed}} / Q_{\text{total}}) \times 100$.  
  * Formula Estimasi Waktu Tersisa (ETA): $T_{\text{rem}} = (Q_{\text{total}} - Q_{\text{completed}}) \times \mu_{\text{latency}}$ (Default $\mu_{\text{latency}} = 6.2$ detik/butir).

## **2.2 Modul 2: Deterministic Scoring & Aggregation Engine**

* **Fitur 2.1 Multi-Methodology Scoring Pipeline (Edge Serverless Function):**  
  * Pembalik Kunci Otomatis (*Reverse Keying*): $R = (\text{Scale}_{\max} + \text{Scale}_{\min}) - X$ untuk butir dengan `is_reversed = true`.  
  * Agregasi Dimensi Lintas Model:  
    * Trait Score: Penjumlahan nilai mentah dinormalisasi ke persentase 0–100% per domain.  
    * Duality Differential (MBTI): Selisih persentase polaritas biner (e.g., $E\% = E / (E + I) \times 100$).  
    * Quadrant Vector (DISC): Penjumlahan skoring matriks diferensial Most minus Least.  
    * Modal Dominance (Enneagram): Penentuan tipe primer skor tertinggi beserta kalkulasi sayap *adjacent*.  
* **Fitur 2.2 Idempotent Result Storage & Audit Validator:**  
  * Pengikatan 1:1 pada `attempt_id` dengan konstrain basis data `UNIQUE`.  
  * Skema muatan payload terstandarisasi penuh dalam kolom JSONB `dimension_scores` dan `validity_metrics` (Lihat: [`07-database-architecture-ddl-specification.md`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md#L483)).

## **2.3 Modul 3: Interactive Visualization & Report Synthesizer**

* **Fitur 3.1 Universal 12-Dimensional Polar Canvas:**  
  * Grafik radar SVG dinamis berbasis Recharts, responsif di sisi klien, mengikat variabel CSS `--chart-dim-1` s.d. `--chart-dim-12`.  
* **Fitur 3.2 Automated Narrative Synthesis Engine:**  
  * Menghasilkan laporan naratif 4 bagian: Ringkasan Eksekutif, Kekuatan Kognitif, Titik Buta (*Blindspots*), dan Lingkungan Kerja Optimal.  
* **Fitur 3.3 Client-Side Vector PDF & Retina Card Exporter:**  
  * Ekspor dokumen vektor PDF A4 bebas watermark via `@react-pdf/renderer` di thread browser.  
  * Ekspor kartu visual PNG retina 2x untuk penyimpanan portofolio dan media sosial.

## **2.4 Modul 4: Viral Distribution & Sharing Loop**

* **Fitur 4.1 Dynamic Open Graph (OG) Generator:**  
  * Ditenagai oleh `@vercel/og` (Satori Engine) pada rute `/api/og/[attempt_id]` menghasilkan kartu sosial 1200x630px instan.  
* **Fitur 4.2 Cryptographic Shareable Link & Privacy Toggle:**  
  * URL permanen `/results/[attempt_uuid]` dengan sakelar privasi: Mode Publik vs Mode Privat.

## **2.5 Modul 5: Administrative Governance & Cohort Telemetry**

* **Fitur 5.1 Assessment Registry & Item Catalog Management:**  
  * Pengaktifan instrumen dan validasi integritas bank butir soal di konsol internal `/admin`.  
* **Fitur 5.2 Anonymized Cohort Analytics & Data Exporter:**  
  * Metrik penyelesaian pengerjaan (*Completion Rate*), sebaran kurva normal skor, dan ekspor CSV/JSON untuk riset statistik.

---

# **3\. KASUS TEPI, VALIDITAS & INTEGRITAS SISTEM**

## **3.1 Integritas Idempotensi & Audit Validitas**

* **Idempotensi Hasil:** Komputasi skor yang dipicu berulang kali menghasilkan hash dan nilai yang sama persis tanpa duplikasi baris database.
* **Deteksi Perilaku Manipulatif:** Menandai respons dengan parameter validitas (`is_speeding` untuk $\mu_{\text{latency}} < 1.8$ detik dan `is_straight_lined` untuk varians 0).
* **Segel SHA-256:** Hasil diverifikasi oleh hash kriptografis untuk mencegah modifikasi di browser.

---

# **4\. MATRIKS IMPLEMENTASI & INTEGRASI SISTEM**

## **4.1 Pemetaan Modul Kode Sumber (`src/`)**

| Modul Fitur MVP | Komponen Kode Sumber Utama | Rujukan Dokumen SSOT |
| :--- | :--- | :--- |
| **Delivery Engine (680px)** | [`src/app/assess/[slug]/page.tsx`](file:///d:/watq/src/app/assess/) | [`04-user-flow-specification.md`](file:///d:/watq/docs/04-user-flow-specification.md) |
| **Scoring Engine** | [`src/lib/scoring/engine.ts`](file:///d:/watq/src/lib/scoring/) | [`07-database-architecture-ddl-specification.md`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md) |
| **Visualizer & Report** | [`src/components/results/RadarChart.tsx`](file:///d:/watq/src/components/results/) | [`05-design-system-tokens-specification.md`](file:///d:/watq/docs/05-design-system-tokens-specification.md) |
| **Social OG Generator** | [`src/app/api/og/[id]/route.tsx`](file:///d:/watq/src/app/api/og/) | [`01-brand-identity-guidelines.md`](file:///d:/watq/docs/01-brand-identity-guidelines.md) |
| **Offline Persistence** | [`src/lib/storage/indexeddb.ts`](file:///d:/watq/src/lib/storage/) | [`04-user-flow-specification.md`](file:///d:/watq/docs/04-user-flow-specification.md) |
| **Infrastruktur Komputasi** | Vercel Edge Serverless Functions | [`06-tech-stack-infrastructure-specification.md`](file:///d:/watq/docs/06-tech-stack-infrastructure-specification.md) |
