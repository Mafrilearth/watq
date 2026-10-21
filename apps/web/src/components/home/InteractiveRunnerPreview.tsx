'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, RotateCcw, Zap, Sparkles } from 'lucide-react';
import { LikertValue } from '@watq/core';
import { playLikertPitch, playMicroClick } from '@/lib/audio/haptics';

export function InteractiveRunnerPreview() {
  const [selectedScore, setSelectedScore] = useState<LikertValue | null>(4);

  const LIKERT_OPTIONS: Array<{ value: LikertValue; label: string; desc: string }> = [
    { value: 1, label: '1', desc: 'Strongly Disagree' },
    { value: 2, label: '2', desc: 'Disagree' },
    { value: 3, label: '3', desc: 'Neutral' },
    { value: 4, label: '4', desc: 'Agree' },
    { value: 5, label: '5', desc: 'Strongly Agree' },
  ];

  const handleSelect = (val: LikertValue) => {
    playLikertPitch(val);
    setSelectedScore(val);
  };

  // Compute live vector feedback
  const introversionPercent = selectedScore === 1 ? 15 : selectedScore === 2 ? 35 : selectedScore === 3 ? 50 : selectedScore === 4 ? 75 : 95;
  const extraversionPercent = 100 - introversionPercent;

  return (
    <section id="interactive-demo" className="py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono font-semibold text-sky-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ZERO REGISTRATION // INSTANT RUNNER DEMO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Experience the Psychomotor Runner.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          Try answering a live sample item below. Notice the instant vector calculation and tactile psychomotor response.
        </p>
      </div>

      {/* The Double-Bezel Interactive Runner Container */}
      <div className="rounded-[2rem] p-1.5 sm:p-2 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/[0.08] shadow-2xl shadow-black/80 max-w-3xl mx-auto">
        <div className="rounded-[calc(2rem-0.5rem)] bg-[#0B0F19] p-6 sm:p-10 border border-white/[0.06] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Item Meta Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs font-mono">
            <span className="text-slate-400">SAMPLE ITEM 01 / 24</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 font-semibold">
              DIMENSION: ENERGY (E ↔ I)
            </span>
          </div>

          {/* Question Prompt */}
          <div className="my-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
              &ldquo;I naturally recharge mental energy through solitary deep-focus reflection rather than high-density social crowds.&rdquo;
            </h3>
            <p className="mt-2 text-xs font-mono text-slate-400">
              Target Pole: Introversion (I) • Scoring Weight: +1.0
            </p>
          </div>

          {/* 5-Point Likert Scale Buttons (Raycast / Linear Keyboard Vibe) */}
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-mono text-slate-400 px-1">
              <span>STRONGLY DISAGREE</span>
              <span>STRONGLY AGREE</span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {LIKERT_OPTIONS.map((opt) => {
                const isSelected = selectedScore === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`group relative p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center transition-all duration-150 active:scale-95 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400'
                        : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07] border border-white/[0.08]'
                    }`}
                  >
                    <span className="text-base sm:text-lg font-bold font-mono">
                      {opt.label}
                    </span>
                    <span className="hidden sm:block text-[9px] font-mono mt-1 opacity-70 truncate max-w-full">
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Vector Telemetry Output */}
          <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-400">Extroversion (E): {extraversionPercent}%</span>
              <span className="font-bold text-indigo-400">Introversion (I): {introversionPercent}%</span>
            </div>

            {/* Split Bar */}
            <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden flex">
              <div
                className="h-full bg-sky-500/60 transition-all duration-300"
                style={{ width: `${extraversionPercent}%` }}
              />
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${introversionPercent}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Dynamic tie-breaking protocol active</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Raw Score: {selectedScore ?? 0}/5
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Desktop keyboard shortcuts supported:{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/[0.1] font-mono text-white text-[10px]">
                1
              </kbd>{' '}
              through{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/[0.1] font-mono text-white text-[10px]">
                5
              </kbd>
            </div>

            <Link
              href="/assess"
              onClick={() => playMicroClick(1000)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sky-400 hover:bg-sky-300 text-[#090D16] font-bold text-xs shadow-lg shadow-sky-500/20 transition-all active:scale-95"
            >
              <span>Begin Full 24-Item Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
