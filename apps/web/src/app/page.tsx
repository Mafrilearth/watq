'use client';

import React, { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WatqFullLogo, WatqPrismMark } from '@/components/brand/WatqLogo';
import { 
  subscribeSession, 
  getClientSessionSnapshot, 
  getServerSessionSnapshot, 
  clearSession 
} from '@/lib/storage/session';
import { 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Keyboard, 
  GraduationCap, 
  Briefcase,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { WhatsNewModal } from '@/components/modals/WhatsNewModal';
import { FloatingNav } from '@/components/home/FloatingNav';
import { HeroCognitivePrism } from '@/components/home/HeroCognitivePrism';
import { InteractiveRunnerPreview } from '@/components/home/InteractiveRunnerPreview';
import { BentoGridFeatures } from '@/components/home/BentoGridFeatures';
import { ArchetypeMatrixShowcase } from '@/components/home/ArchetypeMatrixShowcase';
import { playMicroClick } from '@/lib/audio/haptics';

export default function HomePage() {
  const router = useRouter();
  const session = useSyncExternalStore(
    subscribeSession,
    getClientSessionSnapshot,
    getServerSessionSnapshot
  );

  const handleStartOver = () => {
    playMicroClick(400);
    if (window.confirm('Restart assessment from the beginning? Your saved responses will be cleared.')) {
      clearSession();
      router.push('/assess');
    }
  };

  const hasCompletedResult = session && session.completedAt && session.result;
  const hasInProgressSession = session && !session.completedAt && session.currentIndex > 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#07090E] text-[#F8FAFC] selection:bg-indigo-500/30 selection:text-white relative overflow-x-hidden">
      {/* What's New Single-Time Versioned Announcement Modal */}
      <WhatsNewModal />

      {/* Modern Detached Floating Glass Navigation Pill */}
      <FloatingNav session={session} />

      {/* Ambient Grid Background Pattern (Linear/Attio Vibe) */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.035] -z-20"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 1: Hero with Interactive Cognitive Prism & Dynamic Dispersion */}
        <HeroCognitivePrism />

        {/* Live Active Session Quick-Resume Bar (if in progress or completed) */}
        {(hasCompletedResult || hasInProgressSession) && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 mb-16 relative z-10">
            <div className="p-4 rounded-2xl bg-[#0F172A]/90 border border-sky-500/30 backdrop-blur-xl shadow-2xl shadow-sky-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-mono font-semibold text-sky-400">
                    {hasCompletedResult ? 'CALIBRATION ARCHIVED IN LOCAL STORAGE' : 'IN-PROGRESS COGNITIVE SESSION DETECTED'}
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    {hasCompletedResult
                      ? `Your verified archetype profile is ${session.result?.typeCode} (${session.result?.archetypeTitle}).`
                      : `You have completed ${session.currentIndex} of 24 items. Ready to finalize?`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                {hasCompletedResult ? (
                  <Link
                    href="/result"
                    onClick={() => playMicroClick(1000)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-sky-400 text-[#090D16] font-bold text-xs hover:bg-sky-300 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    href="/assess"
                    onClick={() => playMicroClick(1000)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-sky-400 text-[#090D16] font-bold text-xs hover:bg-sky-300 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Resume ({session.currentIndex + 1}/24)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                  title="Reset session and start over"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Interactive Sandbox Runner Demo (5-Point Likert with Web Audio synthesis) */}
        <InteractiveRunnerPreview />

        {/* Section 3: Asymmetrical Bento Grid Features (4 Dimensions, $0 OpEx Terminal, Keycaps) */}
        <BentoGridFeatures />

        {/* Section 4: 16 Archetype Catalog Matrix (Temperaments, Search, Cognitive Stack Modal) */}
        <ArchetypeMatrixShowcase />

        {/* Section 5: High-Impact Linear-Style Final Conversion Callout */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-5xl mx-auto text-center relative">
          {/* Radial Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[250px] bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-teal-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

          {/* Double-Bezel Card Outer */}
          <div className="rounded-[2.5rem] p-1 sm:p-1.5 bg-gradient-to-b from-white/[0.15] via-white/[0.04] to-transparent border border-white/[0.08] shadow-2xl shadow-black/80">
            <div className="rounded-[calc(2.5rem-0.375rem)] bg-[#0C101C] p-8 sm:p-16 border border-white/[0.06] relative overflow-hidden">
              {/* Subtle Watq Monogram Watermark */}
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none">
                <WatqPrismMark size={280} color="#FFFFFF" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>3 MINUTES // 24 STANDARDIZED ITEMS // ZERO REGISTRATION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
                Ready to Decode Your Cognitive Operating System?
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
                Step into a focus-engineered assessment container with instant real-time telemetry, zero account wall, and actionable career trajectories.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/assess"
                  onClick={() => playMicroClick(1000)}
                  className="group relative inline-flex items-center gap-3 pl-7 pr-3 py-3.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-teal-400 text-[#090D16] font-bold text-sm shadow-xl shadow-sky-500/20 hover:shadow-sky-500/35 transition-all duration-200 active:scale-95"
                >
                  <span>Launch Assessment Runner</span>
                  <span className="w-7 h-7 rounded-full bg-[#090D16] text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>

                <a
                  href="#archetypes"
                  onClick={() => playMicroClick(700)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-all"
                >
                  <span>Browse 16 Archetypes</span>
                  <ChevronRightIcon className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>

              {/* Guarantee Badges */}
              <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Client-Side Privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>Deterministic 0ms Latency</span>
                </div>
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-indigo-400" />
                  <span>Desktop Keypad 1–5 Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Linear-Tier Precision Footer */}
      <footer className="border-t border-white/[0.08] bg-[#07090E] py-12 px-4 sm:px-6 relative z-10 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <WatqFullLogo markSize={26} theme="dark" showTagline={false} />
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-slate-400 text-xs">Personality Decoded // Jungian Typology 1921</span>
          </div>

          {/* Center Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="#framework" className="hover:text-white transition-colors">Framework</a>
            <a href="#interactive-demo" className="hover:text-white transition-colors">Runner</a>
            <a href="#archetypes" className="hover:text-white transition-colors">16 Types</a>
            <a href="#vocational" className="hover:text-white transition-colors">Vocational</a>
            <Link href="/changelog" className="hover:text-sky-400 transition-colors">Changelog (v1.0.1)</Link>
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
            <span className="text-[11px] text-slate-400">Engine Operational ($0 OpEx)</span>
          </div>
        </div>

        {/* Bottom Micro Line */}
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 Watq. Developed by Mafrilearth. Standardized psychometric instrument.
          </div>
          <div className="flex items-center gap-4">
            <span>ILO ISCO-08</span>
            <span>•</span>
            <span>UNESCO ISCED-F 2013</span>
            <span>•</span>
            <span>WCAG 2.2 AA</span>
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
