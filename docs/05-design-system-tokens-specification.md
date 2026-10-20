# **WATQ: OFFICIAL UNIVERSAL DESIGN SYSTEM & DESIGN TOKENS SPECIFICATION**

> **ID Dokumen:** `WATQ-DOC-05` │ **Versi:** `1.0.0` │ **Status:** `MVP_ACTIVE`  
> **Standar Global:** `W3C Design Tokens (DTCG)` │ `WCAG 2.2 Level AA` │ `CSS Cascading Level 5 (@layer)`  
> **Otoritas Tunggal (SSOT):** Arsitektur Komponen Atomik, Kontainer 680px, Token Slate & Deep Indigo, 12 Token Dimensi Grafik, Variabel CSS, & Kurva Mikromosi  
> **Implementasi Kode:** [`src/app/globals.css`](file:///d:/watq/src/app/), [`tailwind.config.ts`](file:///d:/watq/tailwind.config.ts), [`src/components/ui/`](file:///d:/watq/src/components/ui/) │ **Terkait:** [`WATQ-DOC-01`](file:///d:/watq/docs/01-brand-identity-guidelines.md), [`WATQ-DOC-04`](file:///d:/watq/docs/04-user-flow-specification.md)

---

# **1\. FONDASI, TUJUAN & HIERARKI KOMPONEN ATOMIK**

## **1.1 Atomic Component Hierarchy (Radix UI & Tailwind CSS)**

Sistem antarmuka Watq didesain khusus untuk instrumen psikometrik universal dengan keandalan latensi sub-150ms:

* **Atoms:** Primitif murni terisolasi (`Button`, `Label`, `RadioGroupItem`, `LinearProgress`, `Badge`, `SkeletonTile`).  
* **Molecules:** Gabungan fungsional untuk satu butir asesmen (`LikertTileItem`, `IpsativePairTile`, `RankingSlot`, `ETAEstimateBadge`).  
* **Organisms:** Blok modular pengelola alur asesmen (`AssessmentQuestionCard`, `RadarChartVisualizer`, `NetworkInterruptionBanner`).  
* **Templates:** Kerangka tata letak terisolasi (`AssessmentFocusLayout` 680px).

## **1.2 Focused Assessment Container Specification**

Menjamin eliminasi beban kognitif (*low cognitive load*) dan fokus penuh responden:

* **Lebar Maksimal Kontainer:** Tepat 680px (`max-w-[680px]`) terpusat secara horizontal (`mx-auto`).  
* **Pemisahan Kanvas:** Kartu asesmen diisolasi dengan latar belakang `bg-card`, garis tepi 1px `border-border/80`, dan bayangan elevasi `shadow-sm` di atas kanvas `bg-background`.  
* **Padding Responsif:** `px-4 py-8` pada seluler, `px-8 py-10` pada layar desktop.  
* **Perilaku Navigasi:** Seluruh bilah navigasi global, tautan eksternal, dan footer disembunyikan sepenuhnya selama sesi pengujian berlangsung.

---

# **2\. SPESIFIKASI TEKNIS DEFINITIF TOKEN DESAIN**

## **2.1 Skala Palet Netral Psychometric Slate**

| Token Name | Hex Code | Peruntukan Antarmuka |
| :--- | :--- | :--- |
| `slate-50` | `#F8FAFC` | Kanvas dasar mode terang |
| `slate-100` | `#F1F5F9` | Latar komponen sekunder & track progres |
| `slate-200` | `#E2E8F0` | Garis batas default kartu & pembatas |
| `slate-300` | `#CBD5E1` | Garis batas interaktif & ikon non-aktif |
| `slate-400` | `#94A3B8` | Teks sekunder redup & penomoran soal |
| `slate-500` | `#64748B` | Label instruksi skala & metadata |
| `slate-600` | `#475569` | Teks badan sekunder & keterangan profil |
| `slate-700` | `#334155` | Latar kartu redup mode gelap |
| `slate-800` | `#1E293B` | Permukaan kartu mode gelap |
| `slate-900` | `#0F172A` | Teks utama mode terang / Latar kanvas mode gelap |
| `slate-950` | `#020617` | Kanvas dasar terdalam mode gelap |

## **2.2 Skala Primer Watq Deep Indigo & Interaktif**

| Token Name | Hex Code | Peruntukan Antarmuka |
| :--- | :--- | :--- |
| `indigo-50` | `#EEF2FF` | Highlight seleksi opsi mode terang |
| `indigo-100` | `#E0E7FF` | Badge status pengerjaan |
| `indigo-200` | `#C7D2FE` | Garis batas opsi terpilih |
| `indigo-500` | `#6366F1` | Aksen interaktif sekunder |
| `indigo-600` | `#4F46E5` | Warna primer interaktif resmi mode terang (`--primary`) |
| `indigo-700` | `#4338CA` | State hover tombol aksi utama |
| `indigo-900` | `#1E1B4B` | Warna identitas inti Watq Deep Indigo |

## **2.3 Token Semantik Status**

| Kategori Status | Hex (Mode Terang) | Hex (Mode Gelap) | Kondisi Penggunaan |
| :--- | :--- | :--- | :--- |
| **Success** | `#10B981` | `#34D399` | Asesmen selesai, data tervalidasi. |
| **Warning** | `#F59E0B` | `#FBBF24` | Interupsi latensi, respons belum terverifikasi. |
| **Destructive/Error** | `#F43F5E` | `#FB7185` | Galat sinkronisasi, validitas skala tidak konsisten. |
| **Info** | `#0EA5E9` | `#38BDF8` | Petunjuk pengerjaan instrumen, bantuan kontekstual. |

## **2.4 Skala Visualisasi Data Multi-Dimensi Universal (12 Dimensi Agnostik)**

Mendukung seluruh spektrum instrumen psikometri (Big Five 5 domain, MBTI 4 aksis, DISC 4 kuadran, Enneagram 9 tipe, RIASEC 6 tema):

| Dimension Token | Mode Terang | Mode Gelap | Peta Pemetaan Instrumen Psikometrik |
| :--- | :--- | :--- | :--- |
| `--chart-dim-1` | `#7C3AED` | `#A78BFA` | Big Five: Openness \| DISC: Dominance \| Enneagram: Tipe 1 |
| `--chart-dim-2` | `#4F46E5` | `#818CF8` | Big Five: Conscientiousness \| DISC: Influence \| Enneagram: Tipe 2 |
| `--chart-dim-3` | `#2563EB` | `#60A5FA` | Big Five: Extraversion \| DISC: Steadiness \| Enneagram: Tipe 3 |
| `--chart-dim-4` | `#0284C7` | `#38BDF8` | Big Five: Agreeableness \| DISC: Compliance \| Enneagram: Tipe 4 |
| `--chart-dim-5` | `#0D9488` | `#2DD4BF` | Big Five: Neuroticism \| MBTI: Aksis E-I \| Enneagram: Tipe 5 |
| `--chart-dim-6` | `#059669` | `#34D399` | MBTI: Aksis S-N \| Enneagram: Tipe 6 \| RIASEC: Realistic |
| `--chart-dim-7` | `#D97706` | `#FBBF24` | MBTI: Aksis T-F \| Enneagram: Tipe 7 \| RIASEC: Investigative |
| `--chart-dim-8` | `#EA580C` | `#FB923C` | MBTI: Aksis J-P \| Enneagram: Tipe 8 \| RIASEC: Artistic |
| `--chart-dim-9` | `#E11D48` | `#FB7185` | Enneagram: Tipe 9 \| RIASEC: Social |
| `--chart-dim-10` | `#DB2777` | `#F472B6` | RIASEC: Enterprising |
| `--chart-dim-11` | `#C026D3` | `#E879F9` | RIASEC: Conventional |
| `--chart-dim-12` | `#9333EA` | `#C084FC` | Indeks Rata-rata Komposit Universal |

## **2.5 Blok Variabel CSS Lengkap (`@layer base`)**

```css
@layer base {
  :root {
    --background: 210 40% 98%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 243.8 75.8% 58.8%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 346.8 77.2% 49.8%;
    --destructive-foreground: 210 40% 98%;
    --warning: 38 92% 50%;
    --warning-foreground: 48 96% 89%;
    --success: 160 84% 39%;
    --success-foreground: 152 81% 96%;
    --info: 199 89% 48%;
    --info-foreground: 204 100% 97%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 243.8 75.8% 58.8%;
    --radius: 0.5rem;
    --chart-dim-1: 263 83% 58%;
    --chart-dim-2: 243 75% 59%;
    --chart-dim-3: 217 91% 60%;
    --chart-dim-4: 199 89% 48%;
    --chart-dim-5: 173 80% 40%;
    --chart-dim-6: 160 84% 39%;
    --chart-dim-7: 38 92% 50%;
    --chart-dim-8: 21 90% 48%;
    --chart-dim-9: 343 89% 60%;
    --chart-dim-10: 330 81% 60%;
    --chart-dim-11: 292 84% 61%;
    --chart-dim-12: 271 91% 65%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 47.4% 11.2%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 47.4% 11.2%;
    --popover-foreground: 210 40% 98%;
    --primary: 239 84% 67%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 343 87% 71%;
    --destructive-foreground: 210 40% 98%;
    --warning: 43 96% 56%;
    --warning-foreground: 222.2 47.4% 11.2%;
    --success: 152 76% 52%;
    --success-foreground: 222.2 47.4% 11.2%;
    --info: 198 93% 60%;
    --info-foreground: 222.2 47.4% 11.2%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 239 84% 67%;
    --chart-dim-1: 263 90% 76%;
    --chart-dim-2: 239 84% 67%;
    --chart-dim-3: 213 94% 68%;
    --chart-dim-4: 198 93% 60%;
    --chart-dim-5: 172 66% 50%;
    --chart-dim-6: 152 76% 52%;
    --chart-dim-7: 43 96% 56%;
    --chart-dim-8: 24 94% 61%;
    --chart-dim-9: 343 87% 71%;
    --chart-dim-10: 330 81% 71%;
    --chart-dim-11: 292 84% 72%;
    --chart-dim-12: 271 91% 75%;
  }
}
```

## **2.6 Konfigurasi Ekstensi Tailwind CSS (`tailwind.config.ts`)**

```typescript
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...fontFamily.mono],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        warning: { DEFAULT: "hsl(var(--warning))", foreground: "hsl(var(--warning-foreground))" },
        success: { DEFAULT: "hsl(var(--success))", foreground: "hsl(var(--success-foreground))" },
        info: { DEFAULT: "hsl(var(--info))", foreground: "hsl(var(--info-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        chart: {
          dim1: "hsl(var(--chart-dim-1))",
          dim2: "hsl(var(--chart-dim-2))",
          dim3: "hsl(var(--chart-dim-3))",
          dim4: "hsl(var(--chart-dim-4))",
          dim5: "hsl(var(--chart-dim-5))",
          dim6: "hsl(var(--chart-dim-6))",
          dim7: "hsl(var(--chart-dim-7))",
          dim8: "hsl(var(--chart-dim-8))",
          dim9: "hsl(var(--chart-dim-9))",
          dim10: "hsl(var(--chart-dim-10))",
          dim11: "hsl(var(--chart-dim-11))",
          dim12: "hsl(var(--chart-dim-12))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        psychic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "120": "120ms",
        "180": "180ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

# **3\. KASUS TEPI, VALIDITAS & AKSESIBILITAS SISTEM**

## **3.1 Spesifikasi Gerak & Kurva Mikromosi (Motion Design)**

Seluruh transisi visual wajib menggunakan standar tunggal kurva Bezier psikomotorik:

* **Micro-Fast (120ms):** Seleksi opsi, efek hover tombol, klik aktif ──> `cubic-bezier(0.16, 1, 0.3, 1)`.  
* **Base-Slide (200ms):** Transisi pergeseran antar kartu pertanyaan ──> `cubic-bezier(0.16, 1, 0.3, 1)`.  
* **Modal-Reveal (300ms):** Pemunculan modal hasil asesmen dan ekspansi bagan visualisasi ──> `cubic-bezier(0.16, 1, 0.3, 1)`.

## **3.2 Pola Skeleton Loader & Ketahanan Galat Jaringan**

* **Skeleton Shimmer Engine:** Berdenyut lembut dengan durasi 1.8 detik `infinite cubic-bezier(0.4, 0, 0.6, 1)` dengan warna `bg-muted/60` presisi dimensi kartu.  
* **Ketahanan Jaringan (Offline Banner):** Pita peringatan mengambang (*Floating Banner* `bg-amber-500/10`) jika koneksi putus.
* **Kepatuhan Aksesibilitas WCAG 2.2 Level AA:** Rasio kontras teks primer terhadap latar kanvas minimal 4.5:1 untuk teks normal dan 3:1 untuk elemen grafis interaktif.

---

# **4\. MATRIKS IMPLEMENTASI & INTEGRASI SISTEM**

## **4.1 Pemetaan Komponen Primitif (`src/components/ui/`)**

| Komponen Primitif | Berkas Kode Sumber | Dependensi Primitif Radix UI |
| :--- | :--- | :--- |
| `Button` | [`src/components/ui/button.tsx`](file:///d:/watq/src/components/ui/) | `@radix-ui/react-slot` |
| `RadioGroup` | [`src/components/ui/radio-group.tsx`](file:///d:/watq/src/components/ui/) | `@radix-ui/react-radio-group` |
| `Progress` | [`src/components/ui/progress.tsx`](file:///d:/watq/src/components/ui/) | `@radix-ui/react-progress` |
| `Badge` | [`src/components/ui/badge.tsx`](file:///d:/watq/src/components/ui/) | Class Variance Authority (CVA) |
| `Skeleton` | [`src/components/ui/skeleton.tsx`](file:///d:/watq/src/components/ui/) | Tailwind Animate Shimmer |
