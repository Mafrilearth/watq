import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@watq/design-system";
import {
  Brain,
  Compass,
  ExternalLink,
  FileText,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function MemberDashboardPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#08090C] text-slate-100">
      {/* Top Navigation */}
      <header className="border-b border-white/10 bg-[#0C0E14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-tight text-lg text-slate-100">
              Watq <span className="text-[#D4F024]">Studio</span>
            </span>
            <Badge variant="citron">PRO</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="island" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Admin Studio
              </Button>
            </Link>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#D4F024]/10 border border-[#D4F024]/30 flex items-center justify-center text-xs font-bold text-[#D4F024]">
                M
              </div>
              <span className="text-sm font-medium text-slate-300">Member</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-10">
        {/* Welcome Banner */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0C0E14] via-[#12151D] to-[#0C0E14] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4F024]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#D4F024] uppercase">
              <Sparkles className="w-4 h-4" /> Cognitive Identity Decoded
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Your Cognitive Architecture</h1>
            <p className="text-slate-400 text-sm max-w-xl">
              Inspect your calibrated diagnostic profile, structural traits, and vocational trajectories.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3">
            <a href="https://watq.mafrilearth.com/assess" target="_blank" rel="noopener noreferrer">
              <Button variant="citron" size="lg">
                <Brain className="w-4 h-4 mr-2" /> Retake Assessment
              </Button>
            </a>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-[#0C0E14] border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Primary Archetype
              </CardTitle>
              <Brain className="w-4 h-4 text-[#D4F024]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white tracking-tight">INTJ</div>
              <p className="text-xs text-slate-400 mt-1">
                The Mastermind Strategist (ISCO-08: 2511)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0C0E14] border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Psychometric Consistency
              </CardTitle>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white tracking-tight">98.4%</div>
              <p className="text-xs text-emerald-400/90 mt-1">
                Zero contradiction index (Lie scale validated)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0C0E14] border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">
                Vocational Congruence
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-sky-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white tracking-tight">94.8%</div>
              <p className="text-xs text-slate-400 mt-1">Systems Architecture & AI Engineering</p>
            </CardContent>
          </Card>
        </div>

        {/* 4 Polarities Overview */}
        <Card className="bg-[#0C0E14] border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-white font-semibold">
                  Cognitive Polarity Distribution
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Deterministic Jungian 1921 four-vector psychometric vectors
                </CardDescription>
              </div>
              <Badge variant="citron">24 Items Calibrated</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Energy Orientation</span>
                <span className="text-[#818CF8] font-bold">Introversion (82%)</span>
              </div>
              <Progress value={82} className="h-2 bg-white/5" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Information Perception</span>
                <span className="text-[#2DD4BF] font-bold">Intuition (88%)</span>
              </div>
              <Progress value={88} className="h-2 bg-white/5" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Decision Execution</span>
                <span className="text-[#D4F024] font-bold">Thinking (92%)</span>
              </div>
              <Progress value={92} className="h-2 bg-white/5" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Lifestyle Structuring</span>
                <span className="text-[#FF7A00] font-bold">Judging (85%)</span>
              </div>
              <Progress value={85} className="h-2 bg-white/5" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
