'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Brain, Compass, Shield, Target, Award } from 'lucide-react';
import { playMicroClick } from '@/lib/audio/haptics';

interface ArchetypePreview {
  code: string;
  title: string;
  temperament: 'Analyst' | 'Diplomat' | 'Sentinel' | 'Explorer';
  color: string;
  tagline: string;
  dominantAxis: string;
  majors: string[];
  careers: string[];
  bars: {
    ei: number; // % Introversion (0 = E, 100 = I)
    sn: number; // % Intuition (0 = S, 100 = N)
    tf: number; // % Thinking (0 = F, 100 = T)
    jp: number; // % Judging (0 = P, 100 = J)
  };
}

const PREVIEW_TYPES: ArchetypePreview[] = [
  {
    code: 'INTJ',
    title: 'The Strategic Architect',
    temperament: 'Analyst',
    color: '#818CF8', // Indigo
    tagline: 'Systemic strategic thinker, independent analytical planner, and structural optimizer.',
    dominantAxis: 'Introverted Intuition (Ni)',
    majors: ['Computer Science (0613)', 'Informatics & Data Science', 'Applied Mathematics (0541)'],
    careers: ['Software Architect (2511)', 'Data Scientist (2521)', 'Systems Analyst (2511)'],
    bars: { ei: 82, sn: 78, tf: 86, jp: 74 },
  },
  {
    code: 'ENTP',
    title: 'The Visionary Explorer',
    temperament: 'Analyst',
    color: '#38BDF8', // Sky
    tagline: 'Lateral problem solver, inventive debater, and cross-disciplinary idea catalyst.',
    dominantAxis: 'Extraverted Intuition (Ne)',
    majors: ['Computer Science (0613)', 'Product Design (0212)', 'Business Entrepreneurship'],
    careers: ['Product Innovation Lead', 'Startup Founder (1120)', 'Technology Strategist'],
    bars: { ei: 28, sn: 84, tf: 72, jp: 32 },
  },
  {
    code: 'INFJ',
    title: 'The Insightful Counselor',
    temperament: 'Diplomat',
    color: '#2DD4BF', // Teal
    tagline: 'Humanistic visionary, thoughtful observer, and supportive personal growth mentor.',
    dominantAxis: 'Introverted Intuition (Ni)',
    majors: ['Psychology (0313)', 'Human-Computer Interaction', 'Cognitive Science'],
    careers: ['UX Strategist (2513)', 'Educational Designer (2351)', 'Organizational Counselor'],
    bars: { ei: 88, sn: 82, tf: 34, jp: 78 },
  },
  {
    code: 'ESTP',
    title: 'The Dynamic Pragmatist',
    temperament: 'Explorer',
    color: '#FBBF24', // Amber
    tagline: 'Agile field executor, tactical problem solver, and composed in high-energy situations.',
    dominantAxis: 'Extraverted Sensing (Se)',
    majors: ['Operations Management', 'Industrial Logistics', 'Business Administration'],
    careers: ['Operations Specialist', 'Crisis Response Lead', 'Project Director'],
    bars: { ei: 22, sn: 26, tf: 80, jp: 28 },
  },
];

