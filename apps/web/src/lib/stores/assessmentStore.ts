import type { AnyAssessmentResult, AssessmentModelType, LikertValue } from "@watq/core";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export interface AssessmentStoreState {
  activeModel: AssessmentModelType;
  currentIndex: number;
  responses: Record<string, LikertValue>;
  completedResult: AnyAssessmentResult | null;
  soundEnabled: boolean;
  _hasHydrated: boolean;

  // Actions
  setActiveModel: (model: AssessmentModelType) => void;
  setCurrentIndex: (index: number) => void;
  nextQuestion: (totalQuestions: number) => void;
  prevQuestion: () => void;
  recordResponse: (questionId: string, value: LikertValue) => void;
  setCompletedResult: (result: AnyAssessmentResult | null) => void;
  toggleSound: () => void;
  resetAssessment: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

/**
 * Modern Zustand v5 Assessment Session Store.
 * Provides fine-grained reactive state management for the assessment runner,
 * with atomic selectors, LocalStorage auto-persistence, and DevTools integration.
 */
export const useAssessmentStore = create<AssessmentStoreState>()(
  devtools(
    persist(
      subscribeWithSelector((set, get) => ({
        activeModel: "jungian",
        currentIndex: 0,
        responses: {},
        completedResult: null,
        soundEnabled: true,
        _hasHydrated: false,

        setActiveModel: (activeModel) =>
          set(
            { activeModel, currentIndex: 0, responses: {}, completedResult: null },
            false,
            "assessment/setActiveModel",
          ),

        setCurrentIndex: (currentIndex) =>
          set({ currentIndex }, false, "assessment/setCurrentIndex"),

        nextQuestion: (totalQuestions) => {
          const { currentIndex } = get();
          if (currentIndex < totalQuestions - 1) {
            set({ currentIndex: currentIndex + 1 }, false, "assessment/nextQuestion");
          }
        },

        prevQuestion: () => {
          const { currentIndex } = get();
          if (currentIndex > 0) {
            set({ currentIndex: currentIndex - 1 }, false, "assessment/prevQuestion");
          }
        },

        recordResponse: (questionId, value) =>
          set(
            (state) => ({
              responses: { ...state.responses, [questionId]: value },
            }),
            false,
            "assessment/recordResponse",
          ),

        setCompletedResult: (completedResult) =>
          set({ completedResult }, false, "assessment/setCompletedResult"),

        toggleSound: () =>
          set((state) => ({ soundEnabled: !state.soundEnabled }), false, "assessment/toggleSound"),

        resetAssessment: () =>
          set(
            { currentIndex: 0, responses: {}, completedResult: null },
            false,
            "assessment/resetAssessment",
          ),

        setHasHydrated: (hasHydrated) =>
          set({ _hasHydrated: hasHydrated }, false, "assessment/setHasHydrated"),
      })),
      {
        name: "watq_assessment_store",
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
    {
      name: "WATQ Assessment Store",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);

// ============================================================================
// ATOMIC SELECTORS
// ============================================================================

export const useActiveModel = () => useAssessmentStore((s) => s.activeModel);
export const useCurrentQuestionIndex = () => useAssessmentStore((s) => s.currentIndex);
export const useAssessmentResponses = () => useAssessmentStore((s) => s.responses);
export const useSoundEnabled = () => useAssessmentStore((s) => s.soundEnabled);
export const useAssessmentCompletedResult = () => useAssessmentStore((s) => s.completedResult);
export const useAssessmentHasHydrated = () => useAssessmentStore((s) => s._hasHydrated);
