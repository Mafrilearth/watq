"use client";

import { saveEnterpriseAssessmentAction } from "@/app/actions/assessmentActions";
import { WatqFullLogo } from "@/components/brand/WatqLogo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAsync } from "@/lib/auth/authStore";
import { getSession } from "@/lib/storage/session";
import type { AssessmentResult } from "@watq/core";
import { ArrowRight, CheckCircle2, UserPlus } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { Suspense, useState } from "react";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    const result = await registerAsync({ name, email, password });

    if (result.success) {
      // Automatically persist and link completed guest assessment to newly registered account
      const localSession = getSession();
      if (localSession?.completedAt && localSession.result && "typeCode" in localSession.result) {
        const r = localSession.result as AssessmentResult;
        await saveEnterpriseAssessmentAction({
          modelId: localSession.modelType === "jungian" ? "jung-16-types" : localSession.modelType,
          typeCode: r.typeCode,
          archetype: r.archetypeTitle,
          scoreEI: r.scores.E,
          scoreSN: r.scores.S,
          scoreTF: r.scores.T,
          scoreJP: r.scores.J,
          rawScores: r.scores as unknown as Record<string, unknown>,
          responses: localSession.responses,
        }).catch(() => {});
      }

      setIsLoading(false);
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.push(redirect as Route);
    } else {
      setIsLoading(false);
      setError(result.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D4F024]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Link href="/" className="inline-block transition-transform hover:scale-105 duration-150">
            <WatqFullLogo className="h-9 w-auto text-white" />
          </Link>
        </div>

        <Card className="border-white/10 bg-[#12151D]/90 backdrop-blur-xl shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <Badge
                variant="citron"
                className="gap-1.5 font-mono text-[10px] tracking-wider uppercase"
              >
                <UserPlus className="w-3 h-3" />
                Member Registration
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white font-sans">
              Create an Account
            </CardTitle>
            <CardDescription className="text-sm text-slate-400">
              Save your personality profiles, track your cognitive growth, and export reports.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 font-mono">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 font-mono">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 font-mono">Password</label>
                <Input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="p-3 text-xs rounded-md bg-red-950/40 border border-red-800/50 text-red-300">
                  {error}
                </div>
              )}

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4F024]" />
                  <span>Permanent cloud database persistence</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4F024]" />
                  <span>ILO ISCO-08 vocational alignment reports</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="citron"
                className="w-full h-11 text-black font-semibold text-sm group mt-4"
                disabled={isLoading}
              >
                <span>{isLoading ? "Creating Account..." : "Register & Save Profile"}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1 duration-150" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 text-center text-xs text-slate-400">
            <div>
              Already have an account?{" "}
              <Link
                href={
                  `/login${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect")!)}` : ""}` as Route
                }
                className="text-[#D4F024] hover:underline font-medium"
              >
                Sign In
              </Link>
            </div>
            <Link href="/" className="text-slate-500 hover:text-slate-400 text-[11px]">
              &larr; Back to Home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08090C]" />}>
      <RegisterContent />
    </Suspense>
  );
}
