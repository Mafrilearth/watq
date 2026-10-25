"use client";

import { WatqFullLogo } from "@/components/brand/WatqLogo";
import { getClientAuthSnapshot, getServerAuthSnapshot, subscribeAuth } from "@/lib/auth/authStore";
import { useUIStore } from "@/lib/stores/uiStore";
import type { AssessmentSession } from "@watq/core";
import { ArrowRight, Globe, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";

interface FloatingNavProps {
  session: AssessmentSession | null;
}

export function FloatingNav({ session }: FloatingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, toggleLocale } = useUIStore();

  const authSession = useSyncExternalStore(
    subscribeAuth,
    getClientAuthSnapshot,
    getServerAuthSnapshot,
  );
  const currentUser = authSession.user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasCompletedResult = session && session.completedAt && session.result;
  const hasInProgressSession = session && !session.completedAt && session.currentIndex > 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto max-w-5xl mx-auto rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0F19]/85 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-black/60 py-2.5 px-4 sm:px-5"
            : "bg-[#0B0F19]/60 backdrop-blur-md border border-white/[0.08] shadow-lg shadow-black/20 py-3 px-4 sm:px-6"
        } flex items-center justify-between gap-4`}
      >
        {/* Brand Link */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-transform active:scale-95"
        >
          <WatqFullLogo markSize={26} theme="dark" showTagline={false} />
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F024] animate-pulse" />
            {locale === "id" ? "5 MODEL TES" : "5 CALIBRATED SUITES"}
          </span>
        </Link>

        {/* Desktop Anchor Links (Clean typographic nav) */}
        <div className="hidden md:flex items-center gap-5 text-xs font-medium text-slate-300">
          <a href="#frameworks" className="hover:text-white transition-colors duration-150">
            {locale === "id" ? "5 Model" : "5 Suites"}
          </a>
          <a href="#archetypes" className="hover:text-white transition-colors duration-150">
            {locale === "id" ? "16 Tipe" : "16 Types"}
          </a>
          <a
            href="#vocational-taxonomy"
            className="hover:text-white transition-colors duration-150"
          >
            {locale === "id" ? "Karir & Jurusan" : "Vocational"}
          </a>
          {currentUser ? (
            <Link
              href={currentUser.role === "ADMIN" ? "/admin" : "/dashboard"}
              className="text-[#D4F024] hover:text-[#E2FE52] font-semibold transition-colors duration-150"
            >
              {currentUser.role === "ADMIN"
                ? "Admin Portal"
                : locale === "id"
                  ? "Dasbor"
                  : "Dashboard"}
            </Link>
          ) : (
            <Link href="/login" className="hover:text-white transition-colors duration-150">
              {locale === "id" ? "Masuk" : "Sign In"}
            </Link>
          )}
        </div>

        {/* Action Button & Language Switcher Pill */}
        <div className="flex items-center gap-2">
          {/* Language Toggle Pill */}
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-mono font-semibold text-slate-300 hover:text-white transition-all active:scale-95"
            title={locale === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
          >
            <Globe className="w-3 h-3 text-[#D4F024]" />
            <span>{locale.toUpperCase()}</span>
          </button>

          {hasCompletedResult ? (
            <Link
              href="/result"
              className="group inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-[#D4F024] hover:bg-[#c2dc20] text-[#08090C] text-xs font-bold shadow-lg shadow-[#D4F024]/15 transition-all duration-200 active:scale-95"
            >
              <span>
                {locale === "id" ? "Lihat Profil" : "View Profile"}{" "}
                {session?.result && "typeCode" in session.result
                  ? `(${(session.result as { typeCode: string }).typeCode})`
                  : ""}
              </span>
              <span className="w-6 h-6 rounded-full bg-[#08090C]/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-[#08090C]" />
              </span>
            </Link>
          ) : hasInProgressSession ? (
            <Link
              href="/assess"
              className="group inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-[#D4F024] hover:bg-[#c2dc20] text-[#08090C] text-xs font-bold shadow-lg shadow-[#D4F024]/15 transition-all duration-200 active:scale-95"
            >
              <span>
                {locale === "id" ? "Lanjutkan" : "Resume"} ({session.currentIndex + 1}/
                {session.modelType === "bigfive"
                  ? 20
                  : session.modelType === "enneagram"
                    ? 36
                    : session.modelType === "disc"
                      ? 16
                      : session.modelType === "riasec"
                        ? 30
                        : 24}
                )
              </span>
              <span className="w-6 h-6 rounded-full bg-[#08090C]/15 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-[#08090C]" />
              </span>
            </Link>
          ) : (
            <Link
              href="/assess"
              className="group inline-flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-white hover:bg-[#D4F024] text-[#08090C] text-xs font-bold shadow-lg shadow-white/10 hover:shadow-[#D4F024]/20 transition-all duration-200 active:scale-95"
            >
              <span>{locale === "id" ? "Mulai Tes" : "Start Assessment"}</span>
              <span className="w-6 h-6 rounded-full bg-[#08090C]/10 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-[#08090C]" />
              </span>
            </Link>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Reveal */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 max-w-sm mx-auto rounded-2xl bg-[#08090C]/95 backdrop-blur-2xl border border-white/[0.12] p-5 shadow-2xl space-y-3">
          <div className="flex flex-col gap-2 text-sm text-slate-300 font-medium">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] mb-1">
              <span className="text-xs text-slate-400 font-mono">Bahasa / Language:</span>
              <button
                type="button"
                onClick={toggleLocale}
                className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.1] text-xs font-mono font-bold text-[#D4F024]"
              >
                {locale === "en" ? "Bahasa Indonesia" : "English"}
              </button>
            </div>
            <a
              href="#frameworks"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              {locale === "id" ? "5 Model Asesmen" : "5 Diagnostic Suites"}
            </a>
            <a
              href="#archetypes"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              {locale === "id" ? "16 Tipe Kepribadian" : "16 Archetype Matrix"}
            </a>
            <a
              href="#vocational-taxonomy"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
            >
              {locale === "id" ? "Jalur Karir & Jurusan" : "Vocational Taxonomy"}
            </a>
            <Link
              href="/assess"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg hover:bg-white/[0.05] text-[#D4F024] font-medium transition-colors flex items-center justify-between"
            >
              <span>{locale === "id" ? "Mulai Asesmen" : "Start Assessment"}</span>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#D4F024]/15 text-[#D4F024]">
                126 ITEMS
              </span>
            </Link>
            {currentUser ? (
              <Link
                href={currentUser.role === "ADMIN" ? "/admin" : "/dashboard"}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-white/[0.05] text-[#D4F024] font-medium transition-colors"
              >
                {currentUser.role === "ADMIN"
                  ? "Admin Portal"
                  : locale === "id"
                    ? "Dasbor Anggota"
                    : "Member Dashboard"}
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-white/[0.05] hover:text-white transition-colors"
              >
                {locale === "id" ? "Masuk ke Akun" : "Sign In"}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
