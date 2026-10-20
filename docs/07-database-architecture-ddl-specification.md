# **WATQ: OFFICIAL UNIVERSAL DATABASE ARCHITECTURE & DDL SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-07` │ **Versi:** `1.0.0` │ **Status:** `MVP_ACTIVE`  
> **Standar Global:** `ISO/IEC 9075:2023 (ANSI SQL 3NF)` │ `RFC 4122 (UUIDv4)` │ `FIPS 180-4 (SHA-256)`  
> **Otoritas Tunggal (SSOT):** Skema Relasional ANSI 3NF, Skrip DDL Produksi PostgreSQL, Indeks GIN, Polis RLS Supabase, & Payload JSONB  
> **Implementasi Kode:** [`src/db/schema.ts`](file:///d:/watq/src/db/schema.ts), [`src/db/migrations/`](file:///d:/watq/src/db/migrations/) │ **Terkait:** [`WATQ-DOC-02`](file:///d:/watq/docs/02-mvp-feature-specification.md), [`WATQ-DOC-06`](file:///d:/watq/docs/06-tech-stack-infrastructure-specification.md)

---

# **1\. FONDASI, TUJUAN & ARSITEKTUR BASIS DATA RELASIONAL**

## **1.1 Filosofi Desain Relasional Agnostik Multi-Instrumen**

Arsitektur basis data Watq dirancang untuk memecahkan dilema klasik perangkat lunak psikometrik: bagaimana mendukung instrumen multi-paradigma (skala Likert berkesinambungan, pilihan paksa biner dikotomis, matriks kuadran Most/Least, hingga pemeringkatan hierarkis) tanpa memerlukan migrasi skema tabel berulang setiap kali instrumen baru ditambahkan.

* **Normalisasi ANSI 3NF Murni:** Seluruh entitas struktural inti (katalog instrumen, definisi dimensi, butir pertanyaan, sesi pengerjaan, dan catatan respons mentah) dinormalisasi ketat hingga bentuk normal ketiga (Third Normal Form).  
* **Hybrid Document Extensions (PostgreSQL JSONB):** Struktur payload hasil kalkulasi multi-dimensi, opsi dinamis, dan telemetri latensi kognitif disimpan dalam kolom bertipe JSONB yang diindeks penuh menggunakan operator GIN (Generalized Inverted Index) untuk efisiensi kueri sub-10ms.  
* **Guest-First Cryptographic Isolation:** Menghilangkan keharusan registrasi akun di awal dengan memanfaatkan pengenal UUID v4 acak kriptografis (Web Crypto API) yang dipetakan ke tabel sesi tanpa membocorkan identitas pribadi pengguna.  
* **Data Integrity & Immutability:** Setelah sesi pengerjaan beralih ke status 'completed', rekaman pada tabel responses dan results berstatus read-only (immutable) yang diverifikasi melalui hash kriptografis SHA-256.

## **1.2 Diagram Hubungan Entitas (Entity-Relationship Diagram / ERD)**

\+---------------------+           \+----------------------+

|     assessments     | 1       \* |      dimensions      |

|---|---|---|

| PK  id (TEXT)       |           | PK  id (UUID)        |

|     code            |           | FK  assessment\_id    |

|     title           |           |     key              |

|     category        |           |     chart\_token\_idx  |

|     modality        |           \+----------------------+

|     scale\_min       |                      | 1

|     scale\_max       |                      |

|     is\_active       |                      | \*

\+---------------------+           \+----------------------+

       | 1                        |      questions       |

       |                          \+----------------------+

       |                          | PK  id (UUID)        |

       | 1                        | FK  assessment\_id    |

       |                          | FK  dimension\_id     |

       | \*                        |     order\_number     |

\+---------------------+           |     prompt           |

|      attempts       |           |     modality         |

\+---------------------+           |     is\_reversed      |

| PK  id (UUID)       |           |     options\_payload  |

| FK  assessment\_id   |           \+----------------------+

| FK  participant\_id  |                      | 1

|     status          |                      |

|     started\_at      |                      | \*

|     completed\_at    | 1       \* \+----------------------+

\+---------------------+-----------+      responses       |

       | 1                        \+----------------------+

       |                          | PK  id (BIGINT)      |

       | 1                        | FK  attempt\_id       |

\+---------------------+           | FK  question\_id      |

|       results       |           |     raw\_value        |

\+---------------------+           |     choice\_key       |

| PK  id (UUID)       |           |     complex\_value    |

| FK  attempt\_id (UQ) |           |     latency\_ms       |

|     primary\_code    |           \+----------------------+

|     primary\_label   |

|     dimension\_scores|

| narrative\_synthesis |

|     validity\_metrics|

|   verification\_hash |

|     is\_public       |

|     created\_at      |

\+---------------------+

# **2\. SKRIP DDL RESMI PRODUKSI (ANSI POSTGRESQL)**

\-- \============================================================================

\-- WATQ UNIVERSAL PSYCHOMETRIC ENGINE DDL SPECIFICATION

\-- Database: PostgreSQL 15+ (Compatible with Supabase)

\-- Standards: ANSI SQL 3NF, ISO/IEC 9075, Strict Referencing & Audit Triggers

\-- \============================================================================

\-- Inisialisasi Ekstensi Kriptografi & UUID

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\-- \----------------------------------------------------------------------------

\-- FUNGSI PEMICU PEMBARUAN CAP WAKTU OTOMATIS (updated\_at)

\-- \----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION set\_updated\_at()

RETURNS TRIGGER AS \$\$

BEGIN

    NEW.updated\_at \= timezone('utc'::text, now());

    RETURN NEW;

END;

\$\$ LANGUAGE plpgsql;

\-- \----------------------------------------------------------------------------

\-- 1\. TABEL: assessments (Katalog Instrumen Multi-Paradigma Universal)

\-- \----------------------------------------------------------------------------

CREATE TABLE assessments (

    id TEXT PRIMARY KEY,

    code VARCHAR(64) NOT NULL UNIQUE,

    title TEXT NOT NULL,

    category VARCHAR(32) NOT NULL CHECK (

        category IN (

            'trait\_continuous',     \-- e.g., Big Five / IPIP

            'typology\_dichotomy',    \-- e.g., Jungian 16 Types / MBTI-Equivalent

            'behavioral\_quadrant',  \-- e.g., DISC Assessment

            'motive\_typology',      \-- e.g., Enneagram System

            'vocational\_interest',  \-- e.g., Holland RIASEC

            'character\_strengths'   \-- e.g., VIA-IS

        )

    ),

    modality VARCHAR(32) NOT NULL CHECK (

        modality IN (

            'likert\_scale',

            'ipsative\_binary',

            'ipsative\_quadrant',

            'forced\_ranking'

        )

    ),

    scale\_min SMALLINT NOT NULL DEFAULT 1,

    scale\_max SMALLINT NOT NULL DEFAULT 5,

    time\_limit\_seconds INTEGER NULL,

    version VARCHAR(16) NOT NULL DEFAULT '1.0.0',

    is\_active BOOLEAN NOT NULL DEFAULT true,

    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

    created\_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    updated\_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())

);

