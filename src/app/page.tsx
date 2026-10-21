'use client';

import React, { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { WatqFullLogo } from '@/components/brand/WatqLogo';
import { 
  subscribeSession, 
  getClientSessionSnapshot, 
  getServerSessionSnapshot, 
  clearSession 
} from '@/lib/storage/session';
import { 
  BrainCircuit, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  GraduationCap,
  Clock,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { WhatsNewModal } from '@/components/modals/WhatsNewModal';

export default function HomePage() {
  const router = useRouter();
  const session = useSyncExternalStore(
    subscribeSession,
    getClientSessionSnapshot,
    getServerSessionSnapshot
  );

  const handleStartOver = () => {
    if (window.confirm('Restart assessment from the beginning? Your saved responses will be cleared.')) {
      clearSession();
      router.push('/assess');
    }
  };

  const hasCompletedResult = session && session.completedAt && session.result;
  const hasInProgressSession = session && !session.completedAt && session.currentIndex > 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#090D16] text-[#F8FAFC]">
      {/* What's New Single-Time Versioned Announcement Modal */}
      <WhatsNewModal />

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090D16]/80 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center shrink-0">
            <WatqFullLogo markSize={28} theme="dark" showTagline={true} />
          </Link>

          <div className="flex items-center shrink-0">
            {hasCompletedResult ? (
              <Link
                href="/result"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">View Result ({session.result?.typeCode})</span>
                <span className="sm:hidden">Result ({session.result?.typeCode})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : hasInProgressSession ? (
              <Link
                href="/assess"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#38BDF8] text-[#090D16] hover:bg-[#7DD3FC] transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">Resume (Q {session.currentIndex + 1}/24)</span>
                <span className="sm:hidden">Resume ({session.currentIndex + 1}/24)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                href="/assess"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#38BDF8] text-[#090D16] hover:bg-[#7DD3FC] transition-colors whitespace-nowrap"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-10 sm:pt-20 md:pt-24 pb-12 sm:pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[550px] h-[180px] sm:h-[300px] bg-sky-500/10 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] sm:text-xs font-mono text-sky-400 mb-5 sm:mb-6">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-400 animate-pulse" />
            WATQ COGNITIVE ENGINE V1.0 // DETERMINISTIC MVP
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] text-white max-w-3xl mx-auto leading-[1.18] sm:leading-[1.12] px-1 sm:px-0">
            Decode Your Cognitive Architecture with Mathematical Precision.
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-1 sm:px-0">
            A frictionless, client-driven psychometric instrument deconstructing 16 cognitive types to guide college major alignment and career trajectories. Zero registration, zero ads, and instant execution.
          </p>

          {/* Dynamic Call to Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
            {hasCompletedResult ? (
              <>
                <Link
                  href="/result"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#38BDF8] text-[#090D16] font-bold text-sm hover:bg-[#7DD3FC] transition-all shadow-lg shadow-sky-500/20 active:scale-[0.99]"
                >
                  View Cognitive Profile ({session.result?.typeCode})
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleStartOver}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-200 font-semibold text-sm hover:bg-white/[0.08] transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Assessment
                </button>
              </>
            ) : hasInProgressSession ? (
              <>
                <Link
                  href="/assess"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-xl bg-[#38BDF8] text-[#090D16] font-bold text-sm hover:bg-[#7DD3FC] transition-all shadow-lg shadow-sky-500/20 active:scale-[0.99]"
                >
                  Resume Assessment (Question {session.currentIndex + 1} of 24)
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleStartOver}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-200 font-semibold text-sm hover:bg-white/[0.08] transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retake Assessment
                </button>
              </>
            ) : (
              <Link
                href="/assess"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#38BDF8] text-[#090D16] font-bold text-sm sm:text-base hover:bg-[#7DD3FC] transition-all shadow-lg shadow-sky-500/20 active:scale-[0.99]"
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto text-left">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-sky-400 font-mono text-[11px] sm:text-xs font-semibold mb-1">
                <Clock className="w-3.5 h-3.5" /> DURATION
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono">~3 Minutes</div>
              <div className="text-[11px] sm:text-xs text-slate-500">24 focused items</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-indigo-400 font-mono text-[11px] sm:text-xs font-semibold mb-1">
                <BrainCircuit className="w-3.5 h-3.5" /> MODEL
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono">16 Types</div>
              <div className="text-[11px] sm:text-xs text-slate-500">Jungian Typology 1921</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-400 font-mono text-[11px] sm:text-xs font-semibold mb-1">
                <Zap className="w-3.5 h-3.5" /> LATENCY
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono">&lt; 10ms</div>
              <div className="text-[11px] sm:text-xs text-slate-500">Client-side engine</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 text-amber-400 font-mono text-[11px] sm:text-xs font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" /> PRIVACY
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono">100% Local</div>
              <div className="text-[11px] sm:text-xs text-slate-500">No account required</div>
            </div>
          </div>
        </section>

        {/* Core Instrument Card Section */}
        <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0F172A] p-8 sm:p-10 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-mono font-semibold border border-indigo-500/20">
                  <Sparkles className="w-3 h-3" /> CORE INSTRUMENT // JUNGIAN TYPOLOGY
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  16 Cognitive Types Assessment
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Evaluates 4 bipolar mental preference axes: Energy (E/I), Information (S/N), Decision (T/F), and Lifestyle (J/P). Engineered with a balanced 50% reverse-keying distribution to completely eliminate acquiescence response bias.
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 24 5-Point Likert Items</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Academic Major Guidance</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Career Trajectories</span>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <Link
                  href="/assess"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#38BDF8] text-[#090D16] font-bold text-sm hover:bg-[#7DD3FC] transition-all shadow-md active:scale-[0.99]"
                >
                  <span>Start Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Deterministic Scoring</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Raw scores normalize across 4 axes from 0% to 100% with unambiguous tie-breaking rules, yielding consistent, verifiable archetype outcomes.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Vocational Alignment</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Each archetype maps directly to recommended university majors and aligned professional careers, transforming psychological insight into life direction.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Private & Zero-Friction</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Zero signups, zero database tracking, and zero ads. Your responses persist locally in your browser and remain strictly in your control.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-xs text-slate-500 font-mono">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <WatqFullLogo markSize={24} theme="dark" showTagline={false} />
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-mono text-slate-400">
            <span>© 2026 Watq. All rights reserved.</span>
            <span className="text-white/20">•</span>
            <Link href="/changelog" className="hover:text-sky-400 transition-colors">
              Changelog
            </Link>
            <span className="text-white/20">•</span>
            <a
              href="https://github.com/Mafrilearth/watq"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors"
            >
              GitHub ↗
            </a>
          </div>
          <p className="text-slate-500 font-mono text-[11px]">Deterministic Cognitive Engine // Zero Telemetry</p>
        </div>
      </footer>
    </div>
  );
}
