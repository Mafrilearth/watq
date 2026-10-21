'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { WatqFullLogo } from '@/components/brand/WatqLogo';
import { ArrowRight, Sparkles, Menu, X } from 'lucide-react';
import { AssessmentSession } from '@watq/core';
import { playMicroClick } from '@/lib/audio/haptics';

interface FloatingNavProps {
  session: AssessmentSession | null;
}

export function FloatingNav({ session }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const hasCompletedResult = session && session.completedAt && session.result;
  const hasInProgressSession = session && !session.completedAt && session.currentIndex > 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto max-w-5xl mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0F19]/85 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-black/60 py-2.5 px-4 sm:px-5'
            : 'bg-[#0B0F19]/60 backdrop-blur-md border border-white/[0.08] shadow-lg shadow-black/20 py-3 px-4 sm:px-6'
        } flex items-center justify-between gap-4`}
      >
        {/* Brand Link */}
        <Link
          href="/"
          onClick={() => playMicroClick(900)}
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <WatqFullLogo markSize={26} theme="dark" showTagline={false} />
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            1921 TYPOLOGY
          </span>
        </Link>

        {/* Desktop Anchor Links (Linear-style clean typographic nav) */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
          <a
            href="#framework"
            onClick={() => playMicroClick(700)}
            className="hover:text-white transition-colors duration-150"
          >
            Framework
          </a>
          <a
            href="#interactive-demo"
            onClick={() => playMicroClick(750)}
            className="hover:text-white transition-colors duration-150 flex items-center gap-1"
          >
            <span>Runner Demo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          </a>
          <a
            href="#archetypes"
            onClick={() => playMicroClick(800)}
            className="hover:text-white transition-colors duration-150"
          >
            16 Archetypes
          </a>
          <a
            href="#vocational"
            onClick={() => playMicroClick(850)}
            className="hover:text-white transition-colors duration-150"
          >
            Vocational
          </a>
          <Link
            href="/changelog"
            onClick={() => playMicroClick(900)}
            className="hover:text-sky-400 text-slate-400 font-mono transition-colors duration-150"
          >
            v1.1.0
          </Link>
        </div>

        {/* Action Button: Linear-tier Nested Button-in-Button */}
        <div className="flex items-center gap-2">
          {hasCompletedResult ? (
            <Link
              href="/result"
              onClick={() => playMicroClick(1000)}
              className="group inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all duration-200 active:scale-95"
            >
              <span>View Profile ({session.result?.typeCode})</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
            </Link>
          ) : hasInProgressSession ? (
            <Link
              href="/assess"
              onClick={() => playMicroClick(1000)}
              className="group inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-[#090D16] text-xs font-bold shadow-lg shadow-sky-500/25 transition-all duration-200 active:scale-95"
            >
              <span>Resume ({session.currentIndex + 1}/24)</span>
              <span className="w-6 h-6 rounded-full bg-[#090D16]/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-[#090D16]" />
              </span>
            </Link>
          ) : (
            <Link
              href="/assess"
              onClick={() => playMicroClick(1000)}
              className="group inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-white hover:bg-slate-100 text-[#0B0F19] text-xs font-bold shadow-lg shadow-white/10 transition-all duration-200 active:scale-95"
            >
              <span>Start Assessment</span>
              <span className="w-6 h-6 rounded-full bg-[#0B0F19]/10 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-[#0B0F19]" />
              </span>
            </Link>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              playMicroClick(600);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Reveal */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 max-w-sm mx-auto rounded-2xl bg-[#0B0F19]/95 backdrop-blur-2xl border border-white/[0.12] p-5 shadow-2xl space-y-3">
          <div className="flex flex-col gap-2 text-sm text-slate-300 font-medium">
            <a
              href="#framework"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              Cognitive Framework
            </a>
            <a
              href="#interactive-demo"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors flex items-center justify-between"
            >
              <span>Runner Demo</span>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-sky-500/20 text-sky-400">LIVE</span>
            </a>
            <a
              href="#archetypes"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              16 Archetype Matrix
            </a>
            <a
              href="#vocational"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              Vocational Guidance
            </a>
            <Link
              href="/changelog"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-white/[0.05] hover:text-sky-400 font-mono text-xs transition-colors"
            >
              Changelog (v1.1.0)
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