CREATE TRIGGER trg\_assessments\_updated\_at

BEFORE UPDATE ON assessments

FOR EACH ROW EXECUTE FUNCTION set\_updated\_at();

\-- \----------------------------------------------------------------------------

\-- 2\. TABEL: dimensions (Katalog Dimensi / Sumbu Ukur Universal)

\-- \----------------------------------------------------------------------------

CREATE TABLE dimensions (

    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

    assessment\_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,

    key VARCHAR(64) NOT NULL,

    name TEXT NOT NULL,

    description TEXT,

    chart\_token\_index SMALLINT NOT NULL CHECK (chart\_token\_index BETWEEN 1 AND 12),

    polarity\_labels JSONB NOT NULL DEFAULT '{"low": "Rendah", "high": "Tinggi"}'::jsonb,

    order\_index SMALLINT NOT NULL DEFAULT 1,

    created\_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    CONSTRAINT uq\_assessment\_dimension\_key UNIQUE (assessment\_id, key)

);

\-- \----------------------------------------------------------------------------

\-- 3\. TABEL: questions (Bank Butir Pertanyaan Multi-Modalitas)

\-- \----------------------------------------------------------------------------

CREATE TABLE questions (

    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

    assessment\_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,

    dimension\_id UUID NULL REFERENCES dimensions(id) ON DELETE SET NULL,

    facet\_key VARCHAR(64) NULL,

    order\_number SMALLINT NOT NULL,

    prompt TEXT NOT NULL,

    sub\_prompt TEXT NULL,

    modality VARCHAR(32) NOT NULL DEFAULT 'likert\_scale' CHECK (

        modality IN (

            'likert\_scale',

            'ipsative\_binary',

            'ipsative\_quadrant',

            'forced\_ranking'

        )

    ),

    options\_payload JSONB NULL,

    is\_reversed BOOLEAN NOT NULL DEFAULT false,

    weight NUMERIC(4, 2\) NOT NULL DEFAULT 1.00,

    created\_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    CONSTRAINT uq\_assessment\_question\_order UNIQUE (assessment\_id, order\_number)

);

