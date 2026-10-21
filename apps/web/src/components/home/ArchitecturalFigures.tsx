'use client';

import React, { useState } from 'react';
import { playMicroClick } from '@/lib/audio/haptics';

export function ArchitecturalFigures() {
  const [hoveredFig, setHoveredFig] = useState<number | null>(null);

  return (
    <section id="framework" className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/[0.08] relative">
      {/* Background blueprint grid watermark */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Section Header (Linear Typographic Style) */}
      <div className="max-w-3xl mb-16 sm:mb-20 text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>SPECIFICATION // SYSTEM ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight">
          Architectural rigor for decoding human cognition.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
          Engineered on Carl Jung&rsquo;s 1921 foundational psychological types. Eliminating commercial psychometric ambiguity through deterministic client-side mathematics.
        </p>
      </div>

      {/* 3-Column Technical Wireframe Grid (Direct Linear FIG 0.1, FIG 0.2, FIG 0.3 Paradigm) */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/[0.08] divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
        
        {/* ============================================================== */}
        {/* FIG 0.1: The Stratified Aperture Plates (Purpose-built) */}
        {/* ============================================================== */}
        <div 
          className="group relative p-6 sm:p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.015]"
          onMouseEnter={() => {
            setHoveredFig(1);
            playMicroClick(700);
          }}
          onMouseLeave={() => setHoveredFig(null)}
        >
          {/* Technical Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-8 select-none">
            <span className="tracking-widest font-semibold group-hover:text-sky-400 transition-colors">FIG 0.1</span>
            <span className="text-[10px] opacity-60">STRATA // APERTURE</span>
          </div>

          {/* Interactive Isometric SVG Artwork */}
          <div className="h-64 sm:h-72 flex items-center justify-center relative my-4 overflow-visible">
            {/* Ambient Radial Spotlight */}
            <div className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
              hoveredFig === 1 ? 'opacity-30 bg-sky-500' : 'opacity-0 bg-transparent'
            }`} />

            <svg
              viewBox="0 0 320 280"
              className="w-full h-full max-w-[280px] overflow-visible transition-transform duration-500 ease-out group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="fig1-fill-top" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="fig1-fill-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Layer 4: Base Foundation Slab */}
              <g className="transition-transform duration-500 ease-out" style={{ transform: hoveredFig === 1 ? 'translateY(14px)' : 'translateY(0px)' }}>
                {/* Bottom face */}
                <path d="M 60 190 L 160 240 L 260 190 L 160 140 Z" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <path d="M 60 190 L 60 205 L 160 255 L 160 240 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <path d="M 160 240 L 160 255 L 260 205 L 260 190 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                {/* Internal dashed construction line */}
                <path d="M 60 190 L 160 140 L 260 190" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />
              </g>

              {/* Layer 3: Tertiary Slab */}
              <g className="transition-transform duration-500 ease-out" style={{ transform: hoveredFig === 1 ? 'translateY(5px)' : 'translateY(0px)' }}>
                <path d="M 60 165 L 160 215 L 260 165 L 160 115 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                <path d="M 60 165 L 60 178 L 160 228 L 160 215 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <path d="M 160 215 L 160 228 L 260 178 L 260 165 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              </g>

              {/* Layer 2: Auxiliary Slab */}
              <g className="transition-transform duration-500 ease-out" style={{ transform: hoveredFig === 1 ? 'translateY(-6px)' : 'translateY(0px)' }}>
                <path d="M 60 140 L 160 190 L 260 140 L 160 90 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <path d="M 60 140 L 60 152 L 160 202 L 160 190 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                <path d="M 160 190 L 160 202 L 260 152 L 260 140 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              </g>

              {/* Layer 1: Dominant Top Slab with Center Circular Aperture (Direct Linear Reference) */}
              <g className="transition-transform duration-500 ease-out" style={{ transform: hoveredFig === 1 ? 'translateY(-20px)' : 'translateY(0px)' }}>
                {/* Main Plate */}
                <path 
                  d="M 60 115 L 160 165 L 260 115 L 160 65 Z" 
                  fill="url(#fig1-fill-top)" 
                  stroke={hoveredFig === 1 ? '#38BDF8' : 'rgba(255,255,255,0.45)'} 
                  strokeWidth="1.2" 
                />
                <path d="M 60 115 L 60 128 L 160 178 L 160 165 Z" fill="rgba(255,255,255,0.06)" stroke={hoveredFig === 1 ? '#38BDF8' : 'rgba(255,255,255,0.35)'} strokeWidth="1.2" />
                <path d="M 160 165 L 160 178 L 260 128 L 260 115 Z" fill="rgba(255,255,255,0.04)" stroke={hoveredFig === 1 ? '#38BDF8' : 'rgba(255,255,255,0.35)'} strokeWidth="1.2" />

                {/* Central Aperture Ellipse (Engraved Cutout) */}
                <ellipse 
                  cx="160" 
                  cy="115" 
                  rx="48" 
                  ry="24" 
                  fill="url(#fig1-fill-cyan)" 
                  stroke={hoveredFig === 1 ? '#38BDF8' : 'rgba(255,255,255,0.6)'} 
                  strokeWidth="1.2" 
                />

                {/* Interior Grating / Refractive Lines inside the Aperture */}
                <path d="M 124 110 L 196 110" stroke={hoveredFig === 1 ? '#38BDF8' : 'rgba(255,255,255,0.4)'} strokeWidth="1" />
                <path d="M 118 115 L 202 115" stroke={hoveredFig === 1 ? '#38BDF8' : 'rgba(255,255,255,0.5)'} strokeWidth="1" />
                <path d="M 124 120 L 196 120" stroke={hoveredFig === 1 ? '#38BDF8' : 'rgba(255,255,255,0.4)'} strokeWidth="1" />
                <path d="M 134 125 L 186 125" stroke={hoveredFig === 1 ? '#38BDF8' : 'rgba(255,255,255,0.3)'} strokeWidth="1" />

                {/* Vertical Optical Ray when hovered */}
                {hoveredFig === 1 && (
                  <line 
                    x1="160" 
                    y1="115" 
                    x2="160" 
                    y2="25" 
                    stroke="#38BDF8" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                )}
              </g>
            </svg>
          </div>

          {/* Technical Copy Block */}
          <div className="pt-6">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Purpose-built</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Watq is shaped by the empirical principles of Jungian cognitive function theory. Structured into 4 stratified depth layers rather than superficial pop-psychology labels.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FIG 0.2: The 4 Bipolar Vector Monoliths (Powered by agents) */}
        {/* ============================================================== */}
        <div 
          className="group relative p-6 sm:p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.015]"
          onMouseEnter={() => {
            setHoveredFig(2);
            playMicroClick(750);
          }}
          onMouseLeave={() => setHoveredFig(null)}
        >
          {/* Technical Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-8 select-none">
            <span className="tracking-widest font-semibold group-hover:text-indigo-400 transition-colors">FIG 0.2</span>
            <span className="text-[10px] opacity-60">MONOLITHS // 4 VECTORS</span>
          </div>

          {/* Interactive Isometric SVG Artwork */}
          <div className="h-64 sm:h-72 flex items-center justify-center relative my-4 overflow-visible">
            {/* Ambient Radial Spotlight */}
            <div className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
              hoveredFig === 2 ? 'opacity-30 bg-indigo-500' : 'opacity-0 bg-transparent'
            }`} />

            <svg
              viewBox="0 0 320 280"
              className="w-full h-full max-w-[280px] overflow-visible transition-transform duration-500 ease-out group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Pillar 1: Back Top (Energy E/I) */}
              <g className="transition-all duration-500 ease-out">
                {/* Top face */}
                <path 
                  d="M 160 55 L 205 78 L 160 101 L 115 78 Z" 
                  fill="rgba(255,255,255,0.06)" 
                  stroke={hoveredFig === 2 ? '#818CF8' : 'rgba(255,255,255,0.45)'} 
                  strokeWidth="1.2" 
                />
                {/* Left face */}
                <path d="M 115 78 L 115 155 L 160 178 L 160 101 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                {/* Right face */}
                <path d="M 160 101 L 160 178 L 205 155 L 205 78 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                {/* Center Node Target */}
                <circle cx="160" cy="78" r="3" fill="#818CF8" />
              </g>

              {/* Pillar 2: Left Middle (Perception S/N) */}
              <g className="transition-all duration-500 ease-out">
                {/* Top face */}
                <path 
                  d="M 95 105 L 140 128 L 95 151 L 50 128 Z" 
                  fill="rgba(255,255,255,0.07)" 
                  stroke={hoveredFig === 2 ? '#2DD4BF' : 'rgba(255,255,255,0.45)'} 
                  strokeWidth="1.2" 
                />
                <path d="M 50 128 L 50 205 L 95 228 L 95 151 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                <path d="M 95 151 L 95 228 L 140 205 L 140 128 Z" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                <circle cx="95" cy="128" r="3" fill="#2DD4BF" />
              </g>

              {/* Pillar 3: Right Middle (Judgment T/F) */}
              <g className="transition-all duration-500 ease-out">
                {/* Top face */}
                <path 
                  d="M 225 90 L 270 113 L 225 136 L 180 113 Z" 
                  fill="rgba(255,255,255,0.07)" 
                  stroke={hoveredFig === 2 ? '#38BDF8' : 'rgba(255,255,255,0.45)'} 
                  strokeWidth="1.2" 
                />
                <path d="M 180 113 L 180 215 L 225 238 L 225 136 Z" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                <path d="M 225 136 L 225 238 L 270 215 L 270 113 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                <circle cx="225" cy="113" r="3" fill="#38BDF8" />
              </g>

              {/* Pillar 4: Front Center (Lifestyle J/P) */}
              <g className="transition-all duration-500 ease-out">
                {/* Top face */}
                <path 
                  d="M 160 160 L 205 183 L 160 206 L 115 183 Z" 
                  fill="rgba(255,255,255,0.09)" 
                  stroke={hoveredFig === 2 ? '#FBBF24' : 'rgba(255,255,255,0.5)'} 
                  strokeWidth="1.2" 
                />
                <path d="M 115 183 L 115 235 L 160 258 L 160 206 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.32)" strokeWidth="1" />
                <path d="M 160 206 L 160 258 L 205 235 L 205 183 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.32)" strokeWidth="1" />
                <circle cx="160" cy="183" r="3" fill="#FBBF24" />
              </g>

              {/* Connecting Vector Coordinates on Hover */}
              {hoveredFig === 2 && (
                <g className="transition-opacity duration-300">
                  <path d="M 160 78 L 95 128 L 160 183 L 225 113 Z" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="160" y1="78" x2="160" y2="183" stroke="#818CF8" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="95" y1="128" x2="225" y2="113" stroke="#2DD4BF" strokeWidth="1" strokeDasharray="2 2" />
                </g>
              )}
            </svg>
          </div>

          {/* Technical Copy Block */}
          <div className="pt-6">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Deductive Vector Space</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              4 autonomous bipolar coordinates calculate real-time psychomotor tension. Zero subjective rounding; results converge into 1 of 16 unambiguous archetype vectors.
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FIG 0.3: The Stepped Vocational Array Fins (Designed for speed) */}
        {/* ============================================================== */}
        <div 
          className="group relative p-6 sm:p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.015]"
          onMouseEnter={() => {
            setHoveredFig(3);
            playMicroClick(800);
          }}
          onMouseLeave={() => setHoveredFig(null)}
        >
          {/* Technical Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-8 select-none">
            <span className="tracking-widest font-semibold group-hover:text-emerald-400 transition-colors">FIG 0.3</span>
            <span className="text-[10px] opacity-60">DISPERSION // ACCELERATION</span>
          </div>

          {/* Interactive Isometric SVG Artwork */}
          <div className="h-64 sm:h-72 flex items-center justify-center relative my-4 overflow-visible">
            {/* Ambient Radial Spotlight */}
            <div className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
              hoveredFig === 3 ? 'opacity-30 bg-emerald-500' : 'opacity-0 bg-transparent'
            }`} />

            <svg
              viewBox="0 0 320 280"
              className="w-full h-full max-w-[280px] overflow-visible transition-transform duration-500 ease-out group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stepped Isometric Vertical Louvers / Fins (Identical to Linear Fig 0.3) */}
              {[
                { x: 50, y: 175, h: 22 },
                { x: 68, y: 165, h: 32 },
                { x: 86, y: 155, h: 44 },
                { x: 104, y: 145, h: 58 },
                { x: 122, y: 135, h: 74 },
                { x: 140, y: 125, h: 92 },
                { x: 158, y: 115, h: 112 },
                { x: 176, y: 105, h: 134 },
                { x: 194, y: 95, h: 158 },
                { x: 212, y: 85, h: 184 },
              ].map((fin, idx) => {
                const isHovered = hoveredFig === 3;
                const waveOffset = isHovered ? Math.sin((idx / 9) * Math.PI) * 12 : 0;
                const finY = fin.y - waveOffset;
                const strokeCol = isHovered 
                  ? (idx >= 6 ? '#2DD4BF' : '#38BDF8')
                  : 'rgba(255,255,255,0.45)';

                return (
                  <g key={idx} className="transition-all duration-300">
                    {/* Front blade top cap */}
                    <path
                      d={`M ${fin.x} ${finY} L ${fin.x + 12} ${finY + 6} L ${fin.x + 8} ${finY + 8} L ${fin.x - 4} ${finY + 2} Z`}
                      fill="rgba(255,255,255,0.12)"
                      stroke={strokeCol}
                      strokeWidth="1"
                    />
                    {/* Front vertical face */}
                    <path
                      d={`M ${fin.x - 4} ${finY + 2} L ${fin.x + 8} ${finY + 8} L ${fin.x + 8} ${finY + fin.h + 8} L ${fin.x - 4} ${finY + fin.h + 2} Z`}
                      fill="rgba(255,255,255,0.035)"
                      stroke={strokeCol}
                      strokeWidth="1"
                    />
                    {/* Side vertical face */}
                    <path
                      d={`M ${fin.x + 8} ${finY + 8} L ${fin.x + 12} ${finY + 6} L ${fin.x + 12} ${finY + fin.h + 6} L ${fin.x + 8} ${finY + fin.h + 8} Z`}
                      fill="rgba(255,255,255,0.06)"
                      stroke={strokeCol}
                      strokeWidth="1"
                    />
                  </g>
                );
              })}

              {/* Base Horizon Track */}
              <line x1="40" y1="205" x2="235" y2="95" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Technical Copy Block */}
          <div className="pt-6">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Designed for Speed</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              24 questions executed in ~3 minutes. Real-time client execution instantly delivers actionable ILO ISCO-08 vocational trajectories and UNESCO university majors.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
