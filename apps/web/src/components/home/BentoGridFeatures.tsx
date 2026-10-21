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
  Activity,
  ArrowRight
} from 'lucide-react';
import { playMicroClick } from '@/lib/audio/haptics';

export function BentoGridFeatures() {
  const [activeAxis, setActiveAxis] = useState<'EI' | 'SN' | 'TF' | 'JP'>('EI');
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const AXIS_DATA = {
    EI: {
      title: 'Energy Orientation (E ↔ I)',
      color: '#818CF8',
      desc: 'Governs attentional vector flow and mental battery regeneration dynamics.',
      leftPole: { code: 'E', label: 'Extraversion', focus: 'Action in the outer world of people, events, and verbalized stimuli.' },
      rightPole: { code: 'I', label: 'Introversion', focus: 'Internal solitary contemplation in the world of concepts, memories, and ideas.' },
    },
    SN: {
      title: 'Information Intake (S ↔ N)',
      color: '#2DD4BF',
      desc: 'Controls how observational stimuli, empirical data, and patterns are ingested.',
      leftPole: { code: 'S', label: 'Sensing', focus: 'Literal, tangible reality perceived through 5 senses and proven precedent.' },
      rightPole: { code: 'N', label: 'Intuition', focus: 'Latent systemic patterns, abstract symbolism, and long-range future possibilities.' },
    },
    TF: {
      title: 'Decision Formulation (T ↔ F)',
      color: '#38BDF8',
      desc: 'Dictates criteria for valuation, conflict sorting, and causal consequence evaluation.',
      leftPole: { code: 'T', label: 'Thinking', focus: 'Deductive logic, consistency, systems architecture, and impersonal causal criteria.' },
      rightPole: { code: 'F', label: 'Feeling', focus: 'Interpersonal empathy, communal harmony, ethics, and human core values.' },
    },
    JP: {
      title: 'Lifestyle Execution (J ↔ P)',
      color: '#FBBF24',
      desc: 'Determines external structural orientation, closure preference, and temporal cadence.',
      leftPole: { code: 'J', label: 'Judging', focus: 'Deliberate planning, structured regimens, decisive closure, and milestones.' },
      rightPole: { code: 'P', label: 'Perceiving', focus: 'Spontaneous exploration, adaptable emergent pacing, and keeping options open.' },
    },
  };

  const currentAxisInfo = AXIS_DATA[activeAxis];

  const handleKeyPress = (key: string) => {
    playMicroClick(950);
    setPressedKey(key);
    setTimeout(() => setPressedKey(null), 300);
  };

  return (
    <section id="vocational" className="py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.08] relative">
      <div className="hidden sm:block absolute top-8 left-8 text-slate-700 font-mono text-[9px] pointer-events-none select-none">
        + PLATFORM HIGHLIGHTS // OVERVIEW
      </div>
      <div className="hidden sm:block absolute top-8 right-8 text-slate-700 font-mono text-[9px] pointer-events-none select-none">
        + 4 CORE PREFERENCE AXES
      </div>

      {/* Section Header */}
      <div className="max-w-2xl mb-12 sm:mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono font-semibold text-indigo-400 mb-4">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>THOUGHTFUL & ACCESSIBLE BY DESIGN</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Designed for Clarity and Privacy.
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          A transparent self-assessment platform built to give you meaningful personal insights without account walls, external tracking, or unnecessary complexity.
        </p>
      </div>

      {/* Asymmetric Double-Bezel Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ========================================================================= */}
        {/* CARD 1: 4 Bipolar Axes Interactive Explorer (Col-span 8) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 rounded-[2rem] p-1.5 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              {/* Card Header & Axis Switcher Tabs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    CORE PREFERENCE AXES
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">4 Cognitive Dimensions</h3>
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

              {/* Contextual Illustration for Active Axis: Dynamic Isometric Axis Model */}
              <div className="my-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-6">
                {/* SVG Isometric Axis Diagram */}
                <div className="w-52 h-28 relative flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 220 110" className="w-full h-full overflow-visible">
                    {/* Left Pole Isometric Node */}
                    <g className="transition-transform duration-300 hover:scale-105">
                      <polygon points="40,35 65,22 90,35 65,48" fill="rgba(255,255,255,0.06)" stroke={currentAxisInfo.color} strokeWidth="1.2" />
                      <polygon points="40,35 65,48 65,75 40,62" fill="rgba(255,255,255,0.03)" stroke={currentAxisInfo.color} strokeWidth="1" />
                      <polygon points="65,48 90,35 90,62 65,75" fill="rgba(255,255,255,0.02)" stroke={currentAxisInfo.color} strokeWidth="1" />
                      <circle cx="65" cy="35" r="3" fill="#FFFFFF" />
                      <text x="65" y="66" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        {currentAxisInfo.leftPole.code}
                      </text>
                    </g>

                    {/* Connecting Isometric Vector Bridge */}
                    <line x1="85" y1="48" x2="135" y2="48" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="110" y1="36" x2="110" y2="60" stroke={currentAxisInfo.color} strokeWidth="1.5" />
                    <circle cx="110" cy="48" r="4" fill={currentAxisInfo.color} className="animate-pulse" />

                    {/* Right Pole Isometric Node */}
                    <g className="transition-transform duration-300 hover:scale-105">
                      <polygon points="130,35 155,22 180,35 155,48" fill="rgba(255,255,255,0.06)" stroke={currentAxisInfo.color} strokeWidth="1.2" />
                      <polygon points="130,35 155,48 155,75 130,62" fill="rgba(255,255,255,0.03)" stroke={currentAxisInfo.color} strokeWidth="1" />
                      <polygon points="155,48 180,35 180,62 155,75" fill="rgba(255,255,255,0.02)" stroke={currentAxisInfo.color} strokeWidth="1" />
                      <circle cx="155" cy="35" r="3" fill="#FFFFFF" />
                      <text x="155" y="66" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        {currentAxisInfo.rightPole.code}
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Axis Telemetry Breakdown */}
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-mono pb-2 border-b border-white/[0.04]">
                    <span className="text-slate-400">DIMENSION:</span>
                    <span className="font-bold" style={{ color: currentAxisInfo.color }}>
                      {currentAxisInfo.title}
                    </span>
                  </div>
                  <p className="mt-2 text-slate-300 leading-relaxed font-sans">
                    {currentAxisInfo.desc}
                  </p>
                </div>
              </div>

              {/* 2 Opposite Poles Detailed Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

            {/* Bottom Note */}
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Raw score balanced across positive and reversed items
              </span>
              <span>JUNGIAN 1921</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: Zero Database OpEx & Cryptographic Silicon Chip (Col-span 4)      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 rounded-[2rem] p-1.5 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  NO ACCOUNT NEEDED
                </span>
                <span>LOCAL DEVICE</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">100% In-Browser Privacy</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your responses and results are calculated and kept right in your browser. No external database, tracking pixels, or account required.
              </p>

              {/* Contextual Illustration: The Local Device Storage Vault */}
              <div className="my-5 flex items-center justify-center">
                <svg viewBox="0 0 220 100" className="w-full max-w-[200px] h-auto">
                  {/* Browser Window Frame */}
                  <rect x="25" y="15" width="170" height="70" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="25" y1="35" x2="195" y2="35" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <circle cx="40" cy="25" r="2.5" fill="#EF4444" opacity="0.7" />
                  <circle cx="50" cy="25" r="2.5" fill="#F59E0B" opacity="0.7" />
                  <circle cx="60" cy="25" r="2.5" fill="#10B981" opacity="0.7" />
                  <rect x="75" y="21" width="90" height="8" rx="3" fill="rgba(255,255,255,0.06)" />
                  {/* Center Lock Shield */}
                  <circle cx="110" cy="58" r="16" fill="rgba(16,185,129,0.1)" stroke="#10B981" strokeWidth="1" />
                  <path d="M 106 56 L 106 52 A 4 4 0 0 1 114 52 L 114 56" stroke="#10B981" strokeWidth="1.5" fill="none" />
                  <rect x="104" y="56" width="12" height="9" rx="1.5" fill="#10B981" />
                </svg>
              </div>

              {/* Terminal Snippet Box */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-[11px] space-y-1.5">
                <div className="text-slate-400 font-mono">
                  &gt; STORAGE: <span className="text-emerald-400">Browser LocalStorage</span>
                </div>
                <div className="text-slate-400 font-mono">
                  &gt; CLOUD DB: <span className="text-sky-400">None (Not Required)</span>
                </div>
                <div className="text-slate-400 font-mono">
                  &gt; TRACKING: <span className="text-emerald-400">Disabled (0 Cookies)</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Private &amp; Confidential</span>
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: Psychomotor Keyboard Navigation & Tactile Keycaps (Col-span 4)    */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 rounded-[2rem] p-1.5 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <Keyboard className="w-3.5 h-3.5" />
                  KEYBOARD &amp; TOUCH
                </span>
                <span>DESKTOP / MOBILE</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Fast &amp; Distraction-Free</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete questions smoothly using keys 1 through 5 on desktop, or simple touch taps on mobile devices.
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
              Designed for effortless focus
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CARD 4: Academic & Vocational Trajectory Constellation (Col-span 8)       */}
        {/* ========================================================================= */}
        <div id="vocational-taxonomy" className="lg:col-span-8 rounded-[2rem] p-1.5 bg-gradient-to-b from-white/[0.1] to-white/[0.02] border border-white/[0.08] shadow-xl">
          <div className="rounded-[calc(2rem-0.375rem)] bg-[#0B0F19] p-6 sm:p-8 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <GraduationCap className="w-3.5 h-3.5" />
                  VOCATIONAL TAXONOMY
                </span>
                <span>UNESCO ISCED // ILO ISCO</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Connecting Personality to Life Trajectories</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Self-knowledge is most valuable when applied to education and career planning. Watq maps each archetype directly to international academic and occupational frameworks:
              </p>

              {/* Sample Target Trajectory Badges */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  'Computer Science & Software',
                  'Business & Management',
                  'UI/UX & Product Design',
                  'Psychology & Human Resources',
                  'Engineering & Applied Sciences',
                  'Finance & Accounting',
                  'Media & Communications',
                  'Education & Instruction',
                  'Data Analysis & Statistics',
                  'Operations & Logistics'
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
              <span className="text-sky-400">16 Dedicated Archetype Guides</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