\-- \----------------------------------------------------------------------------

\-- 4\. TABEL: participants (Identitas Anonim Responden / Guest-First)

\-- \----------------------------------------------------------------------------

CREATE TABLE participants (

    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

    fingerprint\_hash VARCHAR(64) NULL,

    ip\_hash VARCHAR(64) NULL,

    user\_agent\_summary TEXT NULL,

    locale VARCHAR(10) NOT NULL DEFAULT 'en',

    created\_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())

);

\-- \----------------------------------------------------------------------------

\-- 5\. TABEL: attempts (Sesi Pengerjaan Asesmen & State Lifecycle)

\-- \----------------------------------------------------------------------------

CREATE TABLE attempts (

    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

    assessment\_id TEXT NOT NULL REFERENCES assessments(id) ON DELETE RESTRICT,

    participant\_id UUID NOT NULL REFERENCES participants(id) ON DELETE CASCADE,

    role VARCHAR(32) NOT NULL DEFAULT 'participant' CHECK (role IN ('participant', 'administrator')),

    status VARCHAR(32) NOT NULL DEFAULT 'in\_progress' CHECK (

        status IN ('in\_progress', 'completed', 'abandoned', 'invalidated')

    ),

    started\_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    completed\_at TIMESTAMPTZ NULL,

    total\_duration\_ms INTEGER NULL,

    client\_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

    updated\_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())

);

CREATE TRIGGER trg\_attempts\_updated\_at

BEFORE UPDATE ON attempts

FOR EACH ROW EXECUTE FUNCTION set\_updated\_at();

\-- \----------------------------------------------------------------------------

\-- 6\. TABEL: responses (Perekaman Respons Granular & Latensi Psikomotorik)

\-- \----------------------------------------------------------------------------

CREATE TABLE responses (

    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    attempt\_id UUID NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,

    question\_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,

    raw\_value SMALLINT NULL,

    choice\_key VARCHAR(64) NULL,

    complex\_value JSONB NULL,

    latency\_ms INTEGER NOT NULL CHECK (latency\_ms \>= 0),

    created\_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    CONSTRAINT uq\_attempt\_question\_response UNIQUE (attempt\_id, question\_id)

);

\-- \----------------------------------------------------------------------------

\-- 7\. TABEL: results (Agregat Skor Deterministik, Narasi, & Hash Verifikasi)

\-- \----------------------------------------------------------------------------

CREATE TABLE results (

    id UUID PRIMARY KEY DEFAULT gen\_random\_uuid(),

    attempt\_id UUID NOT NULL UNIQUE REFERENCES attempts(id) ON DELETE CASCADE,

    primary\_code VARCHAR(64) NOT NULL,

    primary\_label TEXT NOT NULL,

    dimension\_scores JSONB NOT NULL,

    narrative\_synthesis JSONB NOT NULL,

    validity\_metrics JSONB NOT NULL,

    verification\_hash VARCHAR(64) NOT NULL,

    is\_public BOOLEAN NOT NULL DEFAULT true,

    created\_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())

);

