# **WATQ: OFFICIAL UNIVERSAL API & WEBHOOK INTEGRATION SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-08` │ **Versi:** `1.0.0` │ **Status:** `SCALEUP_ROADMAP`  
> **Standar Global:** `OpenAPI 3.1.0` │ `RFC 2104 (HMAC SHA-256)` │ `RFC 6585 (HTTP 429)`  
> **Otoritas Tunggal (SSOT):** Spesifikasi RESTful API Publik, Protokol Webhook Idempotent, Adapter ATS/HRIS, & Rate Limiting Token Bucket  
> **Implementasi Kode:** [`src/app/api/v1/`](file:///d:/watq/src/app/api/) │ **Terkait:** [`WATQ-DOC-06`](file:///d:/watq/docs/06-tech-stack-infrastructure-specification.md), [`WATQ-DOC-07`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md), [`WATQ-DOC-09`](file:///d:/watq/docs/09-multi-tenancy-billing-specification.md)

---

# **1\. FONDASI, TUJUAN & PRINSIP INTEGRASI ENTERPRISE**

## **1.1 Filosofi Desain Integrasi Universal**

Spesifikasi integrasi Watq dirancang untuk menghubungkan mesin asesmen psikometrik universal dengan ekosistem enterprise global (ATS, HRIS, LMS, dan portal rekrutmen internal) tanpa menimbulkan gesekan operasional:

* **Developer-First & Zero-Trust:** Setiap permintaan wajib diautentikasi menggunakan kunci API kriptografis bertingkat (`watq_live_` dan `watq_test_`) dengan rotasi kunci instan dan pembatasan cakupan (*scoped permissions*).
* **Deterministic Contract & Sub-150ms Edge Gateway:** Seluruh endpoint API publik di-deploy di Vercel Edge Runtime dengan respons latensi sub-150ms secara global, mematuhi spesifikasi OpenAPI 3.1 dan JSON:API.
* **Idempotent Webhook Delivery:** Pengiriman webhook dilengkapi tanda tangan kriptografis HMAC SHA-256 untuk memverifikasi integritas payload dan mencegah serangan *replay*.
* **Multi-Instrument Payload Interoperability:** Desain respons JSON yang seragam untuk seluruh paradigma asesmen (Big Five, MBTI, DISC, Enneagram, RIASEC).

---

# **2\. SPESIFIKASI TEKNIS DEFINITIF RESTful API (V1)**

## **2.1 Nomenklatur, Header, & Kode Status**

* **Base URL Produksi:** `https://api.watq.io/v1`
* **Base URL Sandbox:** `https://sandbox.api.watq.io/v1`
* **Protokol:** HTTPS murni (TLS 1.3 wajib)
* **Format Payload:** `application/json; charset=utf-8` (ISO 8601 UTC)

```http
Authorization: Bearer watq_live_9f83b2e7c1044ad0a911a7c390ef1982
Content-Type: application/json
Watq-Version: 2026-10-01
```

| Kode HTTP | Arti Semantik | Skenario Penggunaan |
| :--- | :--- | :--- |
| `200 OK` | Berhasil | Kueri data instrumen, hasil, atau status berhasil diambil. |
| `201 Created` | Sumber Daya Dibuat | Sesi pengerjaan baru atau undangan asesmen berhasil diinisialisasi. |
| `400 Bad Request` | Muatan Tidak Valid | Parameter kueri salah atau format payload JSON tidak sesuai skema. |
| `401 Unauthorized` | Autentikasi Gagal | Kunci API tidak disertakan, tidak valid, atau telah dicabut. |
| `403 Forbidden` | Akses Ditolak | Kunci API tidak memiliki izin (*scope*) untuk mengakses sumber daya ini. |
| `404 Not Found` | Tidak Ditemukan | UUID asesmen, sesi, atau hasil tidak terdaftar di sistem. |
| `429 Too Many Requests`| Melebihi Batas Kuota | Rate limit terlampaui (dilengkapi header `Retry-After`). |
| `500 Internal Error` | Galat Komputasi | Terjadi anomali pada scoring engine (otomatis terlacak di Sentry). |

## **2.2 Daftar Endpoint Inti API Publik**

### **A. Katalog Instrumen (`GET /v1/assessments`)**
```json
{
  "object": "list",
  "data": [
    {
      "id": "ipip50_ocean",
      "code": "BIG_FIVE_OCEAN",
      "title": "Big Five Trait Spectrum",
      "category": "trait_continuous",
      "item_count": 50,
      "estimated_duration_minutes": 8,
      "version": "1.0.0"
    }
  ]
}
```

### **B. Inisialisasi Sesi Asesmen Enterprise (`POST /v1/invitations`)**
**Request Payload:**
```json
{
  "assessment_id": "ipip50_ocean",
  "candidate_identifier": "CAND-89412",
  "callback_url": "https://ats.corp.com/api/webhooks/watq",
  "expires_in_hours": 72,
  "metadata": {
    "job_requisition_id": "REQ-2026-DEV-04",
    "department": "Engineering"
  }
}
```

**Response Payload (`201 Created`):**
```json
{
  "invitation_id": "inv_7c9e6679-7425-40de-944b-e07fc1f90ae7",
  "assessment_url": "https://watq.io/assess/ipip50_ocean?invite=inv_7c9e6679",
  "status": "pending",
  "expires_at": "2026-10-24T01:00:00.000Z"
}
```

### **C. Pengambilan Hasil Terverifikasi (`GET /v1/results/{attempt_uuid}`)**
```json
{
  "attempt_id": "att_110e8400-e29b-11d4-a716-446655440000",
  "assessment_id": "ipip50_ocean",
  "status": "completed",
  "completed_at": "2026-10-21T01:30:00.000Z",
  "primary_code": "High-O-High-C",
  "primary_label": "The Strategic Architect",
  "dimension_scores": {
    "openness": { "raw_sum": 42, "normalized_score": 84.0, "percentile": 88 },
    "conscientiousness": { "raw_sum": 36, "normalized_score": 72.0, "percentile": 68 }
  },
  "validity_metrics": {
    "mean_latency_seconds": 5.4,
    "is_speeding": false,
    "is_straight_lined": false
  },
  "verification_hash": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
  "report_urls": {
    "pdf": "https://watq.io/results/att_110e8400/export/pdf",
    "social_card": "https://watq.io/api/og/att_110e8400"
  }
}
```

---

# **3\. KASUS TEPI, VALIDITAS & PROTOKOL WEBHOOK**

## **3.1 Verifikasi Tanda Tangan Kriptografis (HMAC SHA-256)**

Setiap permintaan webhook menyertakan header `Watq-Signature` guna mencegah manipulasi pihak ketiga:

```http
Watq-Signature: t=1792543200,v1=9e8b61a351239c89e2cf4421b539f150531c3bfdfa86377759a29e2467b7e61e
```

```typescript
import { createHmac, timingSafeEqual } from "crypto";

export function verifyWatqWebhook(payload: string, header: string, secret: string): boolean {
  const parts = Object.fromEntries(header.split(",").map(item => item.split("=")));
  const timestamp = parts["t"];
  const signature = parts["v1"];

  // Mitigasi replay attack: tolak jika selisih waktu > 5 menit
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = createHmac("sha256", secret).update(signedPayload).digest("hex");

  return timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
}
```

## **3.2 Kebijakan Pengiriman Ulang (Retry Policy) & Rate Limiting**

* **Retry Policy:** 5 kali percobaan berjenjang (*exponential backoff*): +15s, +2m, +15m, +2j, +12j.  
* **Rate Limiting Engine:** Ditegakkan di edge serverless via Upstash Redis Token Bucket:

| Paket Langganan | Batas Kueri Standar | Batas Puncak (*Burst*) | Webhook Concurrency |
| :--- | :--- | :--- | :--- |
| **Sandbox / Evaluasi** | 100 request/hari | 5 req/detik | 2 simultan |
| **Startup B2B** | 10.000 request/hari | 30 req/detik | 10 simultan |
| **Enterprise Dedicated** | 1.000.000 request/hari | 150 req/detik | 50 simultan |

---

# **4\. MATRIKS IMPLEMENTASI & INTEGRASI SISTEM**

## **4.1 Arsitektur Alur Integrasi ATS / HRIS Enterprise**

```
[ATS: Greenhouse / Workday]
       │  (1) POST /v1/invitations (Webhook Link Trigger)
       ▼
[Watq Edge Engine] ───> [Candidate Completes Assessment in 680px Container]
       │  (2) Scoring & Verification Hash Generated
       ▼
[Webhook: attempt.completed]
       │  (3) POST JSON payload to ATS Candidate Profile
       ▼
[ATS Candidate Scorecard Updated Automatically]
```

## **4.2 Pemetaan Route Handlers (`src/app/api/v1/`)**

| Endpoint Publik | Berkas Handler Next.js | Peran Arsitektur |
| :--- | :--- | :--- |
| `GET /v1/assessments` | [`src/app/api/v1/assessments/route.ts`](file:///d:/watq/src/app/api/v1/) | Pengambilan Katalog Publik |
| `POST /v1/invitations` | [`src/app/api/v1/invitations/route.ts`](file:///d:/watq/src/app/api/v1/) | Penerbitan Undangan Sesi Enterprise |
| `GET /v1/results/[id]` | [`src/app/api/v1/results/[id]/route.ts`](file:///d:/watq/src/app/api/v1/) | Pengambilan Hasil & Hash Verifikasi |
| `POST /api/webhooks/dispatch` | [`src/app/api/webhooks/dispatch/route.ts`](file:///d:/watq/src/app/api/) | Pekerja Distribusi Webhook HMAC SHA-256 |