export function HeroCognitivePrism() {
  const [activeType, setActiveType] = useState<ArchetypePreview>(PREVIEW_TYPES[0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[250px] sm:h-[400px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Top Tagline Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300 mb-6 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        <span>WATQ // 16 PERSONALITY TYPES // JUNGIAN TYPOLOGY</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-white max-w-4xl mx-auto leading-[1.12] sm:leading-[1.08]">
        Discover Your Personality with Clarity and Depth.
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
        A private, accessible assessment based on Carl Jung&rsquo;s 1921 typology. Answer 24 straightforward questions to explore your preferences across 4 core dimensions and uncover fitting academic and career paths.
      </p>

      {/* Primary CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/assess"
          onClick={() => playMicroClick(1000)}
          className="group relative inline-flex items-center gap-3 pl-7 pr-3 py-3.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-teal-400 text-[#090D16] font-bold text-sm shadow-xl shadow-sky-500/20 hover:shadow-sky-500/35 transition-all duration-200 active:scale-95"
        >
          <span>Start Assessment (3 Min)</span>
          <span className="w-7 h-7 rounded-full bg-[#090D16] text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <a
          href="#interactive-demo"
          onClick={() => playMicroClick(700)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-all"
        >
          <span>Try 30-Second Preview</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </a>
      </div>

      {/* ========================================================================= */}
      {/* THE COGNITIVE PRISM OPTICAL BENCH SIMULATOR (Interactive SVG Apparatus)   */}
      {/* ========================================================================= */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-5xl mx-auto mt-14 sm:mt-20 rounded-[2.2rem] p-1.5 sm:p-2 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden text-left"
      >
        {/* Interactive Cursor Spotlight */}
        <div
          className="pointer-events-none absolute -inset-px opacity-70 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.08), transparent 70%)`,
          }}
        />

        {/* Inner Double-Bezel Card */}
        <div className="relative rounded-[calc(2.2rem-0.5rem)] bg-[#0A0E17]/95 backdrop-blur-xl border border-white/[0.06] p-6 sm:p-10 overflow-hidden">
          {/* Top Control Bar with Archetype Quick-Switcher */}
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-semibold text-slate-300 tracking-wider uppercase">
                Archetype Explorer // 4 Polar Dimensions
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500 mr-1 hidden sm:inline">SELECT ARCHETYPE:</span>
              {PREVIEW_TYPES.map((t) => {
                const isSelected = activeType.code === t.code;
                return (
                  <button
                    key={t.code}
                    onClick={() => {
                      playMicroClick(t.code === 'INTJ' ? 800 : t.code === 'ENTP' ? 900 : 700);
                      setActiveType(t);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-white text-[#0B0F19] shadow-md shadow-white/20 scale-105'
                        : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                    }`}
                  >
                    {t.code}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Centerpiece: The Optical Bench & Spectroscopy Apparatus Grid */}
          <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: High-Tech Technical Isometric Optics Drawing */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[320px]">
              {/* Dynamic Aura Glow */}
              <div
                className="absolute w-72 h-72 rounded-full blur-[110px] opacity-35 transition-colors duration-700 pointer-events-none"
                style={{ backgroundColor: activeType.color }}
              />

              <svg
                viewBox="0 0 520 340"
                className="w-full max-w-[500px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-visible"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Laser Inflow Gradient */}
                  <linearGradient id="laserInflow" x1="0" y1="170" x2="220" y2="170" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                    <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>

                  {/* 4 Polarized Refraction Rays */}
                  <linearGradient id="rayEI" x1="260" y1="160" x2="490" y2="75" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="30%" stopColor="#818CF8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="raySN" x1="260" y1="165" x2="495" y2="130" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="30%" stopColor="#2DD4BF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="rayTF" x1="260" y1="175" x2="495" y2="205" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="rayJP" x1="260" y1="180" x2="490" y2="260" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="30%" stopColor="#FBBF24" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Optical Bench Calibration Grid Baseplate */}
                <path d="M 40 280 L 260 320 L 480 280 L 260 240 Z" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M 40 280 L 40 292 L 260 332 L 260 320 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <path d="M 260 320 L 260 332 L 480 292 L 480 280 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                {/* Millimeter graduation ticks along the bench */}
                {[80, 120, 160, 200, 320, 360, 400, 440].map((tx, idx) => (
                  <line key={idx} x1={tx} y1="288" x2={tx} y2="293" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                ))}

                {/* Left Source: Survey Response Input Housing */}
                <g>
                  {/* Housing Body */}
                  <rect x="20" y="145" width="48" height="50" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
                  <rect x="25" y="150" width="38" height="40" rx="2" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  {/* Collimator Nozzle */}
                  <path d="M 68 162 L 80 166 L 80 174 L 68 178 Z" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                  <circle cx="74" cy="170" r="2" fill="#38BDF8" className="animate-pulse" />
                  <text x="25" y="136" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="monospace">RESPONSES</text>
                </g>

                {/* Incoming Coherent White Induction Beam */}
                <path
                  d="M 80 170 L 220 170"
                  stroke="url(#laserInflow)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <circle cx="220" cy="170" r="3" fill="#FFFFFF" />

                {/* 4 Divergent Output Refraction Rays (Connected to Target Sensors) */}
                {/* Ray 1: Energy (EI) */}
                <path
                  d="M 255 162 Q 330 130 460 75"
                  stroke="url(#rayEI)"
                  strokeWidth={activeType.bars.ei > 50 ? '3' : '1.5'}
                  strokeLinecap="round"
                />
                {/* Ray 2: Information (SN) */}
                <path
                  d="M 258 168 Q 350 150 460 130"
                  stroke="url(#raySN)"
                  strokeWidth={activeType.bars.sn > 50 ? '3' : '1.5'}
                  strokeLinecap="round"
                />
                {/* Ray 3: Decision (TF) */}
                <path
                  d="M 258 172 Q 350 190 460 205"
                  stroke="url(#rayTF)"
                  strokeWidth={activeType.bars.tf > 50 ? '3' : '1.5'}
                  strokeLinecap="round"
                />
                {/* Ray 4: Lifestyle (JP) */}
                <path
                  d="M 255 178 Q 330 210 460 260"
                  stroke="url(#rayJP)"
                  strokeWidth={activeType.bars.jp > 50 ? '3' : '1.5'}
                  strokeLinecap="round"
                />

                {/* Target Sensor Receptor Arrays (Right Column) */}
                {[
                  { y: 75, col: '#818CF8', label: `E/I • ${activeType.bars.ei}%`, sub: 'ENERGY' },
                  { y: 130, col: '#2DD4BF', label: `S/N • ${activeType.bars.sn}%`, sub: 'INTAKE' },
                  { y: 205, col: '#38BDF8', label: `T/F • ${activeType.bars.tf}%`, sub: 'DECISION' },
                  { y: 260, col: '#FBBF24', label: `J/P • ${activeType.bars.jp}%`, sub: 'LIFESTYLE' },
                ].map((sensor, sIdx) => (
                  <g key={sIdx}>
                    {/* Receptor diode housing */}
                    <rect x="460" y={sensor.y - 12} width="40" height="24" rx="3" fill="rgba(255,255,255,0.03)" stroke={sensor.col} strokeWidth="1" />
                    <circle cx="460" cy={sensor.y} r="3" fill={sensor.col} />
                    <text x="466" y={sensor.y - 2} fill={sensor.col} fontSize="7" fontFamily="monospace" fontWeight="bold">
                      {sensor.sub}
                    </text>
                    <text x="466" y={sensor.y + 7} fill="#FFFFFF" fontSize="8" fontFamily="monospace">
                      {sensor.label}
                    </text>
                  </g>
                ))}

                {/* Central Rotating Crystal Prism Stage (The Watq Prism Core) */}
                <g className="transition-transform duration-500 hover:scale-105" style={{ transformOrigin: '240px 170px' }}>
                  {/* Stage Base Ring */}
                  <ellipse cx="240" cy="225" rx="46" ry="16" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 2" />
                  <ellipse cx="240" cy="225" rx="36" ry="12" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="240" y1="225" x2="240" y2="195" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

                  {/* Rear Shadow Face */}
                  <polygon
                    points="240,75 195,215 285,215"
                    fill="#0B0F19"
                    fillOpacity="0.9"
                    stroke="#38BDF8"
                    strokeWidth="1"
                    strokeOpacity="0.3"
                  />

                  {/* Left Refraction Facet */}
                  <polygon
                    points="240,75 195,215 240,195"
                    fill="url(#rayEI)"
                    fillOpacity="0.18"
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="1.2"
                  />

                  {/* Right Dispersion Facet */}
                  <polygon
                    points="240,75 240,195 285,215"
                    fill="url(#rayJP)"
                    fillOpacity="0.22"
                    stroke="rgba(255, 255, 255, 0.55)"
                    strokeWidth="1.2"
                  />

                  {/* Central Engraved "W" Refractive Facet (Watq Brand Core) */}
                  <path
                    d="M 215 130 L 226 175 L 240 150 L 254 175 L 265 130"
                    stroke={activeType.color}
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Apex Focal Node */}
                  <circle cx="240" cy="75" r="3.5" fill="#FFFFFF" />
                  <circle cx="240" cy="75" r="7" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="2 2" className="animate-spin" />
                </g>
              </svg>

              <div className="flex items-center gap-4 mt-3 text-[10px] font-mono text-slate-500">
                <span>24 LIKERT ITEMS</span>
                <span>•</span>
                <span>4 BIPOLAR DIMENSIONS</span>
                <span>•</span>
                <span>100% IN-BROWSER SCORING</span>
              </div>
            </div>

            {/* Right Col: Live Archetype Telemetry Card */}
            <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${activeType.color}15`,
                      color: activeType.color,
                      border: `1px solid ${activeType.color}35`,
                    }}
                  >
                    {activeType.temperament} Class
                  </span>
                  <span className="text-xl font-mono font-extrabold text-white tracking-wider">
                    {activeType.code}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {activeType.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans">
                  {activeType.tagline}
                </p>

                {/* 4 Vector Sliders */}
                <div className="mt-5 space-y-2.5 pt-4 border-t border-white/[0.06]">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                      <span>Introversion (I)</span>
                      <span className="font-bold text-indigo-400">{activeType.bars.ei}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${activeType.bars.ei}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                      <span>Intuition (N)</span>
                      <span className="font-bold text-teal-400">{activeType.bars.sn}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full bg-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${activeType.bars.sn}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                      <span>Thinking (T)</span>
                      <span className="font-bold text-sky-400">{activeType.bars.tf}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full bg-sky-400 rounded-full transition-all duration-500"
                        style={{ width: `${activeType.bars.tf}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-slate-300 mb-1">
                      <span>Judging (J)</span>
                      <span className="font-bold text-amber-400">{activeType.bars.jp}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${activeType.bars.jp}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Lead Cognitive Function */}
                <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">DOMINANT FUNCTION:</span>
                  <span className="text-white font-semibold">{activeType.dominantAxis}</span>
                </div>
              </div>

              {/* Bottom Trajectories */}
              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                  Top Vocational Trajectories (ILO ISCO-08)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeType.careers.map((career, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-slate-300"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
