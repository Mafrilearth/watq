"use client";

import { WatqFullLogo } from "@/components/brand/WatqLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  clearSession,
  getClientSessionSnapshot,
  getServerSessionSnapshot,
  subscribeSession,
} from "@/lib/storage/session";
import { getClientAuthSnapshot, getServerAuthSnapshot, subscribeAuth } from "@/lib/auth/authStore";
import { useUIStore } from "@/lib/stores/uiStore";
import {
  ARCHETYPE_METAS,
  generateJoyfulCallsign,
  type AnyAssessmentResult,
  type AssessmentResult,
  type BigFiveDimension,
  type BigFiveResult,
  type EnneagramResult,
  type DISCResult,
  type RIASECResult,
} from "@watq/core";
import {
  ArrowRight,
  Briefcase,
  Check,
  Copy,
  FileText,
  GraduationCap,
  Layers,
  Printer,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  CloudUpload,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useSyncExternalStore, useEffect, useState, useMemo } from "react";
import { VocationalSearch } from "@/components/result/VocationalSearch";
import { CollaborationManualModal } from "@/components/modals/CollaborationManualModal";
import { SocialStoryModal } from "@/components/modals/SocialStoryModal";
import { motion } from "motion/react";
import { toast } from "sonner";

interface PolarityBarProps {
  dimensionTitle?: string;
  labelLeft: string;
  labelRight: string;
  codeLeft: string;
  codeRight: string;
  scoreLeft: number;
  scoreRight: number;
  colorHex: string;
}

