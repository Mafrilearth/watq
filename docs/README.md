# **WATQ — UNIVERSAL PSYCHOMETRIC ENGINE DOCUMENTATION SUITE**

> **Tagline Resmi:** *Personality Decoded.*  
> **Status Repositori:** Full Production & Scalable Architecture Documentation Suite  
> **Pola Rekayasa:** Dual-Layer Inverted Pyramid Hierarchy (Macro-Architecture to Micro-Implementation)

---

## **1. ARSITEKTUR PIRAMIDA TERBALIK GANDA (DUAL-LAYER INVERTED PYRAMID)**

Dokumentasi Watq beroperasi di bawah dua tingkatan struktur yang terprediksi:
1. **Lapis Makro (Antar Berkas):** Disusun dari tingkat strategi payung paling luas (Brand & Positioning) meruncing ke bawah hingga ke persistensi basis data relasional (Database DDL), didukung oleh ekstensi skala enterprise.
2. **Lapis Mikro (Di Dalam Tiap Berkas MD):** Setiap file markdown mematuhi **Anatomi 4 Bab Seragam**:
   * **Header Metadata Box:** ID Dokumen, Versi, Status, Rujukan Standar Global, SSOT Scope, dan Tautan Kode `src/...`.
   * **Bab 1: Fondasi, Tujuan & Prinsip Desain (The "Why"):** Filosofi dan batasan arsitektur tingkat tinggi.
   * **Bab 2: Spesifikasi Teknis Definitif (The "What & How"):** Skrip DDL SQL, Skema JSON, CSS Tokens, atau Endpoint API.
   * **Bab 3: Kasus Tepi, Validitas & Integritas Sistem (The "Guardrails"):** Mitigasi kegagalan, batas larangan, dan audit hash.
   * **Bab 4: Matriks Implementasi & Integrasi Sistem (The "Where"):** Pemetaan file kode sumber (`src/`) dan relasi lintas dokumen.

---

## **2. INDEKS RESMI BERKAS DOKUMENTASI (11 LAPISAN SSOT)**

### **BAGIAN I: FASE MVP FONDASIONAL (Tingkat 1 s.d. 7 — Status: `MVP_ACTIVE`)**

