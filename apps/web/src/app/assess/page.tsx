"use client";

import { WatqPrismMark } from "@/components/brand/WatqLogo";
import {
  JUNGIAN_QUESTIONS,
  BIG_FIVE_QUESTIONS,
  ENNEAGRAM_QUESTIONS,
  DISC_QUESTIONS,
  RIASEC_QUESTIONS,
  calculateJungianScores,
  calculateBigFiveScores,
  calculateEnneagramScores,
  calculateDISCScores,
  calculateRIASECScores,
  calculateResponseValidity,
  type AssessmentModelType,
  type LikertValue,
  type QuestionItem,
  type AnyAssessmentResult,
} from "@watq/core";
import {
  completeSession,
  getSession,
  initSession,
  updateSessionResponse,
  clearSession,
} from "@/lib/storage/session";
import { saveHistoryRecord } from "@/lib/storage/history";
import { saveEnterpriseAssessmentAction } from "@/app/actions/assessmentActions";
import { getPublicAssessmentQuestionsAction } from "@/app/actions/questionActions";
import { useUIStore } from "@/lib/stores/uiStore";
import { ArrowLeft, Check, Sparkles, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useCallback, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QUESTION_TRANSLATIONS_ID } from "@watq/core";

const LIKERT_OPTIONS_EN: Array<{ value: LikertValue; label: string; short: string }> = [
  { value: 1, label: "Strongly Disagree", short: "1" },
  { value: 2, label: "Disagree", short: "2" },
  { value: 3, label: "Neutral", short: "3" },
  { value: 4, label: "Agree", short: "4" },
  { value: 5, label: "Strongly Agree", short: "5" },
];

const LIKERT_OPTIONS_ID: Array<{ value: LikertValue; label: string; short: string }> = [
  { value: 1, label: "Sangat Tidak Setuju", short: "1" },
  { value: 2, label: "Tidak Setuju", short: "2" },
  { value: 3, label: "Netral", short: "3" },
  { value: 4, label: "Setuju", short: "4" },
  { value: 5, label: "Sangat Setuju", short: "5" },
];

const MODEL_CONFIGS: Record<
  AssessmentModelType,
  {
    id: AssessmentModelType;
    label: string;
    sublabel: string;
    itemsCount: number;
    description: string;
  }
> = {
  jungian: {
    id: "jungian",
    label: "16 Cognitive Types",
    sublabel: "Carl Jung (1921)",
    itemsCount: 24,
    description: "4-Polarity Cognitive Processing & Architecture (E/I, S/N, T/F, J/P)",
  },
  bigfive: {
    id: "bigfive",
    label: "Big Five OCEAN",
    sublabel: "Mini-IPIP",
    itemsCount: 20,
    description: "5 Empirical Behavioral Dimensions (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism)",
  },
  enneagram: {
    id: "enneagram",
    label: "Enneagram 9-Types",
    sublabel: "Core Drivers & Wings",
    itemsCount: 36,
    description: "Unconscious Motivations, Core Fears, Wings & Dynamic Stress/Growth Vectors",
  },
  disc: {
    id: "disc",
    label: "DISC Workplace",
    sublabel: "Team Behaviors",
    itemsCount: 16,
    description: "Workplace Execution, Assertiveness, Communication & Leadership Styles",
  },
  riasec: {
    id: "riasec",
    label: "Holland Codes",
    sublabel: "RIASEC Vocational",
    itemsCount: 30,
    description: "Vocational Interests Mapped to UNESCO ISCED-F Majors & ILO ISCO-08 Careers",
  },
};

function AssessmentRunnerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const queryModel = (searchParams.get("model") as AssessmentModelType) || null;

  // Active Model Type (defaults to session model or query param or jungian)
  const [activeModel, setActiveModel] = useState<AssessmentModelType>(() => {
    if (queryModel && queryModel in MODEL_CONFIGS) return queryModel;
    const session = getSession();
    if (session?.modelType && session.modelType in MODEL_CONFIGS) {
      return session.modelType as AssessmentModelType;
    }
    return "jungian";
  });

  const [dbQuestions, setDbQuestions] = useState<QuestionItem[] | null>(null);

  useEffect(() => {
    let ignore = false;
    getPublicAssessmentQuestionsAction(
      activeModel === "jungian" ? "jung-16-types" : activeModel
    ).then((res) => {
      if (!ignore && res.success && res.questions && res.questions.length > 0) {
        setDbQuestions(res.questions as QuestionItem[]);
      }
    });
    return () => {
      ignore = true;
    };
  }, [activeModel]);

  // Pick question set according to active model (PostgreSQL database first)
  const questionSet: QuestionItem[] = useMemo(() => {
    if (activeModel === "jungian" && dbQuestions && dbQuestions.length > 0) {
      return dbQuestions;
    }
    switch (activeModel) {
      case "bigfive":
        return BIG_FIVE_QUESTIONS;
      case "enneagram":
        return ENNEAGRAM_QUESTIONS;
      case "disc":
        return DISC_QUESTIONS;
      case "riasec":
        return RIASEC_QUESTIONS;
      case "jungian":
      default:
        return JUNGIAN_QUESTIONS;
    }
  }, [activeModel, dbQuestions]);

  // Lazy state initialization from localStorage prevents cascading renders
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const session = getSession();
    if (!session || session.modelType !== activeModel) return 0;
    return Math.min(Math.max(0, session.currentIndex), questionSet.length - 1);
  });

  const [responses, setResponses] = useState<Record<string, LikertValue>>(() => {
    const session = getSession();
    if (!session || session.modelType !== activeModel) return {};
    return session?.responses || {};
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Initialize session on mount if missing, or route to result if already completed for this model
  useEffect(() => {
    const session = getSession();
    if (!session || session.modelType !== activeModel) {
      initSession(`${activeModel}-instrument`, activeModel);
    } else if (session.completedAt && session.result) {
      router.replace("/result");
    }
  }, [activeModel, router]);

  // Switch model handler
  const handleModelSwitch = (model: AssessmentModelType) => {
    if (model === activeModel) return;
    if (
      Object.keys(responses).length > 0 &&
      !window.confirm("Switch assessment model? Your current progress in this model will be reset.")
    ) {
      return;
    }
    clearSession();
    setActiveModel(model);
    setCurrentIndex(0);
    setResponses({});
    initSession(`${model}-instrument`, model);
  };

  const { locale, toggleLocale } = useUIStore();
  const isId = locale === "id";

  const currentQuestion = questionSet[currentIndex];
  const selectedVal = currentQuestion ? (responses[currentQuestion.id] ?? null) : null;
  const progressPercent = Math.round(((currentIndex + 1) / questionSet.length) * 100);

  const questionPrompt =
    isId && currentQuestion && currentQuestion.id in QUESTION_TRANSLATIONS_ID
      ? QUESTION_TRANSLATIONS_ID[currentQuestion.id]
      : currentQuestion?.prompt;

  const currentLikertOptions = isId ? LIKERT_OPTIONS_ID : LIKERT_OPTIONS_EN;

  // Handle selection with psychomotor auto-advance delay (180ms)
  const handleSelect = useCallback(
    (value: LikertValue) => {
      if (isSubmitting || !currentQuestion) return;

      setIsSubmitting(true);

      const nextResponses = {
        ...responses,
        [currentQuestion.id]: value,
      };
      setResponses(nextResponses);

      // Psychomotor delay: 100ms optical highlight + 80ms mental anticipation buffer
      setTimeout(() => {
        if (currentIndex < questionSet.length - 1) {
          const nextIndex = currentIndex + 1;
          updateSessionResponse(currentQuestion.id, value, nextIndex);
          setCurrentIndex(nextIndex);
          setIsSubmitting(false);
        } else {
          // Final question completed -> execute deterministic scoring engine for selected model
          updateSessionResponse(currentQuestion.id, value, currentIndex);

          const validity = calculateResponseValidity(nextResponses, questionSet);

          let finalResult: AnyAssessmentResult;

          switch (activeModel) {
            case "bigfive": {
              finalResult = {
                ...calculateBigFiveScores(nextResponses),
                validityIndex: validity,
              };
              saveHistoryRecord({
                typeCode: finalResult.primaryTrait,
                archetypeTitle: `Primary: ${finalResult.primaryTrait}`,
                summary: finalResult.dossierSummary,
                scores: finalResult.scores as unknown as Record<string, number>,
                modelType: "bigfive",
                majors: [],
                careers: [],
              });
              break;
            }
            case "enneagram": {
              finalResult = {
                ...calculateEnneagramScores(nextResponses),
                validityIndex: validity,
              };
              saveHistoryRecord({
                typeCode: `Type ${finalResult.coreType}`,
                archetypeTitle: finalResult.title,
                summary: finalResult.summary,
                scores: finalResult.scores as unknown as Record<string, number>,
                modelType: "enneagram",
                majors: [],
                careers: [],
              });
              break;
            }
            case "disc": {
              finalResult = {
                ...calculateDISCScores(nextResponses),
                validityIndex: validity,
              };
              saveHistoryRecord({
                typeCode: finalResult.styleLockup,
                archetypeTitle: finalResult.styleTitle,
                summary: finalResult.summary,
                scores: finalResult.scores as unknown as Record<string, number>,
                modelType: "disc",
                majors: [],
                careers: [],
              });
              break;
            }
            case "riasec": {
              finalResult = {
                ...calculateRIASECScores(nextResponses),
                validityIndex: validity,
              };
              saveHistoryRecord({
                typeCode: finalResult.hollandCode,
                archetypeTitle: finalResult.primaryTheme,
                summary: finalResult.environmentFit,
                scores: finalResult.scores as unknown as Record<string, number>,
                modelType: "riasec",
                majors: finalResult.recommendedMajors,
                careers: finalResult.recommendedCareers,
              });
              break;
            }
            case "jungian":
            default: {
              const jResult = calculateJungianScores(nextResponses);
              finalResult = {
                ...jResult,
                validityIndex: validity,
              };
              saveHistoryRecord({
                typeCode: jResult.typeCode,
                archetypeTitle: jResult.archetypeTitle,
                summary: jResult.summary,
                scores: jResult.scores,
                modelType: "jungian",
                temperament: jResult.temperament,
                majors: jResult.majors,
                careers: jResult.careers,
              });

              // Persist into Neon PostgreSQL
              saveEnterpriseAssessmentAction({
                modelId: "jung-16-types",
                typeCode: jResult.typeCode,
                archetype: jResult.archetypeTitle,
                scoreEI: jResult.scores.E,
                scoreSN: jResult.scores.S,
                scoreTF: jResult.scores.T,
                scoreJP: jResult.scores.J,
                rawScores: jResult.scores as unknown as Record<string, unknown>,
                responses: nextResponses,
              }).catch((err) => console.error("[AssessRunner] Cloud save error:", err));

              break;
            }
          }

          completeSession(finalResult);

          startTransition(() => {
            router.push("/result");
          });
        }
      }, 180);
    },
    [currentIndex, currentQuestion, isSubmitting, responses, questionSet, activeModel, router],
  );

  // Handle navigation to previous question
  const handleBack = useCallback(() => {
    if (currentIndex <= 0 || isSubmitting) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
  }, [currentIndex, isSubmitting]);

  // Desktop keyboard shortcuts: 1-5 to select, Backspace/ArrowLeft to go back, Escape to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        const num = Number.parseInt(e.key, 10) as LikertValue;
        handleSelect(num);
      } else if (e.key === "Backspace" || e.key === "ArrowLeft") {
        if (currentIndex > 0) {
          e.preventDefault();
          handleBack();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        if (window.confirm("Return to home? Your assessment responses are automatically saved.")) {
          router.push("/");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSelect, handleBack, currentIndex, router]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#08090C] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <WatqPrismMark size={40} className="animate-pulse" />
          <span className="text-xs font-mono text-slate-500">Initializing cognitive matrix...</span>
        </div>
      </div>
    );
  }

  const activeConfig = MODEL_CONFIGS[activeModel];

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F8FAFC] flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-6">
      {/* Top Header & Model Switcher Tab Hub */}
      <header className="w-full max-w-[680px] mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <WatqPrismMark size={24} />
            <span className="font-extrabold text-sm tracking-wider text-white group-hover:text-[#D4F024] transition-colors font-display">
              Watq
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleLocale}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-mono font-semibold text-slate-300 hover:text-white transition-all active:scale-95"
              title={locale === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
            >
              <Globe className="w-3 h-3 text-[#D4F024]" />
              <span>{locale.toUpperCase()}</span>
            </button>

            <span className="text-xs font-mono text-slate-400">
              {isId ? "Pertanyaan" : "Question"}{" "}
              <strong className="text-white">{currentIndex + 1}</strong> {isId ? "dari" : "of"}{" "}
              {questionSet.length}
            </span>
            <span className="text-xs font-mono text-[#D4F024] font-semibold px-2 py-0.5 rounded-full bg-[#D4F024]/10 border border-[#D4F024]/20">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Model Instrument Tab Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(Object.keys(MODEL_CONFIGS) as AssessmentModelType[]).map((mKey) => {
            const conf = MODEL_CONFIGS[mKey];
            const isActive = mKey === activeModel;
            const localizedLabel =
              isId && mKey === "jungian"
                ? "16 Tipe Kepribadian"
                : isId && mKey === "bigfive"
                ? "Big Five (OCEAN)"
                : isId && mKey === "enneagram"
                ? "9 Enneagram"
                : isId && mKey === "disc"
                ? "Gaya Kerja DISC"
                : isId && mKey === "riasec"
                ? "Minat Karir RIASEC"
                : conf.label;

            return (
              <button
                key={mKey}
                onClick={() => handleModelSwitch(mKey)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-[#D4F024] text-[#08090C] border-[#D4F024] font-bold shadow-md shadow-[#D4F024]/10"
                    : "bg-white/[0.03] text-slate-400 border-white/[0.08] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {localizedLabel} ({conf.itemsCount}Q)
              </button>
            );
          })}
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#D4F024] transition-all duration-200 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Focus Container: Locked to exactly 680px (Bringhurst's Law) */}
      <main className="w-full max-w-[680px] mx-auto my-auto py-4 sm:py-8">
        <div className="bg-[#12151D] border border-white/[0.08] rounded-2xl p-5 sm:p-10 shadow-2xl shadow-black/60 relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4F024]/[0.05] blur-3xl pointer-events-none" />

          {/* Question Category Metadata */}
          <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#D4F024] bg-[#D4F024]/10 border border-[#D4F024]/20 px-2.5 py-1 rounded-md">
              {activeConfig.label} • {isId ? "NOMOR" : "ITEM"} {currentIndex + 1} {isId ? "DARI" : "OF"} {questionSet.length}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
              {isId ? "Tersimpan otomatis" : "Progress saved automatically"}
            </span>
          </div>

          {/* Question Prompt with Spring Physics & Typographic Balance */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeModel}-${currentIndex}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white leading-relaxed tracking-[-0.01em] min-h-[64px] sm:min-h-[80px] flex items-center mb-6 sm:mb-8 text-balance">
                &ldquo;{questionPrompt}&rdquo;
              </h2>
            </motion.div>
          </AnimatePresence>

          {/* 5-Point Likert Scale (Touch target >= 48px via Fitts's Law) */}
          <div
            className="space-y-2.5 sm:space-y-3"
            role="radiogroup"
            aria-label="Likert Scale Options"
          >
            {currentLikertOptions.map((opt) => {
              const isSelected = selectedVal === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full min-h-[50px] sm:min-h-[48px] px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-xl border flex items-center justify-between text-left transition-all duration-120 select-none ${
                    isSelected
                      ? "bg-[#D4F024]/10 border-[#D4F024] text-white shadow-md shadow-[#D4F024]/10"
                      : "bg-white/[0.02] border-white/[0.08] text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.18]"
                  } ${isSubmitting ? "cursor-wait" : "cursor-pointer active:scale-[0.99]"}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                        isSelected
                          ? "bg-[#D4F024] text-[#08090C]"
                          : "bg-white/[0.05] text-slate-400 border border-white/[0.08]"
                      }`}
                    >
                      {opt.short}
                    </span>
                    <span className="text-sm sm:text-base font-medium">{opt.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#D4F024] flex items-center justify-center text-[#08090C]">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Runner Controls & Back Button */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentIndex === 0 || isSubmitting}
              className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all ${
                currentIndex === 0
                  ? "text-slate-600 cursor-not-allowed opacity-50"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08]"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {isId ? "Pertanyaan Sebelumnya" : "Previous Question"}
            </button>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 hidden sm:flex">
              <Sparkles className="w-3 h-3 text-[#D4F024]" />
              <span>{isId ? "Tips: Tekan tombol 1–5 pada keyboard untuk memilih cepat" : "Tip: Press keys 1–5 on keyboard for instant selection"}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Runner Footer */}
      <footer className="w-full max-w-[680px] mx-auto text-center text-xs font-mono text-slate-500">
        Watq // {isId ? "Platform Asesmen Kepribadian Mandiri" : "Universal Personality & Cognitive Platform"}
      </footer>
    </div>
  );
}

export default function AssessmentRunnerPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#08090C] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <WatqPrismMark size={40} className="animate-pulse" />
            <span className="text-xs font-mono text-slate-500">
              Initializing cognitive matrix...
            </span>
          </div>
        </div>
      }
    >
      <AssessmentRunnerContent />
    </React.Suspense>
  );
}
