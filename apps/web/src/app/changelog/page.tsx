import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  Layers,
  Compass,
  Cpu
} from 'lucide-react';
import { WatqFullLogo } from '@/components/brand/WatqLogo';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Transparent release history, psychometric engine updates, and architectural calibrations for the Watq Cognitive Typology Platform.',
  alternates: {
    canonical: 'https://watq.mafrilearth.com/changelog',
  },
  openGraph: {
    title: 'Platform Changelog | Watq',
    description:
      'Explore all releases, feature additions, and psychometric refinements of the Watq cognitive assessment platform.',
    url: 'https://watq.mafrilearth.com/changelog',
    siteName: 'Watq',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#090D16]/80 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          <Link href="/" className="transition-opacity hover:opacity-90">
            <WatqFullLogo markSize={32} theme="dark" showTagline={true} />
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back Home</span>
            </Link>
            <Link
              href="/assess"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#38BDF8] text-[#090D16] font-bold text-xs hover:bg-[#7DD3FC] transition-all shadow-md shadow-sky-500/20 active:scale-[0.98]"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="relative border-b border-white/[0.06] bg-gradient-to-b from-sky-500/[0.04] via-transparent to-transparent py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RELEASE ARCHIVE // SEMVER 2.0.0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Platform Changelog
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            A comprehensive record of psychometric calibrations, architectural updates, and user experience refinements across every release of the Watq platform.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Current Release</span>
              <span className="text-sm font-bold text-sky-400 font-mono mt-0.5 block">v1.1.0</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Standard</span>
              <span className="text-sm font-semibold text-slate-200 mt-0.5 block">SemVer 2.0.0</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Architecture</span>
              <span className="text-sm font-semibold text-slate-200 mt-0.5 block">100% Client-Side</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Privacy Model</span>
              <span className="text-sm font-semibold text-emerald-400 mt-0.5 block">Zero Telemetry</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Release Stream */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 w-full">
        <div className="space-y-12 sm:space-y-16">

          {/* RELEASE v1.1.0 */}
          <article className="relative pl-6 sm:pl-8 border-l-2 border-sky-500/40 pb-2">
            {/* Timeline Marker */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#090D16] border-2 border-sky-400 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            </div>

            {/* Header & Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-300 font-mono font-bold text-xs">
                v1.1.0
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-semibold">
                LATEST
              </span>
              <time className="text-xs font-mono text-slate-400">
                October 21, 2026
              </time>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Monorepo Architecture, Landing Redesign &amp; Interactive Typology
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Major milestone release introducing a high-performance modular core engine, complete web landing page redesign with clean spacious layouts, interactive cognitive archetype explorer, and realistic vocational trajectory mappings.
            </p>

            {/* Section: Added */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Added</span>
              </div>
              <ul className="space-y-2.5 pl-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Modular Architecture:</strong> Turbo and pnpm workspace setup integrating <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">@watq/core</code> with the <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">@watq/web</code> Next.js application.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Interactive Cognitive Archetype Explorer:</strong> Visual refraction demonstration showing how 24 questionnaire responses map across 4 bipolar dimensions.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Sample Question Sandbox:</strong> Interactive 5-point Likert question runner demonstrating instant preference feedback and hotkeys.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">16 Archetype Interactive Catalog:</strong> Full-spectrum matrix of all 16 Jungian types with search and detail modal inspector.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section: Refined */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>Refined &amp; Polished</span>
              </div>
              <ul className="space-y-2.5 pl-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Spacious &amp; Clean Layout:</strong> Standardized uniform 6xl container gutters, eliminated negative margins, and eliminated horizontal overflow on small viewports.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Realistic &amp; Honest Copywriting:</strong> Grounded all descriptions in practical psychometric and educational reality.
                  </span>
                </li>
              </ul>
            </div>
          </article>

          {/* RELEASE v1.0.1 */}
          <article className="relative pl-6 sm:pl-8 border-l-2 border-white/[0.12] pb-2">
            {/* Timeline Marker */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#090D16] border-2 border-white/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>

            {/* Header & Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/[0.12] text-slate-300 font-mono font-bold text-xs">
                v1.0.1
              </span>
              <time className="text-xs font-mono text-slate-400">
                October 21, 2026
              </time>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Maintenance, Container Alignment &amp; Search Engine Infrastructure
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Stabilization release introducing full dynamic SEO infrastructure, viewport scroll behavior stabilization on report generation, and layout container width harmonization across all viewports.
            </p>

            {/* Section: Added */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Added</span>
              </div>
              <ul className="space-y-2.5 pl-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Dynamic SEO Infrastructure:</strong> Implemented Next.js MetadataRoute handlers for <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">/sitemap.xml</code>, <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">/robots.txt</code>, and <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">/manifest.webmanifest</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Schema.org Structured Data:</strong> Embedded JSON-LD schema definitions (<code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">SoftwareApplication</code> &amp; <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">EducationalOrganization</code>) in the root HTML header for enhanced rich search snippets.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Web Changelog Interface:</strong> Dedicated <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">/changelog</code> route offering transparent visibility into psychometric iterations and engineering updates.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Google Search Console Verification:</strong> Configured head meta verification tags and authoritative DNS TXT records.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section: Fixed & Refined */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>Fixed &amp; Refined</span>
              </div>
              <ul className="space-y-2.5 pl-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Result Container Width Alignment:</strong> Harmonized the <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">&lt;main&gt;</code> container on <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">/result</code> from <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">max-w-4xl</code> to <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">max-w-5xl</code>, completely eliminating horizontal offside gaps against the sticky navigation header.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Instant Viewport Scroll Restoration:</strong> Injected an immediate <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">window.scrollTo(0, 0)</code> hook on result page mount to prevent jarring lower-viewport scroll locks inherited from the assessment runner.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Tailwind v4 Responsive Breakpoint:</strong> Explicitly registered <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">--breakpoint-xs: 480px</code> in <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">globals.css</code> to ensure balanced action button wrapping on small devices.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section: Security & Hardening */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Security &amp; Hardening</span>
              </div>
              <ul className="space-y-2.5 pl-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Enterprise HTTP Security Headers:</strong> Enabled strict HSTS (<code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">max-age=63072000; includeSubDomains; preload</code>), <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">X-Content-Type-Options: nosniff</code>, <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">X-Frame-Options: DENY</code>, and comprehensive CSP.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Framework Fingerprint Masking:</strong> Disabled <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">poweredByHeader</code> in Next.js to eliminate technology stack disclosure.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">GitHub Secret Scanning &amp; Push Protection:</strong> Real-time scanning and commit-intercept protection activated across the repository to block leaked keys and tokens.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Branch Protection &amp; Supply Chain Defense:</strong> Enforced immutable branch rules against force-pushes and deletion, enabled Vercel Git Fork Protection, and configured Dependabot security scanning.
                  </span>
                </li>
              </ul>
            </div>
          </article>


          {/* RELEASE v1.0.0 */}
          <article className="relative pl-6 sm:pl-8 border-l-2 border-white/[0.12] pb-2">
            {/* Timeline Marker */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#090D16] border-2 border-slate-500 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            </div>

            {/* Header & Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-2.5 py-1 rounded-lg bg-white/[0.08] border border-white/[0.12] text-slate-300 font-mono font-bold text-xs">
                v1.0.0
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[11px] font-semibold">
                GENESIS RELEASE
              </span>
              <time className="text-xs font-mono text-slate-400">
                October 21, 2026
              </time>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Production Launch — Watq Cognitive Typology Platform
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Initial production-grade release of the Watq MVP. A frictionless, client-driven psychometric instrument deconstructing 16 cognitive types to guide higher-education academic majors and professional vocational trajectories with zero server overhead and 100% client privacy.
            </p>

            {/* Section: Psychometric Core */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Core Psychometric &amp; Scoring Engine</span>
              </div>
              <ul className="space-y-2.5 pl-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">24-Item Balanced Instrument:</strong> Psychometric Likert scale targeting 4 Jungian bipolar axes (Energy: E/I, Information: S/N, Decisions: T/F, Lifestyle: J/P).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Classical Test Theory (CTT) Keying:</strong> Strict 50% reverse-keying distribution (3 forward, 3 reversed per dimension) to systematically eliminate acquiescence response bias.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Deterministic Scoring Algorithm:</strong> Pure mathematical normalization generating 0% to 100% scores with standard deterministic tie-breaking conventions.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">International Standards Alignment:</strong> Academic majors mapped to <strong className="text-slate-200">UNESCO ISCED-F 2013</strong> and vocational career trajectories mapped to <strong className="text-slate-200">ILO ISCO-08</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section: Client-Side Architecture */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Zero-OpEx Client Architecture</span>
              </div>
              <ul className="space-y-2.5 pl-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Local Session Persistence:</strong> Zero database requirements. Assessments persist completely client-side in browser <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">localStorage</code> via <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">watq_mvp_session_v1</code>.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Reactive External Store:</strong> Implemented <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">subscribeSession</code> with reference caching to guarantee zero infinite-loop re-renders under React 19.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Fault-Tolerant Resumption:</strong> Users can freely refresh, navigate away, or close tabs, safely resuming from their exact question index.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section: User Experience */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Focused User Flow</span>
              </div>
              <ul className="space-y-2.5 pl-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Landing Page (<code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">/</code>):</strong> High-clarity orientation with dynamic session-aware CTA (<em className="text-slate-400 not-italic">Start</em>, <em className="text-slate-400 not-italic">Resume</em>, or <em className="text-slate-400 not-italic">View Cognitive Profile</em>).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Runner (<code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">/assess</code>):</strong> 680px constrained focus container with real-time linear progress, 180ms psychomotor response delay, and full physical desktop keyboard shortcuts (<code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">1–5</code>, <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">Backspace</code>, <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">Escape</code>).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Diagnosis &amp; Report (<code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">/result</code>):</strong> Archetype banner, 4 bipolar polarity meters, vocational trajectory cards, and one-click formatted clipboard report export.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">What&apos;s New Modal:</strong> Non-intrusive announcement modal presenting platform updates once per version.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section: Security */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Security &amp; Client Privacy</span>
              </div>
              <ul className="space-y-2.5 pl-1 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Zero Telemetry &amp; Zero PII:</strong> The platform does not collect names, emails, IP addresses, or tracking cookies.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <span>
                    <strong className="text-white font-medium">WCAG 2.2 AAA Contrast:</strong> Deep obsidian theme (<code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-sky-300 font-mono text-xs">#090D16</code>) engineered for high visual ergonomics with an average 15.9:1 contrast ratio.
                  </span>
                </li>
              </ul>
            </div>
          </article>

        </div>

        {/* CTA Card */}
        <section className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-sky-500/20 bg-gradient-to-r from-sky-500/[0.08] via-indigo-500/[0.05] to-transparent text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-black/40">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider block font-semibold mb-1">
              Ready to explore?
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Experience the Watq Cognitive Engine
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-md">
              Take the 24-item assessment in approximately 3 minutes. Instant psychological decoding with zero telemetry.
            </p>
          </div>
          <Link
            href="/assess"
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#38BDF8] text-[#090D16] font-bold text-sm hover:bg-[#7DD3FC] transition-all shadow-lg shadow-sky-500/25 active:scale-[0.99]"
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-xs text-slate-500 font-mono">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <WatqFullLogo markSize={24} theme="dark" showTagline={false} />
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <span>© 2026 Watq. All rights reserved.</span>
            <span className="text-white/20">•</span>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/assess" className="hover:text-white transition-colors">
              Assessment
            </Link>
          </div>
          <p className="text-slate-500 font-mono text-[11px]">Deterministic Cognitive Engine // Zero Telemetry</p>
        </div>
      </footer>
    </div>
  );
}
