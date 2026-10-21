'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, RotateCcw, Zap, Sparkles, Activity } from 'lucide-react';
import { LikertValue } from '@watq/core';
import { playLikertPitch, playMicroClick } from '@/lib/audio/haptics';

export function InteractiveRunnerPreview() {
  const [selectedScore, setSelectedScore] = useState<LikertValue | null>(4);

  const LIKERT_OPTIONS: Array<{ value: LikertValue; label: string; desc: string; angle: number; freq: string }> = [
    { value: 1, label: '1', desc: 'Strongly Disagree', angle: -60, freq: '261.6 Hz (C4)' },
    { value: 2, label: '2', desc: 'Disagree', angle: -30, freq: '329.6 Hz (E4)' },
    { value: 3, label: '3', desc: 'Neutral', angle: 0, freq: '392.0 Hz (G4)' },
    { value: 4, label: '4', desc: 'Agree', angle: 30, freq: '440.0 Hz (A4)' },
    { value: 5, label: '5', desc: 'Strongly Agree', angle: 60, freq: '523.2 Hz (C5)' },
  ];

  const handleSelect = (val: LikertValue) => {
    playLikertPitch(val);
    setSelectedScore(val);
  };

  const currentOption = LIKERT_OPTIONS.find((o) => o.value === selectedScore) || LIKERT_OPTIONS[2];

  // Compute live vector feedback
  const introversionPercent = selectedScore === 1 ? 15 : selectedScore === 2 ? 35 : selectedScore === 3 ? 50 : selectedScore === 4 ? 75 : 95;
  const extraversionPercent = 100 - introversionPercent;

  return (
    <section id="interactive-demo" className="py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.08] relative">
      {/* Background Registration Crosshairs */}
      <div className="hidden sm:block absolute top-8 left-8 text-slate-700 font-mono text-[9px] pointer-events-none select-none">
        + SAMPLE RUNNER // DISTRACTION-FREE
      </div>
      <div className="hidden sm:block absolute top-8 right-8 text-slate-700 font-mono text-[9px] pointer-events-none select-none">
        + IN-BROWSER SCORING
      </div>

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono font-semibold text-sky-400 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SAMPLE QUESTION // NO ACCOUNT NEEDED</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Try Answering a Question.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          See how the assessment feels in practice. Select your rating from 1 (Strongly Disagree) to 5 (Strongly Agree) and observe how your preference indicator updates.
        </p>
      </div>

      {/* The Double-Bezel Interactive Runner Container */}
      <div className="rounded-[2.2rem] p-1.5 sm:p-2 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/[0.08] shadow-2xl shadow-black/80 max-w-3xl mx-auto">
        <div className="rounded-[calc(2.2rem-0.5rem)] bg-[#0B0F19] p-6 sm:p-10 border border-white/[0.06] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Item Meta Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              SAMPLE ITEM 01 / 24
            </span>
            <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 font-semibold text-[11px]">
              DIMENSION: ENERGY (E ↔ I)
            </span>
          </div>

          {/* Contextual Illustration: The Response Meter */}
          <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* The SVG Precision Dial */}
            <div className="w-48 h-32 relative flex items-center justify-center shrink-0">
              <svg viewBox="0 0 200 130" className="w-full h-full overflow-visible">
                {/* Arc Track */}
                <path
                  d="M 30 110 A 70 70 0 0 1 170 110"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Active Colored Arc Range */}
                <path
                  d="M 30 110 A 70 70 0 0 1 170 110"
                  fill="none"
                  stroke="url(#dialGradient)"
                  strokeWidth="6"
                  strokeDasharray="220"
                  strokeDashoffset={220 - (introversionPercent / 100) * 220}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="dialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="50%" stopColor="#818CF8" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>

                {/* 5 Calibrated Detents */}
                {LIKERT_OPTIONS.map((opt) => {
                  const rad = ((opt.angle - 90) * Math.PI) / 180;
                  const dx = 100 + 70 * Math.cos(rad);
                  const dy = 110 + 70 * Math.sin(rad);
                  const isCurrent = opt.value === selectedScore;
                  return (
                    <g key={opt.value}>
                      <circle
                        cx={dx}
                        cy={dy}
                        r={isCurrent ? 4 : 2}
                        fill={isCurrent ? '#FFFFFF' : 'rgba(255,255,255,0.3)'}
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}

                {/* The Rotating Needle */}
                <g
                  className="transition-transform duration-500 ease-out"
                  style={{
                    transformOrigin: '100px 110px',
                    transform: `rotate(${currentOption.angle}deg)`,
                  }}
                >
                  <line x1="100" y1="110" x2="100" y2="44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="100" cy="110" r="5" fill="#38BDF8" />
                  <circle cx="100" cy="44" r="2.5" fill="#FFFFFF" />
                </g>

                {/* Center Value */}
                <text x="100" y="102" fill="#FFFFFF" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  {selectedScore}
                </text>
                <text x="100" y="124" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  RATING
                </text>
              </svg>
            </div>

            {/* Dial Telemetry Diagnostics */}
            <div className="flex-1 w-full space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                <span className="text-slate-500">SELECTED SCORE:</span>
                <span className="text-white font-bold">{selectedScore} / 5</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                <span className="text-slate-500">ANSWER CHOICE:</span>
                <span className="text-sky-400 font-bold flex items-center gap-1">
                  {currentOption.desc.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">PRIMARY LEANING:</span>
                <span className="text-emerald-400 font-bold">
                  {introversionPercent > 50 ? `INTROVERSION (${introversionPercent}%)` : `EXTRAVERSION (${extraversionPercent}%)`}
                </span>
              </div>
            </div>
          </div>

          {/* Question Prompt */}
          <div className="my-6">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug tracking-tight">
              &ldquo;After intense socializing, I require solitary time to recharge my mental energy.&rdquo;
            </h3>
            <p className="mt-2 text-xs font-mono text-slate-400">
              Dimension: Extraversion (E) vs Introversion (I) • Scale: 5-Point Likert
            </p>
          </div>

          {/* 5-Point Likert Scale Buttons */}
          <div className="space-y-3">
            <div className="flex justify-between text-[11px] font-mono text-slate-400 px-1">
              <span>1 // STRONGLY DISAGREE</span>
              <span>5 // STRONGLY AGREE</span>
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
                        ? 'bg-gradient-to-b from-sky-400 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-sky-300'
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
              <span className="flex items-center gap-1.5 text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Raw Score: {selectedScore ?? 0}/5
              </span>
              <span className="text-slate-500">
                Balanced Reverse-Keyed Calibration
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 font-mono">
              Desktop shortcuts active:{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/[0.1] text-white text-[10px]">
                1
              </kbd>{' '}
              through{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/[0.1] text-white text-[10px]">
                5
              </kbd>
            </div>

            <Link
              href="/assess"
              onClick={() => playMicroClick(1000)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-400 hover:bg-sky-300 text-[#090D16] font-bold text-xs shadow-lg shadow-sky-500/20 transition-all active:scale-95"
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
