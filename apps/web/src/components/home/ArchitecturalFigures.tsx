'use client';

import React, { useState } from 'react';
import { playMicroClick } from '@/lib/audio/haptics';

export function ArchitecturalFigures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="framework" className="py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/[0.08] relative">
      {/* Blueprint Corner Registration Marks */}
      <div className="absolute top-6 left-6 text-slate-600 font-mono text-[9px] pointer-events-none select-none">
        + FRAMEWORK // JUNGIAN TYPOLOGY
      </div>
      <div className="absolute top-6 right-6 text-slate-600 font-mono text-[9px] pointer-events-none select-none">
        + 24 STANDARDIZED QUESTIONS
      </div>

      {/* Section Header */}
      <div className="max-w-3xl mb-16 sm:mb-20 text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>HOW IT WORKS // ASSESSMENT METHODOLOGY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-[-0.03em] leading-tight">
          A transparent, well-defined assessment framework.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl font-sans">
          Watq translates Carl Jung&rsquo;s 1921 psychological types into a clear, balanced scoring system that connects your natural preferences to real-world educational and career fields.
        </p>
      </div>

      {/* 3-Column Technical Blueprint Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/[0.08] divide-y md:divide-y-0 md:divide-x divide-white/[0.08] bg-[#070A11]/60 backdrop-blur-sm">
        
        {/* ========================================================================= */}
        {/* SCHEMATIC 01: The Refractive Cognitive Prism Core */}
        {/* ========================================================================= */}
        <div 
          className="group relative p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.02]"
          onMouseEnter={() => {
            setHoveredIndex(1);
            playMicroClick(700);
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Technical Schematic Metadata Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-6 select-none">
            <span className="tracking-widest font-semibold group-hover:text-sky-400 transition-colors">FIGURE 01</span>
            <span className="text-[10px] opacity-70">4 CORE PREFERENCE AXES</span>
          </div>

          {/* Interactive Isometric Blueprint Artwork */}
          <div className="h-64 sm:h-72 flex items-center justify-center relative my-4 overflow-visible">
            {/* Ambient Radial Spotlight */}
            <div className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
              hoveredIndex === 1 ? 'opacity-35 bg-sky-500' : 'opacity-0 bg-transparent'
            }`} />

            <svg
              viewBox="0 0 320 280"
              className="w-full h-full max-w-[280px] overflow-visible transition-transform duration-500 ease-out group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="prism-grad-top" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
                </linearGradient>
                <linearGradient id="prism-beam" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#818CF8" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Blueprint Grid Coordinates & Crosshairs */}
              <path d="M 40 140 L 280 140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 160 40 L 160 240" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
              <text x="45" y="132" fill="rgba(255,255,255,0.2)" fontSize="8" fontFamily="monospace">AXIS_REFRACT_X</text>

              {/* Lower Hexagonal Pedestal */}
              <g className="transition-transform duration-500" style={{ transform: hoveredIndex === 1 ? 'translateY(8px)' : 'translateY(0px)' }}>
                <path d="M 80 190 L 160 235 L 240 190 L 240 175 L 160 130 L 80 175 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                <path d="M 80 190 L 80 205 L 160 250 L 160 235 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                <path d="M 160 235 L 160 250 L 240 205 L 240 190 Z" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
                {/* Internal dashed lines */}
                <path d="M 80 175 L 160 220 L 240 175" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 3" />
              </g>

              {/* Central Geometric Watq Prism Crystal (Floating Hexagonal Monolith) */}
              <g className="transition-transform duration-500" style={{ transform: hoveredIndex === 1 ? 'translateY(-14px)' : 'translateY(0px)' }}>
                {/* Crystal Top Cap */}
                <path 
                  d="M 160 60 L 225 95 L 160 130 L 95 95 Z" 
                  fill="url(#prism-grad-top)" 
                  stroke={hoveredIndex === 1 ? '#38BDF8' : 'rgba(255,255,255,0.5)'} 
                  strokeWidth="1.2" 
                />
                {/* Left Facet */}
                <path 
                  d="M 95 95 L 160 130 L 160 195 L 95 160 Z" 
                  fill="rgba(255,255,255,0.05)" 
                  stroke={hoveredIndex === 1 ? '#38BDF8' : 'rgba(255,255,255,0.35)'} 
                  strokeWidth="1.2" 
                />
                {/* Right Facet */}
                <path 
                  d="M 160 130 L 225 95 L 225 160 L 160 195 Z" 
                  fill="rgba(255,255,255,0.03)" 
                  stroke={hoveredIndex === 1 ? '#38BDF8' : 'rgba(255,255,255,0.35)'} 
                  strokeWidth="1.2" 
                />

                {/* Internal "W" Refractive Facet Lines (Watq Prism DNA) */}
                <path 
                  d="M 125 105 L 140 145 L 160 120 L 180 145 L 195 105" 
                  stroke={hoveredIndex === 1 ? '#38BDF8' : 'rgba(255,255,255,0.4)'} 
                  strokeWidth="1.2" 
                  strokeDasharray={hoveredIndex === 1 ? 'none' : '3 2'}
                />

                {/* Apex Indicator Node */}
                <circle cx="160" cy="60" r="3" fill="#38BDF8" />
                <circle cx="160" cy="60" r="7" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="2 2" className="animate-spin" />

                {/* Refracted Dispersion Light Rays (Active on Hover) */}
                {hoveredIndex === 1 && (
                  <g className="transition-opacity duration-300">
                    <line x1="160" y1="130" x2="265" y2="70" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="4 3" />
                    <line x1="160" y1="130" x2="275" y2="135" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 3" />
                    <line x1="160" y1="130" x2="260" y2="200" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="4 3" />
                    <circle cx="265" cy="70" r="2.5" fill="#818CF8" />
                    <circle cx="275" cy="135" r="2.5" fill="#38BDF8" />
                    <circle cx="260" cy="200" r="2.5" fill="#2DD4BF" />
                  </g>
                )}
              </g>
            </svg>
          </div>

          {/* Technical Caption */}
          <div className="pt-6">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>4 Preference Dimensions</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Your cognitive style is evaluated across 4 foundational dimensions: Energy (E/I), Information (S/N), Decisions (T/F), and Structure (J/P). Each person falls naturally along these spectra rather than into rigid boxes.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCHEMATIC 02: 4-Polar Hypercube Tension Field */}
        {/* ========================================================================= */}
        <div 
          className="group relative p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.02]"
          onMouseEnter={() => {
            setHoveredIndex(2);
            playMicroClick(750);
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Technical Schematic Metadata Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-6 select-none">
            <span className="tracking-widest font-semibold group-hover:text-indigo-400 transition-colors">FIGURE 02</span>
            <span className="text-[10px] opacity-70">BALANCED 5-POINT SCORING</span>
          </div>

          {/* Interactive Isometric Blueprint Artwork */}
          <div className="h-64 sm:h-72 flex items-center justify-center relative my-4 overflow-visible">
            {/* Ambient Radial Spotlight */}
            <div className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
              hoveredIndex === 2 ? 'opacity-35 bg-indigo-500' : 'opacity-0 bg-transparent'
            }`} />

            <svg
              viewBox="0 0 320 280"
              className="w-full h-full max-w-[280px] overflow-visible transition-transform duration-500 ease-out group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Isometric Hypercube Frame (Fine Hairline Wireframe) */}
              <g className="transition-all duration-500">
                {/* Top Outer Diamond */}
                <path d="M 160 45 L 245 95 L 160 145 L 75 95 Z" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                {/* Vertical Struts */}
                <line x1="75" y1="95" x2="75" y2="185" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="245" y1="95" x2="245" y2="185" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="160" y1="145" x2="160" y2="235" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                {/* Bottom Outer Diamond */}
                <path d="M 160 135 L 245 185 L 160 235 L 75 185 Z" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
              </g>

              {/* 4 Intersecting Coordinate Planes (E/I, S/N, T/F, J/P) */}
              {/* Plane 1: Energy Orientation (EI) Vertical Plane */}
              <path 
                d="M 160 70 L 160 210" 
                stroke={hoveredIndex === 2 ? '#818CF8' : 'rgba(255,255,255,0.6)'} 
                strokeWidth="1.8" 
              />
              <circle cx="160" cy="70" r="3.5" fill="#818CF8" />
              <text x="168" y="74" fill="#818CF8" fontSize="9" fontFamily="monospace">E [+]</text>
              <circle cx="160" cy="210" r="3.5" fill="#818CF8" />
              <text x="168" y="214" fill="#818CF8" fontSize="9" fontFamily="monospace">I [-]</text>

              {/* Plane 2: Information Intake (SN) Left Axis */}
              <path 
                d="M 100 110 L 220 170" 
                stroke={hoveredIndex === 2 ? '#2DD4BF' : 'rgba(255,255,255,0.6)'} 
                strokeWidth="1.8" 
              />
              <circle cx="100" cy="110" r="3.5" fill="#2DD4BF" />
              <text x="75" y="108" fill="#2DD4BF" fontSize="9" fontFamily="monospace">S</text>
              <circle cx="220" cy="170" r="3.5" fill="#2DD4BF" />
              <text x="228" y="174" fill="#2DD4BF" fontSize="9" fontFamily="monospace">N</text>

              {/* Plane 3: Decision Formulation (TF) Right Axis */}
              <path 
                d="M 220 110 L 100 170" 
                stroke={hoveredIndex === 2 ? '#38BDF8' : 'rgba(255,255,255,0.6)'} 
                strokeWidth="1.8" 
              />
              <circle cx="220" cy="110" r="3.5" fill="#38BDF8" />
              <text x="228" y="108" fill="#38BDF8" fontSize="9" fontFamily="monospace">T</text>
              <circle cx="100" cy="170" r="3.5" fill="#38BDF8" />
              <text x="82" y="174" fill="#38BDF8" fontSize="9" fontFamily="monospace">F</text>

              {/* Central Vector Intersection Ring */}
              <ellipse 
                cx="160" 
                cy="140" 
                rx="24" 
                ry="12" 
                fill={hoveredIndex === 2 ? 'rgba(129,140,248,0.15)' : 'rgba(255,255,255,0.04)'} 
                stroke={hoveredIndex === 2 ? '#818CF8' : 'rgba(255,255,255,0.5)'} 
                strokeWidth="1" 
              />

              {/* Dynamic Equilibrium Lattice on Hover */}
              {hoveredIndex === 2 && (
                <polygon 
                  points="160,85 205,115 160,190 115,160" 
                  fill="rgba(129,140,248,0.1)" 
                  stroke="#818CF8" 
                  strokeWidth="1.2" 
                  strokeDasharray="3 3"
                />
              )}
            </svg>
          </div>

          {/* Technical Caption */}
          <div className="pt-6">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Balanced Likert Calibration</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Each axis includes 6 paired questions, including reversed items to minimize acquiescence bias. Responses range from Strongly Disagree (1) to Strongly Agree (5) for an accurate, nuanced preference score.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SCHEMATIC 03: Vocational Trajectory Projection Matrix */}
        {/* ========================================================================= */}
        <div 
          className="group relative p-6 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.02]"
          onMouseEnter={() => {
            setHoveredIndex(3);
            playMicroClick(800);
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Technical Schematic Metadata Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-6 select-none">
            <span className="tracking-widest font-semibold group-hover:text-emerald-400 transition-colors">FIGURE 03</span>
            <span className="text-[10px] opacity-70">CAREER & ACADEMIC PATHWAYS</span>
          </div>

          {/* Interactive Isometric Blueprint Artwork */}
          <div className="h-64 sm:h-72 flex items-center justify-center relative my-4 overflow-visible">
            {/* Ambient Radial Spotlight */}
            <div className={`absolute w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
              hoveredIndex === 3 ? 'opacity-35 bg-emerald-500' : 'opacity-0 bg-transparent'
            }`} />

            <svg
              viewBox="0 0 320 280"
              className="w-full h-full max-w-[280px] overflow-visible transition-transform duration-500 ease-out group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Isometric Concentric Polar Radar Grids (Concentric Ellipses in Perspective) */}
              {[18, 38, 58, 78].map((radius, idx) => (
                <ellipse
                  key={idx}
                  cx="160"
                  cy="175"
                  rx={radius * 1.3}
                  ry={radius * 0.65}
                  fill="none"
                  stroke={hoveredIndex === 3 ? 'rgba(45,212,191,0.3)' : 'rgba(255,255,255,0.15)'}
                  strokeWidth="1"
                  strokeDasharray={idx % 2 === 1 ? '3 3' : 'none'}
                />
              ))}

              {/* Radar Radial Spokes */}
              <line x1="160" y1="175" x2="60" y2="175" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 3" />
              <line x1="160" y1="175" x2="260" y2="175" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 3" />
              <line x1="160" y1="175" x2="160" y2="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 3" />
              <line x1="160" y1="175" x2="160" y2="230" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 3" />

              {/* Vertical Trajectory Vectors Rising into the Air (Career Beacons) */}
              {[
                { x: 110, y: 165, h: 55, label: 'ISCO:2511', col: '#38BDF8' },
                { x: 140, y: 145, h: 80, label: 'UNESCO:0613', col: '#818CF8' },
                { x: 185, y: 155, h: 95, label: 'AI_RES', col: '#2DD4BF' },
                { x: 215, y: 175, h: 60, label: 'STRAT_PM', col: '#FBBF24' },
              ].map((beacon, idx) => {
                const targetY = beacon.y - beacon.h;
                const isHovered = hoveredIndex === 3;
                return (
                  <g key={idx} className="transition-all duration-300">
                    {/* Floor anchor node */}
                    <circle cx={beacon.x} cy={beacon.y} r="2.5" fill="rgba(255,255,255,0.4)" />
                    {/* Vertical Beam */}
                    <line 
                      x1={beacon.x} 
                      y1={beacon.y} 
                      x2={beacon.x} 
                      y2={targetY} 
                      stroke={isHovered ? beacon.col : 'rgba(255,255,255,0.4)'} 
                      strokeWidth="1.2" 
                      strokeDasharray="2 2" 
                    />
                    {/* Floating Apex Geometric Marker */}
                    <polygon
                      points={`${beacon.x},${targetY - 6} ${beacon.x + 5},${targetY} ${beacon.x},${targetY + 6} ${beacon.x - 5},${targetY}`}
                      fill={isHovered ? beacon.col : 'rgba(255,255,255,0.1)'}
                      stroke={isHovered ? '#FFFFFF' : 'rgba(255,255,255,0.6)'}
                      strokeWidth="1"
                    />
                    {/* Micro Tag */}
                    <text 
                      x={beacon.x + 8} 
                      y={targetY + 3} 
                      fill={isHovered ? beacon.col : 'rgba(255,255,255,0.4)'} 
                      fontSize="8" 
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {beacon.label}
                    </text>
                  </g>
                );
              })}

              {/* Radar Trajectory Polygon Linking the Apex Nodes */}
              <polygon
                points="110,110 140,65 185,60 215,115"
                fill={hoveredIndex === 3 ? 'rgba(45,212,191,0.08)' : 'rgba(255,255,255,0.02)'}
                stroke={hoveredIndex === 3 ? '#2DD4BF' : 'rgba(255,255,255,0.3)'}
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          {/* Technical Caption */}
          <div className="pt-6">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Educational & Career Pathways</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Personality assessment is most useful when it informs real life. Watq maps your archetype profile to recognized educational programs (UNESCO ISCED) and professional career fields (ILO ISCO).
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
