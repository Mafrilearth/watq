'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ARCHETYPES, 
  ArchetypeProfile 
} from '@watq/core';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Compass, 
  X,
  Layers,
  ChevronRight,
  Shield,
  Zap,
  Flame,
  Award
} from 'lucide-react';
import { playMicroClick } from '@/lib/audio/haptics';

type Temperament = 'all' | 'analysts' | 'diplomats' | 'sentinels' | 'explorers';

interface ArchetypeMeta {
  temperament: 'analysts' | 'diplomats' | 'sentinels' | 'explorers';
  temperamentName: string;
  color: string;
  bgGlow: string;
  badgeBorder: string;
  cognitiveStack: string; // e.g., "Ni • Te • Fi • Se"
  leadFunction: string;   // e.g., "Introverted Intuition"
}

const TEMPERAMENT_METAS: Record<string, ArchetypeMeta> = {
  // Analysts (NT)
  INTJ: {
    temperament: 'analysts',
    temperamentName: 'Analyst (NT)',
    color: '#818CF8', // Indigo
    bgGlow: 'rgba(129, 140, 248, 0.12)',
    badgeBorder: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
    cognitiveStack: 'Ni • Te • Fi • Se',
    leadFunction: 'Introverted Intuition (Ni)',
  },
  INTP: {
    temperament: 'analysts',
    temperamentName: 'Analyst (NT)',
    color: '#818CF8',
    bgGlow: 'rgba(129, 140, 248, 0.12)',
    badgeBorder: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
    cognitiveStack: 'Ti • Ne • Si • Fe',
    leadFunction: 'Introverted Thinking (Ti)',
  },
  ENTJ: {
    temperament: 'analysts',
    temperamentName: 'Analyst (NT)',
    color: '#818CF8',
    bgGlow: 'rgba(129, 140, 248, 0.12)',
    badgeBorder: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
    cognitiveStack: 'Te • Ni • Se • Fi',
    leadFunction: 'Extraverted Thinking (Te)',
  },
  ENTP: {
    temperament: 'analysts',
    temperamentName: 'Analyst (NT)',
    color: '#818CF8',
    bgGlow: 'rgba(129, 140, 248, 0.12)',
    badgeBorder: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10',
    cognitiveStack: 'Ne • Ti • Fe • Si',
    leadFunction: 'Extraverted Intuition (Ne)',
  },

  // Diplomats (NF)
  INFJ: {
    temperament: 'diplomats',
    temperamentName: 'Diplomat (NF)',
    color: '#2DD4BF', // Teal
    bgGlow: 'rgba(45, 212, 191, 0.12)',
    badgeBorder: 'border-teal-500/30 text-teal-300 bg-teal-500/10',
    cognitiveStack: 'Ni • Fe • Ti • Se',
    leadFunction: 'Introverted Intuition (Ni)',
  },
  INFP: {
    temperament: 'diplomats',
    temperamentName: 'Diplomat (NF)',
    color: '#2DD4BF',
    bgGlow: 'rgba(45, 212, 191, 0.12)',
    badgeBorder: 'border-teal-500/30 text-teal-300 bg-teal-500/10',
    cognitiveStack: 'Fi • Ne • Si • Te',
    leadFunction: 'Introverted Feeling (Fi)',
  },
  ENFJ: {
    temperament: 'diplomats',
    temperamentName: 'Diplomat (NF)',
    color: '#2DD4BF',
    bgGlow: 'rgba(45, 212, 191, 0.12)',
    badgeBorder: 'border-teal-500/30 text-teal-300 bg-teal-500/10',
    cognitiveStack: 'Fe • Ni • Se • Ti',
    leadFunction: 'Extraverted Feeling (Fe)',
  },
  ENFP: {
    temperament: 'diplomats',
    temperamentName: 'Diplomat (NF)',
    color: '#2DD4BF',
    bgGlow: 'rgba(45, 212, 191, 0.12)',
    badgeBorder: 'border-teal-500/30 text-teal-300 bg-teal-500/10',
    cognitiveStack: 'Ne • Fi • Te • Si',
    leadFunction: 'Extraverted Intuition (Ne)',
  },

  // Sentinels (SJ)
  ISTJ: {
    temperament: 'sentinels',
    temperamentName: 'Sentinel (SJ)',
    color: '#38BDF8', // Sky
    bgGlow: 'rgba(56, 189, 248, 0.12)',
    badgeBorder: 'border-sky-500/30 text-sky-300 bg-sky-500/10',
    cognitiveStack: 'Si • Te • Fi • Ne',
    leadFunction: 'Introverted Sensing (Si)',
  },
  ISFJ: {
    temperament: 'sentinels',
    temperamentName: 'Sentinel (SJ)',
    color: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.12)',
    badgeBorder: 'border-sky-500/30 text-sky-300 bg-sky-500/10',
    cognitiveStack: 'Si • Fe • Ti • Ne',
    leadFunction: 'Introverted Sensing (Si)',
  },
  ESTJ: {
    temperament: 'sentinels',
    temperamentName: 'Sentinel (SJ)',
    color: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.12)',
    badgeBorder: 'border-sky-500/30 text-sky-300 bg-sky-500/10',
    cognitiveStack: 'Te • Si • Ne • Fi',
    leadFunction: 'Extraverted Thinking (Te)',
  },
  ESFJ: {
    temperament: 'sentinels',
    temperamentName: 'Sentinel (SJ)',
    color: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.12)',
    badgeBorder: 'border-sky-500/30 text-sky-300 bg-sky-500/10',
    cognitiveStack: 'Fe • Si • Ne • Ti',
    leadFunction: 'Extraverted Feeling (Fe)',
  },

  // Explorers (SP)
  ISTP: {
    temperament: 'explorers',
    temperamentName: 'Explorer (SP)',
    color: '#FBBF24', // Amber
    bgGlow: 'rgba(251, 191, 36, 0.12)',
    badgeBorder: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    cognitiveStack: 'Ti • Se • Ni • Fe',
    leadFunction: 'Introverted Thinking (Ti)',
  },
  ISFP: {
    temperament: 'explorers',
    temperamentName: 'Explorer (SP)',
    color: '#FBBF24',
    bgGlow: 'rgba(251, 191, 36, 0.12)',
    badgeBorder: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    cognitiveStack: 'Fi • Se • Ni • Te',
    leadFunction: 'Introverted Feeling (Fi)',
  },
  ESTP: {
    temperament: 'explorers',
    temperamentName: 'Explorer (SP)',
    color: '#FBBF24',
    bgGlow: 'rgba(251, 191, 36, 0.12)',
    badgeBorder: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    cognitiveStack: 'Se • Ti • Fe • Ni',
    leadFunction: 'Extraverted Sensing (Se)',
  },
  ESFP: {
    temperament: 'explorers',
    temperamentName: 'Explorer (SP)',
    color: '#FBBF24',
    bgGlow: 'rgba(251, 191, 36, 0.12)',
    badgeBorder: 'border-amber-500/30 text-amber-300 bg-amber-500/10',
    cognitiveStack: 'Se • Fi • Te • Ni',
    leadFunction: 'Extraverted Sensing (Se)',
  },
};