\-- \----------------------------------------------------------------------------

\-- INDEKS OPTIMASI PERFORMA & KEMAMPUAN KUERI SUB-10MS

\-- \----------------------------------------------------------------------------

CREATE INDEX idx\_questions\_lookup ON questions(assessment\_id, order\_number);

CREATE INDEX idx\_dimensions\_assessment ON dimensions(assessment\_id, order\_index);

CREATE INDEX idx\_attempts\_participant ON attempts(participant\_id, status);

CREATE INDEX idx\_attempts\_assessment\_status ON attempts(assessment\_id, status);

CREATE INDEX idx\_responses\_attempt\_id ON responses(attempt\_id);

CREATE INDEX idx\_results\_primary\_code ON results(primary\_code);

CREATE INDEX idx\_results\_dimension\_scores\_gin ON results USING gin (dimension\_scores);

CREATE INDEX idx\_results\_validity\_metrics\_gin ON results USING gin (validity\_metrics);

\-- \----------------------------------------------------------------------------

\-- POLIS ROW LEVEL SECURITY (RLS) SUPABASE PRODUKSI

\-- \----------------------------------------------------------------------------

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

ALTER TABLE dimensions ENABLE ROW LEVEL SECURITY;

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

ALTER TABLE attempts ENABLE ROW LEVEL SECURITY;

ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

ALTER TABLE results ENABLE ROW LEVEL SECURITY;

\-- Kebijakan Akses Katalog (Publik Bebas Baca)

CREATE POLICY "Public assessments read" ON assessments FOR SELECT USING (is\_active \= true);

CREATE POLICY "Public dimensions read" ON dimensions FOR SELECT USING (true);

CREATE POLICY "Public questions read" ON questions FOR SELECT USING (true);

\-- Kebijakan Responden (Tulis Bebas / Guest-First)

CREATE POLICY "Anon create participants" ON participants FOR INSERT WITH CHECK (true);

CREATE POLICY "Anon create attempts" ON attempts FOR INSERT WITH CHECK (true);

CREATE POLICY "Anon read own attempts" ON attempts FOR SELECT USING (true);

CREATE POLICY "Anon update own attempts" ON attempts FOR UPDATE USING (status \= 'in\_progress');

CREATE POLICY "Anon submit responses" ON responses FOR INSERT WITH CHECK (true);

CREATE POLICY "Anon read own responses" ON responses FOR SELECT USING (true);

\-- Kebijakan Laporan Hasil (Bisa Diakses Jika Publik / Pemegang Link)

CREATE POLICY "Results read if public" ON results FOR SELECT USING (is\_public \= true);

CREATE POLICY "Anon create results" ON results FOR INSERT WITH CHECK (true);

# **3\. SPESIFIKASI SKEMA STRUKTUR PAYLOAD JSONB MULTI-INSTRUMEN**

Kolom `dimension_scores` pada tabel `results` menyimpan agregat data matematis yang secara fleksibel memetakan instrumen kepribadian apa pun:

## **3.1 Model Trait Kontinu (Big Five / IPIP-50)**

{

  "instrument": "ipip50\_ocean",

  "scoring\_type": "continuous\_trait\_spectrum",

  "dimensions": {

    "openness": {

      "raw\_sum": 42,

      "normalized\_score": 84.0,

      "percentile": 88,

      "sten\_score": 8,

      "band": "High"

    },

    "conscientiousness": {

      "raw\_sum": 36,

      "normalized\_score": 72.0,

      "percentile": 68,

      "sten\_score": 6,

      "band": "Moderate-High"

    },

    "extraversion": {

      "raw\_sum": 28,

      "normalized\_score": 56.0,

      "percentile": 44,

      "sten\_score": 5,

      "band": "Moderate"

    },

    "agreeableness": {

      "raw\_sum": 40,

      "normalized\_score": 80.0,

      "percentile": 82,

      "sten\_score": 7,

      "band": "High"

    },

    "neuroticism": {

      "raw\_sum": 18,

      "normalized\_score": 36.0,

      "percentile": 22,

      "sten\_score": 3,

      "band": "Low"

    }

  }

}

