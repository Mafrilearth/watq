'use client';

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  ShieldCheck, 
  Keyboard, 
  GraduationCap, 
  Sparkles, 
  Cpu, 
  Lock, 
  CheckCircle2,
  Terminal,
  Activity
} from 'lucide-react';
import { playMicroClick } from '@/lib/audio/haptics';

export function BentoGridFeatures() {
  const [activeAxis, setActiveAxis] = useState<'EI' | 'SN' | 'TF' | 'JP'>('EI');
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const AXIS_DATA = {
    EI: {
      title: 'Energy Orientation (E ↔ I)',
      color: '#818CF8',
      desc: 'Dictates attentional flow and mental regeneration dynamics.',
      leftPole: { code: 'E', label: 'Extraversion', focus: 'Action in the outer world of people & events.' },
      rightPole: { code: 'I', label: 'Introversion', focus: 'Internal contemplation in the world of concepts & ideas.' },
    },
    SN: {
      title: 'Information Intake (S ↔ N)',
      color: '#2DD4BF',
      desc: 'Governs how stimuli and observational data are absorbed.',
      leftPole: { code: 'S', label: 'Sensing', focus: 'Literal, empirical reality perceived through 5 tangible senses.' },
      rightPole: { code: 'N', label: 'Intuition', focus: 'Latent patterns, systemic symbols, and future possibilities.' },
    },
    TF: {
      title: 'Decision Formulation (T ↔ F)',
      color: '#38BDF8',
      desc: 'Controls judgment frameworks, valuation, and consequence sorting.',
      leftPole: { code: 'T', label: 'Thinking', focus: 'Deductive logic, consistency, and impersonal causal criteria.' },
      rightPole: { code: 'F', label: 'Feeling', focus: 'Subjective ethics, interpersonal harmony, and human values.' },
    },
    JP: {
      title: 'Lifestyle Execution (J ↔ P)',
      color: '#FBBF24',
      desc: 'Determines external structural orientation and temporal cadence.',
      leftPole: { code: 'J', label: 'Judging', focus: 'Deliberate planning, closure, and orderly structural regimens.' },
      rightPole: { code: 'P', label: 'Perceiving', focus: 'Spontaneous exploration, adaptable emergent pacing, and open options.' },
    },
  };

  const currentAxisInfo = AXIS_DATA[activeAxis];

  const handleKeyPress = (key: string) => {
    playMicroClick(950);
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 300);
  };

  return (
    <section id="framework" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="max-w-2xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-semibold text-indigo-400 mb-4">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>PSYCHOMETRIC SPECIFICATION & ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Engineered for Rigorous Cognitive Precision.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          A four-tier analytical architecture designed to eliminate acquiescence bias and deliver mathematically repeatable typology telemetry.
        </p>
      </div>

      {/* Asymmetric Double-Bezel Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CARD 1: 4 Bipolar Axes Interactive Explorer (Col-span 8) */}
        <div className="lg:col-span-8 rounded-[2rem] p-1.5 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              {/* Card Header & Axis Switcher Tabs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    AXIS 01-04 SPECIFICATION
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">4 Cognitive Polarity Dimensions</h3>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  {(['EI', 'SN', 'TF', 'JP'] as const).map((axis) => (
                    <button
                      key={axis}
                      onClick={() => {
                        playMicroClick(800);
                        setActiveAxis(axis);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        activeAxis === axis
                          ? 'bg-white text-[#0B0F19] shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {axis}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Axis Content */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white" style={{ color: currentAxisInfo.color }}>
                    {currentAxisInfo.title}
                  </h4>
                  <span className="text-xs font-mono text-slate-400">Balanced 6 Items (50% Reverse-Keyed)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  {currentAxisInfo.desc}
                </p>

                {/* 2 Opposite Poles Visualization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {/* Left Pole */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-mono font-extrabold text-white">
                        {currentAxisInfo.leftPole.code}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {currentAxisInfo.leftPole.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {currentAxisInfo.leftPole.focus}
                    </p>
                  </div>

                  {/* Right Pole */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-mono font-extrabold text-white">
                        {currentAxisInfo.rightPole.code}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {currentAxisInfo.rightPole.label}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {currentAxisInfo.rightPole.focus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Raw scale normalized to 0-100% discrete vector
              </span>
              <span>WATQ-PRD-1921</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Zero Database OpEx & Cryptographic Integrity (Col-span 4) */}
        <div className="lg:col-span-4 rounded-[2rem] p-1.5 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  0ms CLOUD OPEX
                </span>
                <span>SHA-256</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">100% Client-Side Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero database dependencies. State is isolated locally in your browser memory and Web Crypto storage.
              </p>

              {/* Terminal Snippet Box */}
              <div className="mt-6 p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-[11px] space-y-2">
                <div className="flex items-center gap-1.5 text-slate-400 pb-2 border-b border-white/[0.06]">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  <span>runtime_telemetry.log</span>
                </div>
                <div className="text-slate-400 font-mono">
                  &gt; DB_OPEX: <span className="text-emerald-400">$0.00 / month</span>
                </div>
                <div className="text-slate-400 font-mono">
                  &gt; STORAGE: <span className="text-sky-400">watq_mvp_session_v1</span>
                </div>
                <div className="text-slate-400 font-mono">
                  &gt; AD_TRACKING: <span className="text-emerald-400">DISABLED (0 B)</span>
                </div>
                <div className="text-slate-400 font-mono">
                  &gt; LATENCY: <span className="text-emerald-400">&lt; 1ms local</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Privacy Verified</span>
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* CARD 3: Psychomotor Keyboard Navigation (Col-span 4) */}
        <div className="lg:col-span-4 rounded-[2rem] p-1.5 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <Keyboard className="w-3.5 h-3.5" />
                  KEYBOARD FIRST
                </span>
                <span>120ms CADENCE</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Tactile Hotkey Matrix</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete the entire assessment without touching your mouse. Click or press keys to test the tactile response:
              </p>

              {/* Interactive 3D Keycaps */}
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {['1', '2', '3', '4', '5'].map((key) => {
                  const isPressed = pressedKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-all duration-100 ${
                        isPressed
                          ? 'bg-sky-400 text-[#090D16] shadow-lg shadow-sky-400/40 translate-y-1'
                          : 'bg-white/[0.04] text-white border border-white/[0.1] hover:bg-white/[0.08] active:translate-y-0.5'
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex gap-2 justify-center">
                {['Enter', 'Back'].map((key) => {
                  const isPressed = pressedKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleKeyPress(key)}
                      className={`px-3 py-1.5 rounded-lg font-mono font-semibold text-xs transition-all duration-100 ${
                        isPressed
                          ? 'bg-sky-400 text-[#090D16] translate-y-0.5'
                          : 'bg-white/[0.04] text-slate-300 border border-white/[0.1] hover:bg-white/[0.08]'
                      }`}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-400 text-center">
              Fitts&apos;s Law 120ms Psychomotor Pacing
            </div>
          </div>
        </div>

        {/* CARD 4: Academic & Vocational Guidance Matrix (Col-span 8) */}
        <div id="vocational" className="lg:col-span-8 rounded-[2rem] p-1.5 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <GraduationCap className="w-3.5 h-3.5" />
                  VOCATIONAL TAXONOMY
                </span>
                <span>UNESCO ISCED-F // ILO ISCO-08</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Transforming Typology into Life Trajectories</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Personality without application is mere vanity. Watq translates each cognitive function stack into rigorous academic disciplines and high-growth professional careers:
              </p>

              {/* Sample Target Trajectory Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  'Artificial Intelligence & Systems',
                  'Quantitative Finance & Risk',
                  'Cardiothoracic Surgery',
                  'Constitutional Law',
                  'Aerospace Propulsion',
                  'Product Architecture',
                  'Bioethics & Medical Policy',
                  'Venture Capital & Strategy',
                  'Quantum Computing',
                  'Cognitive Neurobiology'
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-200 hover:border-sky-400/50 hover:bg-white/[0.06] transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Standardized International Classifications</span>
              <span className="text-sky-400">16 Dedicated Syllabi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
