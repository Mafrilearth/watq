"use client";

import { ARCHETYPES, type ArchetypeProfile } from "@watq/core";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/lib/stores/uiStore";
import {
  ArrowRight,
  Briefcase,
  ChevronRight,
  GraduationCap,
  Layers,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

type Temperament = "all" | "analysts" | "diplomats" | "sentinels" | "explorers";

interface ArchetypeMeta {
  temperament: "analysts" | "diplomats" | "sentinels" | "explorers";
  temperamentName: { en: string; id: string };
  color: string;
  bgGlow: string;
  badgeBorder: string;
  cognitiveStack: string; // e.g., "Ni • Te • Fi • Se"
  leadFunction: { en: string; id: string };
}

const TEMPERAMENT_METAS: Record<string, ArchetypeMeta> = {
  // Analysts (NT) — Electric Cobalt (#2E68FF)
  INTJ: {
    temperament: "analysts",
    temperamentName: { en: "Analyst (NT)", id: "Analis (NT)" },
    color: "#2E68FF",
    bgGlow: "rgba(46, 104, 255, 0.12)",
    badgeBorder: "border-[#2E68FF]/30 text-[#8BB2FF] bg-[#2E68FF]/10",
    cognitiveStack: "Ni • Te • Fi • Se",
    leadFunction: { en: "Introverted Intuition (Ni)", id: "Intuisi Introvert (Ni)" },
  },
  INTP: {
    temperament: "analysts",
    temperamentName: { en: "Analyst (NT)", id: "Analis (NT)" },
    color: "#2E68FF",
    bgGlow: "rgba(46, 104, 255, 0.12)",
    badgeBorder: "border-[#2E68FF]/30 text-[#8BB2FF] bg-[#2E68FF]/10",
    cognitiveStack: "Ti • Ne • Si • Fe",
    leadFunction: { en: "Introverted Thinking (Ti)", id: "Pemikiran Logis Introvert (Ti)" },
  },
  ENTJ: {
    temperament: "analysts",
    temperamentName: { en: "Analyst (NT)", id: "Analis (NT)" },
    color: "#2E68FF",
    bgGlow: "rgba(46, 104, 255, 0.12)",
    badgeBorder: "border-[#2E68FF]/30 text-[#8BB2FF] bg-[#2E68FF]/10",
    cognitiveStack: "Te • Ni • Se • Fi",
    leadFunction: { en: "Extraverted Thinking (Te)", id: "Pemikiran Logis Ekstravert (Te)" },
  },
  ENTP: {
    temperament: "analysts",
    temperamentName: { en: "Analyst (NT)", id: "Analis (NT)" },
    color: "#2E68FF",
    bgGlow: "rgba(46, 104, 255, 0.12)",
    badgeBorder: "border-[#2E68FF]/30 text-[#8BB2FF] bg-[#2E68FF]/10",
    cognitiveStack: "Ne • Ti • Fe • Si",
    leadFunction: { en: "Extraverted Intuition (Ne)", id: "Intuisi Ekstravert (Ne)" },
  },

  // Diplomats (NF) — Emerald Mint (#10B981)
  INFJ: {
    temperament: "diplomats",
    temperamentName: { en: "Diplomat (NF)", id: "Diplomat (NF)" },
    color: "#10B981",
    bgGlow: "rgba(16, 185, 129, 0.12)",
    badgeBorder: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
    cognitiveStack: "Ni • Fe • Ti • Se",
    leadFunction: { en: "Introverted Intuition (Ni)", id: "Intuisi Introvert (Ni)" },
  },
  INFP: {
    temperament: "diplomats",
    temperamentName: { en: "Diplomat (NF)", id: "Diplomat (NF)" },
    color: "#10B981",
    bgGlow: "rgba(16, 185, 129, 0.12)",
    badgeBorder: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
    cognitiveStack: "Fi • Ne • Si • Te",
    leadFunction: { en: "Introverted Feeling (Fi)", id: "Perasaan Empatik Introvert (Fi)" },
  },
  ENFJ: {
    temperament: "diplomats",
    temperamentName: { en: "Diplomat (NF)", id: "Diplomat (NF)" },
    color: "#10B981",
    bgGlow: "rgba(16, 185, 129, 0.12)",
    badgeBorder: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
    cognitiveStack: "Fe • Ni • Se • Ti",
    leadFunction: { en: "Extraverted Feeling (Fe)", id: "Perasaan Empatik Ekstravert (Fe)" },
  },
  ENFP: {
    temperament: "diplomats",
    temperamentName: { en: "Diplomat (NF)", id: "Diplomat (NF)" },
    color: "#10B981",
    bgGlow: "rgba(16, 185, 129, 0.12)",
    badgeBorder: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
    cognitiveStack: "Ne • Fi • Te • Si",
    leadFunction: { en: "Extraverted Intuition (Ne)", id: "Intuisi Ekstravert (Ne)" },
  },

  // Sentinels (SJ) — Radioactive Citron (#D4F024)
  ISTJ: {
    temperament: "sentinels",
    temperamentName: { en: "Sentinel (SJ)", id: "Pengawal (SJ)" },
    color: "#D4F024",
    bgGlow: "rgba(212, 240, 36, 0.12)",
    badgeBorder: "border-[#D4F024]/30 text-[#E2FE52] bg-[#D4F024]/10",
    cognitiveStack: "Si • Te • Fi • Ne",
    leadFunction: { en: "Introverted Sensing (Si)", id: "Pengamatan Teliti Introvert (Si)" },
  },
  ISFJ: {
    temperament: "sentinels",
    temperamentName: { en: "Sentinel (SJ)", id: "Pengawal (SJ)" },
    color: "#D4F024",
    bgGlow: "rgba(212, 240, 36, 0.12)",
    badgeBorder: "border-[#D4F024]/30 text-[#E2FE52] bg-[#D4F024]/10",
    cognitiveStack: "Si • Fe • Ti • Ne",
    leadFunction: { en: "Introverted Sensing (Si)", id: "Pengamatan Teliti Introvert (Si)" },
  },
  ESTJ: {
    temperament: "sentinels",
    temperamentName: { en: "Sentinel (SJ)", id: "Pengawal (SJ)" },
    color: "#D4F024",
    bgGlow: "rgba(212, 240, 36, 0.12)",
    badgeBorder: "border-[#D4F024]/30 text-[#E2FE52] bg-[#D4F024]/10",
    cognitiveStack: "Te • Si • Ne • Fi",
    leadFunction: { en: "Extraverted Thinking (Te)", id: "Pemikiran Terstruktur Ekstravert (Te)" },
  },
  ESFJ: {
    temperament: "sentinels",
    temperamentName: { en: "Sentinel (SJ)", id: "Pengawal (SJ)" },
    color: "#D4F024",
    bgGlow: "rgba(212, 240, 36, 0.12)",
    badgeBorder: "border-[#D4F024]/30 text-[#E2FE52] bg-[#D4F024]/10",
    cognitiveStack: "Fe • Si • Ne • Ti",
    leadFunction: { en: "Extraverted Feeling (Fe)", id: "Kepedulian Sosial Ekstravert (Fe)" },
  },

  // Explorers (SP) — Vivid Amber (#FF7A00)
  ISTP: {
    temperament: "explorers",
    temperamentName: { en: "Explorer (SP)", id: "Penjelajah (SP)" },
    color: "#FF7A00",
    bgGlow: "rgba(255, 122, 0, 0.12)",
    badgeBorder: "border-[#FF7A00]/30 text-[#FFB066] bg-[#FF7A00]/10",
    cognitiveStack: "Ti • Se • Ni • Fe",
    leadFunction: { en: "Introverted Thinking (Ti)", id: "Analisis Taktis Introvert (Ti)" },
  },
  ISFP: {
    temperament: "explorers",
    temperamentName: { en: "Explorer (SP)", id: "Penjelajah (SP)" },
    color: "#FF7A00",
    bgGlow: "rgba(255, 122, 0, 0.12)",
    badgeBorder: "border-[#FF7A00]/30 text-[#FFB066] bg-[#FF7A00]/10",
    cognitiveStack: "Fi • Se • Ni • Te",
    leadFunction: { en: "Introverted Feeling (Fi)", id: "Nilai Estetika Introvert (Fi)" },
  },
  ESTP: {
    temperament: "explorers",
    temperamentName: { en: "Explorer (SP)", id: "Penjelajah (SP)" },
    color: "#FF7A00",
    bgGlow: "rgba(255, 122, 0, 0.12)",
    badgeBorder: "border-[#FF7A00]/30 text-[#FFB066] bg-[#FF7A00]/10",
    cognitiveStack: "Se • Ti • Fe • Ni",
    leadFunction: { en: "Extraverted Sensing (Se)", id: "Aksi Cepat Ekstravert (Se)" },
  },
  ESFP: {
    temperament: "explorers",
    temperamentName: { en: "Explorer (SP)", id: "Penjelajah (SP)" },
    color: "#FF7A00",
    bgGlow: "rgba(255, 122, 0, 0.12)",
    badgeBorder: "border-[#FF7A00]/30 text-[#FFB066] bg-[#FF7A00]/10",
    cognitiveStack: "Se • Fi • Te • Ni",
    leadFunction: { en: "Extraverted Sensing (Se)", id: "Aksi Spontan Ekstravert (Se)" },
  },
};

export function ArchetypeMatrixShowcase() {
  const { locale } = useUIStore();
  const [selectedTemperament, setSelectedTemperament] = useState<Temperament>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProfile, setActiveModalProfile] = useState<ArchetypeProfile | null>(null);

  const archetypeList = useMemo(() => Object.values(ARCHETYPES), []);

  const filteredArchetypes = useMemo(() => {
    return archetypeList.filter((item) => {
      const meta = TEMPERAMENT_METAS[item.code];
      const matchesTemperament =
        selectedTemperament === "all" || meta.temperament === selectedTemperament;

      if (!matchesTemperament) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const codeMatch = item.code.toLowerCase().includes(q);
      const titleMatch = item.title.toLowerCase().includes(q);
      const summaryMatch = item.summary.toLowerCase().includes(q);
      const careerMatch = item.careers.some((c) => c.toLowerCase().includes(q));
      const majorMatch = item.majors.some((m) => m.toLowerCase().includes(q));

      return codeMatch || titleMatch || summaryMatch || careerMatch || majorMatch;
    });
  }, [archetypeList, selectedTemperament, searchQuery]);

  const handleSelectTab = (temp: Temperament) => {
    setSelectedTemperament(temp);
  };

  const handleOpenDetail = (profile: ArchetypeProfile) => {
    setActiveModalProfile(profile);
  };

  const handleCloseDetail = () => {
    setActiveModalProfile(null);
  };

  return (
    <section
      id="archetypes"
      className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.08] relative"
    >
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4F024]/[0.03] blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Badge variant="slate" className="mb-4 text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#D4F024]" />
          <span>
            {locale === "id"
              ? "16 Tipe Kepribadian • Direktori Lengkap"
              : "16 Personality Profiles • Public Library"}
          </span>
        </Badge>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {locale === "id"
            ? "Pelajari 16 Tipe Karakter & Pilihan Karir."
            : "Browse All 16 Personalities & Career Matches."}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {locale === "id"
            ? "Temukan keunikan, jurusan kuliah, dan potensi karir dari setiap tipe karakter. Saring berdasarkan kelompok atau cari bidang karir yang Anda minati."
            : "Explore strengths, study paths, and career alignments across all 16 profiles. Filter by category or search by any job or college major."}
        </p>
      </div>

      {/* Controls Bar: Filter Pills & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Temperament Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-x-auto no-scrollbar">
          {[
            {
              id: "all" as Temperament,
              label: locale === "id" ? "Semua 16 Tipe" : "All 16 Types",
              badge: "16",
            },
            {
              id: "analysts" as Temperament,
              label: locale === "id" ? "Analis (NT)" : "Analysts (NT)",
              badge: "4",
              dotColor: "bg-[#2E68FF]",
            },
            {
              id: "diplomats" as Temperament,
              label: locale === "id" ? "Diplomat (NF)" : "Diplomats (NF)",
              badge: "4",
              dotColor: "bg-emerald-400",
            },
            {
              id: "sentinels" as Temperament,
              label: locale === "id" ? "Pengawal (SJ)" : "Sentinels (SJ)",
              badge: "4",
              dotColor: "bg-[#D4F024]",
            },
            {
              id: "explorers" as Temperament,
              label: locale === "id" ? "Penjelajah (SP)" : "Explorers (SP)",
              badge: "4",
              dotColor: "bg-[#FF7A00]",
            },
          ].map((tab) => {
            const isActive = selectedTemperament === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-white shadow-xs border border-white/[0.14]"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                {tab.dotColor && <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />}
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[240px] md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              locale === "id"
                ? "Cari tipe, jurusan, atau karir..."
                : "Search archetype, major, or career..."
            }
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4F024]/50 focus:ring-1 focus:ring-[#D4F024]/50 transition-all font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of 16 Archetype Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredArchetypes.map((profile) => {
          const meta = TEMPERAMENT_METAS[profile.code];
          return (
            <div
              key={profile.code}
              onClick={() => handleOpenDetail(profile)}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent hover:from-white/[0.22] transition-all duration-300 cursor-pointer text-left"
            >
              <div className="h-full rounded-[calc(1rem-1px)] bg-[#0C101C]/90 backdrop-blur-md p-5 border border-white/[0.05] group-hover:border-white/[0.12] transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1">
                {/* Top Badge & Code */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <CognitiveFunctionGlyph lead={meta.leadFunction.en} color={meta.color} />
                      <span className="text-2xl font-display font-extrabold tracking-tight text-white group-hover:text-[#D4F024] transition-colors">
                        {profile.code}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-semibold ${meta.badgeBorder}`}
                    >
                      {meta.temperamentName[locale]}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors leading-snug">
                    {profile.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {profile.summary}
                  </p>
                </div>

                {/* Bottom Tags */}
                <div className="mt-4 pt-3 border-t border-white/[0.05]">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="truncate pr-2">
                      {profile.careers[0] || (locale === "id" ? "Rekomendasi Karir" : "Career Fit")}
                    </span>
                    <span className="text-slate-400 group-hover:text-[#D4F024] flex items-center shrink-0">
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Modal */}
      {activeModalProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={handleCloseDetail}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0D111A] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseDetail}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {(() => {
              const meta = TEMPERAMENT_METAS[activeModalProfile.code];
              return (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-extrabold text-white font-display">
                      {activeModalProfile.code}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-xs font-mono font-bold ${meta.badgeBorder}`}
                    >
                      {meta.temperamentName[locale]}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#D4F024] font-display">
                    {activeModalProfile.title}
                  </h3>

                  {/* Cognitive Function Stack */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-500">
                        {locale === "id" ? "SUSUNAN FUNGSI: " : "STACK: "}
                      </span>
                      <span className="text-slate-200 font-semibold">{meta.cognitiveStack}</span>
                    </div>
                    <div className="border-l border-white/[0.1] pl-4">
                      <span className="text-slate-500">
                        {locale === "id" ? "KEKUATAN UTAMA: " : "DOMINANT STRENGTH: "}
                      </span>
                      <span className="text-[#D4F024] font-semibold">
                        {meta.leadFunction[locale]}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-5">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                      {locale === "id" ? "Ringkasan Karakter" : "Profile Summary"}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                      {activeModalProfile.summary}
                    </p>
                  </div>

                  {/* Careers and Majors Grids */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    {/* Aligned Careers */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-200 mb-3">
                        <Briefcase className="w-4 h-4 text-[#D4F024]" />
                        <span>
                          {locale === "id" ? "REKOMENDASI KARIR" : "ALIGNED CAREER PATHS"}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {activeModalProfile.careers.map((career, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F024] mt-1.5 shrink-0" />
                            <span>{career}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Aligned Majors */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-200 mb-3">
                        <GraduationCap className="w-4 h-4 text-emerald-400" />
                        <span>
                          {locale === "id" ? "JURUSAN KULIAH TERKAIT" : "RECOMMENDED MAJORS"}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {activeModalProfile.majors.map((major, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{major}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-slate-500 font-mono">
                      {locale === "id"
                        ? "Ingin tahu apakah ini tipe kepribadian Anda?"
                        : "Discover your true match with the assessment"}
                    </div>
                    <Button
                      asChild
                      variant="citron"
                      size="default"
                      className="w-full sm:w-auto text-xs font-bold shadow-lg shadow-[#D4F024]/20"
                    >
                      <Link href="/assess" className="flex items-center gap-2">
                        <span>
                          {locale === "id" ? "Mulai Asesmen Sekarang" : "Start Assessment"}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}

function CognitiveFunctionGlyph({ lead, color }: { lead: string; color: string }) {
  if (lead.includes("Ni")) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <polygon
          points="16,4 28,16 16,28 4,16"
          stroke={color}
          strokeWidth="1.2"
          fill="rgba(255,255,255,0.03)"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="6"
          ry="3"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
      </svg>
    );
  }
  if (lead.includes("Ne")) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <circle cx="16" cy="16" r="3.5" fill={color} />
        <line x1="16" y1="4" x2="16" y2="9" stroke={color} strokeWidth="1.2" />
        <line x1="16" y1="23" x2="16" y2="28" stroke={color} strokeWidth="1.2" />
        <line x1="4" y1="16" x2="9" y2="16" stroke={color} strokeWidth="1.2" />
        <line x1="23" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1.2" />
      </svg>
    );
  }
  if (lead.includes("Ti")) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <polygon
          points="16,6 25,11 25,21 16,26 7,21 7,11"
          stroke={color}
          strokeWidth="1.2"
          fill="rgba(255,255,255,0.03)"
        />
        <line
          x1="16"
          y1="6"
          x2="16"
          y2="26"
          stroke={color}
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
        <line
          x1="7"
          y1="11"
          x2="25"
          y2="21"
          stroke={color}
          strokeWidth="0.8"
          strokeDasharray="2 2"
        />
      </svg>
    );
  }
  if (lead.includes("Te")) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <rect
          x="7"
          y="13"
          width="18"
          height="13"
          rx="1.5"
          stroke={color}
          strokeWidth="1.2"
          fill="rgba(255,255,255,0.03)"
        />
        <line x1="11" y1="5" x2="11" y2="13" stroke={color} strokeWidth="1.2" />
        <line x1="21" y1="5" x2="21" y2="13" stroke={color} strokeWidth="1.2" />
        <circle cx="11" cy="5" r="1.5" fill={color} />
        <circle cx="21" cy="5" r="1.5" fill={color} />
      </svg>
    );
  }
  if (lead.includes("Fi")) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <path
          d="M 16 5 L 25 14 L 16 27 L 7 14 Z"
          stroke={color}
          strokeWidth="1.2"
          fill="rgba(255,255,255,0.03)"
        />
        <circle cx="16" cy="15" r="3" fill={color} />
      </svg>
    );
  }
  if (lead.includes("Fe")) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <circle cx="12" cy="16" r="6" stroke={color} strokeWidth="1" />
        <circle cx="20" cy="16" r="6" stroke={color} strokeWidth="1" />
        <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
      </svg>
    );
  }
  if (lead.includes("Si")) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <line x1="6" y1="24" x2="26" y2="24" stroke={color} strokeWidth="2" />
        <line x1="9" y1="18" x2="23" y2="18" stroke={color} strokeWidth="1.5" />
        <line x1="12" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1.2" />
        <circle cx="16" cy="6" r="2" fill="#FFFFFF" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
      <polygon
        points="16,5 27,23 5,23"
        stroke={color}
        strokeWidth="1.2"
        fill="rgba(255,255,255,0.03)"
      />
      <circle cx="16" cy="17" r="3" fill={color} />
    </svg>
  );
}
