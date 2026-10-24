"use client";

import { WatqFullLogo } from "@/components/brand/WatqLogo";
import {
  getClientAuthSnapshot,
  getServerAuthSnapshot,
  subscribeAuth,
  syncSessionFromDatabase,
} from "@/lib/auth/authStore";
import {
  getEnterpriseUsersAction,
  updateEnterpriseUserRoleAction,
  createEnterpriseUserAction,
  deleteEnterpriseUserAction,
  type EnterpriseUserRecord,
} from "@/app/actions/userActions";
import {
  getEnterpriseQuestionsAction,
  createEnterpriseQuestionAction,
  deleteEnterpriseQuestionAction,
  type EnterpriseQuestionItem,
} from "@/app/actions/questionActions";
import {
  getNeonDbTelemetryAction,
  type NeonDbTelemetry,
} from "@/app/actions/telemetryActions";
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  Activity,
  Sliders,
  Layers,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useSyncExternalStore, useMemo, useCallback } from "react";
import { toast } from "sonner";

type AdminTab = "users" | "questions" | "models" | "telemetry";

export default function AdminPage() {
  const authSession = useSyncExternalStore(
    subscribeAuth,
    getClientAuthSnapshot,
    getServerAuthSnapshot
  );

  const [activeTab, setActiveTab] = useState<AdminTab>("users");

  // User Management State
  const [users, setUsers] = useState<EnterpriseUserRecord[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"ADMIN" | "MEMBER">("MEMBER");

  // Question Management State
  const [questions, setQuestions] = useState<EnterpriseQuestionItem[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDimension, setSelectedDimension] = useState<string>("ALL");
  const [newPrompt, setNewPrompt] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newDim, setNewDim] = useState<"ENERGY" | "PERCEPTION" | "JUDGMENT" | "ORIENTATION">("ENERGY");
  const [newPole, setNewPole] = useState("E");
  const [newPolarity, setNewPolarity] = useState<1 | -1>(1);

  // System Diagnostics State
  const [telemetry, setTelemetry] = useState<NeonDbTelemetry | null>(null);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(false);

  const isAdmin = authSession.user?.role === "ADMIN";

  useEffect(() => {
    syncSessionFromDatabase();
  }, []);

  const loadUsers = useCallback(async () => {
    setIsLoadingUsers(true);
    const res = await getEnterpriseUsersAction();
    setIsLoadingUsers(false);
    if (res.success && res.users) {
      setUsers(res.users);
    } else if (res.error) {
      toast.error(res.error);
    }
  }, []);

  const loadQuestions = useCallback(async () => {
    setIsLoadingQuestions(true);
    const res = await getEnterpriseQuestionsAction("jung-16-types");
    setIsLoadingQuestions(false);
    if (res.success && res.questions) {
      setQuestions(res.questions);
    } else if (res.error) {
      toast.error(res.error);
    }
  }, []);

  const loadTelemetry = useCallback(async () => {
    setIsLoadingTelemetry(true);
    const res = await getNeonDbTelemetryAction();
    setIsLoadingTelemetry(false);
    if (res.success && res.telemetry) {
      setTelemetry(res.telemetry);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    if (isAdmin) {
      Promise.all([
        getEnterpriseUsersAction(),
        getEnterpriseQuestionsAction("jung-16-types"),
        getNeonDbTelemetryAction(),
      ]).then(([usersRes, questionsRes, telemetryRes]) => {
        if (!ignore) {
          if (usersRes.success && usersRes.users) setUsers(usersRes.users);
          if (questionsRes.success && questionsRes.questions) setQuestions(questionsRes.questions);
          if (telemetryRes.success && telemetryRes.telemetry) setTelemetry(telemetryRes.telemetry);
        }
      });
    }
    return () => {
      ignore = true;
    };
  }, [isAdmin]);

  const handleToggleRole = async (targetUser: EnterpriseUserRecord) => {
    const newRole = targetUser.role === "ADMIN" ? "MEMBER" : "ADMIN";
    const res = await updateEnterpriseUserRoleAction(targetUser.id, newRole);
    if (res.success) {
      toast.success(`Access level for ${targetUser.email} updated successfully.`);
      loadUsers();
      loadTelemetry();
    } else {
      toast.error(res.error || "Failed to update access level.");
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!window.confirm(`Permanently remove member account ${email}?`)) return;
    const res = await deleteEnterpriseUserAction(userId);
    if (res.success) {
      toast.success(`Account ${email} removed.`);
      loadUsers();
      loadTelemetry();
    } else {
      toast.error(res.error || "Failed to remove member.");
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail.trim() || !newUserName.trim()) return;

    const res = await createEnterpriseUserAction({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
    });

    if (res.success) {
      toast.success(`Member ${newUserEmail} registered with ${newUserRole} access.`);
      setNewUserName("");
      setNewUserEmail("");
      loadUsers();
      loadTelemetry();
    } else {
      toast.error(res.error || "Failed to register member.");
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim()) return;

    const res = await createEnterpriseQuestionAction({
      modelId: "jung-16-types",
      prompt: newPrompt.trim(),
      target: newTarget.trim() || `${newPole} trait indicator`,
      dimension: newDim,
      pole: newPole,
      polarity: newPolarity,
    });

    if (res.success) {
      toast.success("Question item saved to library.");
      setNewPrompt("");
      setNewTarget("");
      loadQuestions();
      loadTelemetry();
    } else {
      toast.error(res.error || "Failed to save question.");
    }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!window.confirm(`Delete question item #${id}?`)) return;
    const res = await deleteEnterpriseQuestionAction(id);
    if (res.success) {
      toast.success("Question item removed from library.");
      loadQuestions();
      loadTelemetry();
    } else {
      toast.error(res.error || "Failed to remove question.");
    }
  };

  const audit = useMemo(() => {
    const total = questions.length;
    const reversed = questions.filter((q) => q.polarity === -1).length;
    const positive = total - reversed;
    const reversedRatio = total > 0 ? Math.round((reversed / total) * 100) : 0;
    const isCompliant = reversedRatio >= 35 && reversedRatio <= 65;

    return {
      total,
      positive,
      reversed,
      reversedRatio,
      isCompliant,
    };
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchSearch =
        q.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toString().includes(searchQuery);
      const matchDim = selectedDimension === "ALL" || q.dimension === selectedDimension;
      return matchSearch && matchDim;
    });
  }, [questions, searchQuery, selectedDimension]);

  return (
    <div className="min-h-screen bg-[#08090C] text-white selection:bg-[#D4F024] selection:text-[#08090C]">
      {/* Top Application Bar */}
      <header className="border-b border-white/[0.08] bg-[#0A0E17]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <WatqFullLogo className="h-7 w-auto" />
            </Link>
            <span className="hidden sm:inline-block h-4 w-px bg-white/10" />
            <span className="hidden sm:inline-block text-xs font-mono text-[#D4F024]">
              ADMINISTRATION PORTAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SYSTEMS ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-300">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>ACCESS: {authSession.user?.role?.toUpperCase() || "UNAUTHORIZED"}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Strict Legitimate Access Screen if not Admin */}
        {!isAdmin ? (
          <div className="p-8 rounded-[2rem] bg-[#12151D] border border-white/10 text-center max-w-xl mx-auto my-16 shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2 font-display">
              Administrative Access Required
            </h2>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              This area is restricted to authorized platform administrators. Please sign in with an account that has administrative privileges.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4F024] text-black font-semibold text-sm hover:bg-[#E2FE52] transition-all shadow-lg shadow-[#D4F024]/10 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In with Administrator Account</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 font-medium text-sm hover:bg-white/[0.08] transition-all text-center"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Clean Enterprise Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/[0.08] pb-4">
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                  activeTab === "users"
                    ? "bg-[#D4F024] text-black font-bold shadow-md shadow-[#D4F024]/10"
                    : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Member Directory ({users.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("questions")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                  activeTab === "questions"
                    ? "bg-[#D4F024] text-black font-bold shadow-md shadow-[#D4F024]/10"
                    : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Assessment Items ({questions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("models")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                  activeTab === "models"
                    ? "bg-[#D4F024] text-black font-bold shadow-md shadow-[#D4F024]/10"
                    : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Diagnostic Suites (5)</span>
              </button>

              <button
                onClick={() => setActiveTab("telemetry")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                  activeTab === "telemetry"
                    ? "bg-[#D4F024] text-black font-bold shadow-md shadow-[#D4F024]/10"
                    : "bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>System Health &amp; Activity</span>
              </button>
            </div>

            {/* TAB 1: MEMBER DIRECTORY & ACCESS MANAGEMENT */}
            {activeTab === "users" && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-display">
                      Member Directory &amp; Permissions
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Manage registered accounts, grant administrative access, and monitor assessment engagement.
                    </p>
                  </div>
                  <button
                    onClick={loadUsers}
                    disabled={isLoadingUsers}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all w-fit"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingUsers ? "animate-spin" : ""}`} />
                    <span>Refresh Directory</span>
                  </button>
                </div>

                {/* Users Table */}
                <div className="rounded-[2rem] bg-[#0D111A] border border-white/[0.08] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-white/[0.02] border-b border-white/[0.08] text-slate-400">
                        <tr>
                          <th className="py-3.5 px-4 font-semibold">MEMBER NAME</th>
                          <th className="py-3.5 px-4 font-semibold">EMAIL</th>
                          <th className="py-3.5 px-4 font-semibold">ACCESS LEVEL</th>
                          <th className="py-3.5 px-4 font-semibold">COMPLETED ASSESSMENTS</th>
                          <th className="py-3.5 px-4 font-semibold">JOINED</th>
                          <th className="py-3.5 px-4 font-semibold text-right">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {users.map((u) => (
                          <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2 font-sans font-medium text-white">
                                <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-xs font-mono text-[#D4F024]">
                                  {u.name?.slice(0, 1).toUpperCase() || "U"}
                                </div>
                                <span>{u.name || "Member"}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">{u.email}</td>
                            <td className="py-3.5 px-4">
                              {u.role === "ADMIN" ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#D4F024]/10 border border-[#D4F024]/30 text-[#D4F024] font-bold text-[11px]">
                                  <ShieldCheck className="w-3 h-3" />
                                  Administrator
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 text-[11px]">
                                  <UserCheck className="w-3 h-3" />
                                  Standard Member
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">
                              {u.assessmentsCount} report{u.assessmentsCount !== 1 ? "s" : ""}
                            </td>
                            <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                              {new Date(u.createdAt).toLocaleDateString(undefined, {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleToggleRole(u)}
                                  className="px-2.5 py-1 rounded-lg border border-white/10 hover:border-[#D4F024]/40 hover:bg-[#D4F024]/10 text-[11px] text-slate-300 hover:text-white transition-all"
                                  title="Update Member Access"
                                >
                                  {u.role === "ADMIN" ? "Revoke Admin" : "Grant Admin"}
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(u.id, u.email)}
                                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                  title="Delete Account"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add Member Box */}
                <div className="p-6 sm:p-8 rounded-[2rem] bg-[#0D111A] border border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                    <UserPlus className="w-4 h-4 text-[#D4F024]" />
                    <h3 className="font-display font-bold text-base text-white">
                      Register New Member Account
                    </h3>
                  </div>

                  <form onSubmit={handleCreateUser} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-5">
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Full Name:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alexander Wright"
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          className="w-full bg-[#121824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4F024]"
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Email Address:
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="user@example.com"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          className="w-full bg-[#121824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4F024]"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Access Level:
                        </label>
                        <select
                          value={newUserRole}
                          onChange={(e) => setNewUserRole(e.target.value as "ADMIN" | "MEMBER")}
                          className="w-full bg-[#121824] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4F024]"
                        >
                          <option value="MEMBER">Standard Member</option>
                          <option value="ADMIN">Administrator</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#D4F024] text-[#08090C] font-mono font-bold text-xs hover:bg-[#E2FE52] transition-all shadow-md shadow-[#D4F024]/10"
                      >
                        + Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 2: ASSESSMENT ITEMS LIBRARY */}
            {activeTab === "questions" && (
              <div className="space-y-8">
                {/* Psychometric Parity Card */}
                <div className="p-6 rounded-[2rem] bg-[#0D111A] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {audit.isCompliant ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-amber-400" />
                      )}
                      <h3 className="font-bold text-sm text-white">
                        Psychometric Balance &amp; Neutrality
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400">
                      Standard: Balanced keying ratio eliminates acquiescence bias across all test takers.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                      <span className="text-slate-400">TOTAL ITEMS: </span>
                      <span className="font-bold text-white">{audit.total}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <span>STANDARD: </span>
                      <span className="font-bold">{audit.positive}</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <span>INVERSE: </span>
                      <span className="font-bold">{audit.reversed} ({audit.reversedRatio}%)</span>
                    </div>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search question prompts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-[#121824] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4F024]"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-xs font-mono text-slate-400">CATEGORY:</span>
                    <select
                      value={selectedDimension}
                      onChange={(e) => setSelectedDimension(e.target.value)}
                      className="bg-[#121824] border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#D4F024]"
                    >
                      <option value="ALL">All Categories</option>
                      <option value="ENERGY">Energy Focus (E/I)</option>
                      <option value="PERCEPTION">Information Gathering (S/N)</option>
                      <option value="JUDGMENT">Decision Processing (T/F)</option>
                      <option value="ORIENTATION">Structure &amp; Routine (J/P)</option>
                    </select>

                    <button
                      onClick={loadQuestions}
                      disabled={isLoadingQuestions}
                      className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white"
                      title="Reload Library"
                    >
                      <RefreshCw className={`w-4 h-4 ${isLoadingQuestions ? "animate-spin" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Questions Table */}
                <div className="rounded-[2rem] bg-[#0D111A] border border-white/[0.08] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-white/[0.02] border-b border-white/[0.08] text-slate-400">
                        <tr>
                          <th className="py-3.5 px-4 font-semibold">#</th>
                          <th className="py-3.5 px-4 font-semibold">CATEGORY</th>
                          <th className="py-3.5 px-4 font-semibold">FOCUS</th>
                          <th className="py-3.5 px-4 font-semibold">SCORING TYPE</th>
                          <th className="py-3.5 px-4 font-semibold">PROMPT STATEMENT</th>
                          <th className="py-3.5 px-4 font-semibold text-right">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {filteredQuestions.map((q) => (
                          <tr key={q.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="py-3.5 px-4 font-bold text-[#D4F024]">#{q.orderIndex}</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-slate-300">
                                {q.dimension}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-white">{q.pole}</td>
                            <td className="py-3.5 px-4">
                              {q.polarity === -1 ? (
                                <span className="text-amber-400 font-semibold">Inverse Scale</span>
                              ) : (
                                <span className="text-emerald-400 font-semibold">Standard Scale</span>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300 font-sans max-w-md">
                              &ldquo;{q.prompt}&rdquo;
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleDeleteQuestion(q.id)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                title="Remove Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add Question Box */}
                <div className="p-6 sm:p-8 rounded-[2rem] bg-[#0D111A] border border-white/[0.08]">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                    <Plus className="w-4 h-4 text-[#D4F024]" />
                    <h3 className="font-display font-bold text-base text-white">
                      Add Diagnostic Item to Library
                    </h3>
                  </div>

                  <form onSubmit={handleAddQuestion} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      <div className="sm:col-span-6">
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Question Prompt:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. I prefer empirical facts over speculative future visions..."
                          value={newPrompt}
                          onChange={(e) => setNewPrompt(e.target.value)}
                          className="w-full bg-[#121824] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4F024]"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Category:
                        </label>
                        <select
                          value={newDim}
                          onChange={(e) =>
                            setNewDim(e.target.value as "ENERGY" | "PERCEPTION" | "JUDGMENT" | "ORIENTATION")
                          }
                          className="w-full bg-[#121824] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4F024]"
                        >
                          <option value="ENERGY">Energy Focus (E/I)</option>
                          <option value="PERCEPTION">Information Gathering (S/N)</option>
                          <option value="JUDGMENT">Decision Processing (T/F)</option>
                          <option value="ORIENTATION">Structure &amp; Routine (J/P)</option>
                        </select>
                      </div>

                      <div className="sm:col-span-1">
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Pole:
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={1}
                          value={newPole}
                          onChange={(e) => setNewPole(e.target.value.toUpperCase())}
                          className="w-full bg-[#121824] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono text-center uppercase focus:outline-none focus:border-[#D4F024]"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-xs font-mono text-slate-400 uppercase block mb-1">
                          Scoring Type:
                        </label>
                        <select
                          value={newPolarity}
                          onChange={(e) => setNewPolarity(Number(e.target.value) as 1 | -1)}
                          className="w-full bg-[#121824] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#D4F024]"
                        >
                          <option value={1}>Standard (+1)</option>
                          <option value={-1}>Inverse (-1)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#D4F024] text-[#08090C] font-mono font-bold text-xs hover:bg-[#E2FE52] transition-all shadow-md shadow-[#D4F024]/10"
                      >
                        + Add to Library
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 3: DIAGNOSTIC SUITES */}
            {activeTab === "models" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-display">
                    Diagnostic Frameworks
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Multi-framework sovereign inventory measuring cognitive and vocational architecture.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: "jung-16-types",
                      name: "16 Cognitive Types (Jungian Typology)",
                      year: 1921,
                      status: "ACTIVE STANDARD",
                      items: 24,
                      desc: "Gold-standard 4-axis cognitive preferences analyzing Energy, Perception, Judgment, and Orientation.",
                    },
                    {
                      id: "big-five-ocean",
                      name: "Big Five Inventory (OCEAN)",
                      year: 1992,
                      status: "CALIBRATED",
                      items: 50,
                      desc: "Universal five-factor taxonomy measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.",
                    },
                    {
                      id: "enneagram",
                      name: "The 9 Enneagram Types",
                      year: 1970,
                      status: "CALIBRATED",
                      items: 36,
                      desc: "Dynamic psycho-spiritual typology of nine interconnected personality types and core motivations.",
                    },
                    {
                      id: "disc",
                      name: "DISC Behavioral Assessment",
                      year: 1928,
                      status: "CALIBRATED",
                      items: 28,
                      desc: "Workplace behavioral profiling assessing Dominance, Influence, Steadiness, and Conscientiousness.",
                    },
                    {
                      id: "holland-riasec",
                      name: "Holland Occupational Themes (RIASEC)",
                      year: 1959,
                      status: "CALIBRATED",
                      items: 30,
                      desc: "Vocational interest model categorizing career orientations into Realistic, Investigative, Artistic, Social, Enterprising, Conventional.",
                    },
                  ].map((m) => (
                    <div
                      key={m.id}
                      className="p-6 rounded-[2rem] bg-[#0D111A] border border-white/[0.08] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-mono text-[#D4F024]">{m.id}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            {m.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-base text-white">{m.name}</h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{m.desc}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06] text-xs font-mono text-slate-500">
                        <span>Framework Established: {m.year}</span>
                        <span>{m.items} Item Scale</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SYSTEM HEALTH & SECURITY */}
            {activeTab === "telemetry" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-display">
                      System Status &amp; Operational Metrics
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Real-time verification of cloud security, connectivity, and data activity.
                    </p>
                  </div>
                  <button
                    onClick={loadTelemetry}
                    disabled={isLoadingTelemetry}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingTelemetry ? "animate-spin" : ""}`} />
                    <span>Check Status</span>
                  </button>
                </div>

                {telemetry ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 rounded-[2rem] bg-[#0D111A] border border-white/[0.08]">
                      <span className="text-xs font-mono text-slate-400 block mb-1">SYSTEM HEALTH</span>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Active &amp; Secure</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 mt-1 block">
                        Response Time: {telemetry.latencyMs}ms
                      </span>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-[#0D111A] border border-white/[0.08]">
                      <span className="text-xs font-mono text-slate-400 block mb-1">REGISTERED MEMBERS</span>
                      <div className="text-white font-bold text-2xl font-mono">
                        {telemetry.usersCount}
                      </div>
                      <span className="text-[11px] font-mono text-[#D4F024] mt-1 block">
                        {telemetry.adminsCount} Administrators
                      </span>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-[#0D111A] border border-white/[0.08]">
                      <span className="text-xs font-mono text-slate-400 block mb-1">QUESTION LIBRARY</span>
                      <div className="text-white font-bold text-2xl font-mono">
                        {telemetry.questionsCount} Items
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 mt-1 block">
                        Across {telemetry.modelsCount} Frameworks
                      </span>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-[#0D111A] border border-white/[0.08]">
                      <span className="text-xs font-mono text-slate-400 block mb-1">DIAGNOSTIC SESSIONS</span>
                      <div className="text-white font-bold text-2xl font-mono">
                        {telemetry.assessmentsCount}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 mt-1 block">
                        Synchronized Reports
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 font-mono text-xs">
                    Verifying system status...
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
