import type { AssessmentModelType, PolarityScores } from "@watq/core";

export interface AssessmentHistoryRecord {
  id: string;
  date: string;
  typeCode: string;
  archetypeTitle: string;
  summary: string;
  scores: PolarityScores | Record<string, number>;
  modelType?: AssessmentModelType;
  temperament?: string;
  majors: string[];
  careers: string[];
}

const STORAGE_HISTORY_KEY = "watq_assessment_history_v1";

let cachedRaw: string | null = null;
let cachedHistory: AssessmentHistoryRecord[] | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (e) {
      console.error("[WatqHistory] Listener error:", e);
    }
  });
}

export function subscribeHistory(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

export function getClientHistorySnapshot(): AssessmentHistoryRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (!raw) {
      if (cachedHistory === null) cachedHistory = [];
      return cachedHistory;
    }
    if (raw === cachedRaw && cachedHistory !== null) {
      return cachedHistory;
    }
    cachedRaw = raw;
    cachedHistory = JSON.parse(raw);
    return cachedHistory || [];
  } catch {
    return [];
  }
}

export function getServerHistorySnapshot(): AssessmentHistoryRecord[] {
  return [];
}

export function saveHistoryRecord(
  record: Omit<AssessmentHistoryRecord, "id" | "date"> & { id?: string; date?: string },
): AssessmentHistoryRecord {
  if (typeof window === "undefined") {
    return {
      ...record,
      id: record.id || `hist_${Date.now()}`,
      date: record.date || new Date().toISOString(),
    };
  }

  const current = getClientHistorySnapshot();
  const newRecord: AssessmentHistoryRecord = {
    ...record,
    id: record.id || `hist_${Date.now()}`,
    date: record.date || new Date().toISOString(),
  };

  // Prepend so latest is first
  const updated = [newRecord, ...current.filter((r) => r.id !== newRecord.id)];
  try {
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
    cachedRaw = JSON.stringify(updated);
    cachedHistory = updated;
    notifyListeners();
  } catch (e) {
    console.error("[WatqHistory] Failed to save history:", e);
  }
  return newRecord;
}

export function deleteHistoryRecord(id: string): void {
  if (typeof window === "undefined") return;
  const current = getClientHistorySnapshot();
  const updated = current.filter((r) => r.id !== id);
  try {
    localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(updated));
    cachedRaw = JSON.stringify(updated);
    cachedHistory = updated;
    notifyListeners();
  } catch (e) {
    console.error("[WatqHistory] Failed to delete history record:", e);
  }
}

export function clearAllHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_HISTORY_KEY);
    cachedRaw = null;
    cachedHistory = [];
    notifyListeners();
  } catch (e) {
    console.error("[WatqHistory] Failed to clear history:", e);
  }
}

/* ========================================================================= */
/* GDPR SOVEREIGN DATA PORTABILITY & CRYPTOGRAPHIC PURGE (ZERO-DATABASE)   */
/* ========================================================================= */

export interface WatqSovereignBackup {
  version: string;
  schema: "watq_sovereign_backup_v1";
  exportedAt: string;
  history: AssessmentHistoryRecord[];
  session: unknown;
  customQuestions?: unknown;
}

export function exportSovereignData(): string {
  if (typeof window === "undefined") return "{}";
  const history = getClientHistorySnapshot();
  const rawSession = localStorage.getItem("watq_mvp_session_v1");
  const rawQuestions = localStorage.getItem("watq_custom_questions_v1");

  const backup: WatqSovereignBackup = {
    version: "1.1.0",
    schema: "watq_sovereign_backup_v1",
    exportedAt: new Date().toISOString(),
    history,
    session: rawSession ? JSON.parse(rawSession) : null,
    customQuestions: rawQuestions ? JSON.parse(rawQuestions) : null,
  };

  return JSON.stringify(backup, null, 2);
}

export function importSovereignData(jsonString: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const data = JSON.parse(jsonString) as Partial<WatqSovereignBackup>;
    if (data.schema !== "watq_sovereign_backup_v1" && !Array.isArray(data.history)) {
      throw new Error("Invalid WATQ sovereign backup format");
    }

    if (Array.isArray(data.history)) {
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(data.history));
      cachedRaw = JSON.stringify(data.history);
      cachedHistory = data.history;
    }

    if (data.session) {
      localStorage.setItem("watq_mvp_session_v1", JSON.stringify(data.session));
    }

    if (data.customQuestions) {
      localStorage.setItem("watq_custom_questions_v1", JSON.stringify(data.customQuestions));
    }

    notifyListeners();
    return true;
  } catch (err) {
    console.error("[WatqHistory] Import failed:", err);
    return false;
  }
}

export function purgeSovereignData(): void {
  if (typeof window === "undefined") return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith("watq_") || key.startsWith("c15t_"))) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((k) => localStorage.removeItem(k));
  cachedRaw = null;
  cachedHistory = [];
  notifyListeners();
}

