'use client';

import React, { useSyncExternalStore, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { WatqFullLogo } from '@/components/brand/WatqLogo';
import { 
  subscribeSession, 
  getClientSessionSnapshot, 
  getServerSessionSnapshot, 
  clearSession 
} from '@/lib/storage/session';
import { 
  GraduationCap, 
  Briefcase, 
  RotateCcw, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface PolarityBarProps {
  labelLeft: string;
  labelRight: string;
  codeLeft: string;
  codeRight: string;
  scoreLeft: number;
  scoreRight: number;
  colorHex: string;
}

function PolarityBar({
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
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2">
        <span className={isLeftDominant ? 'text-white font-bold' : 'text-slate-400'}>
          {labelLeft} ({codeLeft}) <strong className="font-mono text-sky-400">{scoreLeft}%</strong>
        </span>
        <span className={!isLeftDominant ? 'text-white font-bold' : 'text-slate-400'}>
          <strong className="font-mono text-sky-400">{scoreRight}%</strong> {labelRight} ({codeRight})
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex relative">
        {/* Equidistant Center Marker (50%) */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/20 z-10" />

        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${scoreLeft}%`,
            backgroundColor: isLeftDominant ? colorHex : 'rgba(148, 163, 184, 0.25)',
          }}
        />
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: `${scoreRight}%`,
            backgroundColor: !isLeftDominant ? colorHex : 'rgba(148, 163, 184, 0.25)',
          }}
        />
      </div>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const session = useSyncExternalStore(
    subscribeSession,
    getClientSessionSnapshot,
    getServerSessionSnapshot
  );
  const [copied, setCopied] = useState<boolean>(false);

  const result = session?.result;

  useEffect(() => {
    // Only redirect if client storage has been checked and result is truly absent
    if (typeof window !== 'undefined' && session && !session.result) {
      router.replace('/');
    }
  }, [session, router]);

  const handleRetake = () => {
    if (window.confirm('Retake assessment? Your previous responses will be cleared.')) {
      clearSession();
      router.push('/assess');
    }
  };

  const handleCopySummary = async () => {
    if (!result) return;
    const summaryText = `WATQ COGNITIVE REPORT
Type: ${result.typeCode} — ${result.archetypeTitle}
Summary: ${result.summary}

Scores:
• Energy (E/I): ${result.scores.E}% E / ${result.scores.I}% I
• Information (S/N): ${result.scores.S}% S / ${result.scores.N}% N
• Decision (T/F): ${result.scores.T}% T / ${result.scores.F}% F
• Lifestyle (J/P): ${result.scores.J}% J / ${result.scores.P}% P

Recommended Majors (UNESCO ISCED-F 2013):
${result.majors.map((m) => ` - ${m}`).join('\n')}

Aligned Careers (ILO ISCO-08):
${result.careers.map((c) => ` - ${c}`).join('\n')}

Engine: Watq v1.0 // https://watq.mafrilearth.com`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-[#090D16] flex items-center justify-center text-slate-400 font-mono text-xs">
        Loading diagnostic report...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] flex flex-col justify-between">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090D16]/80 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center shrink-0">
            <WatqFullLogo markSize={28} theme="dark" showTagline={true} />
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-slate-200 hover:bg-white/[0.1] transition-all whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Copy Report</span>
                  <span className="xs:hidden">Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleRetake}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 sm:px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 transition-all whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full space-y-6 sm:space-y-8 flex-1">
        {/* Archetype Hero Card */}
        <section className="bg-gradient-to-b from-[#1E1B4B]/40 to-[#0F172A] border border-white/[0.12] rounded-2xl sm:rounded-3xl p-5 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/20 text-[10px] sm:text-xs font-mono text-sky-400 mb-4 sm:mb-6">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden xs:inline">COGNITIVE MATRIX VERIFIED // DETERMINISTIC SCORE</span>
            <span className="xs:hidden">COGNITIVE MATRIX VERIFIED</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-3 sm:mb-4">
            <h1 className="text-4xl xs:text-5xl sm:text-7xl font-extrabold tracking-tight text-white font-mono">
              {result.typeCode}
            </h1>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-sky-400">
              {result.archetypeTitle}
            </h2>
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl">
            {result.summary}
          </p>
        </section>

        {/* 4 Cognitive Polarity Axis Bars */}
        <section className="bg-[#0F172A] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Cognitive Polarity Dynamics
              </h3>
              <p className="text-xs text-slate-400">
                Mathematical balance across the 4 fundamental cognitive preference axes.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
              Scale: 0% to 100%
            </span>
          </div>

          <div className="space-y-4">
            <PolarityBar
              labelLeft="Extraversion"
              codeLeft="E"
              scoreLeft={result.scores.E}
              labelRight="Introversion"
              codeRight="I"
              scoreRight={result.scores.I}
              colorHex="#818CF8"
            />

            <PolarityBar
              labelLeft="Sensing"
              codeLeft="S"
              scoreLeft={result.scores.S}
              labelRight="Intuition"
              codeRight="N"
              scoreRight={result.scores.N}
              colorHex="#2DD4BF"
            />

            <PolarityBar
              labelLeft="Thinking"
              codeLeft="T"
              scoreLeft={result.scores.T}
              labelRight="Feeling"
              codeRight="F"
              scoreRight={result.scores.F}
              colorHex="#38BDF8"
            />

            <PolarityBar
              labelLeft="Judging"
              codeLeft="J"
              scoreLeft={result.scores.J}
              labelRight="Perceiving"
              codeRight="P"
              scoreRight={result.scores.P}
              colorHex="#FBBF24"
            />
          </div>
        </section>

        {/* Vocational Guidance Matrix: Majors & Careers */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recommended Majors (UNESCO ISCED-F 2013) */}
          <div className="bg-[#0F172A] border border-white/[0.08] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400">
              <GraduationCap className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">
                Recommended Academic Majors
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Aligned with UNESCO ISCED-F 2013 International Fields of Education.
            </p>

            <ul className="space-y-2.5 pt-2">
              {result.majors.map((major, idx) => (
                <li
                  key={idx}
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-slate-200 flex items-center justify-between hover:bg-white/[0.06] transition-colors"
                >
                  <span>{major}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </li>
              ))}
            </ul>
          </div>

          {/* Aligned Career Trajectories (ILO ISCO-08) */}
          <div className="bg-[#0F172A] border border-white/[0.08] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-sky-400">
              <Briefcase className="w-5 h-5" />
              <h3 className="font-bold text-white text-base">
                Aligned Career Trajectories
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Mapped against ILO ISCO-08 International Classification of Occupations.
            </p>

            <ul className="space-y-2.5 pt-2">
              {result.careers.map((career, idx) => (
                <li
                  key={idx}
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-slate-200 flex items-center justify-between hover:bg-white/[0.06] transition-colors"
                >
                  <span>{career}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Action Panel */}
        <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-white">Need to review the questions or try again?</h4>
            <p className="text-xs text-slate-400">You can retake the assessment at any time. Data remains stored solely on your device.</p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRetake}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-slate-200 hover:bg-white/[0.1] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Assessment
            </button>
            <Link
              href="/"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#38BDF8] text-[#090D16] text-xs font-bold hover:bg-[#7DD3FC] transition-all shadow-md shadow-sky-500/10"
            >
              Return Home
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Report Footer */}
      <footer className="border-t border-white/[0.06] py-6 text-center text-xs font-mono text-slate-500">
        WATQ COGNITIVE REPORT // PSYCHOMETRIC PRISM // PERSONALITY DECODED
      </footer>
    </div>
  );
}
