# **WATQ: OFFICIAL UNIVERSAL SECURITY, COMPLIANCE & DATA SOVEREIGNTY SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-10` │ **Versi:** `1.0.0` │ **Status:** `SCALEUP_ROADMAP`  
> **Standar Global:** `ISO/IEC 27001:2022` │ `Regulation (EU) 2016/679 (GDPR)` │ `UU No. 27 Tahun 2022 (UU PDP)`  
> **Otoritas Tunggal (SSOT):** Standar Keamanan Siber, Kedaulatan Kriptografis, Kepatuhan Privasi Global (GDPR/UU PDP), & Audit Logging  
> **Implementasi Kode:** [`src/middleware.ts`](file:///d:/watq/src/middleware.ts), [`src/lib/security/`](file:///d:/watq/src/lib/security/) │ **Terkait:** [`WATQ-DOC-07`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md), [`WATQ-DOC-08`](file:///d:/watq/docs/08-api-webhook-integration-specification.md), [`WATQ-DOC-09`](file:///d:/watq/docs/09-multi-tenancy-billing-specification.md)

---

# **1\. FONDASI, TUJUAN & PRINSIP KEDAULATAN DATA**

## **1.1 Filosofi "Zero-Knowledge" Data Pribadi**

Mesin psikometrik Watq dirancang berlandaskan keyakinan bahwa profil karakter dan dinamika kognitif manusia adalah data yang sangat sensitif:

* **Pemisahan Total Identitas Responden (Pseudonimisasi Asli):** Sistem tidak mewajibkan nama lengkap, nomor telepon, alamat fisik, atau akun media sosial responden untuk mengeksekusi asesmen. Seluruh sesi pengerjaan dikaitkan dengan UUID acak kriptografis (`participant_id`).
* **Bebas Pelacak Iklan Pihak Ketiga (Zero Ad-Tech Trackers):** Platform 100% bersih dari Google Tag Manager, Facebook Pixel, atau skrip monetisasi data lintas platform. Seluruh telemetri produk dikelola internal via PostHog berbasis anonim dan kepatuhan *cookieless*.
* **Kedaulatan Kepemilikan Responden:** Setiap peserta tes memegang kendali mutlak atas visibilitas profil mereka, termasuk hak untuk memublikasikan, mengunci, atau memusnahkan data pengerjaan kapan pun.

---

# **2\. SPESIFIKASI TEKNIS DEFINITIF ENKRIPSI & KRIPTOGRAFI**

## **2.1 Enkripsi Data Saat Transit (Data in Transit)**

* **Protokol:** Transport Layer Security (TLS) versi 1.3 terkunci mutlak; menolak negosiasi mundur ke TLS 1.1 atau 1.0.
* **HTTP Strict Transport Security (HSTS):** Ditegakkan melalui header edge Cloudflare:
  ```http
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  ```
* **Cipher Suites Terstandarisasi:** Hanya mengizinkan algoritma enkripsi modern `TLS_AES_256_GCM_SHA384` dan `TLS_CHACHA20_POLY1305_SHA256`.

## **2.2 Enkripsi Data Saat Diam (Data at Rest)**

* **Tingkat Basis Data Relasional:** Seluruh data volume Supabase PostgreSQL dienkripsi di tingkat blok menggunakan **AES-256-XTS** terkelola kunci FIPS 140-2.
* **Tingkat Penyimpanan Objek (Cloudflare R2):** Seluruh berkas cadangan dan arsip kartu hasil WebP dienkripsi otomatis di sisi server menggunakan enkripsi kunci berstandar industri AES-256.

## **2.3 Segel Integritas Hasil (Cryptographic Verification Hash)**

Untuk mencegah pemalsuan sertifikat atau pengubahan skor di sisi klien, setiap laporan hasil mengompilasi tanda tangan hash SHA-256 yang divalidasi oleh database:

$$\text{Hash} = \text{SHA256}(\text{attempt\_id} + \text{participant\_id} + \text{primary\_code} + \text{dimension\_scores} + \text{completed\_at})$$

Jika responden atau pihak ketiga mencoba mengubah nilai dimensi, segel verifikasi pada URL `/results/[id]/verify` akan berstatus tidak sah (*Tampered / Invalid Signature*).

---

# **3\. KASUS TEPI, VALIDITAS & PROTOKOL PRIVASI GLOBAL**

## **3.1 Kepatuhan Regulasi Privasi Global (GDPR, UU PDP, CCPA)**

| Regulasi | Yurisdiksi | Pemenuhan Standar Rekayasa Watq |
| :--- | :--- | :--- |
| **GDPR** (General Data Protection Regulation) | Uni Eropa | Hak Akses (*Art. 15*), Hak Penghapusan (*Art. 17*), Privasi sejak Desain (*Art. 25*). |
| **UU PDP** (UU No. 27 Tahun 2022) | Indonesia | Pemrosesan data spesifik berbasis persetujuan eksplisit, transparansi transfer data lintas batas, dan hak penarikan persetujuan. |
| **CCPA / CPRA** | California, AS | Hak untuk menolak penjualan data pribadi (Watq menerapkan *Do Not Sell* secara bawaan tanpa tombol). |

## **3.2 Protokol Hak Penghapusan Data (Right to be Forgotten)**

1. Panggilan mutasi API: `DELETE /api/sessions/current`
2. **Cascading Cryptographic Erasure:** Baris sesi pada tabel `attempts` langsung dihapus secara berantai (*ON DELETE CASCADE*) ke tabel `responses` dan `results`.
3. Seluruh cache sesi lokal di IndexedDB klien langsung dibersihkan (`indexedDB.deleteDatabase('watq_local_store')`).

## **3.3 Jejak Audit yang Tidak Dapat Diubah (Immutable Audit Trail)**

```sql
CREATE TABLE security_audit_logs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    actor_id UUID NULL,
    action VARCHAR(64) NOT NULL, -- e.g., 'instrument_toggle', 'api_key_revoke'
    resource_type VARCHAR(32) NOT NULL,
    ip_hash VARCHAR(64) NOT NULL,
    client_info JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

---

# **4\. MATRIKS IMPLEMENTASI & INTEGRASI SISTEM**

## **4.1 Kontrol Keamanan Standar Industri (ISO 27001 & SOC 2 Type II)**

* **Isolasi Rahasia (*Secret Management*):** Tidak ada kredensial, string koneksi database, atau kunci privat yang disimpan di repositori Git. Seluruh token diinjeksi via variabel lingkungan terenkripsi Vercel dan Supabase Vault.
* **Pindai Kerentanan Otomatis:** Pipeline CI/CD GitHub Actions menjalankan dependensi audit (`pnpm audit`) dan pemeriksaan integritas kode statis pada setiap *Pull Request*.

## **4.2 Pemetaan Komponen Keamanan (`src/lib/security/`)**

| Modul Keamanan | Berkas Kode Sumber | Peran Arsitektur |
| :--- | :--- | :--- |
| **Edge WAF & Security Headers** | [`src/middleware.ts`](file:///d:/watq/src/middleware.ts) | Penegakan HSTS, CSP, & Rate Limiting |
| **SHA-256 Verifier** | [`src/lib/security/hash.ts`](file:///d:/watq/src/lib/security/) | Validasi Kriptografis Segel Hasil |
| **Data Erasure Handler** | [`src/lib/security/erasure.ts`](file:///d:/watq/src/lib/security/) | Protokol *Right to be Forgotten* |