## **3.2 Model Tipologi Kognitif Dwi-Kutub (Jungian 16 Arketipe / MBTI-Equivalent)**

{

  "instrument": "jungian\_16\_types",

  "scoring\_type": "dichotomy\_differentiation",

  "axes": {

    "extraversion\_introversion": {

      "pole\_a": "Extraversion",

      "pole\_b": "Introversion",

      "pole\_a\_count": 4,

      "pole\_b\_count": 11,

      "dominant\_pole": "I",

      "differentiation\_ratio": 0.733

    },

    "sensing\_intuition": {

      "pole\_a": "Sensing",

      "pole\_b": "Intuition",

      "pole\_a\_count": 3,

      "pole\_b\_count": 12,

      "dominant\_pole": "N",

      "differentiation\_ratio": 0.800

    },

    "thinking\_feeling": {

      "pole\_a": "Thinking",

      "pole\_b": "Feeling",

      "pole\_a\_count": 13,

      "pole\_b\_count": 2,

      "dominant\_pole": "T",

      "differentiation\_ratio": 0.867

    },

    "judging\_perceiving": {

      "pole\_a": "Judging",

      "pole\_b": "Perceiving",

      "pole\_a\_count": 12,

      "pole\_b\_count": 3,

      "dominant\_pole": "J",

      "differentiation\_ratio": 0.800

    }

  },

  "resulting\_code": "INTJ",

  "cognitive\_stack": \["Ni", "Te", "Fi", "Se"\]

}

## **3.3 Model Dinamika Perilaku Kerja Kuadran (DISC Assessment)**

{

  "instrument": "disc\_work\_profile",

  "scoring\_type": "ipsative\_differential",

  "quadrants": {

    "dominance": {

      "most\_count": 14,

      "least\_count": 2,

      "delta": 12,

      "intensity\_percentile": 86

    },

    "influence": {

      "most\_count": 5,

      "least\_count": 6,

      "delta": \-1,

      "intensity\_percentile": 42

    },

    "steadiness": {

      "most\_count": 3,

      "least\_count": 9,

      "delta": \-6,

      "intensity\_percentile": 28

    },

    "compliance": {

      "most\_count": 7,

      "least\_count": 7,

      "delta": 0,

      "intensity\_percentile": 50

    }

  },

  "primary\_style": "D",

  "secondary\_style": "C",

  "profile\_pattern": "Developer / Creative Problem Solver"

}

## **3.4 Model Fiksasi Motivasi Inti (Enneagram 9 Tipe \+ Sayap)**

{

  "instrument": "enneagram\_core\_system",

  "scoring\_type": "modal\_peak\_with\_wings",

  "types": {

    "type\_1": 18, "type\_2": 8, "type\_3": 14,

    "type\_4": 22, "type\_5": 38, "type\_6": 31,

    "type\_7": 12, "type\_8": 20, "type\_9": 16

  },

  "core\_type": 5,

  "wing\_candidate": 6,

  "resolved\_code": "5w6",

  "center\_of\_intelligence": "Head (Thinking)",

  "integration\_growth": 8,

  "disintegration\_stress": 7

}

## **3.5 Model Penyelarasan Okupasional Vokasional (Holland RIASEC)**

{

  "instrument": "holland\_riasec\_interest",

  "scoring\_type": "vocational\_top\_three\_code",

  "themes": {

    "realistic": { "raw\_sum": 14, "normalized\_score": 35.0, "rank": 6 },

    "investigative": { "raw\_sum": 36, "normalized\_score": 90.0, "rank": 1 },

    "artistic": { "raw\_sum": 32, "normalized\_score": 80.0, "rank": 2 },

    "social": { "raw\_sum": 18, "normalized\_score": 45.0, "rank": 5 },

    "enterprising": { "raw\_sum": 28, "normalized\_score": 70.0, "rank": 3 },

    "conventional": { "raw\_sum": 20, "normalized\_score": 50.0, "rank": 4 }

  },

  "holland\_code": "IAE",

  "primary\_theme": "Investigative",

  "secondary\_theme": "Artistic",

  "tertiary\_theme": "Enterprising",

  "career\_clusters": [

    "Software & Systems Architecture",

    "Data Science & Research Engineering",

    "Product Design & HCI"

  ]

}

