'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

/**
 * Current release announcement version identifier.
 * Incrementing this version string (e.g., to 'watq_release_v1_1')
 * will automatically prompt users once more with the new update highlights.
 */
const CURRENT_ANNOUNCEMENT_KEY = 'watq_announcement_seen_v1_1';

export function WhatsNewModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = localStorage.getItem(CURRENT_ANNOUNCEMENT_KEY);
      if (!hasSeen) {
        // Subtle entrance buffer (800ms) to ensure page render stabilizes
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access fallback (e.g., incognito privacy restrictions)
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(CURRENT_ANNOUNCEMENT_KEY, 'true');
    } catch {
      // Silently handle quota or disabled storage
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div 
        className="relative w-full max-w-lg p-6 sm:p-8 bg-[#0F172A] border border-white/[0.12] rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Refraction Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-3xl pointer-events-none -z-0" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          aria-label="Close Announcement"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Announcement Header */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHAT&apos;S NEW // V1.1 RELEASE</span>
          </div>

          <h2 id="modal-headline" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Welcome to Watq v1.1
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
            Experience the redesigned interactive landing page, sample question sandbox, and 16 archetype matrix explorer.
          </p>

          {/* Feature Highlights Grid */}
          <div className="mt-5 space-y-3 sm:space-y-3.5 border-y border-white/[0.08] py-4 sm:py-5">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-snug">
                <strong className="text-white">Interactive Archetype Prism:</strong> Explore how 24 answers map across 4 bipolar dimensions into 16 archetypes.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-snug">
                <strong className="text-white">Sample Question Sandbox:</strong> Try an interactive 5-point Likert question with instant preference calculation.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-snug">
                <strong className="text-white">16 Archetype Catalog:</strong> Filter and search all 16 Jungian profiles with cognitive stack inspectors.
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-snug">
                <strong className="text-white">100% In-Browser Privacy:</strong> Zero signups, zero database storage, zero trackers. Your responses never leave your device.
              </div>
            </div>
          </div>

          {/* Dismiss Action */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={handleDismiss}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#38BDF8] text-[#090D16] font-bold text-sm hover:bg-[#7DD3FC] transition-all shadow-lg shadow-sky-500/20 active:scale-[0.99]"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/changelog"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all"
            >
              <span>Full Changelog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
