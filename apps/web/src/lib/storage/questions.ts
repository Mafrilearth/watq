import type { QuestionItem } from "@watq/core";
import { JUNGIAN_QUESTIONS } from "@watq/core";

const STORAGE_QUESTIONS_KEY = "watq_custom_questions_v1";

let cachedRaw: string | null = null;
let cachedQuestions: QuestionItem[] | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error("[WatqQuestions] Listener error:", e);
    }
  });
}

export function subscribeQuestions(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function getClientQuestionsSnapshot(): QuestionItem[] {
  if (typeof window === "undefined") return JUNGIAN_QUESTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_QUESTIONS_KEY);
    if (!raw) {
      if (cachedQuestions === null) {
        cachedQuestions = JUNGIAN_QUESTIONS;
      }
      return cachedQuestions;
    }
    if (raw === cachedRaw && cachedQuestions !== null) {
      return cachedQuestions;
    }
    cachedRaw = raw;
    cachedQuestions = JSON.parse(raw);
    return cachedQuestions || JUNGIAN_QUESTIONS;
  } catch {
    return JUNGIAN_QUESTIONS;
  }
}

export function getServerQuestionsSnapshot(): QuestionItem[] {
  return JUNGIAN_QUESTIONS;
}

export function saveQuestions(questions: QuestionItem[]) {
  if (typeof window === "undefined") return;
  try {
    const raw = JSON.stringify(questions);
    localStorage.setItem(STORAGE_QUESTIONS_KEY, raw);
    cachedRaw = raw;
    cachedQuestions = questions;
    notifyListeners();
  } catch (e) {
    console.error("[WatqQuestions] Failed to save questions:", e);
  }
}

export function addQuestion(item: Omit<QuestionItem, "id">): QuestionItem {
  const current = getClientQuestionsSnapshot();
  const newId = `${item.dimension}-${Date.now().toString().slice(-4)}`;
  const newItem: QuestionItem = {
    ...item,
    id: newId,
  };
  const updated = [...current, newItem];
  saveQuestions(updated);
  return newItem;
}

export function updateQuestion(id: string, updates: Partial<Omit<QuestionItem, "id">>): boolean {
  const current = getClientQuestionsSnapshot();
  const index = current.findIndex((q) => q.id === id);
  if (index === -1) return false;

  const updated = [...current];
  updated[index] = {
    ...updated[index],
    ...updates,
  };
  saveQuestions(updated);
  return true;
}

export function deleteQuestion(id: string): boolean {
  const current = getClientQuestionsSnapshot();
  const updated = current.filter((q) => q.id !== id);
  if (updated.length === current.length) return false;
  saveQuestions(updated);
  return true;
}

export function resetQuestionsToDefault(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_QUESTIONS_KEY);
    cachedRaw = null;
    cachedQuestions = JUNGIAN_QUESTIONS;
    notifyListeners();
  } catch (e) {
    console.error("[WatqQuestions] Failed to reset questions:", e);
  }
}
