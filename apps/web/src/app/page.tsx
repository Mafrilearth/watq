"use client";

import { WatqFullLogo, WatqPrismMark } from "@/components/brand/WatqLogo";
import { ArchetypeMatrixShowcase } from "@/components/home/ArchetypeMatrixShowcase";
import { BentoGridFeatures } from "@/components/home/BentoGridFeatures";
import { FloatingNav } from "@/components/home/FloatingNav";
import { FrameworksShowcase } from "@/components/home/FrameworksShowcase";
import { HeroCognitivePrism } from "@/components/home/HeroCognitivePrism";
import {
  clearSession,
  getClientSessionSnapshot,
  getServerSessionSnapshot,
  subscribeSession,
} from "@/lib/storage/session";
import { useUIStore } from "@/lib/stores/uiStore";
import {
  ArrowRight,
  Cpu,
  ExternalLink,
  Keyboard,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useSyncExternalStore } from "react";

const MODEL_TOTAL_ITEMS: Record<string, number> = {
  jungian: 24,
  bigfive: 20,
  enneagram: 36,
  disc: 16,
  riasec: 30,
};

export default function HomePage() {
  const router = useRouter();
  const { locale } = useUIStore();
  const isId = locale === "id";

  const session = useSyncExternalStore(
    subscribeSession,
    getClientSessionSnapshot,
    getServerSessionSnapshot,
  );

  const handleStartOver = () => {
    const confirmMsg = isId
      ? "Mulai ulang asesmen dari awal? Jawaban yang tersimpan akan dihapus."
      : "Restart assessment from the beginning? Your saved responses will be cleared.";
    if (window.confirm(confirmMsg)) {
      clearSession();
      router.push("/assess");
    }
  };

  const hasCompletedResult = session && session.completedAt && session.result;
  const hasInProgressSession = session && !session.completedAt && session.currentIndex > 0;

  const totalModelQuestions =
    session?.modelType && session.modelType in MODEL_TOTAL_ITEMS
      ? MODEL_TOTAL_ITEMS[session.modelType]
      : 24;

  return (
    <div className="flex flex-col min-h-screen bg-[#08090C] text-[#F8FAFC] selection:bg-[#D4F024]/30 selection:text-white relative overflow-x-hidden">
      {/* Modern Detached Floating Glass Navigation Pill */}
      <FloatingNav session={session} />

      {/* Ambient Grid Background Pattern (Linear/Attio Vibe) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] -z-20"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 1: Hero with Interactive Cognitive Prism & Dynamic Dispersion */}
        <HeroCognitivePrism />

        {/* Live Active Session Quick-Resume Bar (if in progress or completed) */}
        {(hasCompletedResult || hasInProgressSession) && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-6 mb-16 relative z-10">
            <div className="p-4 rounded-2xl bg-[#12151D]/90 border border-[#D4F024]/30 backdrop-blur-xl shadow-2xl shadow-black/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D4F024]/10 border border-[#D4F024]/20 flex items-center justify-center text-[#D4F024] shrink-0">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono font-semibold text-[#D4F024]">
                    {hasCompletedResult
                      ? isId
                        ? "PROFIL TERVERIFIKASI TERSIMPAN DI PERANGKAT"
                        : "SAVED ASSESSMENT AVAILABLE ON THIS DEVICE"
                      : isId
                      ? "SESI ASESMEN SEDANG BERJALAN"
                      : "IN-PROGRESS ASSESSMENT IN PROGRESS"}
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    {hasCompletedResult
                      ? isId
                        ? `Asesmenmu sudah selesai (${session.result && "typeCode" in session.result ? (session.result as { typeCode: string; archetypeTitle: string }).typeCode : "Profil Lengkap"}).`
                        : `Your verified assessment is ready (${session.result && "typeCode" in session.result ? (session.result as { typeCode: string; archetypeTitle: string }).typeCode : "Full Profile"}).`
                      : isId
                      ? `Kamu telah menjawab ${session.currentIndex} dari ${totalModelQuestions} soal. Ingin melanjutkan sekarang?`
                      : `You have completed ${session.currentIndex} of ${totalModelQuestions} questions. Ready to finalize?`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                {hasCompletedResult ? (
                  <Link
                    href="/result"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#D4F024] text-[#08090C] font-bold text-xs hover:bg-[#E2F752] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{isId ? "Lihat Hasil" : "View Profile"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href="/assess"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#D4F024] text-[#08090C] font-bold text-xs hover:bg-[#E2F752] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>
                      {isId ? "Lanjutkan" : "Resume"} ({session.currentIndex + 1}/{totalModelQuestions})
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                  title={isId ? "Ulangi asesmen dari awal" : "Reset session and start over"}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Precision Metrics Ticker / Trust Strip */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 mb-24">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
            <div className="p-4 rounded-xl bg-[#0B0F19]/80 border border-white/[0.04] transition-all hover:border-white/[0.1]">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                {isId ? "MODEL ASESMEN" : "ASSESSMENT SUITES"}
              </div>
              <div className="text-xl font-bold font-mono text-[#D4F024]">
                {isId ? "5 Pilihan" : "5 Frameworks"}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isId ? "16 Tipe, Big Five, Enneagram, DISC, RIASEC" : "Jungian, Big Five, Enneagram, DISC, RIASEC"}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#0B0F19]/80 border border-white/[0.04] transition-all hover:border-white/[0.1]">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                {isId ? "BANK PERTANYAAN" : "QUESTION BANK"}
              </div>
              <div className="text-xl font-bold font-mono text-white">
                {isId ? "126 Soal" : "126 Items"}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isId ? "Pilih tes singkat 16 s/d 36 soal" : "Modular suites (16Q to 36Q each)"}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#0B0F19]/80 border border-white/[0.04] transition-all hover:border-white/[0.1]">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                {isId ? "HASIL INSTAN" : "INSTANT RESULTS"}
              </div>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {isId ? "Otomatis" : "< 5ms Scoring"}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isId ? "Langsung keluar tanpa menunggu" : "Calculated immediately in browser"}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#0B0F19]/80 border border-white/[0.04] transition-all hover:border-white/[0.1]">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                {isId ? "PANDUAN MASA DEPAN" : "CAREER STANDARDS"}
              </div>
              <div className="text-xl font-bold font-mono text-teal-400">UNESCO &amp; ILO</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isId ? "Selaras jurusan & profesi global" : "ISCED-F 2013 & ISCO-08 Aligned"}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Dedicated 5 Sovereign Diagnostic Suites Showcase */}
        <FrameworksShowcase />

        {/* Section 3: Cognitive Architecture & 4 Preference Axes */}
        <BentoGridFeatures />

        {/* Section 4: 16 Archetype Catalog Matrix (Temperaments, Search, Cognitive Stack Modal) */}
        <ArchetypeMatrixShowcase />

        {/* Section 5: High-Impact Linear-Style Final Conversion Callout */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto text-center border-t border-white/[0.08] relative">
          {/* Radial Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] bg-[#D4F024]/[0.05] blur-[100px] rounded-full pointer-events-none -z-10" />

          {/* Double-Bezel Card Outer */}
          <div className="rounded-[2.5rem] p-1 sm:p-1.5 bg-gradient-to-b from-white/[0.15] via-white/[0.04] to-transparent border border-white/[0.08] shadow-2xl shadow-black/80">
            <div className="rounded-[calc(2.5rem-0.375rem)] bg-[#0C101C] p-8 sm:p-16 border border-white/[0.06] relative overflow-hidden">
              {/* Subtle Watq Monogram Watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none">
                <WatqPrismMark size={280} color="#FFFFFF" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#D4F024]" />
                <span>
                  {isId ? "5 MODEL ASESMEN // 100% GRATIS TANPA DAFTAR" : "5 CALIBRATED INSTRUMENTS // NO REGISTRATION REQUIRED"}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
                {isId
                  ? "Pahami Potensi Terbaikmu Lewat 5 Dimensi Kepribadian."
                  : "Decode Your Authentic Architecture Across 5 Dimensions."}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {isId
                  ? "Masuki lingkungan tes yang tenang, bersih, dan bebas distraksi. Pilih model asesmen yang kamu inginkan dan temukan panduan diri yang jelas dalam beberapa menit."
                  : "Step into a distraction-free assessment environment. Choose between 16 Cognitive Types, Big Five Traits, Enneagram Core Motivations, DISC Workplace Dynamics, or Holland Vocational Codes."}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/assess"
                  className="group relative inline-flex items-center gap-3 pl-7 pr-2.5 py-3 rounded-full bg-[#D4F024] hover:bg-[#E2F752] text-[#08090C] font-bold text-sm shadow-xl shadow-[#D4F024]/20 hover:shadow-[#D4F024]/35 transition-all duration-200 active:scale-95"
                >
                  <span>{isId ? "Mulai Tes Gratis" : "Start Free Assessment"}</span>
                  <span className="w-8 h-8 rounded-full bg-[#08090C] text-[#D4F024] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <a
                  href="#frameworks"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-all"
                >
                  <span>{isId ? "Lihat 5 Model Asesmen" : "Explore All 5 Suites"}</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>

              {/* Guarantee Badges */}
              <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isId ? "100% Aman & Privat" : "100% In-Browser Privacy"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-slate-300" />
                  <span>{isId ? "Tanpa Wajib Bikin Akun" : "No Account Required"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-[#D4F024]" />
                  <span>{isId ? "Pilihan Tombol 1–5 atau Sentuh" : "Keyboard 1–5 or Click"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Linear-Tier Precision Footer */}
      <footer className="border-t border-white/[0.08] bg-[#08090C] py-12 px-4 sm:px-6 relative z-10 text-xs font-mono text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <WatqFullLogo markSize={26} theme="dark" showTagline={false} />
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-slate-400 text-xs">
              {isId
                ? "Watq // 5 Model Asesmen Kepribadian Mandiri"
                : "Watq // 5 Calibrated Psychometric Frameworks"}
            </span>
          </div>

          {/* Center Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#frameworks" className="hover:text-white transition-colors">
              {isId ? "5 Model" : "5 Suites"}
            </a>
            <a href="#archetypes" className="hover:text-white transition-colors">
              {isId ? "16 Tipe" : "16 Types"}
            </a>
            <a href="#vocational-taxonomy" className="hover:text-white transition-colors">
              {isId ? "Karir & Jurusan" : "Vocational"}
            </a>
            <Link href="/assess" className="hover:text-[#D4F024] transition-colors">
              {isId ? "Mulai Tes" : "Start Assessment"}
            </Link>
            <a
              href="https://github.com/Mafrilearth/watq"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 text-slate-600" />
            </a>
          </div>

          {/* Right Status */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-400">
              {isId ? "Hasil Instan di Browser" : "100% Client-Side Engine"}
            </span>
          </div>
        </div>

        {/* Bottom Micro Line */}
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            {isId
              ? "© 2026 Watq. Dikembangkan oleh Mafrilearth. Standar asesmen kepribadian terkalibrasi."
              : "© 2026 Watq. Developed by Mafrilearth. Standardized psychometric instrument."}
          </div>
          <div className="flex items-center gap-4">
            <span>ILO ISCO-08</span>
            <span>•</span>
            <span>UNESCO ISCED-F 2013</span>
            <span>•</span>
            <span>WCAG 2.2 AAA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
