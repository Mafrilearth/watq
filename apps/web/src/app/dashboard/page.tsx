"use client";

import { WatqFullLogo, WatqPrismMark } from "@/components/brand/WatqLogo";
import {
  getClientAuthSnapshot,
  getServerAuthSnapshot,
  logout,
  subscribeAuth,
  syncSessionFromDatabase,
} from "@/lib/auth/authStore";
import {
  getUserEnterpriseAssessmentsAction,
  deleteEnterpriseAssessmentAction,
  type EnterpriseAssessmentResultItem,
} from "@/app/actions/assessmentActions";
import {
  deleteHistoryRecord,
  getClientHistorySnapshot,
  getServerHistorySnapshot,
  subscribeHistory,
  exportSovereignData,
  importSovereignData,
  purgeSovereignData,
} from "@/lib/storage/history";
import {
  getClientQuestionsSnapshot,
  getServerQuestionsSnapshot,
  subscribeQuestions,
} from "@/lib/storage/questions";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Compass,
  Download,
  History,
  Lock,
  LogOut,
  PlusCircle,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Trash2,
  Upload,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useSyncExternalStore, useRef } from "react";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const authSession = useSyncExternalStore(
    subscribeAuth,
    getClientAuthSnapshot,
    getServerAuthSnapshot,
  );

  const historyRecords = useSyncExternalStore(
    subscribeHistory,
    getClientHistorySnapshot,
    getServerHistorySnapshot,
  );

  const questions = useSyncExternalStore(
    subscribeQuestions,
    getClientQuestionsSnapshot,
    getServerQuestionsSnapshot,
  );

  const currentUser = authSession.user;
  const isAdmin = currentUser?.role === "ADMIN";
  const [dbAssessments, setDbAssessments] = React.useState<EnterpriseAssessmentResultItem[]>([]);

  const [isCheckingAuth, setIsCheckingAuth] = React.useState<boolean>(true);

  React.useEffect(() => {
    syncSessionFromDatabase()
      .then((session) => {
        if (!session?.user) {
          router.replace("/login?redirect=/dashboard");
        }
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, [router]);

  const loadDbAssessments = React.useCallback(async () => {
    const res = await getUserEnterpriseAssessmentsAction();
    if (res.success && res.assessments) {
      setDbAssessments(res.assessments);
    }
  }, []);

  React.useEffect(() => {
    let ignore = false;
    if (currentUser) {
      getUserEnterpriseAssessmentsAction().then((res) => {
        if (!ignore && res.success && res.assessments) {
          setDbAssessments(res.assessments);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [currentUser]);

  const handleDeleteDbAssessment = async (id: string) => {
    if (!window.confirm("Permanently delete this diagnostic record?")) return;
    const res = await deleteEnterpriseAssessmentAction(id);
    if (res.success) {
      toast.success("Diagnostic record deleted successfully");
      loadDbAssessments();
    } else {
      toast.error(res.error || "Failed to delete record");
    }
  };

  const latestRecord = historyRecords[0] || null;

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleExportData = () => {
    const json = exportSovereignData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `watq-diagnostic-archive-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Diagnostic reports archived successfully (.json)");
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content && importSovereignData(content)) {
        toast.success("Sovereign data restored from backup!");
      } else {
        toast.error("Failed to parse WATQ backup file");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePurgeData = () => {
    if (
      window.confirm(
        "Cryptographically purge all stored session and history data from this browser? This action is permanent and immediate.",
      )
    ) {
      purgeSovereignData();
      toast.success("All local storage data purged completely");
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-white selection:bg-[#D4F024] selection:text-[#08090C]">
      {/* Top Application Bar */}
      <header className="border-b border-white/[0.08] bg-[#0A0E17]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <WatqFullLogo className="h-7 w-auto" />
            </Link>
            <span className="hidden sm:inline-block h-4 w-px bg-white/10" />
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
              MEMBER DASHBOARD
            </span>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                  <div className="w-6 h-6 rounded-full bg-[#D4F024] text-[#08090C] font-bold text-xs flex items-center justify-center font-mono">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold leading-none">{currentUser.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 leading-tight uppercase">
                      {isAdmin ? "👑 Admin" : "👤 Member"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#08090C] bg-[#D4F024] hover:bg-[#E2FE52] transition-all"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      {isCheckingAuth ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-28 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <WatqPrismMark size={36} className="animate-pulse" />
            <span className="text-xs font-mono text-slate-500">
              Synchronizing workspace credentials...
            </span>
          </div>
        </main>
      ) : !currentUser ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex items-center justify-center">
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#12151D] border border-white/10 text-center max-w-lg mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4F024]/5 blur-3xl pointer-events-none" />

            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#D4F024]/10 border border-[#D4F024]/20 flex items-center justify-center text-[#D4F024]">
              <Lock className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#D4F024] mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MEMBER WORKSPACE ACCESS REQUIRED</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-display tracking-tight">
              Member Workspace
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 mb-8 leading-relaxed">
              This workspace is reserved for authenticated members to synchronize longitudinal
              assessment dossiers, vocational progress, and persistent cloud profiles.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4F024] text-[#08090C] font-bold text-xs hover:bg-[#E2FE52] transition-all shadow-lg shadow-[#D4F024]/10 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 font-semibold text-xs hover:bg-white/[0.08] transition-all text-center"
              >
                Create Member Account
              </Link>
            </div>

            <div className="pt-6 border-t border-white/[0.06] text-xs text-slate-500">
              <span>Taking the assessment for the first time? </span>
              <Link
                href="/assess"
                className="text-[#D4F024] hover:underline font-medium block sm:inline mt-1 sm:mt-0"
              >
                Take free assessment as a guest (no account needed) &rarr;
              </Link>
            </div>
          </div>
        </main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Welcome Greeting Banner */}
          <div className="relative rounded-[2rem] p-8 sm:p-10 bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-transparent border border-white/[0.08] overflow-hidden mb-8">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4F024]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#D4F024] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>COGNITIVE INTELLIGENCE HUB</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                  Welcome back,{" "}
                  <span className="text-[#D4F024]">{currentUser?.name || "Explorer"}</span>!
                </h1>
                <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
                  Your centralized cognitive command center. Decode, inspect, and benchmark your
                  personality architecture across 5 calibrated diagnostic suites.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/assess"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#D4F024] text-[#08090C] font-bold text-sm shadow-lg shadow-[#D4F024]/20 hover:bg-[#E2FE52] transition-all active:scale-95"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Start Assessment</span>
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono text-xs font-semibold transition-all"
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Admin Studio</span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* 5-Model Diagnostic Suite Quick Launch */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                MODULAR PSYCHOMETRIC CATALOG (5 CALIBRATED SUITES):
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <Link
                href="/assess?model=jungian"
                className="p-4 rounded-2xl bg-[#0D111A] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#D4F024]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    Jung 1921
                  </span>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#D4F024] transition-colors mt-0.5">
                    16 Cognitive Types
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    Cognitive wiring, 4 polarities, ILO/UNESCO pathways.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#D4F024] mt-3 block">24 Items →</span>
              </Link>

              <Link
                href="/assess?model=bigfive"
                className="p-4 rounded-2xl bg-[#0D111A] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#D4F024]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    Mini-IPIP
                  </span>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#D4F024] transition-colors mt-0.5">
                    Big Five OCEAN
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    5 empirical dimensions of personality and behavioral traits.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#D4F024] mt-3 block">20 Items →</span>
              </Link>

              <Link
                href="/assess?model=enneagram"
                className="p-4 rounded-2xl bg-[#0D111A] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#D4F024]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    9 Triads
                  </span>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#D4F024] transition-colors mt-0.5">
                    Enneagram Types
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    Core fears, unconscious desires, wings, and growth arrows.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#D4F024] mt-3 block">36 Items →</span>
              </Link>

              <Link
                href="/assess?model=disc"
                className="p-4 rounded-2xl bg-[#0D111A] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#D4F024]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    Workplace
                  </span>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#D4F024] transition-colors mt-0.5">
                    DISC Profile
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    Leadership, assertiveness, and collaboration protocols.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#D4F024] mt-3 block">16 Items →</span>
              </Link>

              <Link
                href="/assess?model=riasec"
                className="p-4 rounded-2xl bg-[#0D111A] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#D4F024]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">
                    Holland
                  </span>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#D4F024] transition-colors mt-0.5">
                    RIASEC Vocational
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    3-letter Holland code, vocational environments, and majors.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#D4F024] mt-3 block">30 Items →</span>
              </Link>
            </div>
          </div>

          {/* 4-Pillar Telemetry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-[#0D111A] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-slate-500 uppercase">
                Assessments Taken
              </span>
              <div className="text-2xl font-bold font-mono mt-1 text-white">
                {historyRecords.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full session persistence</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-slate-500 uppercase">
                Primary Archetype
              </span>
              <div className="text-2xl font-bold font-mono mt-1 text-[#D4F024]">
                {latestRecord?.typeCode || "Pending"}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 truncate">
                {latestRecord?.archetypeTitle || "Complete assessment to unlock"}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-slate-500 uppercase">
                Active Question Bank
              </span>
              <div className="text-2xl font-bold font-mono mt-1 text-sky-400">
                {questions.length} Items
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {isAdmin ? "Configurable in Admin Studio" : "Standardized Jungian 1921"}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D111A] border border-white/[0.06]">
              <span className="text-[11px] font-mono text-slate-500 uppercase">
                Privacy Architecture
              </span>
              <div className="text-2xl font-bold font-mono mt-1 text-emerald-400">Local-First</div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Client-Side Privacy Verified</span>
              </div>
            </div>
          </div>

          {/* Content Section: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Latest Profile Spotlight (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-[2rem] bg-[#0D111A] border border-white/[0.08] relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-[#D4F024]" />
                    <h2 className="font-display text-lg font-bold">
                      Personal Cognitive Operating Status
                    </h2>
                  </div>
                  {latestRecord && (
                    <Link
                      href="/result"
                      className="text-xs font-mono text-[#D4F024] hover:underline flex items-center gap-1"
                    >
                      <span>View Full Manual</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {latestRecord ? (
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <span className="text-xs font-mono text-slate-500 uppercase">
                          DECODED COGNITIVE PROFILE
                        </span>
                        <h3 className="text-3xl font-extrabold tracking-tight text-white mt-0.5">
                          {latestRecord.typeCode} — {latestRecord.archetypeTitle}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {latestRecord.summary}
                        </p>
                      </div>
                    </div>

                    {/* Polarity Summary Bars if Jungian */}
                    {"E" in latestRecord.scores && (
                      <div className="space-y-3 pt-2">
                        <div className="text-xs font-mono text-slate-400 mb-2">
                          4 POLARITY SPECTRUM:
                        </div>

                        <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                          <span>Extraversion ({(latestRecord.scores as { E: number }).E}%)</span>
                          <span className="text-[#D4F024] font-bold">↔</span>
                          <span>Introversion ({(latestRecord.scores as { I: number }).I}%)</span>
                        </div>

                        <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                          <span>Sensing ({(latestRecord.scores as { S: number }).S}%)</span>
                          <span className="text-teal-400 font-bold">↔</span>
                          <span>Intuition ({(latestRecord.scores as { N: number }).N}%)</span>
                        </div>

                        <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                          <span>Thinking ({(latestRecord.scores as { T: number }).T}%)</span>
                          <span className="text-indigo-400 font-bold">↔</span>
                          <span>Feeling ({(latestRecord.scores as { F: number }).F}%)</span>
                        </div>

                        <div className="bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                          <span>Judging ({(latestRecord.scores as { J: number }).J}%)</span>
                          <span className="text-amber-400 font-bold">↔</span>
                          <span>Perceiving ({(latestRecord.scores as { P: number }).P}%)</span>
                        </div>
                      </div>
                    )}

                    {/* Vocational Highlights */}
                    {latestRecord.majors.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-white/[0.06]">
                        <span className="text-xs font-mono text-slate-400 uppercase block mb-2">
                          Academic &amp; Vocational Alignments (UNESCO / ILO):
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {latestRecord.majors.slice(0, 3).map((major) => (
                            <span
                              key={major}
                              className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300"
                            >
                              {major}
                            </span>
                          ))}
                          {latestRecord.careers.slice(0, 2).map((career) => (
                            <span
                              key={career}
                              className="px-3 py-1 rounded-lg bg-[#D4F024]/10 border border-[#D4F024]/20 text-xs font-mono text-[#D4F024]"
                            >
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-12 text-center flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 text-slate-500">
                      <Compass className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white">No Assessment Completed Yet</h3>
                    <p className="text-xs text-slate-400 max-w-xs mt-1.5 leading-relaxed">
                      Take any of our diagnostic assessments to decode your cognitive polarity and
                      vocational alignment.
                    </p>
                    <Link
                      href="/assess"
                      className="mt-5 px-5 py-2.5 rounded-full bg-[#D4F024] text-[#08090C] font-bold text-xs hover:bg-[#E2FE52] transition-all"
                    >
                      Start First Assessment
                    </Link>
                  </div>
                )}
              </div>

              {/* Data Archiving & Privacy Control Center */}
              <div className="p-6 sm:p-7 rounded-[2rem] bg-[#0D111A] border border-white/[0.08]">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h3 className="font-display text-base font-bold">
                      Data Privacy &amp; Report Archiving
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">ENCRYPTED</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  Download an offline copy of your assessment history, restore previous reports, or
                  clear temporary browser session cache.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleExportData}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono font-semibold text-white border border-white/[0.1] transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D4F024]" />
                    <span>Download Archive (.json)</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono font-semibold text-white border border-white/[0.1] transition-all"
                  >
                    <Upload className="w-3.5 h-3.5 text-teal-400" />
                    <span>Restore from File</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleImportData}
                    className="hidden"
                  />

                  <button
                    onClick={handlePurgeData}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-mono font-semibold text-rose-300 border border-rose-500/30 transition-all ml-auto"
                  >
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    <span>Clear Cached Session</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: History & Admin Quick Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Assessment History Box */}
              <div className="p-6 sm:p-7 rounded-[2rem] bg-[#0D111A] border border-white/[0.08]">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-400" />
                    <h3 className="font-display text-base font-bold">Assessment History</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {dbAssessments.length + historyRecords.length} Record
                    {dbAssessments.length + historyRecords.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Synchronized Diagnostic Reports */}
                {dbAssessments.length > 0 && (
                  <div className="mb-4 pb-4 border-b border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase text-[#D4F024] tracking-wider block mb-2">
                      SYNCHRONIZED DIAGNOSTIC REPORTS ({dbAssessments.length})
                    </span>
                    <div className="space-y-2">
                      {dbAssessments.map((dbItem) => (
                        <div
                          key={dbItem.id}
                          className="p-3 rounded-xl bg-[#D4F024]/[0.03] hover:bg-[#D4F024]/[0.07] border border-[#D4F024]/20 transition-all flex items-center justify-between group"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-[#D4F024]">
                                {dbItem.typeCode}
                              </span>
                              <span className="text-xs text-slate-200 font-medium truncate max-w-[130px]">
                                {dbItem.archetype}
                              </span>
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                VERIFIED
                              </span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                              {new Date(dbItem.completedAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              href="/result"
                              className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[11px] font-mono text-slate-200"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => handleDeleteDbAssessment(dbItem.id)}
                              className="p-1 rounded-md text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete Diagnostic Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {historyRecords.length > 0 ? (
                  <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                    {historyRecords.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-[#D4F024]">
                              {item.typeCode}
                            </span>
                            <span className="text-xs text-slate-300 font-medium truncate max-w-[140px]">
                              {item.archetypeTitle}
                            </span>
                            {item.modelType && (
                              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/[0.08]">
                                {item.modelType}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                            {new Date(item.date).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href="/result"
                            className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-[11px] font-mono text-slate-200"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => deleteHistoryRecord(item.id)}
                            className="p-1 rounded-md text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete Session"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    Your past assessment sessions will automatically appear here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