| Dokumen | Berkas Spesifikasi Resmi | Standar Global yang Dirujuk | Domain Otoritas Tunggal (*Single Source of Truth*) |
| :---: | :--- | :--- | :--- |
| **01** | [`01-brand-identity-guidelines.md`](file:///d:/watq/docs/01-brand-identity-guidelines.md) | `WIPO Nice Class 9 & 42` \| `ISO 10646` | Identitas Merek, Nomenklatur, Etimologi, Tagline, Arketipe, Tone of Voice, Geometri Logo Monogram W+Q, & Palet Warna. |
| **02** | [`02-mvp-feature-specification.md`](file:///d:/watq/docs/02-mvp-feature-specification.md) | `IPIP (1999)` \| `Jung (1921)` \| `Holland (1959)` | Spesifikasi Fungsional Fitur MVP, Cakupan 5 Instrumen Psikometri, & Logika 5 Modul Inti. |
| **03** | [`03-information-architecture-specification.md`](file:///d:/watq/docs/03-information-architecture-specification.md) | `W3C Schema.org` \| `RFC 3986` \| `OGP` | Taksonomi Sistem 5-Tier, Perutean Next.js App Router, Skema Rendering, & Metadata SEO. |
| **04** | [`04-user-flow-specification.md`](file:///d:/watq/docs/04-user-flow-specification.md) | `W3C Web Crypto` \| `W3C IndexedDB` \| `Fitts's Law` | Alur Pengguna 6-Fase, 4 Modalitas Input, Mesin Status Sesi, & Resolusi 5 Kasus Tepi. |
| **05** | [`05-design-system-tokens-specification.md`](file:///d:/watq/docs/05-design-system-tokens-specification.md) | `W3C Design Tokens` \| `WCAG 2.2 AA` \| `CSS Layer 5` | Arsitektur Komponen Atomik, Kontainer 680px, Token Slate/Deep Indigo, 12 Dimensi Grafik, & Kurva Mikromosi. |
| **06** | [`06-tech-stack-infrastructure-specification.md`](file:///d:/watq/docs/06-tech-stack-infrastructure-specification.md) | `ECMA-262 (ES2024)` \| `RFC 9113` \| `W3C Edge` | Matriks 15 Lapis Teknologi Terkunci, Request Pipeline <150ms, Ambang Batas Kuota $0 OpEx, & Tooling Developer. |
| **07** | [`07-database-architecture-ddl-specification.md`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md) | `ISO/IEC 9075:2023 (ANSI SQL)` \| `FIPS 180-4` | Skema Relasional ANSI 3NF, Skrip DDL Produksi PostgreSQL, Indeks GIN, Polis RLS Supabase, & Payload JSONB 5 Model. |

---

### **BAGIAN II: FASE SCALE-UP ENTERPRISE B2B (Tingkat 8 s.d. 11 — Status: `SCALEUP_ROADMAP`)**

| Dokumen | Berkas Spesifikasi Resmi | Standar Global yang Dirujuk | Domain Otoritas Tunggal (*Single Source of Truth*) |
| :---: | :--- | :--- | :--- |
| **08** | [`08-api-webhook-integration-specification.md`](file:///d:/watq/docs/08-api-webhook-integration-specification.md) | `OpenAPI 3.1.0` \| `RFC 2104` \| `RFC 6585` | Spesifikasi RESTful API Publik, Protokol Webhook Idempotent, Adapter ATS/HRIS, & Rate Limiting Token Bucket. |
| **09** | [`09-multi-tenancy-billing-specification.md`](file:///d:/watq/docs/09-multi-tenancy-billing-specification.md) | `NIST SP 800-145` \| `PCI-DSS v4.0` \| `ISO 27001` | Arsitektur Multi-Tenancy RLS, Matriks 5 Peran RBAC, Siklus Hidup Penagihan Stripe Billing, & DDL Ledger. |
| **10** | [`10-security-compliance-data-sovereignty-specification.md`](file:///d:/watq/docs/10-security-compliance-data-sovereignty-specification.md) | `ISO/IEC 27001:2022` \| `GDPR` \| `UU PDP 27/2022` | Standar Keamanan Siber, Kedaulatan Kriptografis, Kepatuhan Privasi Global (GDPR/UU PDP), & Audit Logging. |
| **11** | [`11-devops-cicd-disaster-recovery-specification.md`](file:///d:/watq/docs/11-devops-cicd-disaster-recovery-specification.md) | `ISO/IEC 22301` \| `W3C Web Vitals` \| `SemVer 2.0.0` | Otomasi Pipeline CI/CD, Pengarsipan Dingin R2 (Mitigasi 500 MB Supabase), Pemulihan Bencana, & Observabilitas. |

---

## **3. PEDOMAN KONTRIBUSI & TATA KELOLA PEMBARUAN (GOVERNANCE)**

1. **Prinsip Single Source of Truth (SSOT):** Setiap aturan atau spesifikasi teknis hanya boleh dituliskan satu kali di dokumen yang berwenang. Berkas lain wajib merujuk via tautan markdown.
2. **Penomoran Versi Semantik (SemVer):** Pembaruan dokumen wajib menaikkan nomor versi pada *Header Metadata Box* (`PATCH` untuk perbaikan redaksional, `MINOR` untuk penambahan butir/fitur, `MAJOR` untuk perombakan arsitektur).
3. **Penyelarasan Kode (`target_code`):** Setiap perubahan skema atau token pada dokumen wajib disinkronkan langsung ke berkas kode sumber terkait di direktori `src/`.
