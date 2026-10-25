import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@watq/design-system";
import { ArrowLeft, CheckCircle2, Database, Globe, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminStudioPage() {
  const instruments = [
    {
      code: "JUNG-16",
      name: "16 Cognitive Types (Jungian Typology)",
      items: 24,
      status: "PRODUCTION ACTIVE",
      type: "Dichotomous Likert Scale",
    },
    {
      code: "OCEAN-5",
      name: "Big Five Factor Personality (OCEAN)",
      items: 50,
      status: "CALIBRATED",
      type: "Continuous Trait Spectrum",
    },
    {
      code: "ENNEA-9",
      name: "Enneagram Core Motivations",
      items: 36,
      status: "CALIBRATED",
      type: "Centroid Cluster Analysis",
    },
    {
      code: "DISC-4",
      name: "DISC Behavioral Styles",
      items: 28,
      status: "CALIBRATED",
      type: "Workplace Execution Profile",
    },
    {
      code: "RIASEC-6",
      name: "Holland Occupational Themes (RIASEC)",
      items: 30,
      status: "CALIBRATED",
      type: "Vocational Alignment (ILO/UNESCO)",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#08090C] text-slate-100">
      {/* Admin Header */}
      <header className="border-b border-white/10 bg-[#0C0E14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> Return
              </Button>
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <span className="font-bold tracking-tight text-lg text-slate-100 font-display">
              Administration Workspace
            </span>
            <Badge variant="citron">Access: Administrator</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM OPERATIONAL
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex-1 w-full space-y-10">
        {/* System Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-[#0C0E14] border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Data Infrastructure
              </CardTitle>
              <Database className="w-4 h-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">Active &amp; Encrypted</div>
              <p className="text-xs text-slate-400 mt-1">
                High-availability automated cloud persistence
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0C0E14] border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Access Security
              </CardTitle>
              <Lock className="w-4 h-4 text-[#D4F024]" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">Access Control</div>
              <p className="text-xs text-slate-400 mt-1">
                Server-side authenticated session control
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0C0E14] border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Platform Defense
              </CardTitle>
              <ShieldCheck className="w-4 h-4 text-sky-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">Protected</div>
              <p className="text-xs text-slate-400 mt-1">
                Real-time threat monitoring and rate limits
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0C0E14] border-white/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Network Health
              </CardTitle>
              <Globe className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">Optimal</div>
              <p className="text-xs text-slate-400 mt-1">Global low-latency edge delivery</p>
            </CardContent>
          </Card>
        </div>

        {/* Psychometric Instruments Catalog */}
        <Card className="bg-[#0C0E14] border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-white font-semibold font-display">
                  Psychometric Instrument Registry
                </CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Standardized psychometric scales measuring human cognitive preferences and
                  vocational orientation.
                </CardDescription>
              </div>
              <Badge variant="citron">Standardized Registry</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-mono uppercase text-slate-400">
                    <th className="py-3 px-4">Instrument ID</th>
                    <th className="py-3 px-4">Framework Name</th>
                    <th className="py-3 px-4">Scale Items</th>
                    <th className="py-3 px-4">Measurement Model</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  {instruments.map((inst) => (
                    <tr key={inst.code} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 px-4 font-bold text-[#D4F024]">{inst.code}</td>
                      <td className="py-3.5 px-4 text-slate-200 font-sans font-medium">
                        {inst.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{inst.items} Items</td>
                      <td className="py-3.5 px-4 text-slate-400">{inst.type}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" /> {inst.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
