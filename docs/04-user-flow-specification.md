# **WATQ: OFFICIAL UNIVERSAL USER FLOW SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-04` │ **Versi:** `1.0.0` │ **Status:** `MVP_ACTIVE`  
> **Standar Global:** `W3C Web Cryptography API` │ `W3C IndexedDB 3.0` │ `Fitts's & Hick's Law UX`  
> **Otoritas Tunggal (SSOT):** Alur Pengalaman Pengguna 6-Fase, Modalitas Input, Mesin Status Sesi, & Resolusi 5 Kasus Tepi  
> **Implementasi Kode:** [`src/components/assessment/`](file:///d:/watq/src/components/assessment/), [`src/lib/storage/indexeddb.ts`](file:///d:/watq/src/lib/storage/) │ **Terkait:** [`WATQ-DOC-02`](file:///d:/watq/docs/02-mvp-feature-specification.md), [`WATQ-DOC-05`](file:///d:/watq/docs/05-design-system-tokens-specification.md), [`WATQ-DOC-07`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md)

---

# **1\. FONDASI, TUJUAN & HUKUM INTI ALUR PENGGUNA**

## **1.1 Tiga Hukum Inti Alur Watq**

Arsitektur interaksi pengguna Watq beroperasi di bawah tiga prinsip rekayasa yang kaku:

* **Zero-Onboarding Friction:** Responden tidak pernah diwajibkan mengisi formulir registrasi akun, verifikasi email, nomor telepon, atau memecahkan CAPTCHA sebelum menyelesaikan asesmen. Pengguna masuk ke butir pertanyaan pertama dalam 1 kali klik.  
* **Cognitive Tunneling (Distraction-Free Focus Mode):** Antarmuka pengerjaan mengeliminasi 100% tautan keluar, navigasi header mengambang, footer promosi, atau elemen dekoratif yang memecah konsentrasi mental responden saat kuesioner berlangsung.  
* **Deterministic State Continuity:** Tidak ada data respons yang hilang akibat penutupan tab secara tidak sengaja, fluktuasi sinyal seluler, atau penyegaran peramban (*browser reload*) berkat persistensi ganda (Dual-Write Engine).

## **1.2 Peta Perjalanan Pengguna End-to-End (6 Fase Berurutan)**

* **Fase 1: Discovery & Selection (`[watq.io]`):** Menjelajahi katalog instrumen multi-paradigma, memilih model, dan klik "Mulai Asesmen".
* **Fase 2: Instant Anonymous Provisioning (`[/assess/[slug]]`):** Web Crypto API membangkitkan `participant_id` lokal (<5ms), PostgreSQL mencatat baris sesi `in_progress`, dan kontainer terpusat 680px dibuka.
* **Fase 3: Distraction-Free Execution:** Viewport terkunci pada 680px, merender butir soal. Responden memilih opsi: umpan balik 120ms, penulisan lokal IndexedDB (<10ms), auto-advance 180ms beralih ke butir berikutnya.
* **Fase 4: Real-Time Edge Scoring & Finalization:** Butir terakhir terjawab, scoring engine menghitung hasil, mutasi status database ke `completed`, penyimpanan idempotent pada tabel `results` disertai stempel hash SHA-256.
* **Fase 5: Diagnostic Report Synthesis (`[/results/[uuid]]`):** Visualisasi diagram radar SVG Recharts dan penyajian laporan naratif 4 bagian.
* **Fase 6: Viral Loop, Sharing & Export:** Menyalin permalink permanen, mengatur sakelar privasi, mengunduh PDF A4 bebas watermark, atau membuka komparasi interpersonal (`/compare/[a]/[b]`).

---

# **2\. SPESIFIKASI TEKNIS DEFINITIF MODALITAS & STATE MACHINE**

## **2.1 Spesifikasi Interaksi 4 Modalitas Input**

1. **Modalitas 1: Skala Likert 5-Poin & 7-Poin (Big Five / IPIP-50 & RIASEC):**  
   * Pemicu: Klik kursor, sentuhan layar, atau tombol keyboard numerik (`1`–`5` / `1`–`7`).  
   * Durasi animasi seleksi: 120ms `cubic-bezier(0.16, 1, 0.3, 1)`. Jeda auto-advance: Tepat 180ms.  
   * Navigasi Koreksi: Tersedia tombol "Kembali" (*Previous Item*) di sudut kiri bawah tanpa menghapus progres sesi.  
2. **Modalitas 2: Pilihan Paksa Biner / Ipsative Pairs (Jungian 16 Arketipe / MBTI):**  
   * Pemicu: Dua kartu komparatif berdampingan (Pernyataan A vs B) dengan pintasan keyboard `A` atau `B`. Jeda auto-advance 180ms.  
3. **Modalitas 3: Matriks Kuadran Dinamika Kerja (DISC Assessment):**  
   * Pemicu: Memilih tepat 1 pernyataan "Paling Menggambarkan (Most)" dan 1 pernyataan "Paling Tidak Menggambarkan (Least)". Sistem memblokir pemilihan Most dan Least pada baris yang sama.  
4. **Modalitas 4: Pemeringkatan Preferensi Hirarkis (Enneagram 9 Tipe):**  
   * Pemicu: Penataan urutan preferensi pernyataan dari urutan 1 hingga terendah via klik angka atau drag-and-drop. Seluruh slot wajib terisi valid sebelum tombol lanjut aktif.

## **2.2 Pemetaan Mesin Status Sesi (State Flow Mapping)**

Sistem membedakan secara tegas antara status basis data dan state reaktif antarmuka klien:

* **Status Persisten PostgreSQL (`attempts.status`):** `'in_progress'` | `'completed'` | `'abandoned'` | `'invalidated'` (Lihat: [`07-database-architecture-ddl-specification.md`](file:///d:/watq/docs/07-database-architecture-ddl-specification.md#L330)).
* **State Mesin Reaktif Klien (UI Engine):**
  1. `[UNINITIALIZED]` ──> Pengguna membuka halaman pengerjaan.
  2. `[INITIALIZING_SESSION]` ──> Web Crypto API membuat UUID, menginisialisasi sesi di DB.
  3. `[IN_PROGRESS_ACTIVE]` ──> Kontainer 680px aktif, auto-advance 180ms beroperasi.
  4. `[OFFLINE_BUFFERING]` ──> Koneksi terputus, jawaban ditampung di IndexedDB.
  5. `[SCORING_FINALIZATION]` ──> Butir selesai, scoring engine edge memproses normalisasi.
  6. `[RESULTS_RENDERED]` ──> Router mengarahkan permanen ke `/results/[attempt_uuid]`.

---

# **3\. KASUS TEPI, VALIDITAS & RESOLUSI GALAT**

| Kasus Tepi (*Edge Case*) | Mekanisme Deteksi Sistem | Resolusi Rekayasa Otomatis | Pengalaman & Salinan Teks Pengguna |
| :--- | :--- | :--- | :--- |
| **1\. Pemutusan Koneksi Internet (Offline)** | `navigator.onLine === false` atau transmisi Server Action gagal. | Tangguhkan permintaan HTTP; simpan jawaban seketika di IndexedDB peramban lokal. Jalankan antrean sinkronisasi latar belakang dengan algoritma *exponential backoff* (interval: 2s, 4s, 8s, 16s). | Pita mengambang di bawah kontainer: *"Koneksi terputus. Jawaban Anda tersimpan secara lokal dan akan disinkronkan otomatis saat koneksi pulih."* |
| **2\. Penutupan Tab / Refresh Tidak Sengaja** | Event `beforeunload` terpicu pada window browser saat status sesi masih `in_progress`. | Peramban memunculkan dialog konfirmasi bawaan. Saat URL asesmen dibuka kembali, sistem memeriksa kunci sesi IndexedDB dan langsung memuat pertanyaan terakhir yang belum terisi tanpa mengulang dari awal. | *"Sesi asesmen Anda sedang berlangsung. Seluruh progres tersimpan di perangkat ini. Lanjutkan sekarang?"* |
| **3\. Kecepatan Menjawab Tidak Wajar (Speeding)** | Rata-rata latensi butir $\mu_{\text{latency}} < 1.8$ detik terdeteksi berturut-turut pada 10 butir soal. | Terapkan penundaan kognitif sementara: tombol opsi dinonaktifkan selama 3 detik sebelum mengizinkan butir berikutnya; catat bendera `is_speeding: true` pada metrik audit basis data. | Modal kartu peringatan tenang: *"Mohon luangkan waktu sejenak untuk membaca setiap pernyataan secara seksama demi akurasi hasil analisis Anda."* |
| **4\. Straight-Lining (Pilihan Monoton)** | Varians jawaban sama dengan nol ($\sigma^2 = 0$, misal memilih angka '3' sepanjang 50 butir). | Backend tetap menyelesaikan komputasi skor, namun menandai kolom `validity_metrics.is_straight_lined: true` dan menyertakan catatan peringatan reliabilitas pada bagian bawah laporan hasil. | Catatan laporan hasil: *"Indikator reliabilitas respons mendeteksi variasi jawaban yang sangat rendah. Hasil ini mungkin tidak mencerminkan pola karakter alami Anda."* |
| **5\. Akses Ulang ke Sesi yang Selesai** | Pengguna mengunjungi rute `/assess/[slug]` membawa token sesi lokal yang telah berstatus `completed`. | Edge Middleware mendeteksi status sesi di basis data dan langsung menerbitkan 301 Permanent Redirect ke `/results/[attempt_uuid]`. | Pengguna langsung diarahkan ke laporan hasil akhir permanen mereka tanpa merender ulang kuesioner. |

---

# **4\. MATRIKS IMPLEMENTASI & MIKROKOPI PER LAYAR**

## **4.1 Salinan Mikrokopi Resmi Antarmuka (Screen-by-Screen Copywriting)**

* **Layar 1 (Katalog & Detail Instrumen):**  
  * Tombol CTA Utama: `"Mulai Asesmen"`  
  * Catatan Privasi: *"Asesmen ini bersifat anonim dan tidak memerlukan pendaftaran akun."*  
* **Layar 2 (Kontainer Pengerjaan Terfokus 680px):**  
  * Top Bar: Counter `24 / 50`, Estimasi waktu `~3 menit tersisa`.  
  * Pita Status: `"Tersimpan otomatis di penyimpanan lokal"`.  
* **Layar 3 (Layar Antara Komputasi Skor <300ms):**  
  * Teks Status: `"Menganalisis matriks respons psikometri..."`  
* **Layar 4 (Laporan Hasil Diagnostik):**  
  * Tombol Aksi: `"Salin Tautan Permanen"` (Umpan balik 120ms: `"Tautan Berhasil Disalin"`), Sakelar `"Kontrol Privasi"`, Tombol `"Unduh Laporan PDF"` & `"Unduh Kartu Visual"`.

## **4.2 Pemetaan Komponen Antarmuka (`src/components/`)**

| Modul Alur Interaksi | Komponen Kode Sumber | Rujukan Dokumen SSOT |
| :--- | :--- | :--- |
| **Kontainer Pengerjaan 680px** | [`src/components/assessment/FocusContainer.tsx`](file:///d:/watq/src/components/assessment/) | [`05-design-system-tokens-specification.md`](file:///d:/watq/docs/05-design-system-tokens-specification.md) |
| **Tile Skala Likert (120ms)** | [`src/components/assessment/LikertTileGroup.tsx`](file:///d:/watq/src/components/assessment/) | [`05-design-system-tokens-specification.md`](file:///d:/watq/docs/05-design-system-tokens-specification.md) |
| **Offline Banner & Sync Queue** | [`src/components/assessment/OfflineStatusBanner.tsx`](file:///d:/watq/src/components/assessment/) | [`04-user-flow-specification.md`](file:///d:/watq/docs/04-user-flow-specification.md) |
| **Pita Progres & ETA** | [`src/components/assessment/ProgressBar.tsx`](file:///d:/watq/src/components/assessment/) | [`02-mvp-feature-specification.md`](file:///d:/watq/docs/02-mvp-feature-specification.md) |
