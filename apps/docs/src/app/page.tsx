import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@watq/design-system";
import { Binary, BookOpen, Compass, Cpu, Layers, Shield, Terminal } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#08090C] text-slate-100">
      {/* Docs Header */}
      <header className="border-b border-white/10 bg-[#0C0E14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-tight text-lg text-slate-100">
              Watq <span className="text-[#D4F024]">Docs</span>
            </span>
            <Badge variant="citron">SSOT v1.0.0</Badge>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://watq.mafrilearth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              watq.mafrilearth.com ↗
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 w-full space-y-12">
        {/* Hero Section */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4F024]/10 border border-[#D4F024]/30 text-xs font-mono text-[#D4F024]">
            <BookOpen className="w-3.5 h-3.5" /> SCIENTIFIC SPECIFICATION
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">Watq Documentation</h1>
          <p className="text-slate-400 leading-relaxed text-base">
            Universal Personality & Cognitive Decoding Platform. Complete reference for psychometric
            formulas, finite state machine specifications, zero-OpEx client architecture, and
            security protocols.
          </p>
        </div>

        {/* Section 1: Psychometrics */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Binary className="w-5 h-5 text-[#D4F024]" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              1. Psychometric Scoring Algorithm
            </h2>
          </div>
          <Card className="bg-[#0C0E14] border-white/10">
            <CardHeader>
              <CardTitle className="text-base text-white">
                Deterministic 4-Axis Bipolar Formula
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs font-mono">
                Carl Gustav Jung (1921) Public Domain Archetypal Instrument
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              <p>
                The MVP uses 24 questions (6 questions per axis) scored on a 5-point Likert scale (1
                to 5). Each question has a polarity orientation (
                <span className="text-[#D4F024] font-mono">+1</span> or{" "}
                <span className="text-red-400 font-mono">-1</span>).
              </p>
              <div className="bg-[#08090C] rounded-lg p-4 font-mono text-xs text-slate-300 border border-white/5 space-y-2">
                <p className="text-slate-500">Dimension Score Formula:</p>
                <p className="text-[#D4F024]">
                  normalizedScore = (sum(item_response * polarity) + max_offset) / max_range * 100
                </p>
                <p className="text-slate-500">Categorical Threshold:</p>
                <p className="text-white">axisLetter = normalizedScore &gt;= 50 ? poleA : poleB</p>
              </div>
              <p className="text-xs text-slate-400">
                Guarantees zero random tie-breaking. Midpoint ties (exact 50.0%) default
                deterministically to the introverted/intuitive/rational/structured poles.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Section 2: Monorepo Architecture */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              2. Next-Forge Monorepo Architecture
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#0C0E14] border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-white">
                  Applications (`apps/`)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-300 font-mono">
                <div>
                  <span className="text-[#D4F024] font-bold">apps/web</span>: Public site, 680px
                  assessment runner, vocational diagnostic report.
                </div>
                <div>
                  <span className="text-[#D4F024] font-bold">apps/app</span>: Authenticated member
                  workspace & Admin Command Studio.
                </div>
                <div>
                  <span className="text-[#D4F024] font-bold">apps/docs</span>: Scientific
                  documentation & API specifications.
                </div>
                <div>
                  <span className="text-[#D4F024] font-bold">apps/email</span>: React Email preview
                  development server.
                </div>
                <div>
                  <span className="text-[#D4F024] font-bold">apps/studio</span>: Prisma Studio
                  database management launcher.
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0C0E14] border-white/10">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-white">
                  Packages (`packages/`)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-300 font-mono">
                <div>
                  <span className="text-sky-400 font-bold">@watq/database</span>: Prisma 6.4 + Neon
                  serverless pooler.
                </div>
                <div>
                  <span className="text-sky-400 font-bold">@watq/auth</span>: Better Auth RBAC +
                  HttpOnly cookies.
                </div>
                <div>
                  <span className="text-sky-400 font-bold">@watq/security</span>: Arcjet WAF + rate
                  limiter.
                </div>
                <div>
                  <span className="text-sky-400 font-bold">@watq/design-system</span>: Cold Basalt &
                  Citron UI tokens.
                </div>
                <div>
                  <span className="text-sky-400 font-bold">@watq/analytics</span>: PostHog
                  client/server analytics.
                </div>
                <div>
                  <span className="text-sky-400 font-bold">@watq/observability</span>: Sentry +
                  Better Stack logger.
                </div>
                <div>
                  <span className="text-sky-400 font-bold">@watq/storage</span>: Cloudflare R2
                  object storage.
                </div>
                <div>
                  <span className="text-sky-400 font-bold">@watq/email</span>: Resend + React Email
                  templates.
                </div>
                <div>
                  <span className="text-sky-400 font-bold">@watq/core</span>: Psychological engine &
                  scoring types.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Security & Compliance */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              3. Security & Zero-Secret Protocol
            </h2>
          </div>
          <Card className="bg-[#0C0E14] border-white/10">
            <CardContent className="pt-6 space-y-4 text-sm text-slate-300">
              <ul className="list-disc list-inside space-y-2 text-xs text-slate-300">
                <li>
                  <strong className="text-white">HSTS Preload:</strong> 2-year duration
                  (63,072,000s) with subdomains and preload flag.
                </li>
                <li>
                  <strong className="text-white">Arcjet Bot & Rate Limiting:</strong> Enforces
                  automated sliding window IP rate limiting and disposable email rejection.
                </li>
                <li>
                  <strong className="text-white">Turnstile Policy:</strong> Zero CAPTCHA friction on
                  UI; server-side behavioral analysis without intrusive popups.
                </li>
                <li>
                  <strong className="text-white">Strict CSP:</strong> Complete Content Security
                  Policy with defense-in-depth XSS headers and frame-ancestors: none.
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
