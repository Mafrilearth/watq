# **WATQ: OFFICIAL UNIVERSAL TECH STACK & INFRASTRUCTURE SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-06` │ **Versi:** `1.0.0` │ **Status:** `MVP_ACTIVE`  
> **Standar Global:** `ECMA-262 (ECMAScript 2024)` │ `RFC 9113 (HTTP/2 & HTTP/3)` │ `W3C Edge Runtime Standard`  
> **Otoritas Tunggal (SSOT):** Matriks 15 Lapis Teknologi Terkunci, Alur Request Pipeline <150ms, Ambang Batas Kuota Gratis ($0 OpEx), & Standar Tooling Developer  
> **Implementasi Kode:** [`package.json`](file:///d:/watq/package.json), [`next.config.ts`](file:///d:/watq/next.config.ts), [`drizzle.config.ts`](file:///d:/watq/drizzle.config.ts) │ **Terkait:** [`WATQ-DOC-07`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md), [`WATQ-DOC-11`](file:///d:/watq/docs/11-devops-cicd-disaster-recovery-specification.md)

---

# **1\. FONDASI, TUJUAN & PRINSIP REKAYASA INFRASTRUKTUR**

## **1.1 Kriteria Rekayasa Perangkat Lunak Universal**

Pemilihan stack teknologi Watq didasarkan pada empat kriteria ketat rekayasa perangkat lunak modern:

* **Zero Base Operational Expenditure ($0/Bulan):** Seluruh infrastruktur inti beroperasi penuh di atas kuota gratis berkapasitas besar (*generous free-tier*) atau lisensi sumber terbuka (*open-source*) tanpa biaya langganan tetap selama tahap pengembangan hingga fase pertumbuhan awal (0–50.000 pengguna aktif bulanan).  
* **Deterministic Single Decision:** Seluruh tingkatan arsitektur sistem dikunci pada tepat satu solusi spesifik dengan keandalan operasional tertinggi; mengeliminasi tumpang tindih alternatif atau variasi yang tidak teruji.  
* **Sub-150ms Global Latency:** Infrastruktur komputasi dan basis data terdistribusi di edge network internasional guna menjamin eksekusi interaksi kuesioner dan kalkulasi skor psikometri secara instan.  
* **Multi-Instrument Psychometric Agnosticism:** Fleksibilitas skema basis data dan tipe data dokumen JSONB yang mampu memproses model trait (Big Five), tipologi biner (MBTI), matriks kuadran (DISC), motivasi tipe (Enneagram), dan minat okupasional (RIASEC) dalam satu mesin terpadu.

---

# **2\. SPESIFIKASI TEKNIS DEFINITIF MATRIKS 15 LAPIS TEKNOLOGI**

## **2.1 Matriks Definitif Tooling & Lapisan Arsitektur**

| Lapisan Arsitektur | Teknologi Terpilih | Lisensi / Model Kuota | Peran & Batas Sumber Daya Gratis (Free Quota) |
| :--- | :--- | :--- | :--- |
| **1\. Core Full-Stack Framework** | **Next.js (App Router, React 19, TypeScript)** | Open-Source (MIT) | Server Components, Server Actions mutlak, optimasi bundling modern, tipe data end-to-end terisolasi. |
| **2\. Edge Hosting & Compute Engine** | **Vercel** | Hobby Free Tier | 100 GB Bandwidth/bulan, eksekusi Serverless Functions tanpa batas biaya, Edge Middleware, dan integrasi CI/CD otomatis. |
| **3\. Relational Database Engine** | **Supabase PostgreSQL** | Free Tier | Kapasitas 500 MB basis data relasional ANSI 3NF, Row Level Security (RLS), ekstensi pgvector, dan connection pooler Supavisor. |
| **4\. Database ORM & Migrations** | **Drizzle ORM + Drizzle Kit** | Open-Source (Apache 2.0) | Zero-runtime overhead, sintaks query SQL-like type-safe, dan pemetaan skema kolom PostgreSQL JSONB multi-instrumen. |
| **5\. In-Memory Cache & Rate Limiting** | **Upstash Redis** | Serverless Free Tier | 10.000 request/hari, protokol REST API kompatibel dengan edge serverless runtime, mitigasi brute-force, dan caching skor. |
| **6\. Object Storage & Asset CDN** | **Cloudflare R2** | Free Tier | 10 GB penyimpanan/bulan, 10 juta operasi baca (Class B)/bulan, 1 juta operasi tulis (Class A)/bulan, $0 biaya egress bandwidth. |
| **7\. Global DNS, WAF & DDoS Shield** | **Cloudflare** | Free Tier | Kueri DNS global tak terbatas, jaringan anycast CDN edge caching, SSL/TLS otomatis, mitigasi serangan DDoS Layer 3/4/7. |
| **8\. UI Primitives & Styling Engine** | **Tailwind CSS + shadcn/ui (Radix UI)** | Open-Source (MIT) | Nol runtime CSS, rendering utilitas atomik, kepatuhan aksesibilitas ARIA bawaan, token Slate & Deep Indigo terpadu. |
| **9\. Data Visualization Engine** | **Recharts (React SVG Engine)** | Open-Source (MIT) | Komponen grafik polar dan radar responsif, ringan di sisi klien, mengikat variabel CSS 12-dimensi secara agnostik. |
| **10\. Client Offline Persistence** | **IndexedDB (via native idb-keyval)** | Open-Source (Apache 2.0) | Penyimpanan lokal peramban hingga 80% sisa ruang disk fisik klien, non-blocking UI, penulisan jawaban sub-10ms. |
| **11\. Dynamic Social Image Engine** | **@vercel/og (Satori Engine)** | Open-Source (Apache 2.0) | Kompilasi gambar Open Graph 1200x630px otomatis di edge runtime berbasis HTML/CSS tanpa beban headless Chrome/Puppeteer. |
| **12\. Client-Side PDF Generator** | **@react-pdf/renderer** | Open-Source (MIT) | Kompilasi dokumen vektor PDF A4 langsung pada thread peramban web responden, menghilangkan beban komputasi server. |
| **13\. Transactional Messaging** | **Resend** | Free Tier | 3.000 surel/bulan (100 surel/hari), protokol API modern, pengiriman hasil asesmen permanen, terintegrasi pustaka React Email. |
| **14\. Application Telemetry & Error Tracking** | **Sentry** | Developer Free Tier | 5.000 kejadian galat/bulan, 10.000 transaksi performa/bulan, pelacakan stack-trace komprehensif Next.js. |
| **15\. Privacy-First Product Analytics** | **PostHog Cloud** | Free Tier | 1.000.000 event/bulan, perekaman sesi anonim, visualisasi corong konversi, kepatuhan regulasi GDPR/cookieless. |

## **2.2 Alur Transaksi Asesmen Berkecepatan Tinggi (Request Pipeline)**

1. **Lapis Akses Jaringan:** Permintaan pengguna diarahkan melalui **Cloudflare Anycast DNS** ke titik edge terdekat dengan kompresi Brotli dan perlindungan DDoS WAF aktif.  
2. **Lapis Komputasi & Middleware:** **Vercel Edge Network** mengevaluasi perutean Next.js App Router. Middleware memeriksa kuota laju permintaan via **Upstash Redis REST API** (<15ms) untuk mencegah DoS.  
3. **Lapis Penyajian Butir Instrumen:** Server Component mengambil struktur katalog asesmen yang telah di-cache di edge memory; antarmuka merender kontainer kuesioner terfokus 680px berbasis **Tailwind CSS & shadcn/ui**.  
4. **Lapis Interaksi Klien & Persistensi Lokal:** Setiap seleksi opsi instrumen psikometrik ditulis secara instan ke dalam **IndexedDB (idb-keyval)** di browser sebelum dikirimkan ke endpoint Server Action.  
5. **Lapis Transaksi Basis Data:** Server Action memvalidasi payload dan mengeksekusi operasi penulisan ke **Supabase PostgreSQL** menggunakan transaksi aman **Drizzle ORM** melalui konektor Supavisor.  
6. **Lapis Pengolahan Hasil & Agregasi:** Scoring engine mengeksekusi normalisasi dimensi, mencatat baris hasil pada tabel `results`, dan menyajikan visualisasi grafik interaktif via **Recharts**.  
7. **Lapis Distribusi Sosial & Dokumen:** Saat tautan profil dibagikan, rute edge `/api/og/[id]` mengeksekusi **@vercel/og** untuk menghasilkan gambar sosial dinamis. Responden dapat mengunduh berkas laporan via kompilasi lokal **@react-pdf/renderer** atau mengunggah cadangan ke **Cloudflare R2**.

---

# **3\. KASUS TEPI, VALIDITAS & AUDIT AMBANG BATAS KUOTA**

## **3.1 Audit Batas Sumber Daya & Mitigasi Lonjakan Beban (Quota Safety Thresholds)**

* **Supabase PostgreSQL (Batas 500 MB):** Skema ternormalisasi 3NF Watq mengalokasikan sekitar 1.2 KB per sesi pengerjaan asesmen lengkap. Batas 500 MB mampu menampung lebih dari 400.000 rekaman sesi penuh sebelum memerlukan strategi pengarsipan data historis ke Cloudflare R2 (Lihat: [`11-devops-cicd-disaster-recovery-specification.md`](file:///d:/watq/docs/11-devops-cicd-disaster-recovery-specification.md#L20)).  
* **Upstash Redis (Batas 10.000 kueri/hari):** Dibatasi hanya untuk penghitung laju IP (Rate Limiting) pada rute mutasi dan caching hasil akhir; pembacaan butir soal statis dialihkan ke Next.js Static Data Cache (ISR).  
* **Resend (Batas 3.000 surel/bulan):** Pengiriman surel dibatasi hanya untuk permintaan eksplisit responden yang menginginkan salinan arsip hasil asesmen ke kotak masuk mereka.  
* **Cloudflare R2 (Batas 10 GB & Egress $0):** Penyimpanan aset gambar statis dan kartu hasil terkompresi WebP (rata-rata 80 KB/file) memungkinkan penyimpanan hingga 125.000 aset visual tanpa biaya transfer data keluar.

---

# **4\. MATRIKS IMPLEMENTASI & STANDAR TOOLING DEVELOPER**

## **4.1 Lingkungan Pengembang Lokal (Local Developer Tooling)**

* **Runtime & Package Manager:** Node.js LTS (v22.x) terpadu dengan **pnpm** (kinerja instalasi dependensi tercepat, efisiensi deduplikasi penyimpanan disk fisik).  
* **Code Quality & Type Enforcement:** TypeScript v5.x strict mode murni, ESLint, Prettier dengan plugin `prettier-plugin-tailwindcss`.  
* **Database Migration & Introspection Tool:** Drizzle Kit CLI (`pnpm drizzle-kit push` / `pnpm drizzle-kit studio` untuk inspeksi data lokal berbasis peramban).  
* **Version Control & Repository Standards:** Git dengan Gitflow konvensional; integrasi otomatis GitHub Actions untuk pipeline CI (Lint, Typecheck, Test).

## **4.2 Pemetaan Konfigurasi Berkas Proyek**

| Konfigurasi Lapisan | Berkas Kode Sumber | Peran Arsitektur |
| :--- | :--- | :--- |
| **Fullstack Framework** | [`next.config.ts`](file:///d:/watq/next.config.ts) | Komputasi Edge, Server Actions, & Header Keamanan |
| **Database ORM** | [`drizzle.config.ts`](file:///d:/watq/drizzle.config.ts) | Pemetaan Skema PostgreSQL & Migrasi SQL |
| **Desain & Animasi** | [`tailwind.config.ts`](file:///d:/watq/tailwind.config.ts) | Ekstensi Tema Slate, Deep Indigo, & Timing Bezier |
| **Manajemen Paket** | [`package.json`](file:///d:/watq/package.json) | Penguncian Versi Dependensi Strict Mode |
