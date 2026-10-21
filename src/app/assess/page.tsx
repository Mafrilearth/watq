'use client';

import React, { useState, useEffect, useCallback, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { WatqPrismMark } from '@/components/brand/WatqLogo';
import { JUNGIAN_QUESTIONS } from '@/data/assessments/jungian16';
import { calculateJungianScores } from '@/lib/scoring/jungian';
import { getSession, initSession, updateSessionResponse, completeSession } from '@/lib/storage/session';
import { LikertValue } from '@/types/assessment';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

const LIKERT_OPTIONS: Array<{ value: LikertValue; label: string; short: string }> = [
  { value: 1, label: 'Strongly Disagree', short: '1' },
  { value: 2, label: 'Disagree', short: '2' },
  { value: 3, label: 'Neutral', short: '3' },
  { value: 4, label: 'Agree', short: '4' },
  { value: 5, label: 'Strongly Agree', short: '5' },
];

export default function AssessmentRunnerPage() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // Lazy state initialization from localStorage prevents cascading renders
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const session = getSession();
    if (!session) return 0;
    return Math.min(Math.max(0, session.currentIndex), JUNGIAN_QUESTIONS.length - 1);
  });

  const [responses, setResponses] = useState<Record<string, LikertValue>>(() => {
    const session = getSession();
    return session?.responses || {};
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize session on mount if missing, or route to result if already completed
  useEffect(() => {
    const session = getSession();
    if (!session) {
      initSession();
    } else if (session.completedAt && session.result) {
      router.replace('/result');
    }
  }, [router]);

  const currentQuestion = JUNGIAN_QUESTIONS[currentIndex];
  const selectedVal = currentQuestion ? responses[currentQuestion.id] ?? null : null;
  const progressPercent = Math.round(((currentIndex + 1) / JUNGIAN_QUESTIONS.length) * 100);

  // Handle selection with psychomotor auto-advance delay (180ms)
  const handleSelect = useCallback(
    (value: LikertValue) => {
      if (isSubmitting || !currentQuestion) return;

      setIsSubmitting(true);

      const nextResponses = {
        ...responses,
        [currentQuestion.id]: value,
      };
      setResponses(nextResponses);

      // Psychomotor delay: 100ms optical highlight + 80ms mental anticipation buffer
      setTimeout(() => {
        if (currentIndex < JUNGIAN_QUESTIONS.length - 1) {
          const nextIndex = currentIndex + 1;
          updateSessionResponse(currentQuestion.id, value, nextIndex);
          setCurrentIndex(nextIndex);
          setIsSubmitting(false);
        } else {
          // Final question completed -> execute deterministic scoring engine
          updateSessionResponse(currentQuestion.id, value, currentIndex);
          const finalResult = calculateJungianScores(nextResponses);
          completeSession(finalResult);

          startTransition(() => {
            router.push('/result');
          });
        }
      }, 180);
    },
    [currentIndex, currentQuestion, isSubmitting, responses, router]
  );

  // Handle navigation to previous question
  const handleBack = useCallback(() => {
    if (currentIndex <= 0 || isSubmitting) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
  }, [currentIndex, isSubmitting]);

  // Desktop keyboard shortcuts: 1-5 to select, Backspace/ArrowLeft to go back, Escape to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        e.preventDefault();
        const num = parseInt(e.key, 10) as LikertValue;
        handleSelect(num);
      } else if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          e.preventDefault();
          handleBack();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (window.confirm('Return to home? Your assessment responses are automatically saved.')) {
          router.push('/');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelect, handleBack, currentIndex, router]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#090D16] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <WatqPrismMark size={40} className="animate-pulse" />
          <span className="text-xs font-mono text-slate-500">Initializing cognitive matrix...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-[#F8FAFC] flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      {/* Top Header: Minimalist brand anchor & progress bar */}
      <header className="w-full max-w-[680px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <WatqPrismMark size={24} />
            <span className="font-extrabold text-sm tracking-wider text-white group-hover:text-sky-400 transition-colors">
              WATQ
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              Question <strong className="text-white">{currentIndex + 1}</strong> of {JUNGIAN_QUESTIONS.length}
            </span>
            <span className="text-xs font-mono text-sky-400 font-semibold px-2 py-0.5 rounded-full bg-sky-950/60 border border-sky-500/20">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-sky-300 transition-all duration-200 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Focus Container: Locked to exactly 680px (Bringhurst's Law) */}
      <main className="w-full max-w-[680px] mx-auto my-auto py-4 sm:py-8">
        <div className="bg-[#0F172A] border border-white/[0.08] rounded-2xl p-5 sm:p-10 shadow-2xl shadow-black/60 relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-3xl pointer-events-none" />

          {/* Question Category Metadata */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-sky-400 bg-sky-950/50 border border-sky-500/20 px-2 sm:px-2.5 py-1 rounded-md">
              DIMENSION: {currentQuestion.dimension} {'//'} ITEM {currentQuestion.id} OF {JUNGIAN_QUESTIONS.length}
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">
              Auto-saved to device
            </span>
          </div>

          {/* Question Prompt */}
          <h2 className="text-lg sm:text-2xl font-medium text-white leading-snug tracking-[-0.01em] min-h-[56px] sm:min-h-[72px] flex items-center">
            {currentQuestion.prompt}
          </h2>

          <p className="text-xs text-slate-400 mt-2 mb-6 sm:mb-8 italic">
            Measurement target: {currentQuestion.target}
          </p>

          {/* 5-Point Likert Scale (Touch target >= 48px via Fitts's Law) */}
          <div className="space-y-2.5 sm:space-y-3" role="radiogroup" aria-label="Likert Scale Options">
            {LIKERT_OPTIONS.map((opt) => {
              const isSelected = selectedVal === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full min-h-[50px] sm:min-h-[48px] px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl border flex items-center justify-between text-left transition-all duration-120 select-none ${
                    isSelected
                      ? 'bg-sky-500/15 border-sky-400 text-white shadow-md shadow-sky-500/10'
                      : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.18]'
                  } ${isSubmitting ? 'cursor-wait' : 'cursor-pointer active:scale-[0.99]'}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-sky-400 text-[#090D16]'
                          : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
                      }`}
                    >
                      {opt.short}
                    </span>
                    <span className="text-sm sm:text-base font-medium">{opt.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-sky-400 flex items-center justify-center text-[#090D16]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Runner Controls & Back Button */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentIndex === 0 || isSubmitting}
              className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                currentIndex === 0
                  ? 'text-slate-600 cursor-not-allowed opacity-50'
                  : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Previous Question
            </button>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 hidden sm:flex">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Tip: Press numeric keys 1–5 for instant selection</span>
            </div>
          </div>
        </div>
      </main>

      {/* Runner Footer */}
      <footer className="w-full max-w-[680px] mx-auto text-center text-xs font-mono text-slate-600">
        WATQ COGNITIVE RUNNER // DETERMINISTIC &amp; PRIVATE // ZERO DATA COLLECTION
      </footer>
    </div>
  );
}