function PolarityBar({
  dimensionTitle,
  labelLeft,
  labelRight,
  codeLeft,
  codeRight,
  scoreLeft,
  scoreRight,
  colorHex,
}: PolarityBarProps) {
  const isLeftDominant = scoreLeft >= scoreRight;

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 sm:p-5">
      {dimensionTitle && (
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
          {dimensionTitle}
        </div>
      )}
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
        <span className={isLeftDominant ? "text-white font-bold" : "text-slate-400"}>
          {labelLeft} ({codeLeft}){" "}
          <strong className="font-mono text-[#D4F024]">{scoreLeft}%</strong>
        </span>
        <span className={!isLeftDominant ? "text-white font-bold" : "text-slate-400"}>
          <strong className="font-mono text-[#D4F024]">{scoreRight}%</strong> {labelRight} (
          {codeRight})
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex relative">
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/20 z-10" />

        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${scoreLeft}%`,
            backgroundColor: isLeftDominant ? colorHex : "rgba(148, 163, 184, 0.25)",
          }}
        />
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${scoreRight}%`,
            backgroundColor: !isLeftDominant ? colorHex : "rgba(148, 163, 184, 0.25)",
          }}
        />
      </div>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const { locale, toggleLocale } = useUIStore();
  const session = useSyncExternalStore(
    subscribeSession,
    getClientSessionSnapshot,
    getServerSessionSnapshot,
  );
  const authSession = useSyncExternalStore(
    subscribeAuth,
    getClientAuthSnapshot,
    getServerAuthSnapshot,
  );
  const isAuthenticated = Boolean(authSession.user);
  const [copied, setCopied] = useState<boolean>(false);
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);

  const result: AnyAssessmentResult | null = session?.result || null;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (typeof window !== "undefined" && session && !session.result) {
      router.replace("/");
    }
  }, [session, router]);

  const handleRetake = () => {
    const confirmMessage =
      locale === "id"
        ? "Ulangi asesmen? Jawaban sebelumnya akan dihapus."
        : "Retake assessment? Your previous responses will be cleared.";
    if (window.confirm(confirmMessage)) {
      clearSession();
      router.push("/assess");
    }
  };

  // Determine model type
  const modelType = result ? ("modelType" in result ? result.modelType : "jungian") : "jungian";

  // SHA-256 Fingerprint calculation
  const sha256Fingerprint = useMemo(() => {
    if (!result) return "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855";
    const str = JSON.stringify(result) + (session?.completedAt || "");
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0");
    return `${hex.toUpperCase()}${hex.split("").reverse().join("").toUpperCase()}`;
  }, [result, session]);

  // Callsign & Metadata for Jungian
  const jungianResult = modelType === "jungian" ? (result as AssessmentResult) : null;
  const meta = (jungianResult && ARCHETYPE_METAS[jungianResult.typeCode]) || null;
  const temperament = jungianResult?.temperament || meta?.temperament || "Cognitive Typology";
  const cognitiveStack = jungianResult?.cognitiveStack || meta?.cognitiveStack || "";
  const leadFunction = jungianResult?.leadFunction || meta?.leadFunction || "";

  const callsign = useMemo(() => {
    if (!jungianResult) return "Sovereign Thinker";
    const seed =
      jungianResult.scores.E * 3 +
      jungianResult.scores.S * 7 +
      jungianResult.scores.T * 11 +
      jungianResult.scores.J * 13;
    return generateJoyfulCallsign(seed);
  }, [jungianResult]);

  const handleCopySummary = async () => {
    if (!result) return;
    let text = "";

    if (modelType === "jungian" && jungianResult) {
      text = `WATQ Cognitive Report
Type: ${jungianResult.typeCode} — ${jungianResult.archetypeTitle}
Class: ${temperament}
Callsign: ${callsign}
Lead Function: ${leadFunction}
Cognitive Stack: ${cognitiveStack}

Summary: ${jungianResult.summary}

Polarity Scores:
• Energy (E/I): ${jungianResult.scores.E}% E / ${jungianResult.scores.I}% I
• Information (S/N): ${jungianResult.scores.S}% S / ${jungianResult.scores.N}% N
• Decision (T/F): ${jungianResult.scores.T}% T / ${jungianResult.scores.F}% F
• Lifestyle (J/P): ${jungianResult.scores.J}% J / ${jungianResult.scores.P}% P

Recommended Majors:
${jungianResult.majors.map((m) => ` • ${m}`).join("\n")}

Aligned Careers:
${jungianResult.careers.map((c) => ` • ${c}`).join("\n")}

Report Verification: ${sha256Fingerprint}
https://watq.mafrilearth.com`;
    } else {
      text = `WATQ Psychometric Report [${modelType.toUpperCase()}]
${JSON.stringify(result, null, 2)}
Report Verification: ${sha256Fingerprint}`;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(
        locale === "id" ? "Laporan berhasil disalin ke papan klip!" : "Report copied to clipboard!",
      );
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(
        locale === "id"
          ? "Gagal menyalin laporan ke papan klip"
          : "Failed to copy report to clipboard",
      );
    }
  };

  const handlePrint = () => {
    toast.info(
      locale === "id"
        ? "Menyiapkan lembar laporan cetak / PDF..."
        : "Preparing printable report / PDF...",
    );
    setTimeout(() => {
      window.print();
    }, 250);
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-[#08090C] flex items-center justify-center text-slate-400 font-mono text-xs">
        {locale === "id" ? "Memuat laporan kepribadian..." : "Loading personality dossier..."}
      </div>
    );
  }

  const validity = result.validityIndex;

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F8FAFC] flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#08090C]/80 border-b border-white/[0.08] no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center shrink-0">
            <WatqFullLogo markSize={28} theme="dark" showTagline={true} />
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Bilingual Toggle Button */}
            <Button
              type="button"
              variant="island"
              size="sm"
              onClick={toggleLocale}
              title={locale === "id" ? "Switch to English" : "Ubah ke Bahasa Indonesia"}
              className="px-2.5 h-8 text-xs font-mono font-bold text-slate-300 hover:text-white"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4F024]" />
              <span>{locale === "id" ? "ID" : "EN"}</span>
            </Button>

            {!isAuthenticated && (
              <Button
                asChild
                variant="citron"
                size="sm"
                className="h-8 text-xs font-bold shadow-md shadow-[#D4F024]/10"
              >
                <Link href="/register?redirect=/dashboard" className="flex items-center gap-1.5">
                  <CloudUpload className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {locale === "id" ? "Simpan Hasil" : "Save to Cloud"}
                  </span>
                  <span className="sm:hidden">{locale === "id" ? "Simpan" : "Save"}</span>
                </Link>
              </Button>
            )}

            {modelType === "jungian" && (
              <>
                <Button
                  type="button"
                  variant="island"
                  size="sm"
                  onClick={() => setShowStoryModal(true)}
                  title={locale === "id" ? "Buat Story Card 9:16" : "Generate 9:16 Story Card"}
                  className="h-8 text-xs font-semibold text-slate-200"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4F024]" />
                  <span className="hidden sm:inline">
                    {locale === "id" ? "Kartu Story" : "Story Card"}
                  </span>
                </Button>

                <Button
                  type="button"
                  variant="island"
                  size="sm"
                  onClick={() => setShowManualModal(true)}
                  title={
                    locale === "id" ? "Panduan Kolaborasi Pribadi" : "View Collaboration Guide"
                  }
                  className="h-8 text-xs font-semibold text-slate-200"
                >
                  <FileText className="w-3.5 h-3.5 text-[#D4F024]" />
                  <span className="hidden sm:inline">
                    {locale === "id" ? "Panduan Kerja" : "Work Manual"}
                  </span>
                </Button>
              </>
            )}

            <Button
              type="button"
              variant="island"
              size="sm"
              onClick={handlePrint}
              title={locale === "id" ? "Ekspor ke PDF / Cetak" : "Export official PDF"}
              className="h-8 text-xs font-semibold text-slate-200"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </Button>

            <Button
              type="button"
              variant="island"
              size="sm"
              onClick={handleCopySummary}
              className="h-8 text-xs font-semibold text-slate-200"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">
                    {locale === "id" ? "Tersalin!" : "Copied!"}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">
                    {locale === "id" ? "Salin Laporan" : "Copy Report"}
                  </span>
                  <span className="sm:hidden">{locale === "id" ? "Salin" : "Copy"}</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRetake}
              className="h-8 text-xs font-semibold text-slate-300 hover:text-white border border-white/[0.08]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{locale === "id" ? "Ulangi" : "Retake"}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full space-y-6 sm:space-y-8 flex-1">
        {/* Verification & Reliability Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono"
        >
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-500 uppercase">
              {locale === "id" ? "KODE VERIFIKASI LAPORAN:" : "VERIFIED REPORT ID:"}
            </span>
            <span className="text-white font-bold tracking-wider">{sha256Fingerprint}</span>
          </div>

          {validity && (
            <div className="flex items-center gap-2">
              <span className="text-slate-500 uppercase">
                {locale === "id" ? "TINGKAT KONSISTENSI JAWABAN:" : "RESPONSE CONSISTENCY:"}
              </span>
              <Badge
                variant="outline"
                className={`text-[10px] font-bold ${
                  validity.rating === "HIGH_RELIABILITY"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    : validity.rating === "MODERATE_RELIABILITY"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                }`}
              >
                {validity.rating === "HIGH_RELIABILITY"
                  ? locale === "id"
                    ? "SANGAT TINGGI"
                    : "HIGH ACCURACY"
                  : validity.rating === "MODERATE_RELIABILITY"
                    ? locale === "id"
                      ? "CUKUP KONSISTEN"
                      : "MODERATE"
                    : locale === "id"
                      ? "PERLU EVALUASI"
                      : "LOW"}{" "}
                ({validity.score}%)
              </Badge>
            </div>
          )}
        </motion.div>

        {/* Guest Session Notification Callout */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D4F024]/10 via-white/[0.03] to-transparent border border-[#D4F024]/30 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D4F024] text-[#08090C] flex items-center justify-center shrink-0 shadow-lg shadow-[#D4F024]/20">
                <CloudUpload className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-[#D4F024] tracking-wider uppercase mb-1">
                  <span>
                    {locale === "id"
                      ? "SESI TAMU • LAPORAN BELUM TERSIMPAN KE AKUN"
                      : "GUEST SESSION • UNCLAIMED PROFILE"}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-display">
                  {locale === "id"
                    ? "Simpan Hasil Laporan Ini ke Akun Pribadi Anda"
                    : "Save this Verified Dossier to Your Personal Account"}
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                  {locale === "id"
                    ? "Hasil asesmen Anda saat ini hanya tersimpan di browser ini. Buat akun gratis agar laporan ini tersimpan permanen dan dapat dibuka kapan saja dari perangkat lain."
                    : "Your diagnostic profile is currently held in this browser session. Create a free account to save this report permanently, unlock cross-device access, and track your progression over time."}
                </p>
              </div>
            </div>

            <div className="flex flex-row sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
              <Button
                asChild
                variant="citron"
                size="default"
                className="flex-1 md:flex-none text-xs font-bold shadow-lg shadow-[#D4F024]/15"
              >
                <Link href="/register?redirect=/dashboard">
                  {locale === "id" ? "Simpan & Buat Akun" : "Save & Create Account"}
                </Link>
              </Button>
              <Button
                asChild
                variant="island"
                size="default"
                className="text-xs font-medium text-slate-300 hover:text-white"
              >
                <Link href="/login?redirect=/dashboard">
                  {locale === "id" ? "Masuk" : "Sign In"}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* 1. JUNGIAN 16 TYPES VIEW */}
        {modelType === "jungian" && jungianResult && (
          <>
            {/* Hero Card */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#12151D] border border-white/[0.1] rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4F024]/[0.05] blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
                <Badge variant="citron" className="text-[10px] sm:text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  <span>{locale === "id" ? "PROFIL TERVERIFIKASI" : "VERIFIED PROFILE"}</span>
                </Badge>
                {temperament && (
                  <Badge variant="slate" className="text-[10px] sm:text-xs font-semibold">
                    <Sparkles className="w-3 h-3 mr-1 text-[#D4F024]" />
                    {temperament} {locale === "id" ? "Kategori" : "Class"}
                  </Badge>
                )}
                {callsign && (
                  <Badge variant="citron" className="text-[10px] sm:text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4F024] animate-pulse mr-1.5" />
                    Callsign: {callsign}
                  </Badge>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-3 sm:mb-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display">
                  {jungianResult.typeCode}
                </h1>
                <h2 className="text-xl sm:text-3xl font-bold text-[#D4F024] font-display text-balance">
                  {jungianResult.archetypeTitle}
                </h2>
              </div>

              {cognitiveStack && (
                <div className="mt-2 mb-4 inline-flex flex-wrap items-center gap-3 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-500">
                      {locale === "id" ? "SUSUNAN FUNGSI:" : "STACK:"}
                    </span>
                    <span className="text-white font-semibold">{cognitiveStack}</span>
                  </div>
                  {leadFunction && (
                    <div className="hidden sm:flex items-center gap-1.5 border-l border-white/[0.1] pl-3 text-slate-300">
                      <span className="text-slate-500">
                        {locale === "id" ? "FUNGSI DOMINAN:" : "DOMINANT:"}
                      </span>
                      <span className="text-[#D4F024] font-semibold">{leadFunction}</span>
                    </div>
                  )}
                </div>
              )}

              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl">
                {jungianResult.summary}
              </p>
            </motion.section>

            {/* 4 Polarity Bars */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#12151D] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {locale === "id"
                      ? "4 Dimensi Kepribadian Anda"
                      : "Your 4 Personality Dimensions"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {locale === "id"
                      ? "Ketahui kecenderungan alami Anda di setiap spektrum preferensi."
                      : "Discover your natural inclinations across the four core psychological preference axes."}
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
                  0% — 100%
                </span>
              </div>

              <div className="space-y-4">
                <PolarityBar
                  dimensionTitle={
                    locale === "id"
                      ? "DIMENSI 1 // FOKUS ENERGI & SOSIAL"
                      : "DIMENSION 1 // ENERGY ORIENTATION"
                  }
                  labelLeft={locale === "id" ? "Ekstraversi" : "Extraversion"}
                  codeLeft="E"
                  scoreLeft={jungianResult.scores.E}
                  labelRight={locale === "id" ? "Introversi" : "Introversion"}
                  codeRight="I"
                  scoreRight={jungianResult.scores.I}
                  colorHex="#818CF8"
                />

                <PolarityBar
                  dimensionTitle={
                    locale === "id"
                      ? "DIMENSI 2 // CARA MEMAHAMI INFORMASI"
                      : "DIMENSION 2 // INFORMATION PROCESSING"
                  }
                  labelLeft={locale === "id" ? "Sensing (Fakta & Detail)" : "Sensing (Facts)"}
                  codeLeft="S"
                  scoreLeft={jungianResult.scores.S}
                  labelRight={locale === "id" ? "Intuisi (Pola & Visi)" : "Intuition (Patterns)"}
                  codeRight="N"
                  scoreRight={jungianResult.scores.N}
                  colorHex="#2DD4BF"
                />

                <PolarityBar
                  dimensionTitle={
                    locale === "id"
                      ? "DIMENSI 3 // DASAR PENGAMBILAN KEPUTUSAN"
                      : "DIMENSION 3 // DECISION MAKING CRITERIA"
                  }
                  labelLeft={locale === "id" ? "Thinking (Analitis Logis)" : "Thinking (Logic)"}
                  codeLeft="T"
                  scoreLeft={jungianResult.scores.T}
                  labelRight={locale === "id" ? "Feeling (Nilai & Empati)" : "Feeling (Empathy)"}
                  codeRight="F"
                  scoreRight={jungianResult.scores.F}
                  colorHex="#D4F024"
                />

                <PolarityBar
                  dimensionTitle={
                    locale === "id"
                      ? "DIMENSI 4 // POLA MENGATUR WAKTU & HIDUP"
                      : "DIMENSION 4 // LIFESTYLE & PLANNING"
                  }
                  labelLeft={locale === "id" ? "Judging (Terencana)" : "Judging (Structured)"}
                  codeLeft="J"
                  scoreLeft={jungianResult.scores.J}
                  labelRight={
                    locale === "id" ? "Perceiving (Fleksibel & Spontan)" : "Perceiving (Adaptive)"
                  }
                  codeRight="P"
                  scoreRight={jungianResult.scores.P}
                  colorHex="#FBBF24"
                />
              </div>
            </motion.section>

            {/* Instant Vocational Fuzzy Search */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#12151D] border border-white/[0.08] rounded-2xl p-6 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-white text-base">
                    {locale === "id"
                      ? "Pencarian Rekomendasi Karir & Jurusan"
                      : "Explore Career & Study Matches"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {locale === "id"
                      ? "Cari ratusan bidang pekerjaan dan program studi yang paling cocok dengan karakter Anda."
                      : "Search university fields and modern careers that match your cognitive strengths."}
                  </p>
                </div>
                <Badge variant="citron" className="text-[10px] hidden sm:inline-flex">
                  {locale === "id" ? "PENCARIAN CEPAT" : "INSTANT SEARCH"}
                </Badge>
              </div>
              <VocationalSearch careers={jungianResult.careers} majors={jungianResult.majors} />
            </motion.section>

            {/* Vocational Guidance Matrix: Majors & Careers */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-[#12151D] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#D4F024]">
                  <GraduationCap className="w-5 h-5" />
                  <h3 className="font-display font-bold text-white text-base">
                    {locale === "id"
                      ? "Rekomendasi Jurusan Kuliah"
                      : "Recommended University Majors"}
                  </h3>
                </div>
                <ul className="space-y-2.5 pt-2">
                  {jungianResult.majors.map((major) => (
                    <li
                      key={major}
                      className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-slate-200 flex items-center justify-between"
                    >
                      <span>{major}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4F024]" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#12151D] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#D4F024]">
                  <Briefcase className="w-5 h-5" />
                  <h3 className="font-display font-bold text-white text-base">
                    {locale === "id" ? "Rekomendasi Bidang Karir" : "Aligned Career Pathways"}
                  </h3>
                </div>
                <ul className="space-y-2.5 pt-2">
                  {jungianResult.careers.map((career) => (
                    <li
                      key={career}
                      className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-slate-200 flex items-center justify-between"
                    >
                      <span>{career}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4F024]" />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>
          </>
        )}

        {/* 2. BIG FIVE OCEAN VIEW */}
        {modelType === "bigfive" && (
          <section className="bg-[#12151D] border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            {(() => {
              const bResult = result as BigFiveResult;
              return (
                <>
                  <div className="border-b border-white/[0.08] pb-6">
                    <span className="text-xs font-mono uppercase text-[#D4F024] block mb-2">
                      {locale === "id"
                        ? "MODEL 5 FAKTOR KEPRIBADIAN (BIG FIVE OCEAN)"
                        : "THE FIVE-FACTOR PERSONALITY MODEL (BIG FIVE OCEAN)"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
                      {locale === "id" ? "Sifat Utama:" : "Primary Trait:"} {bResult.primaryTrait}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed max-w-3xl">
                      {bResult.dossierSummary}
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {(Object.keys(bResult.traitDescriptions) as BigFiveDimension[]).map(
                      (dimKey) => {
                        const t = bResult.traitDescriptions[dimKey];
                        const titlesEn: Record<BigFiveDimension, string> = {
                          O: "Openness to Experience",
                          C: "Conscientiousness",
                          E: "Extraversion",
                          A: "Agreeableness",
                          N: "Neuroticism (Emotional Stability)",
                        };
                        const titlesId: Record<BigFiveDimension, string> = {
                          O: "Keterbukaan pada Pengalaman Baru (Openness)",
                          C: "Ketelitian & Rasa Tanggung Jawab (Conscientiousness)",
                          E: "Ekstraversi & Interaksi Sosial (Extraversion)",
                          A: "Keramahan & Kerjasama (Agreeableness)",
                          N: "Stabilitas Emosional (Emotional Stability)",
                        };
                        return (
                          <div
                            key={dimKey}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-sm text-white">
                                {locale === "id" ? titlesId[dimKey] : titlesEn[dimKey]} ({dimKey})
                              </span>
                              <span className="font-mono text-sm font-bold text-[#D4F024]">
                                {t.score}% • {t.level}
                              </span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-teal-400 to-[#D4F024] rounded-full transition-all duration-700"
                                style={{ width: `${t.score}%` }}
                              />
                            </div>
                            <p className="text-xs text-slate-400">{t.description}</p>
                          </div>
                        );
                      },
                    )}
                  </div>
                </>
              );
            })()}
          </section>
        )}

        {/* 3. ENNEAGRAM 9-TYPES VIEW */}
        {modelType === "enneagram" && (
          <section className="bg-[#12151D] border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            {(() => {
              const eResult = result as EnneagramResult;
              return (
                <>
                  <div className="border-b border-white/[0.08] pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono uppercase text-[#D4F024] bg-[#D4F024]/10 border border-[#D4F024]/20 px-2.5 py-0.5 rounded-full">
                        {eResult.triad} Triad
                      </span>
                      <span className="text-xs font-mono text-slate-400">Wing: {eResult.wing}</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
                      {locale === "id" ? "Tipe" : "Type"} {eResult.coreType} — {eResult.title}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed max-w-3xl">
                      {eResult.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs font-mono text-slate-500 uppercase block mb-1">
                        {locale === "id" ? "Ketakutan Terdalam (Core Fear):" : "Core Fear:"}
                      </span>
                      <p className="text-sm text-slate-200">{eResult.coreFear}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs font-mono text-slate-500 uppercase block mb-1">
                        {locale === "id" ? "Keinginan Utama (Core Desire):" : "Core Desire:"}
                      </span>
                      <p className="text-sm text-slate-200">{eResult.coreDesire}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs font-mono text-emerald-400 uppercase block mb-1">
                        {locale === "id"
                          ? "Arah Pertumbuhan Positif:"
                          : "Growth Arrow (Integration):"}
                      </span>
                      <p className="text-sm text-white font-bold">
                        {locale === "id" ? "Tipe" : "Type"} {eResult.growthArrow}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs font-mono text-rose-400 uppercase block mb-1">
                        {locale === "id"
                          ? "Pola Reaksi Saat Tekanan:"
                          : "Stress Arrow (Disintegration):"}
                      </span>
                      <p className="text-sm text-white font-bold">
                        {locale === "id" ? "Tipe" : "Type"} {eResult.stressArrow}
                      </p>
                    </div>
                  </div>
                </>
              );
            })()}
          </section>
        )}

        {/* 4. DISC WORKPLACE VIEW */}
        {modelType === "disc" && (
          <section className="bg-[#12151D] border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            {(() => {
              const dResult = result as DISCResult;
              return (
                <>
                  <div className="border-b border-white/[0.08] pb-6">
                    <span className="text-xs font-mono uppercase text-[#D4F024] block mb-2">
                      {locale === "id"
                        ? "PROFIL GAYA KERJA & KOMUNIKASI (DISC)"
                        : "DISC WORKPLACE BEHAVIORAL PROFILE"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
                      {locale === "id" ? "Gaya" : "Style"} {dResult.styleLockup} —{" "}
                      {dResult.styleTitle}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed max-w-3xl">
                      {dResult.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                      <span className="text-xs font-mono text-slate-400 block">
                        {locale === "id" ? "Ketegasan (D)" : "Dominance (D)"}
                      </span>
                      <span className="text-2xl font-black font-mono text-[#D4F024] mt-1 block">
                        {dResult.scores.D}%
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                      <span className="text-xs font-mono text-slate-400 block">
                        {locale === "id" ? "Pengaruh (I)" : "Influence (I)"}
                      </span>
                      <span className="text-2xl font-black font-mono text-teal-400 mt-1 block">
                        {dResult.scores.I}%
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                      <span className="text-xs font-mono text-slate-400 block">
                        {locale === "id" ? "Kestabilan (S)" : "Steadiness (S)"}
                      </span>
                      <span className="text-2xl font-black font-mono text-sky-400 mt-1 block">
                        {dResult.scores.S}%
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                      <span className="text-xs font-mono text-slate-400 block">
                        {locale === "id" ? "Kecermatan (C)" : "Conscientious (C)"}
                      </span>
                      <span className="text-2xl font-black font-mono text-indigo-400 mt-1 block">
                        {dResult.scores.C}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-2">
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">
                        {locale === "id"
                          ? "Hal yang Disukai Saat Berkomunikasi:"
                          : "Communication DOs:"}
                      </span>
                      {dResult.communicationDos.map((item, idx) => (
                        <p key={idx} className="text-xs text-slate-300">
                          • {item}
                        </p>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl bg-rose-500/[0.04] border border-rose-500/20 space-y-2">
                      <span className="text-xs font-mono uppercase text-rose-400 font-bold block">
                        {locale === "id" ? "Hal yang Sebaiknya Dihindari:" : "Communication DONTs:"}
                      </span>
                      {dResult.communicationDonts.map((item, idx) => (
                        <p key={idx} className="text-xs text-slate-300">
                          • {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </section>
        )}

        {/* 5. HOLLAND RIASEC VIEW */}
        {modelType === "riasec" && (
          <section className="bg-[#12151D] border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            {(() => {
              const rResult = result as RIASECResult;
              return (
                <>
                  <div className="border-b border-white/[0.08] pb-6">
                    <span className="text-xs font-mono uppercase text-[#D4F024] block mb-2">
                      {locale === "id"
                        ? "PROFIL KESESUAIAN KARIR (HOLLAND RIASEC)"
                        : "HOLLAND CODES (RIASEC) VOCATIONAL PROFILE"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
                      {locale === "id" ? "Kode:" : "Code:"} {rResult.hollandCode} —{" "}
                      {rResult.primaryTheme}
                    </h1>
                    <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed max-w-3xl">
                      {rResult.environmentFit}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {Object.entries(rResult.scores).map(([k, v]) => (
                      <div
                        key={k}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center"
                      >
                        <span className="text-xs font-mono text-slate-400 block">{k}</span>
                        <span className="text-lg font-bold font-mono text-[#D4F024]">{v}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs font-mono text-[#D4F024] uppercase block mb-2">
                        {locale === "id" ? "Rekomendasi Jurusan Kuliah:" : "Recommended Majors:"}
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {rResult.recommendedMajors.map((m) => (
                          <li key={m}>• {m}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-xs font-mono text-[#D4F024] uppercase block mb-2">
                        {locale === "id" ? "Rekomendasi Jalur Karir:" : "Aligned Career Paths:"}
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {rResult.recommendedCareers.map((c) => (
                          <li key={c}>• {c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              );
            })()}
          </section>
        )}

        {/* Action Panel */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <div>
            <h4 className="font-display text-sm font-semibold text-white">
              {locale === "id"
                ? "Ingin Mencoba Model Asesmen Lainnya?"
                : "Explore Another Assessment Model?"}
            </h4>
            <p className="text-xs text-slate-400">
              {locale === "id"
                ? "Bandingkan perspektif kepribadian Anda melalui 5 instrumen psikologi terkalibrasi kami."
                : "Benchmark your personality through any of our 5 calibrated diagnostic suites."}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              asChild
              variant="citron"
              size="default"
              className="w-full sm:w-auto text-xs font-bold shadow-md shadow-lime-400/10"
            >
              <Link href="/assess" className="flex items-center gap-2">
                <span>{locale === "id" ? "Ikuti Asesmen Lain" : "Take Another Test"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Collaboration Manual Modal */}
      {modelType === "jungian" && jungianResult && (
        <CollaborationManualModal
          isOpen={showManualModal}
          onClose={() => setShowManualModal(false)}
          typeCode={jungianResult.typeCode}
          callsign={callsign}
        />
      )}

      {/* 9:16 Social Story Modal */}
      {modelType === "jungian" && jungianResult && (
        <SocialStoryModal
          isOpen={showStoryModal}
          onClose={() => setShowStoryModal(false)}
          typeCode={jungianResult.typeCode}
          archetypeTitle={jungianResult.archetypeTitle}
          callsign={callsign}
          temperament={temperament}
          summary={jungianResult.summary}
        />
      )}

      {/* Report Footer */}
      <footer className="border-t border-white/[0.06] py-6 text-xs font-mono text-slate-500 no-print">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span>Watq • Personality Decoded • Sovereign Intelligence Standard</span>
          <div className="flex items-center gap-3 text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              {locale === "id" ? "Beranda" : "Home"}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
