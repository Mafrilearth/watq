# **WATQ: OFFICIAL UNIVERSAL MULTI-TENANCY & BILLING SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-09` │ **Versi:** `1.0.0` │ **Status:** `SCALEUP_ROADMAP`  
> **Standar Global:** `NIST SP 800-145 (Cloud Multi-Tenancy)` │ `PCI-DSS v4.0 (Stripe Vault)` │ `ISO/IEC 27001`  
> **Otoritas Tunggal (SSOT):** Arsitektur Multi-Tenancy RLS, Matriks 5 Peran RBAC, Siklus Hidup Penagihan Stripe Billing, & DDL Ledger  
> **Implementasi Kode:** [`src/app/(dashboard)/`](file:///d:/watq/src/app/), [`src/db/schema-tenants.ts`](file:///d:/watq/src/db/) │ **Terkait:** [`WATQ-DOC-07`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md), [`WATQ-DOC-08`](file:///d:/watq/docs/08-api-webhook-integration-specification.md), [`WATQ-DOC-10`](file:///d:/watq/docs/10-security-compliance-data-sovereignty-specification.md)

---

# **1\. FONDASI, TUJUAN & ARSITEKTUR MULTI-TENANCY**

## **1.1 Filosofi Pemisahan Penyewa (Tenant Isolation)**

Arsitektur B2B Watq mengadopsi model **Logical Multi-Tenancy dengan Row Level Security (RLS) PostgreSQL**:

* **Efisiensi Kolateral ($0 OpEx Base):** Mengeliminasi kebutuhan instans basis data terpisah per klien; seluruh penyewa berbagi klaster Supabase PostgreSQL yang sama, dipagari secara kriptografis oleh kebijakan RLS berbasis `tenant_id`.
* **Hierarki Entitas 4-Tingkat:**
  ```
  [Organization] (Badan Usaha / Korporasi Global)
        │
        └── [Workspace] (Unit Bisnis / Departemen, e.g., "Engineering", "Commercial")
              │
              └── [Cohort / Team] (Kelompok Kandidat / Karyawan Proyek)
                    │
                    └── [Member] (Pengguna dengan Peran RBAC Tertentu)
  ```
* **Kedaulatan Akses Data:** Anggota dari Tenant A tidak dapat membaca, menghitung, atau mengekspor data hasil psikometri Tenant B dalam kondisi apa pun di lapis database engine.

---

# **2\. SPESIFIKASI TEKNIS DEFINITIF RBAC & BILLING**

## **2.1 Matriks Kontrol Akses Berbasis Peran (RBAC)**

Watq menetapkan 5 peran formal dengan batas izin yang ketat:

| Peran (*Role*) | Deskripsi Tanggung Jawab | Batas Izin Operasional |
| :--- | :--- | :--- |
| **Organization Owner** | Pendiri atau Direktur Eksekutif Organisasi | Hak mutlak: Pengelolaan metode pembayaran, perubahan kepemilikan, pembatalan akun, rotasi kunci API root. |
| **Workspace Admin** | Kepala Divisi SDM / HR Lead | Mengundang anggota tim, mengonfigurasi webhook, mengelola kuota penggunaan, menerbitkan tautan asesmen. |
| **Psychometric Analyst** | Psikolog Organisasi / Assessor Bersertifikat | Membuka laporan mendalam, mengevaluasi validitas audit hash, mengeksekusi analisis komparasi tim (*Dyadic Dynamics*). |
| **Recruiter / Viewer** | Perekrut Lapangan / Hiring Manager | Hanya dapat membaca laporan akhir kandidat dan mengunduh berkas vektor PDF resmi. |
| **Candidate / Participant** | Responden Eksternal | Hanya dapat mengerjakan instrumen di kontainer terfokus 680px; akses laporan hasil diatur oleh kebijakan admin. |

## **2.2 Model Harga Hibrida (Tiered Subscription + Usage Credits)**

1. **Paket Langganan Platform Berjenjang:**
   * **Starter Tier ($49/bln):** Hingga 50 pengerjaan asesmen/bulan, 2 kursi admin, ekspor PDF standar.  
   * **Growth Tier ($199/bln):** Hingga 300 pengerjaan/bulan, 10 kursi admin, analisis komparasi tim, webhook ATS.  
   * **Enterprise Tier ($699+/bln):** Kuota tak terbatas, API SLA 99.9%, audit log mutlak, kustomisasi domain (*White-labeling*).  
2. **Kredit Asesmen Prabayar (Top-Up Pack):**
   * Pembelian kredit instan tanpa keharusan mengubah paket langganan bulanan.

## **2.3 Skema Tabel Ekstensi DDL (PostgreSQL & RLS)**

```sql
-- TABEL: tenants (Profil Organisasi Multi-Penyewa)
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) NOT NULL UNIQUE,
    name TEXT NOT NULL,
    plan_tier VARCHAR(32) NOT NULL DEFAULT 'starter' CHECK (plan_tier IN ('starter', 'growth', 'enterprise')),
    stripe_customer_id VARCHAR(128) NULL UNIQUE,
    stripe_subscription_id VARCHAR(128) NULL,
    subscription_status VARCHAR(32) NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'past_due', 'canceled', 'trialing')),
    credits_balance INTEGER NOT NULL DEFAULT 50 CHECK (credits_balance >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- TABEL: tenant_memberships (Pemetaan Pengguna & Peran RBAC)
CREATE TABLE tenant_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- Supabase Auth User ID
    role VARCHAR(32) NOT NULL DEFAULT 'recruiter' CHECK (role IN ('owner', 'admin', 'analyst', 'recruiter')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT uq_tenant_user UNIQUE (tenant_id, user_id)
);

-- TABEL: usage_ledger (Audit Pembukuan Konsumsi Kredit Asesmen)
CREATE TABLE usage_ledger (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    attempt_id UUID NOT NULL REFERENCES attempts(id) ON DELETE RESTRICT,
    delta_credits SMALLINT NOT NULL CHECK (delta_credits != 0),
    reason VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Penambahan kolom isolasi tenant pada tabel attempts inti
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS tenant_id UUID NULL REFERENCES tenants(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_attempts_tenant ON attempts(tenant_id);

-- Kebijakan RLS Isolasi Penyewa
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_ledger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members read own tenant" ON tenants
FOR SELECT USING (id IN (SELECT tenant_id FROM tenant_memberships WHERE user_id = auth.uid()));
```

---

# **3\. KASUS TEPI, VALIDITAS & REKONSILIASI STRIPE**

## **3.1 Siklus Webhook Stripe & Mitigasi Penagihan**

```
[Customer Portal] ───> [Stripe Billing Engine] ───> [POST /api/webhooks/stripe]
                                                             │
                                                             ▼
                                                    [Watq Drizzle Ledger]
                                                    - Update tenant_status
                                                    - Adjust credits_balance
                                                    - Log invoice_pdf_url
```

* `customer.subscription.created`: Inisialisasi tier penyewa dan alokasi kredit bulanan.
* `customer.subscription.updated`: Penyesuaian batas kursi dan fitur saat terjadi upgrade/downgrade.
* `customer.subscription.deleted`: Transisi status penyewa ke `grace_period` (14 hari pembacaan saja) sebelum dikunci.
* `invoice.payment_succeeded`: Pengisian ulang otomatis kuota pengerjaan.
* `invoice.payment_failed`: Notifikasi kegagalan pembayaran via Resend email dan aktivasi peringatan di dashboard.

---

# **4\. MATRIKS IMPLEMENTASI & INTEGRASI SISTEM**

## **4.1 Analitik Kohort Tim & Komparasi Dyadic**

* **Dyadic Interpersonal Matrix:** Menghitung selisih jarak kognitif (*Euclidean Distance* pada ruang 5 dimensi Big Five atau kutub DISC) antar anggota tim guna memetakan potensi gesekan komunikasi (*Communication Friction Index*).
* **Team Archetype Heatmap:** Representasi visual komposisi tim (proporsi Visioner vs Eksekutor) untuk mendukung perancangan struktur organisasi berbasis data empiris.

## **4.2 Pemetaan Struktur Berkas Dashboard (`src/app/(dashboard)/`)**

| Modul Dashboard | Berkas Kode Sumber | Peran Arsitektur |
| :--- | :--- | :--- |
| **Workspace Portal** | [`src/app/(dashboard)/layout.tsx`](file:///d:/watq/src/app/) | Shell Navigasi B2B & Guard Sesi RBAC |
| **Manajemen Tim** | [`src/app/(dashboard)/team/page.tsx`](file:///d:/watq/src/app/) | Undangan Anggota & Kontrol Peran |
| **Billing & Credits** | [`src/app/(dashboard)/billing/page.tsx`](file:///d:/watq/src/app/) | Integrasi Stripe Customer Portal |
| **Cohort Analytics** | [`src/app/(dashboard)/analytics/page.tsx`](file:///d:/watq/src/app/) | Visualisasi Matriks Dyadic Tim |