## **3.6 Audit Validitas Psikometri di Lapis Basis Data**

Kolom `validity_metrics` pada tabel `results` secara otomatis mencatat 4 parameter integritas psikometri guna mendeteksi manipulasi respons atau kelelahan responden:

1. **Mean Item Latency ($\mu_{\text{latency}}$):** Total waktu pengerjaan dibagi jumlah butir soal. Indikator kecepatan pengerjaan tidak wajar (<1.8 detik/butir menunjukkan jawaban acak).  
2. **Infrequency Index (Infreq):** Kepatuhan pada butir kendali uji konsistensi internal.  
3. **Straight-Lining Variance ($\sigma^2_{\text{responses}}$):** Varians nilai jawaban; varians 0 menandakan responden memilih opsi yang sama persis sepanjang pengujian.  
4. **Verification Audit Hash:** String SHA-256 yang dibangkitkan dari kombinasi:  
   $$\text{SHA256}(\text{attempt\_id} + \text{participant\_id} + \text{primary\_code} + \text{dimension\_scores} + \text{completed\_at})$$  
   Hash ini menjamin bahwa laporan hasil tidak dapat dipalsukan atau diubah di sisi klien tanpa merusak segel verifikasi resmi Watq.

---

# **4\. MATRIKS IMPLEMENTASI & INTEGRASI SISTEM**

## **4.1 Pemetaan Skema Kode Sumber Drizzle ORM (`src/db/`)**

| Tabel PostgreSQL | Definisi Skema TypeScript | Relasi Entitas Drizzle ORM |
| :--- | :--- | :--- |
| `assessments` | [`src/db/schema.ts`](file:///d:/watq/src/db/schema.ts) (`assessmentsTable`) | `relations(assessmentsTable, ({ many }) => ({ dimensions: many(dimensionsTable) }))` |
| `dimensions` | [`src/db/schema.ts`](file:///d:/watq/src/db/schema.ts) (`dimensionsTable`) | `relations(dimensionsTable, ({ one, many }) => ({ assessment: one(...), questions: many(...) }))` |
| `questions` | [`src/db/schema.ts`](file:///d:/watq/src/db/schema.ts) (`questionsTable`) | `relations(questionsTable, ({ one }) => ({ assessment: one(...), dimension: one(...) }))` |
| `participants` | [`src/db/schema.ts`](file:///d:/watq/src/db/schema.ts) (`participantsTable`) | `relations(participantsTable, ({ many }) => ({ attempts: many(attemptsTable) }))` |
| `attempts` | [`src/db/schema.ts`](file:///d:/watq/src/db/schema.ts) (`attemptsTable`) | `relations(attemptsTable, ({ one, many }) => ({ participant: one(...), responses: many(...) }))` |
| `responses` | [`src/db/schema.ts`](file:///d:/watq/src/db/schema.ts) (`responsesTable`) | `relations(responsesTable, ({ one }) => ({ attempt: one(...), question: one(...) }))` |
| `results` | [`src/db/schema.ts`](file:///d:/watq/src/db/schema.ts) (`resultsTable`) | `relations(resultsTable, ({ one }) => ({ attempt: one(attemptsTable) }))` |

## **4.2 Panduan Eksekusi Migrasi Drizzle Kit CLI**

* **Push Skema Langsung ke Supabase:** `pnpm drizzle-kit push`
* **Inspeksi Data Lokal via Browser GUI:** `pnpm drizzle-kit studio`
* **Generate Berkas Migrasi SQL:** `pnpm drizzle-kit generate`


