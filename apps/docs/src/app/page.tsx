import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import {
  Binary,
  BookOpen,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Flame,
  Layers,
  Shield,
  Terminal,
} from "lucide-react";

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
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#D4F024]/10 text-[#D4F024] border border-[#D4F024]/30">
              Fumadocs v16.17
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="https://watq.mafrilearth.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              watq.mafrilearth.com <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 flex-1 w-full space-y-14">
        {/* Hero Section */}
        <div className="space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4F024]/10 border border-[#D4F024]/30 text-xs font-mono text-[#D4F024]">
            <BookOpen className="w-3.5 h-3.5" /> SCIENTIFIC SPECIFICATION & ARCHITECTURE
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Watq Platform Documentation
          </h1>
          <p className="text-slate-400 leading-relaxed text-base">
            Universal Personality & Cognitive Decoding Platform. Complete reference for psychometric
            scoring formulas, Next-Forge monorepo boundaries, cryptographic persistence, and $0 OpEx
            infrastructure.
          </p>
        </div>

        {/* Fumadocs Callout Banner */}
        <Callout type="info" title="Sovereign Architectural Standard">
          WATQ operates on a 100% mathematical determinism guarantee. All scoring engines, session
          cryptography, and database transactions execute without arbitrary heuristics, third-party
          cookies, or unmetered cloud operational expenditures.
        </Callout>

        {/* Section 1: Psychometrics Engine */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Binary className="w-5 h-5 text-[#D4F024]" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              1. Psychometric Scoring Algorithm
            </h2>
          </div>
          <p className="text-sm text-slate-300">
            Carl Gustav Jung (1921) Public Domain Archetypal Instrument with 24 discrete Likert
            items scored across 4 orthogonal cognitive polarities:
          </p>

          <Cards>
            <Card
              title="Energy Direction (E vs I)"
              description="Extraversion (Initiating) vs Introversion (Reflecting). Measures outer engagement vs inner conceptualization."
              icon={<Flame className="w-4 h-4 text-amber-400" />}
            />
            <Card
              title="Information Intake (S vs N)"
              description="Sensing (Tangible) vs Intuition (Abstract). Measures empirical data focus vs emergent pattern recognition."
              icon={<Cpu className="w-4 h-4 text-emerald-400" />}
            />
            <Card
              title="Decision Formulation (T vs F)"
              description="Thinking (Objective) vs Feeling (Empathetic). Measures systemic causal logic vs human value harmony."
              icon={<Binary className="w-4 h-4 text-cyan-400" />}
            />
            <Card
              title="Lifestyle Orientation (J vs P)"
              description="Judging (Structured) vs Perceiving (Emergent). Measures planned execution vs adaptive discovery."
              icon={<CheckCircle2 className="w-4 h-4 text-purple-400" />}
            />
          </Cards>

          <Tabs items={["Formula Specification", "Tie-Breaking Invariant"]}>
            <Tab value="Formula Specification">
              <div className="p-4 bg-[#0C0E14] border border-white/10 rounded-lg text-xs font-mono space-y-2">
                <p className="text-slate-400"># Raw score sum across 6 items per dimension:</p>
                <p className="text-[#D4F024]">
                  S_dim = sum(item_response_i * polarity_i), S_dim in [6, 30]
                </p>
                <p className="text-slate-400"># Normalized percentage calculation (0% to 100%):</p>
                <p className="text-white">Pole_Primary_% = ((S_dim - 6) / 24) * 100%</p>
              </div>
            </Tab>
            <Tab value="Tie-Breaking Invariant">
              <div className="p-4 bg-[#0C0E14] border border-white/10 rounded-lg text-xs font-mono space-y-2">
                <p className="text-slate-400"># Exact Median Rule (50.0%):</p>
                <p className="text-white">
                  normalizedScore &gt;= 50 ? PrimaryPole (E, S, T, J) : SecondaryPole (I, N, F, P)
                </p>
                <p className="text-slate-500">
                  Zero random jitter; ties resolve deterministically to preserve reproducibility.
                </p>
              </div>
            </Tab>
          </Tabs>
        </section>

        {/* Section 2: Monorepo Topology & File Tree */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Layers className="w-5 h-5 text-sky-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              2. Next-Forge Monorepo Topology
            </h2>
          </div>
          <p className="text-sm text-slate-300">
            Strict domain boundary separation governed by Turbo v2 and pnpm workspaces:
          </p>

          <Files>
            <Folder name="apps" defaultOpen>
              <Folder name="web" defaultOpen>
                <File name="src/app/page.tsx (Landing & Assessment Runner)" />
                <File name="next.config.ts (Security Headers & CSP)" />
              </Folder>
              <Folder name="app">
                <File name="src/app/admin (Governance Command Studio)" />
              </Folder>
              <Folder name="docs" defaultOpen>
                <File name="src/app/page.tsx (Fumadocs Architecture Portal)" />
              </Folder>
              <Folder name="email">
                <File name="package.json (Port 3003 Preview Server)" />
              </Folder>
            </Folder>
            <Folder name="packages" defaultOpen>
              <File name="database (Prisma 6.4 + Neon Serverless Pooler)" />
              <File name="auth (Better Auth RBAC + Scrypt Salts)" />
              <File name="security (Arcjet WAF + Cloudflare Turnstile)" />
              <File name="storage (Cloudflare R2 S3 Zero Egress Storage)" />
              <File name="email (Resend + React Email Component Engine)" />
              <File name="design-system (Cold Basalt & Citron CVA Primitives)" />
            </Folder>
          </Files>
        </section>

        {/* Section 3: Assessment Protocol Execution Steps */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              3. Diagnostic Assessment Protocol
            </h2>
          </div>

          <Steps>
            <Step>
              <h3 className="text-base font-semibold text-white">Diagnostic Initialization</h3>
              <p className="text-xs text-slate-400">
                Client navigates to <code>/assess</code>. Zustand assessment store initializes with
                zero latency; no remote network roundtrips required for session bootstrap.
              </p>
            </Step>
            <Step>
              <h3 className="text-base font-semibold text-white">
                Psychomotor Response Collection
              </h3>
              <p className="text-xs text-slate-400">
                User responds to 24 items with keyboard shortcuts (<code>1</code>–<code>5</code>).
                Each transition obeys 120ms psychomotor easing curves in a 680px focused container.
              </p>
            </Step>
            <Step>
              <h3 className="text-base font-semibold text-white">Deterministic Computation</h3>
              <p className="text-xs text-slate-400">
                Engine computes raw bipolar dimension sums, calculates normalized polarity ratios,
                and generates the 4-letter Jungian archetype lockup (e.g., INTJ).
              </p>
            </Step>
            <Step>
              <h3 className="text-base font-semibold text-white">Executive Dossier Rendering</h3>
              <p className="text-xs text-slate-400">
                Results display at <code>/result</code>, accompanied by ILO ISCO-08 vocational
                taxonomies and UNESCO ISCED-F 2013 educational pathways.
              </p>
            </Step>
          </Steps>
        </section>

        {/* Section 4: Security Invariants & TypeTable */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">
              4. Security Architecture Specification
            </h2>
          </div>

          <TypeTable
            type={{
              turnstileVerification: {
                description: "Cloudflare Turnstile token validation via siteverify endpoint",
                type: "Promise<TurnstileVerificationResult>",
                default: "true (in dev/test mock)",
                required: true,
              },
              arcjetShield: {
                description:
                  "Edge WAF bot protection, sliding window rate limiter, and credit card leak defense",
                type: "ArcjetDecision",
                default: "mode: LIVE (prod)",
                required: true,
              },
              scryptHashing: {
                description:
                  "Cryptographic scryptSync password hashing with 16-byte random salt and constant-time verify",
                type: "string (salt:hash)",
                default: "64-byte key length",
                required: true,
              },
              r2ZeroEgress: {
                description:
                  "Cloudflare R2 S3-compatible storage with presigned upload and download URLs",
                type: "Promise<string>",
                default: "expiresIn: 3600s",
                required: false,
              },
            }}
          />

          <Accordions type="single">
            <Accordion title="Cryptographic Web Crypto API Guarantees">
              All entropy generation utilizes CSPRNG (<code>crypto.getRandomValues</code>) and RFC
              4122 v4 UUIDs. Password hashes use constant-time byte comparisons (
              <code>timingSafeEqual</code>) to prevent side-channel timing analysis attacks.
            </Accordion>
            <Accordion title="HTTP Security Headers & Content Security Policy">
              Strict-Transport-Security enforces 2-year HSTS preloading with subdomains. Content
              Security Policy strictly whitelists Cloudflare Turnstile (
              <code>challenges.cloudflare.com</code>) and Cloudflare Web Analytics (
              <code>cloudflareinsights.com</code>).
            </Accordion>
            <Accordion title="Transactional Email Delivery Invariants">
              Resend integration in <code>packages/email</code> utilizes Svix cryptographic
              HMAC-SHA256 webhook signature verification and 24-hour idempotency keys for duplicate
              prevention.
            </Accordion>
          </Accordions>
        </section>
      </main>
    </div>
  );
}
