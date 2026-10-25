"use client";

import { useUIStore } from "@/lib/stores/uiStore";
import { BrainCircuit, CheckCircle2, GraduationCap, Keyboard, Lock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function BentoGridFeatures() {
  const [activeAxis, setActiveAxis] = useState<"EI" | "SN" | "TF" | "JP">("EI");
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const { locale } = useUIStore();
  const isId = locale === "id";

  const AXIS_DATA = {
    EI: {
      title: isId ? "Sumber Energi (E ↔ I)" : "Where You Get Your Energy (E ↔ I)",
      color: "#818CF8",
      desc: isId
        ? "Apakah kamu mengisi ulang energi melalui interaksi sosial yang hidup, atau dalam refleksi tenang sendirian?"
        : "Do you recharge your mental battery through lively interaction with the outside world, or in quiet solo reflection?",
      leftPole: {
        code: "E",
        label: isId ? "Ekstraversi (Extraversion)" : "Extraversion",
        focus: isId
          ? "Bersemangat saat berdiskusi, beraksi bersama banyak orang, dan beraktivitas di lingkungan ramai."
          : "Energized by people, shared action, lively surroundings, and sharing ideas out loud.",
      },
      rightPole: {
        code: "I",
        label: isId ? "Introversi (Introversion)" : "Introversion",
        focus: isId
          ? "Bersemangat saat berkontemplasi mandiri, memikirkan konsep mendalam, dan menikmati waktu tenang."
          : "Energized by quiet focus, independent contemplation, and peaceful space to process thoughts.",
      },
    },
    SN: {
      title: isId ? "Penyusunan Informasi (S ↔ N)" : "How You Process Information (S ↔ N)",
      color: "#2DD4BF",
      desc: isId
        ? "Apakah kamu fokus pada fakta nyata dan langkah terbukti, atau pada pola tersembunyi dan kemungkinan masa depan?"
        : "Do you focus on tangible facts and practical steps right in front of you, or on patterns, concepts, and future possibilities?",
      leftPole: {
        code: "S",
        label: isId ? "Penginderaan (Sensing)" : "Sensing",
        focus: isId
          ? "Memperhatikan detail konkret, data nyata yang ada di depan mata, dan pengalaman praktis masa lalu."
          : "Grounds understanding in tangible reality, observational facts, and proven precedents.",
      },
      rightPole: {
        code: "N",
        label: isId ? "Intuisi (Intuition)" : "Intuition",
        focus: isId
          ? "Menghubungkan pola-pola tersirat, tertarik pada visi masa depan, inovasi, dan ide-ide konseptual."
          : "Envisions overarching patterns, abstract ideas, symbolism, and long-range future possibilities.",
      },
    },
    TF: {
      title: isId ? "Cara Mengambil Keputusan (T ↔ F)" : "How You Make Decisions (T ↔ F)",
      color: "#D4F024",
      desc: isId
        ? "Saat memilih solusi, apakah kamu mengutamakan logika objektif dan keadilan, atau empati dan harmoni antarmanusia?"
        : "When solving a problem, do you lead with objective logic and fairness, or with human empathy and harmony?",
      leftPole: {
        code: "T",
        label: isId ? "Berpikir Logis (Thinking)" : "Thinking",
        focus: isId
          ? "Menganalisis sebab-akibat secara rasional, konsistensi aturan, dan efisiensi sistem tanpa bias."
          : "Values deductive logic, consistency, objective principles, and impartial criteria.",
      },
      rightPole: {
        code: "F",
        label: isId ? "Perasaan & Nilai (Feeling)" : "Feeling",
        focus: isId
          ? "Mempertimbangkan dampak emosional pada sesama, keselarasan hubungan, dan nilai-nilai kemanusiaan."
          : "Values interpersonal empathy, shared harmony, core ethics, and the human impact of decisions.",
      },
    },
    JP: {
      title: isId ? "Cara Mengatur Hidup (J ↔ P)" : "How You Organize Your Life (J ↔ P)",
      color: "#FF7A00",
      desc: isId
        ? "Apakah kamu menyukai jadwal rapi dan kepastian langkah, atau fleksibilitas santai yang terbuka pada kejutan baru?"
        : "Do you prefer a structured schedule with clear milestones, or an adaptable flow that keeps options open?",
      leftPole: {
        code: "J",
        label: isId ? "Terencana (Judging)" : "Judging",
        focus: isId
          ? "Menyukai rencana terstruktur, target jelas, kepastian keputusan, dan menyelesaikan tugas lebih awal."
          : "Thrives with organized timelines, clear agendas, decisive closure, and milestone tracking.",
      },
      rightPole: {
        code: "P",
        label: isId ? "Fleksibel (Perceiving)" : "Perceiving",
        focus: isId
          ? "Suka spontanitas, adaptif terhadap perubahan mendadak, dan menikmati eksplorasi beragam alternatif."
          : "Thrives with flexible pacing, spontaneous discovery, and keeping options comfortably open.",
      },
    },
  };

  const currentAxisInfo = AXIS_DATA[activeAxis];

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 300);
  };

  return (
    <section
      id="vocational"
      className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.08] relative"
    >
      {/* Section Header */}
      <div className="max-w-2xl mb-12 sm:mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4F024]/10 border border-[#D4F024]/20 text-xs font-mono font-semibold text-[#D4F024] mb-4">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>{isId ? "PONDASI POLA PIKIR" : "HOW YOUR MIND WORKS"}</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {isId
            ? "Mudah Dipahami, Tanpa Istilah Rumit."
            : "Clear, Human Insights. Zero Overcomplicated Jargon."}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
          {isId
            ? "Mengenali diri sendiri seharusnya mencerahkan dan menyenangkan. Berikut 4 pilar utama kepribadian yang menjelaskan caramu mengisi energi, memproses fakta, mengambil keputusan, dan mengatur hari."
            : "Self-discovery should feel natural and empowering. Here are the 4 fundamental pillars that explain how you recharge, process information, evaluate choices, and navigate life."}
        </p>
      </div>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ========================================================================= */}
        {/* CARD 1: 4 Core Axes Interactive Explorer (Col-span 8)                     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 rounded-3xl p-1 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(1.5rem-2px)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              {/* Card Header & Axis Switcher Tabs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    {isId ? "4 DIMENSI ALAMI" : "4 CORE PREFERENCES"}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mt-1">
                    {currentAxisInfo.title}
                  </h3>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  {(["EI", "SN", "TF", "JP"] as const).map((axis) => (
                    <button
                      key={axis}
                      type="button"
                      onClick={() => setActiveAxis(axis)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        activeAxis === axis
                          ? "bg-white text-[#0B0F19] shadow-sm"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      {axis}
                    </button>
                  ))}
                </div>
              </div>

              {/* Animated Axis Details Container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAxis}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-6 my-6"
                >
                  <p className="text-sm text-slate-300 leading-relaxed">{currentAxisInfo.desc}</p>

                  {/* 2 Opposite Poles Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Left Pole */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-2xl font-mono font-extrabold"
                          style={{ color: currentAxisInfo.color }}
                        >
                          {currentAxisInfo.leftPole.code}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">
                          {currentAxisInfo.leftPole.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {currentAxisInfo.leftPole.focus}
                      </p>
                    </div>

                    {/* Right Pole */}
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-2xl font-mono font-extrabold"
                          style={{ color: currentAxisInfo.color }}
                        >
                          {currentAxisInfo.rightPole.code}
                        </span>
                        <span className="text-xs font-semibold text-slate-300">
                          {currentAxisInfo.rightPole.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {currentAxisInfo.rightPole.focus}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Note */}
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {isId
                  ? "Pertanyaan seimbang & teruji secara psikometrik"
                  : "Scientifically calibrated across positive and reverse questions"}
              </span>
              <span className="text-[#D4F024]">
                {activeAxis === "EI"
                  ? "E ↔ I"
                  : activeAxis === "SN"
                    ? "S ↔ N"
                    : activeAxis === "TF"
                      ? "T ↔ F"
                      : "J ↔ P"}
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: Complete Local Privacy (Col-span 4)                               */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 rounded-3xl p-1 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(1.5rem-2px)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {isId ? "PRIVAT DI PERANGKATMU" : "100% PRIVATE"}
                </span>
                <span>{isId ? "BEBAS AKUN" : "NO SIGN-UP"}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-display">
                {isId ? "Data Aman di HP atau Laptopmu" : "Stays on Your Device"}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isId
                  ? "Jawabanmu diproses langsung di browsermu. Tidak ada pelacak iklan, tidak ada spam email, dan tidak wajib membuat akun jika kamu hanya ingin hasil instan."
                  : "Your answers are calculated directly inside your web browser. No invasive tracking, zero spam, and no account required unless you choose to save to your cloud profile."}
              </p>

              {/* Clean Vault Graphic */}
              <div className="my-6 p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>{isId ? "Penyimpanan:" : "Storage:"}</span>
                  <span className="text-emerald-400 font-bold">
                    {isId ? "Lokal Perangkat" : "Your Browser"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>{isId ? "Pelacak Iklan:" : "Ad Trackers:"}</span>
                  <span className="text-emerald-400 font-bold">0% (None)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>{isId ? "Biaya Asesmen:" : "Test Cost:"}</span>
                  <span className="text-[#D4F024] font-bold">100% Free</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>{isId ? "Kerahasiaan Terjamin" : "Private & Confidential"}</span>
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: Smooth Answering (Col-span 4)                                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 rounded-3xl p-1 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(1.5rem-2px)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-[#D4F024] font-semibold">
                  <Keyboard className="w-3.5 h-3.5" />
                  {isId ? "PILIHAN CEPAT" : "KEYBOARD 1–5 OR TAP"}
                </span>
                <span>FLOW</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-2">
                {isId ? "Fokus & Tanpa Distraksi" : "Fast & Distraction-Free"}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isId
                  ? "Jawab pertanyaan secara santai dengan tombol angka 1 sampai 5 pada keyboard laptopmu, atau cukup sentuh di layar HP."
                  : "Move effortlessly through questions using keys 1 through 5 on your keyboard, or tap cleanly on mobile. Designed for effortless mental flow."}
              </p>

              {/* Interactive Keycaps preview */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {["1", "2", "3", "4", "5"].map((key) => {
                  const isPressed = pressedKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKeyPress(key)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-100 ${
                        isPressed
                          ? "bg-[#D4F024] text-[#08090C] shadow-lg shadow-[#D4F024]/40 translate-y-1"
                          : "bg-white/[0.04] text-white border border-white/[0.1] hover:bg-white/[0.08]"
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-400 text-center">
              {isId ? "Dirancang untuk kenyamanan berpikir" : "Engineered for pure cognitive focus"}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 4: Real Academic & Career Alignments (Col-span 8)                    */}
        {/* ========================================================================= */}
        <div
          id="vocational-taxonomy"
          className="lg:col-span-8 rounded-3xl p-1 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl"
        >
          <div className="rounded-[calc(1.5rem-2px)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {isId ? "PILIHAN MASA DEPAN" : "CAREER & MAJOR MAPPING"}
                </span>
                <span>{isId ? "STANDAR RESMI" : "UNESCO & ILO STANDARDS"}</span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-2">
                {isId
                  ? "Menghubungkan Kepribadian ke Jurusan & Karir Nyata"
                  : "Connecting Personality to Your Next Chapter"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isId
                  ? "Mengetahui tipe kepribadian akan jauh lebih bermakna ketika membantumu memilih jurusan kuliah atau arah karir. Watq memetakan profilmu langsung ke bidang keilmuan dan profesi nyata:"
                  : "Self-knowledge is most valuable when it guides real life decisions. Watq maps each personality profile directly to international academic disciplines and modern career tracks:"}
              </p>

              {/* Sample Target Trajectory Badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  isId ? "Ilmu Komputer & Rekayasa Perangkat Lunak" : "Computer Science & Software",
                  isId ? "Desain Produk & UI/UX" : "UI/UX & Product Design",
                  isId ? "Manajemen Bisnis & Kewirausahaan" : "Business & Entrepreneurship",
                  isId ? "Psikologi & Sumber Daya Manusia" : "Psychology & Human Resources",
                  isId ? "Rekayasa Teknik & Sains Terapan" : "Engineering & Applied Sciences",
                  isId ? "Data & Statistika" : "Data Science & Analytics",
                  isId ? "Media, Komunikasi & Kreatif" : "Media & Creative Communication",
                  isId ? "Manajemen Operasional & Logistik" : "Operations & Project Management",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-slate-200 hover:border-[#D4F024]/50 hover:bg-white/[0.06] transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>
                {isId
                  ? "Panduan Lengkap untuk Setiap Tipe"
                  : "Dedicated Guides for Every Archetype"}
              </span>
              <span className="text-[#D4F024] font-semibold">
                {isId ? "16 Panduan Karir" : "16 Comprehensive Dossiers"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