export function ArchetypeMatrixShowcase() {
  const [selectedTemperament, setSelectedTemperament] = useState<Temperament>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProfile, setActiveModalProfile] = useState<ArchetypeProfile | null>(null);

  const archetypeList = useMemo(() => Object.values(ARCHETYPES), []);

  const filteredArchetypes = useMemo(() => {
    return archetypeList.filter((item) => {
      const meta = TEMPERAMENT_METAS[item.code];
      const matchesTemperament = selectedTemperament === 'all' || meta.temperament === selectedTemperament;

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
    playMicroClick(800);
    setSelectedTemperament(temp);
  };

  const handleOpenDetail = (profile: ArchetypeProfile) => {
    playMicroClick(1000);
    setActiveModalProfile(profile);
  };

  const handleCloseDetail = () => {
    playMicroClick(600);
    setActiveModalProfile(null);
  };

  return (
    <section id="archetypes" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-medium text-slate-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>JUNGIAN 1921 TYPOLOGY CATALOG // 16 ARCHETYPES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Explore the Archetype Matrix.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Every human cognitive pattern maps into one of 16 distinct analytical frameworks. Filter by temperament or search by occupational affinity.
        </p>
      </div>

      {/* Controls Bar: Linear-style Filter Pills & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        {/* Temperament Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-x-auto no-scrollbar">
          {[
            { id: 'all' as Temperament, label: 'All 16 Types', badge: '16' },
            { id: 'analysts' as Temperament, label: 'Analysts (_NT_)', badge: '4', dotColor: 'bg-indigo-400' },
            { id: 'diplomats' as Temperament, label: 'Diplomats (_NF_)', badge: '4', dotColor: 'bg-teal-400' },
            { id: 'sentinels' as Temperament, label: 'Sentinels (_S_J)', badge: '4', dotColor: 'bg-sky-400' },
            { id: 'explorers' as Temperament, label: 'Explorers (_S_P)', badge: '4', dotColor: 'bg-amber-400' },
          ].map((tab) => {
            const isActive = selectedTemperament === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-white/10 text-white shadow-sm border border-white/[0.14]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {tab.dotColor && <span className={`w-2 h-2 rounded-full ${tab.dotColor}`} />}
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/[0.05] text-slate-500'
                }`}>
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
            placeholder="Search archetype, skill, or career..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of 16 Archetype Cards (Double-Bezel Kinetic Cards) */}
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
                      <CognitiveFunctionGlyph lead={meta.leadFunction} color={meta.color} />
                      <span className="text-2xl font-mono font-extrabold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                        {profile.code}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-semibold ${meta.badgeBorder}`}>
                      {meta.temperamentName}
                    </span>
                  </div>

                  {/* Archetype Title */}
                  <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors line-clamp-1">
                    {profile.title}
                  </h3>

                  {/* Cognitive Stack Pill */}
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-slate-400">
                    <Layers className="w-3 h-3 text-slate-500" />
                    <span>{meta.cognitiveStack}</span>
                  </div>

                  {/* Summary */}
                  <p className="mt-3 text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {profile.summary}
                  </p>
                </div>

                {/* Bottom Careers Preview & Arrow */}
                <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span className="truncate max-w-[170px] text-slate-300">
                    {profile.careers[0]}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/[0.12] transition-colors shrink-0">
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredArchetypes.length === 0 && (
        <div className="text-center py-16 border border-dashed border-white/[0.08] rounded-2xl bg-white/[0.01]">
          <p className="text-sm text-slate-400">No archetypes matched your search query &ldquo;{searchQuery}&rdquo;</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedTemperament('all');
            }}
            className="mt-3 text-xs font-semibold text-sky-400 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Interactive Detail Modal / Inspector Drawer */}
      {activeModalProfile && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseDetail}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl p-[1px] bg-gradient-to-b from-white/[0.2] via-white/[0.06] to-transparent shadow-2xl shadow-black/90 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-[calc(1.5rem-1px)] bg-[#0B0F19] p-6 sm:p-8 border border-white/[0.1] overflow-y-auto no-scrollbar">
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseDetail}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              {(() => {
                const meta = TEMPERAMENT_METAS[activeModalProfile.code];
                return (
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
                        {activeModalProfile.code}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full border text-xs font-mono font-semibold ${meta.badgeBorder}`}>
                        {meta.temperamentName}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100">
                      {activeModalProfile.title}
                    </h3>

                    {/* Cognitive Stack Banner */}
                    <div className="mt-4 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                      <div>
                        <span className="text-slate-500 uppercase">Primary Stack: </span>
                        <span className="text-slate-200 font-semibold">{meta.cognitiveStack}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase">Lead Function: </span>
                        <span className="text-sky-400 font-semibold">{meta.leadFunction}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                        Typological Profile Summary
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                        {activeModalProfile.summary}
                      </p>
                    </div>

                    {/* Careers and Majors Grids */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      {/* ILO Careers */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 mb-3">
                          <Briefcase className="w-4 h-4 text-sky-400" />
                          <span>CAREER TRAJECTORIES (ILO ISCO-08)</span>
                        </div>
                        <ul className="space-y-2">
                          {activeModalProfile.careers.map((career, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                              <span>{career}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* UNESCO Majors */}
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 mb-3">
                          <GraduationCap className="w-4 h-4 text-emerald-400" />
                          <span>ACADEMIC MAJORS (UNESCO ISCED-F)</span>
                        </div>
                        <ul className="space-y-2">
                          {activeModalProfile.majors.map((major, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                              <span>{major}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-8 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-xs text-slate-500 font-mono">
                        Standardized 24-item Jungian instrument
                      </div>
                      <Link
                        href="/assess"
                        onClick={() => playMicroClick(1000)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-300 hover:to-indigo-400 text-[#090D16] font-bold text-xs shadow-lg shadow-sky-500/20 transition-all active:scale-95"
                      >
                        <span>Start Assessment to Calibrate</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function CognitiveFunctionGlyph({ lead, color }: { lead: string; color: string }) {
  if (lead.includes('Ni')) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <polygon points="16,4 28,16 16,28 4,16" stroke={color} strokeWidth="1.2" fill="rgba(255,255,255,0.03)" />
        <ellipse cx="16" cy="16" rx="6" ry="3" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
      </svg>
    );
  }
  if (lead.includes('Ne')) {
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
  if (lead.includes('Ti')) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <polygon points="16,6 25,11 25,21 16,26 7,21 7,11" stroke={color} strokeWidth="1.2" fill="rgba(255,255,255,0.03)" />
        <line x1="16" y1="6" x2="16" y2="26" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="7" y1="11" x2="25" y2="21" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" />
      </svg>
    );
  }
  if (lead.includes('Te')) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <rect x="7" y="13" width="18" height="13" rx="1.5" stroke={color} strokeWidth="1.2" fill="rgba(255,255,255,0.03)" />
        <line x1="11" y1="5" x2="11" y2="13" stroke={color} strokeWidth="1.2" />
        <line x1="21" y1="5" x2="21" y2="13" stroke={color} strokeWidth="1.2" />
        <circle cx="11" cy="5" r="1.5" fill={color} />
        <circle cx="21" cy="5" r="1.5" fill={color} />
      </svg>
    );
  }
  if (lead.includes('Fi')) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <path d="M 16 5 L 25 14 L 16 27 L 7 14 Z" stroke={color} strokeWidth="1.2" fill="rgba(255,255,255,0.03)" />
        <circle cx="16" cy="15" r="3" fill={color} />
      </svg>
    );
  }
  if (lead.includes('Fe')) {
    return (
      <svg viewBox="0 0 32 32" className="w-5 h-5 overflow-visible" fill="none">
        <circle cx="12" cy="16" r="6" stroke={color} strokeWidth="1" />
        <circle cx="20" cy="16" r="6" stroke={color} strokeWidth="1" />
        <circle cx="16" cy="16" r="2" fill="#FFFFFF" />
      </svg>
    );
  }
  if (lead.includes('Si')) {
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
      <polygon points="16,5 27,23 5,23" stroke={color} strokeWidth="1.2" fill="rgba(255,255,255,0.03)" />
      <circle cx="16" cy="17" r="3" fill={color} />
    </svg>
  );
}
