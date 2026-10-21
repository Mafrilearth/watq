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
    title: 'The Mastermind Architect',
    temperament: 'Analyst',
    color: '#818CF8', // Indigo
    tagline: 'Strategic vision powered by systematic deductive architecture.',
    dominantAxis: 'Introverted Intuition (Ni)',
    majors: ['Computer Science & AI', 'Theoretical Physics', 'Quantitative Finance'],
    careers: ['Enterprise Architect', 'AI Research Scientist', 'Algorithm Engineer'],
    bars: { ei: 82, sn: 78, tf: 86, jp: 74 },
  },
  {
    code: 'ENTP',
    title: 'The Visionary Catalyst',
    temperament: 'Analyst',
    color: '#38BDF8', // Sky
    tagline: 'Rapid combinatorial problem solving through irreverent curiosity.',
    dominantAxis: 'Extraverted Intuition (Ne)',
    majors: ['Software Entrepreneurship', 'Cognitive Systems', 'Economics & Policy'],
    careers: ['Venture Founder', 'Product Strategist', 'Innovation Director'],
    bars: { ei: 28, sn: 84, tf: 72, jp: 32 },
  },
  {
    code: 'INFJ',
    title: 'The Insightful Sage',
    temperament: 'Diplomat',
    color: '#2DD4BF', // Teal
    tagline: 'Profound humanistic foresight directed toward transformative purpose.',
    dominantAxis: 'Introverted Intuition (Ni)',
    majors: ['Organizational Psychology', 'Philosophy of Mind', 'Bioethics'],
    careers: ['Executive Coach', 'Human Rights Counsel', 'Psychotherapist'],
    bars: { ei: 88, sn: 82, tf: 34, jp: 78 },
  },
  {
    code: 'ESTP',
    title: 'The Tactical Pragmatist',
    temperament: 'Explorer',
    color: '#FBBF24', // Amber
    tagline: 'Decisive real-time spatial awareness and sensory problem exploitation.',
    dominantAxis: 'Extraverted Sensing (Se)',
    majors: ['Aerospace Operations', 'Emergency Medicine', 'Financial Trading'],
    careers: ['High-Frequency Trader', 'Crisis Manager', 'Aviation Captain'],
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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-5xl mx-auto mt-12 sm:mt-16 rounded-[2.2rem] p-1.5 sm:p-2 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/[0.08] shadow-2xl shadow-black/80 overflow-hidden"
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-70 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(56, 189, 248, 0.08), transparent 70%)`,
        }}
      />

      {/* Inner Core Container (Double-Bezel Design) */}
      <div className="relative rounded-[calc(2.2rem-0.5rem)] bg-[#0B0F19]/95 backdrop-blur-xl border border-white/[0.06] p-6 sm:p-10 overflow-hidden">
        {/* Subtle Background Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Control Bar with Archetype Quick-Switcher */}
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-slate-300 tracking-wider uppercase">
              Interactive Cognitive Prism Simulator
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400 mr-1 hidden sm:inline">Preview Archetype:</span>
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

        {/* Centerpiece: Interactive Visual Prism & Dynamic Spectroscopy Grid */}
        <div className="relative z-10 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: The Architectural Cognitive Prism SVG Graphic */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[300px]">
            {/* Dynamic Glow Aura behind Prism */}
            <div
              className="absolute w-72 h-72 rounded-full blur-[100px] opacity-40 transition-colors duration-700 pointer-events-none"
              style={{ backgroundColor: activeType.color }}
            />

            {/* Kinetic Vector Prism Artwork */}
            <svg
              viewBox="0 0 500 320"
              className="w-full max-w-[480px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Laser Ray Gradient */}
                <linearGradient id="whiteLaser" x1="0" y1="160" x2="200" y2="160" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
                </linearGradient>

                {/* 4 Chromatic Beam Gradients */}
                <linearGradient id="beamEnergy" x1="260" y1="150" x2="480" y2="70" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#818CF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="beamInfo" x1="260" y1="155" x2="490" y2="120" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#2DD4BF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="beamDecision" x1="260" y1="165" x2="490" y2="190" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
                </linearGradient>

                <linearGradient id="beamLifestyle" x1="260" y1="170" x2="480" y2="245" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Incoming Coherent White Light Beam */}
              <path
                d="M 20 160 L 220 160"
                stroke="url(#whiteLaser)"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="animate-pulse"
              />
              <text x="30" y="145" fill="#94A3B8" fontSize="10" fontFamily="monospace" letterSpacing="1">
                RAW COGNITIVE INTAKE
              </text>

              {/* 4 Refracted Dispersion Beams */}
              {/* Axis 1: Energy (E/I) */}
              <path
                d="M 245 150 Q 320 120 480 70"
                stroke="url(#beamEnergy)"
                strokeWidth={activeType.bars.ei > 50 ? '4' : '2'}
                strokeLinecap="round"
                opacity={activeType.bars.ei > 50 ? '1' : '0.4'}
              />
              <circle cx="480" cy="70" r="3.5" fill="#818CF8" />
              <text x="360" y="65" fill="#818CF8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                E/I • INTROVERSION ({activeType.bars.ei}%)
              </text>

              {/* Axis 2: Information (S/N) */}
              <path
                d="M 252 155 Q 340 140 490 120"
                stroke="url(#beamInfo)"
                strokeWidth={activeType.bars.sn > 50 ? '4' : '2'}
                strokeLinecap="round"
                opacity={activeType.bars.sn > 50 ? '1' : '0.4'}
              />
              <circle cx="490" cy="120" r="3.5" fill="#2DD4BF" />
              <text x="375" y="115" fill="#2DD4BF" fontSize="10" fontFamily="monospace" fontWeight="bold">
                S/N • INTUITION ({activeType.bars.sn}%)
              </text>

              {/* Axis 3: Decision (T/F) */}
              <path
                d="M 252 165 Q 340 175 490 190"
                stroke="url(#beamDecision)"
                strokeWidth={activeType.bars.tf > 50 ? '4' : '2'}
                strokeLinecap="round"
                opacity={activeType.bars.tf > 50 ? '1' : '0.4'}
              />
              <circle cx="490" cy="190" r="3.5" fill="#38BDF8" />
              <text x="375" y="208" fill="#38BDF8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                T/F • THINKING ({activeType.bars.tf}%)
              </text>

              {/* Axis 4: Lifestyle (J/P) */}
              <path
                d="M 245 170 Q 320 200 480 245"
                stroke="url(#beamLifestyle)"
                strokeWidth={activeType.bars.jp > 50 ? '4' : '2'}
                strokeLinecap="round"
                opacity={activeType.bars.jp > 50 ? '1' : '0.4'}
              />
              <circle cx="480" cy="245" r="3.5" fill="#FBBF24" />
              <text x="360" y="260" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold">
                J/P • JUDGING ({activeType.bars.jp}%)
              </text>

              {/* The Crystal Prism Body (Hexagonal / Triangular Facets) */}
              <g className="transition-transform duration-500 hover:scale-105" transform-origin="240 160">
                {/* Rear Shadow Face */}
                <polygon
                  points="240,70 190,250 290,250"
                  fill="#0B0F19"
                  fillOpacity="0.85"
                  stroke="#38BDF8"
                  strokeWidth="1"
                  strokeOpacity="0.25"
                />

                {/* Left Refraction Facet */}
                <polygon
                  points="240,70 190,250 240,230"
                  fill="url(#beamEnergy)"
                  fillOpacity="0.15"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1.2"
                />

                {/* Right Dispersion Facet */}
                <polygon
                  points="240,70 240,230 290,250"
                  fill="url(#beamLifestyle)"
                  fillOpacity="0.2"
                  stroke="rgba(255, 255, 255, 0.5)"
                  strokeWidth="1.2"
                />

                {/* Core Prism Crest Highlight */}
                <line x1="240" y1="70" x2="240" y2="230" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
              </g>
            </svg>

            <p className="mt-3 text-[11px] font-mono text-slate-400 text-center">
              Figure 1: Refraction of human cognition into 4 discrete mathematical vectors.
            </p>
          </div>

          {/* Right: Live Archetype Profile Telemetry Card */}
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

              {/* Vocational Guidance Snippet */}
              <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Target Trajectories:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeType.careers.map((career) => (
                    <span
                      key={career}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[11px] text-slate-200 font-mono border border-white/[0.06]"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Link to Start Full Diagnostic */}
            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <Link
                href="/assess"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-white transition-all border border-white/[0.1] active:scale-[0.98]"
              >
                <span>Discover Your Precise Type</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
