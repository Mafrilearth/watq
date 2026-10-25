"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/uiStore";
import {
  Brain,
  Compass,
  Briefcase,
  Users,
  Target,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FrameworkSuite {
  id: "jungian" | "bigfive" | "enneagram" | "disc" | "riasec";
  name: string;
  nameId: string;
  category: string;
  categoryId: string;
  origin: string;
  itemsCount: number;
  estMinutes: string;
  accentColor: string;
  badgeBorder: string;
  icon: React.ElementType;
  headline: string;
  headlineId: string;
  simpleExplanation: string;
  simpleExplanationId: string;
  whatYouLearn: Array<{ title: string; desc: string; titleId: string; descId: string }>;
  deliverables: Array<{ text: string; textId: string }>;
}

const SUITES: FrameworkSuite[] = [
  {
    id: "jungian",
    name: "16 Personality Types",
    nameId: "16 Tipe Kepribadian",
    category: "Mind & Thinking Style",
    categoryId: "Pola Pikir & Energi Mental",
    origin: "Carl Jung (1921)",
    itemsCount: 24,
    estMinutes: "3 Min",
    accentColor: "#D4F024",
    badgeBorder: "border-[#D4F024]/40 text-[#D4F024] bg-[#D4F024]/10",
    icon: Brain,
    headline: "Discover your natural thinking style and mental battery.",
    headlineId: "Kenali gaya berpikir alami dan cara mengisi ulang energimu.",
    simpleExplanation:
      "This assessment reveals how you recharge your energy, absorb facts and ideas, make choices under pressure, and organize your daily routine into one of 16 distinct archetypes.",
    simpleExplanationId:
      "Asesmen ini mengungkap bagaimana kamu mengisi ulang energi, menyerap informasi, mengambil keputusan penting, dan mengatur rutinitas harianmu ke dalam salah satu dari 16 profil arketipe.",
    whatYouLearn: [
      {
        title: "Energy Source",
        desc: "Whether you thrive in social action (E) or quiet focus (I).",
        titleId: "Sumber Energi",
        descId: "Apakah kamu bersemangat lewat interaksi sosial (E) atau fokus tenang (I).",
      },
      {
        title: "Information Intake",
        desc: "Whether you prefer tangible facts (S) or big-picture ideas (N).",
        titleId: "Penyusunan Fakta",
        descId: "Apakah kamu menyukai fakta nyata (S) atau gambaran besar & ide (N).",
      },
      {
        title: "Decision Making",
        desc: "Whether you lead with logical consistency (T) or human empathy (F).",
        titleId: "Pengambilan Keputusan",
        descId: "Apakah kamu mengutamakan logika objektif (T) atau nilai empati (F).",
      },
      {
        title: "Life Cadence",
        desc: "Whether you love planned certainty (J) or adaptable freedom (P).",
        titleId: "Gaya Hidup",
        descId: "Apakah kamu menyukai jadwal teratur (J) atau fleksibilitas bebas (P).",
      },
    ],
    deliverables: [
      { text: "Your 4-Letter Personality Archetype", textId: "Arketipe 4 Huruf Kepribadianmu" },
      { text: "Personal Energy & Stress Triggers", textId: "Pemicu Stres & Cara Pemulihan Mental" },
      {
        text: "Best-Fit University Majors & Careers",
        textId: "Rekomendasi Jurusan Kuliah & Karir Nyata",
      },
      { text: "Teamwork & Communication Strengths", textId: "Kekuatan Komunikasi dalam Tim Kerja" },
    ],
  },
  {
    id: "bigfive",
    name: "Big Five Traits (OCEAN)",
    nameId: "5 Pilar Kepribadian (OCEAN)",
    category: "Universal Personality Science",
    categoryId: "Sains Kepribadian Universal",
    origin: "Goldberg (1992) / Mini-IPIP",
    itemsCount: 20,
    estMinutes: "2.5 Min",
    accentColor: "#2DD4BF",
    badgeBorder: "border-[#2DD4BF]/40 text-[#2DD4BF] bg-[#2DD4BF]/10",
    icon: Compass,
    headline: "The scientific gold standard used by psychologists worldwide.",
    headlineId: "Standar ilmiah yang paling banyak digunakan psikolog dunia.",
    simpleExplanation:
      "Unlike categories that put you into a box, Big Five measures your personality on 5 continuous spectrums, showing exactly where you sit compared to the global population.",
    simpleExplanationId:
      "Alih-alih mengotak-ngotakkan orang, Big Five mengukur kepribadianmu dalam 5 skala spektrum alami tanpa label kaku, memberikan gambaran paling akurat tentang dirimu.",
    whatYouLearn: [
      {
        title: "Openness",
        desc: "Your appetite for creativity, new ideas, and variety.",
        titleId: "Keterbukaan (Openness)",
        descId: "Tingkat rasa ingin tahu, apresiasi seni, dan keterbukaan ide baru.",
      },
      {
        title: "Conscientiousness",
        desc: "Your self-discipline, focus, and drive to finish goals.",
        titleId: "Kehati-hatian (Conscientiousness)",
        descId: "Kedisiplinan diri, keteraturan, dan ketekunan mencapai target.",
      },
      {
        title: "Extraversion",
        desc: "How much you enjoy enthusiasm, groups, and speaking up.",
        titleId: "Ekstraversi (Extraversion)",
        descId: "Tingkat kenyamanan bersosialisasi dan antusiasme dalam kelompok.",
      },
      {
        title: "Agreeableness & Stability",
        desc: "Your natural empathy, cooperativeness, and calm under stress.",
        titleId: "Keramahan & Kestabilan",
        descId: "Tingkat empati terhadap sesama dan ketenangan saat menghadapi krisis.",
      },
    ],
    deliverables: [
      {
        text: "Continuous 0–100% Score on Each Trait",
        textId: "Skor Persentil 0–100% untuk Setiap Sifat",
      },
      {
        text: "Low / Moderate / High Trait Insights",
        textId: "Penjelasan Tingkat Rendah / Sedang / Tinggi",
      },
      {
        text: "Practical Daily Work & Habit Tips",
        textId: "Tips Praktis untuk Pola Belajar & Bekerja",
      },
      {
        text: "Balanced Emotional Resilience Check",
        textId: "Indeks Keseimbangan Resiliensi Emosional",
      },
    ],
  },
  {
    id: "enneagram",
    name: "The 9 Enneagram Types",
    nameId: "9 Tipe Enneagram",
    category: "Inner Motivations & Growth",
    categoryId: "Motivasi Batin & Pertumbuhan",
    origin: "Naranjo & Ichazo (1970)",
    itemsCount: 36,
    estMinutes: "4 Min",
    accentColor: "#FB7185",
    badgeBorder: "border-[#FB7185]/40 text-[#FB7185] bg-[#FB7185]/10",
    icon: Target,
    headline: "Understand what truly drives your choices and reactions.",
    headlineId: "Pahami apa yang sebenarnya mendorong tindakan dan emosimu.",
    simpleExplanation:
      "Go beyond surface habits to understand your deeper unconscious motivators: what you secretly fear most, what you crave, and how your personality transforms when stressed versus thriving.",
    simpleExplanationId:
      "Lebih dalam dari sekadar kebiasaan luar, Enneagram mengungkap apa yang paling kamu takuti, apa yang paling kamu cari, serta bagaimana perilakumu berubah saat tertekan vs bertumbuh.",
    whatYouLearn: [
      {
        title: "Your Core Motivation",
        desc: "The primary psychological driver behind your daily actions.",
        titleId: "Motivasi Inti",
        descId: "Dorongan batin utama yang mendasari keputusan sehari-harimu.",
      },
      {
        title: "Core Fears & Desires",
        desc: "The root emotional needs that shape your protective reactions.",
        titleId: "Rasa Takut & Harapan Terbesar",
        descId: "Kebutuhan batin yang membentuk mekanisme pertahanan dirimu.",
      },
      {
        title: "Dominant Wings",
        desc: "The neighboring personality traits that flavor your primary type.",
        titleId: "Sayap Pendamping (Wings)",
        descId: "Sifat tipe tetangga yang memberi warna khas pada kepribadianmu.",
      },
      {
        title: "Growth & Stress Paths",
        desc: "Clear signs of when you are thriving versus burning out.",
        titleId: "Arah Pertumbuhan & Stres",
        descId: "Tanda nyata saat kamu bertumbuh positif vs saat mengalami burnout.",
      },
    ],
    deliverables: [
      { text: "Core Type Lockup (Type 1 to 9)", textId: "Penetapan Tipe Inti (Tipe 1 hingga 9)" },
      {
        text: "Dominant Wing Formulation (e.g. 5w4)",
        textId: "Formulasi Sayap Utama (misalnya 5w4 atau 3w2)",
      },
      { text: "Personal Growth Roadmap", textId: "Peta Jalan Pertumbuhan Diri yang Nyata" },
      {
        text: "Early Warnings for Burnout & Anxiety",
        textId: "Peringatan Dini Gejala Kelelahan Mental",
      },
    ],
  },
  {
    id: "disc",
    name: "DISC Workplace Styles",
    nameId: "Gaya Kerja DISC",
    category: "Teamwork & Leadership",
    categoryId: "Kerjasama Tim & Kepemimpinan",
    origin: "William M. Marston (1928)",
    itemsCount: 16,
    estMinutes: "2 Min",
    accentColor: "#38BDF8",
    badgeBorder: "border-[#38BDF8]/40 text-[#38BDF8] bg-[#38BDF8]/10",
    icon: Users,
    headline: "Fast, practical insights into how you work and lead.",
    headlineId: "Panduan cepat dan praktis tentang cara kamu bekerja dan memimpin.",
    simpleExplanation:
      "Built for teams, companies, and projects. Learn whether you are bold and results-focused (D), persuasive and social (I), supportive and steady (S), or analytical and accurate (C).",
    simpleExplanationId:
      "Dirancang khusus untuk dunia kerja dan kolaborasi tim. Pahami apakah kamu tegas & fokus hasil (D), persuasif & ramah (I), setia & suportif (S), atau analitis & cermat (C).",
    whatYouLearn: [
      {
        title: "Dominance (D)",
        desc: "Direct, ambitious, decisive, and focused on bold results.",
        titleId: "Dominan (D)",
        descId: "Tegas, ambisius, cepat mengambil keputusan, dan berorientasi hasil.",
      },
      {
        title: "Influence (I)",
        desc: "Warm, enthusiastic, collaborative, and inspiring to others.",
        titleId: "Pengaruh (I)",
        descId: "Hangat, komunikatif, optimis, dan pandai menyemangati tim.",
      },
      {
        title: "Steadiness (S)",
        desc: "Patient, reliable, empathetic, and a stabilizing presence in teams.",
        titleId: "Kestabilan (S)",
        descId: "Sabar, dapat diandalkan, setia kawan, dan pendengar yang baik.",
      },
      {
        title: "Conscientiousness (C)",
        desc: "Systematic, careful, data-informed, and dedicated to high quality.",
        titleId: "Ketelitian (C)",
        descId: "Sistematis, terencana, teliti, dan mengutamakan mutu akurat.",
      },
    ],
    deliverables: [
      {
        text: "Your Primary & Secondary Work Blend",
        textId: "Kombinasi Gaya Kerja Utama & Pendukung",
      },
      {
        text: "How to Communicate With You (DOs & DONTs)",
        textId: "Panduan Komunikasi (Hal Boleh & Jangan Dilakukan)",
      },
      {
        text: "Natural Leadership Strengths",
        textId: "Karakter Kepemimpinan Alami di Tempat Kerja",
      },
      {
        text: "Ideal Work Environment Preferences",
        textId: "Lingkungan Kerja yang Paling Mendukung Potensimu",
      },
    ],
  },
  {
    id: "riasec",
    name: "Holland Career Codes (RIASEC)",
    nameId: "Minat Karir RIASEC",
    category: "Career & College Matching",
    categoryId: "Pilihan Karir & Jurusan Kuliah",
    origin: "John L. Holland (1959)",
    itemsCount: 30,
    estMinutes: "3.5 Min",
    accentColor: "#FBBF24",
    badgeBorder: "border-[#FBBF24]/40 text-[#FBBF24] bg-[#FBBF24]/10",
    icon: Briefcase,
    headline: "Directly connects your interests to high-demand careers.",
    headlineId: "Menghubungkan minat alami langsung ke karir masa depan yang nyata.",
    simpleExplanation:
      "Stop guessing what you should study or do for work. Holland codes match your natural interest patterns with internationally classified university degrees and real occupations.",
    simpleExplanationId:
      "Berhenti menebak-nebak jurusan atau pekerjaan yang cocok. Kode Holland memetakan minatmu langsung ke standar jurusan perguruan tinggi dunia dan profesi nyata.",
    whatYouLearn: [
      {
        title: "Practical & Hands-On (R)",
        desc: "Working with physical tools, technology, and real objects.",
        titleId: "Praktikal & Lapangan (R)",
        descId: "Suka bekerja dengan alat nyata, mesin, dan lingkungan praktis.",
      },
      {
        title: "Analytical & Research (I)",
        desc: "Solving intellectual puzzles, coding, data, and science.",
        titleId: "Analitis & Riset (I)",
        descId: "Suka memecahkan masalah rumit, meneliti data, dan eksperimen ilmiah.",
      },
      {
        title: "Creative & Artistic (A)",
        desc: "Designing, storytelling, self-expression, and innovation.",
        titleId: "Kreatif & Artistik (A)",
        descId: "Suka mendesain, menulis, bercerita, dan mengekspresikan ide bebas.",
      },
      {
        title: "Social, Business & Data (S, E, C)",
        desc: "Teaching, building businesses, leading teams, or organizing systems.",
        titleId: "Sosial, Bisnis & Sistem (S, E, C)",
        descId: "Membimbing orang lain, memimpin bisnis, atau mengelola sistem rapi.",
      },
    ],
    deliverables: [
      {
        text: "Top 3-Letter Holland Code (e.g. IAS)",
        textId: "Kode Holland 3 Huruf Pilihan (misal IAS, SEC)",
      },
      {
        text: "Curated University Degree Recommendations",
        textId: "Daftar Rekomendasi Program Studi Kuliah",
      },
      {
        text: "Matched Occupations (Global Standards)",
        textId: "Daftar Profesi Nyata Berstandar Internasional",
      },
      {
        text: "Workplace Culture Compatibility Score",
        textId: "Kesesuaian Budaya Tempat Bekerja yang Nyaman",
      },
    ],
  },
];

export function FrameworksShowcase() {
  const [selectedSuiteId, setSelectedSuiteId] = useState<FrameworkSuite["id"]>("jungian");
  const { locale } = useUIStore();

  const activeSuite = SUITES.find((s) => s.id === selectedSuiteId) || SUITES[0];
  const isId = locale === "id";

  return (
    <section
      id="frameworks"
      className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.08] relative"
    >
      {/* Background Subtle Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#D4F024]/[0.025] blur-[140px] pointer-events-none -z-10" />

      {/* Section Header with Clear Human Copy */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <Badge variant="citron" className="mb-4 text-xs py-1 px-3">
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          {isId ? "5 METODE ASESMEN LENGKAP" : "5 CALIBRATED SELF-DISCOVERY TOOLS"}
        </Badge>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {isId
            ? "Pilih Cara Kamu Ingin Memahami Dirimu."
            : "Choose How You Want to Understand Yourself."}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {isId
            ? "Setiap orang punya keunikan masing-masing. Di Watq, kamu bebas memilih tes kepribadian mana yang ingin kamu coba — mulai dari gaya berpikir, motivasi batin, dinamika kerja tim, hingga kecocokan karir."
            : "No single test captures the entire human experience. At Watq, you can explore any of our 5 calibrated discovery tools — from how your brain thinks and what truly motivates you, to how you work in teams and where your career thrives."}
        </p>
      </div>

      {/* Interactive Tabs Header using Smooth Motion */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {SUITES.map((suite) => {
          const isSelected = suite.id === selectedSuiteId;
          const IconComp = suite.icon;
          return (
            <button
              key={suite.id}
              type="button"
              onClick={() => setSelectedSuiteId(suite.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 select-none ${
                isSelected
                  ? "text-[#08090C] font-bold shadow-lg shadow-white/10"
                  : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeFrameworkPill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <IconComp
                  className="w-3.5 h-3.5"
                  style={{ color: isSelected ? "#08090C" : suite.accentColor }}
                />
                <span>{isId ? suite.nameId : suite.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-black/10 text-black font-bold"
                      : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  {suite.itemsCount}Q
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Framework Inspection Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSuite.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="rounded-3xl p-1 sm:p-1.5 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/[0.08] shadow-2xl"
        >
          <div className="rounded-[calc(1.5rem-2px)] bg-[#0C101B] p-6 sm:p-10 border border-white/[0.06] relative overflow-hidden">
            {/* Ambient Radial Accent */}
            <div
              className="absolute top-0 right-0 w-80 h-80 blur-3xl pointer-events-none opacity-20 -z-0"
              style={{ backgroundColor: activeSuite.accentColor }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: What It Is & What You Learn */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${activeSuite.badgeBorder}`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isId ? activeSuite.categoryId : activeSuite.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-400">
                    {activeSuite.origin}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                    {isId ? activeSuite.nameId : activeSuite.name}
                  </h3>
                  <p className="mt-2 text-base sm:text-lg font-medium text-slate-200">
                    {isId ? activeSuite.headlineId : activeSuite.headline}
                  </p>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {isId ? activeSuite.simpleExplanationId : activeSuite.simpleExplanation}
                  </p>
                </div>

                {/* 4 Clear Points */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    {isId ? "APA SAJA YANG DILIHAT DALAM TES INI:" : "WHAT THIS ASSESSES:"}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeSuite.whatYouLearn.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
                      >
                        <span
                          className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: activeSuite.accentColor }}
                        />
                        <div>
                          <div className="text-xs font-bold text-white">
                            {isId ? item.titleId : item.title}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                            {isId ? item.descId : item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Clear Deliverables & Direct Launch */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-[#111524] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-6 text-left shadow-xl">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {isId ? "JUMLAH PERTANYAAN" : "TOTAL QUESTIONS"}
                      </span>
                      <div className="font-mono text-base font-bold text-white mt-0.5">
                        {activeSuite.itemsCount} {isId ? "Pilihan Mudah" : "Simple Choices"}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {isId ? "WAKTU PENGERJAAN" : "ESTIMATED TIME"}
                      </span>
                      <div
                        className="font-mono text-base font-bold"
                        style={{ color: activeSuite.accentColor }}
                      >
                        ~{activeSuite.estMinutes}
                      </div>
                    </div>
                  </div>

                  {/* What You Receive */}
                  <div className="mt-5 space-y-2.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold block mb-3">
                      {isId
                        ? "YANG KAMU DAPATKAN SETELAH TES:"
                        : "WHAT YOU RECEIVE IN YOUR REPORT:"}
                    </span>
                    {activeSuite.deliverables.map((del, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{isId ? del.textId : del.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Launch Button */}
                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <Link
                    href={`/assess?model=${activeSuite.id}`}
                    className="w-full group inline-flex items-center justify-between px-5 py-3.5 rounded-xl font-bold text-sm text-[#08090C] transition-all duration-200 active:scale-95 shadow-xl hover:opacity-95"
                    style={{ backgroundColor: activeSuite.accentColor }}
                  >
                    <span>
                      {isId ? `Mulai Tes ${activeSuite.nameId}` : `Start ${activeSuite.name}`}
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-[#08090C]/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4 text-[#08090C]" />
                    </span>
                  </Link>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <Zap className="w-3 h-3" />
                      {isId ? "Hasil Instan & Otomatis" : "Instant In-Browser Results"}
                    </span>
                    <span>{isId ? "100% Gratis & Privat" : "100% Free & Private"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Summary Cards of all 5 */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {SUITES.map((suite) => {
          const isSelected = suite.id === selectedSuiteId;
          return (
            <button
              key={suite.id}
              type="button"
              onClick={() => setSelectedSuiteId(suite.id)}
              className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between ${
                isSelected
                  ? "bg-[#141828] border-white/30 shadow-lg scale-[1.02]"
                  : "bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.12]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="font-bold text-[11px]" style={{ color: suite.accentColor }}>
                    {suite.itemsCount}Q
                  </span>
                  <span className="text-slate-400 text-[10px]">~{suite.estMinutes}</span>
                </div>
                <h4 className="font-display font-bold text-xs sm:text-sm text-white line-clamp-1">
                  {isId ? suite.nameId : suite.name}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {isId ? suite.categoryId : suite.category}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>{isSelected ? (isId ? "Dipilih" : "Active") : isId ? "Klik" : "View"}</span>
                <ArrowRight className="w-3 h-3" style={{ color: suite.accentColor }} />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
