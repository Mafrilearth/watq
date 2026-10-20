# **WATQ: OFFICIAL UNIVERSAL DEVOPS, CI/CD & DISASTER RECOVERY SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-11` │ **Versi:** `1.0.0` │ **Status:** `SCALEUP_ROADMAP`  
> **Standar Global:** `ISO/IEC 22301 (Business Continuity)` │ `W3C Web Vitals` │ `SemVer 2.0.0`  
> **Otoritas Tunggal (SSOT):** Otomasi Pipeline CI/CD, Pengarsipan Dingin R2, Pemulihan Bencana (RPO/RTO), & Observabilitas  
> **Implementasi Kode:** [`.github/workflows/ci.yml`](file:///d:/watq/.github/workflows/ci.yml), [`src/instrumentation.ts`](file:///d:/watq/src/instrumentation.ts) │ **Terkait:** [`WATQ-DOC-06`](file:///d:/watq/docs/06-tech-stack-infrastructure-specification.md), [`WATQ-DOC-07`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md)

---

# **1\. FONDASI, TUJUAN & ARSITEKTUR CI/CD**

## **1.1 Alur Kerja Git & Standar Lingkungan (Branching Strategy)**

Watq menerapkan model Gitflow terampingkan dengan validasi ketat sebelum kode menyentuh edge runtime:

* `main`: Cabang produksi resmi (`https://watq.io`). Setiap push/merge otomatis memicu *Zero-Downtime Production Deployment* di jaringan edge global Vercel.
* `staging`: Cabang pengujian integrasi (`https://staging.watq.io`) yang terhubung ke klaster sandbox Supabase.
* `feat/*` atau `fix/*`: Cabang fitur pengembang. Setiap pembuatan *Pull Request* memicu *Preview Deployment* terisolasi secara instan dengan URL unik.

---

# **2\. SPESIFIKASI TEKNIS DEFINITIF OTOMASI & PENGARSIPAN**

## **2.1 Pipeline Otomasi GitHub Actions (Continuous Integration)**

Setiap *Pull Request* wajib lulus 4 tahap validasi deterministik sebelum diizinkan untuk di-merge:

```yaml
# .github/workflows/ci.yml
name: Watq Universal CI Pipeline
on: [pull_request, push]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Code Quality & Linting
        run: pnpm lint && pnpm format:check

      - name: TypeScript Strict Typecheck
        run: pnpm typecheck

      - name: Psychometric Scoring Engine Unit Tests
        run: pnpm test:scoring
```

## **2.2 Strategi Pengarsipan Data Dingin (Cloudflare R2 Cold Archival)**

Skema ANSI 3NF Watq mengalokasikan sekitar 1.2 KB per sesi asesmen lengkap. Saat volume penggunaan melampaui 300.000 sesi pengerjaan (mencapai ~360 MB atau 72% dari kuota 500 MB), **Automated Archival Worker** dieksekusi via Cron Job berkala:

1. **Seleksi Data Historis:** Worker memilih rekaman tabel `attempts` yang telah berstatus `completed` lebih dari 90 hari yang lalu.
2. **Kompilasi Arsip Parquet/JSON:** Data respons granular diekspor dan dikompresi menjadi berkas arsip `.json.gz` terenkripsi.
3. **Pengunggahan ke Cloudflare R2:** Berkas arsip disimpan permanen pada bucket `watq-cold-archives` ($0 biaya egress, 10 GB kuota gratis).
4. **Pembersihan Bersih (Disk Trimming):** Rekaman granular di tabel `responses` dipangkas (*pruned*), sementara baris pada tabel `results` (ringkasan skor, kode arketipe, dan verifikasi hash) tetap dipertahankan permanen di PostgreSQL.
5. **Dampak Operasional:** Menghemat hingga 82% ruang disk fisik tanpa memutus keabsahan permalink hasil pengguna.

---

# **3\. KASUS TEPI, PEMULIHAN BENCANA & SERVICE LEVEL OBJECTIVES (SLO)**

## **3.1 Service Level Objectives (SLO) Pemulihan**

| Parameter Pemulihan | Target Ambang Batas | Mekanisme Penegakan |
| :--- | :--- | :--- |
| **Recovery Point Objective (RPO)** | **< 1 Jam** | Log Transaksi PostgreSQL (WAL) & Cadangan snapshot harian. |
| **Recovery Time Objective (RTO)** | **< 30 Menit** | Skrip redeployment infrastruktur Terraform / Drizzle Push instan. |

## **3.2 Jadwal Cadangan Otomatis & Disaster Recovery Playbook**

* **Cadangan Logis Harian:** Dieksekusi setiap pukul 02:00 UTC menggunakan utilitas `pg_dump` yang dialirkan langsung ke Cloudflare R2 dengan retensi rotasi 30 hari.
* **Point-in-Time Recovery (PITR):** Didukung penuh di lapis Supabase PostgreSQL untuk memulihkan status data hingga detik tertentu jika terjadi anomali migrasi skema.
* **Skenario Kegagalan Infrastruktur Utama:**
  1. *Kegagalan DNS / Edge CDN:* Alihkan rute Cloudflare Anycast ke penyedia fallback sekunder dalam hitungan detik.
  2. *Kegagalan Instans Basis Data:* Eksekusi skrip [`07-database-architecture-ddl-specification.md`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md), pulihkan dump data terbaru dari Cloudflare R2, dan perbarui *connection string* Vercel Environment Variable.

---

# **4\. MATRIKS IMPLEMENTASI & OBSERVABILITAS SISTEM**

## **4.1 Arsitektur Observabilitas 3 Lapis (Telemetry)**

```
[Klien / Browser Responden]
       │  - Core Web Vitals (LCP < 1.2s, FID/INP < 100ms, CLS = 0)
       ▼
[Vercel Edge Gateway & Next.js Instrumentation]
       │  - Sentry SDK (Pelacakan galat eksekusi Serverless & Edge API)
       ▼
[Basis Data & Supavisor Connection Pooler]
       │  - Query latency telemetry (<10ms kueri terindeks)
       ▼
[PostHog Analytics] ───> Perekaman metrik konversi corong pengerjaan asesmen
```

## **4.2 Pemetaan Berkas Konfigurasi DevOps**

| Komponen DevOps | Berkas Kode Sumber | Peran Arsitektur |
| :--- | :--- | :--- |
| **CI Automation** | [`.github/workflows/ci.yml`](file:///d:/watq/.github/workflows/ci.yml) | Validasi Lint, Typecheck, & Scoring Tests |
| **Sentry Telemetry** | [`src/instrumentation.ts`](file:///d:/watq/src/instrumentation.ts) | Perekaman Galat Runtime di Edge Gateway |
| **Archival Worker** | [`src/app/api/cron/archive/route.ts`](file:///d:/watq/src/app/api/) | Pembersihan Tabel Responses & Ekspor R2 |
