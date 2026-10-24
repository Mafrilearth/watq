import type {
  AnyAssessmentResult,
  AssessmentModelType,
  AssessmentSession,
  LikertValue,
} from "@/types/assessment";

const STORAGE_KEY = "watq_mvp_session_v1";

let memorySession: AssessmentSession | null = null;
let cachedRaw: string | null = null;
let cachedSnapshot: AssessmentSession | null = null;

const listeners = new Set<() => void>();

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

export function subscribeSession(callback: () => void): () => void {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      // Invalidate cache on external window storage change
      cachedRaw = null;
      callback();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function generateUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Cached snapshot getter adhering strictly to React 19 useSyncExternalStore contract.
 * Preserves object reference identity when localStorage content has not changed.
 */
export function getClientSessionSnapshot(): AssessmentSession | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw && cachedSnapshot !== null) {
      return cachedSnapshot;
    }
    cachedRaw = raw;
    if (!raw) {
      cachedSnapshot = memorySession;
      return cachedSnapshot;
    }
    const parsed = JSON.parse(raw) as AssessmentSession;
    if (parsed && parsed.sessionId && parsed.instrumentId) {
      cachedSnapshot = parsed;
    } else {
      cachedSnapshot = null;
    }
    return cachedSnapshot;
  } catch {
    return memorySession;
  }
}

export function getServerSessionSnapshot(): AssessmentSession | null {
  return null;
}

export function getSession(): AssessmentSession | null {
  return getClientSessionSnapshot();
}

export function saveSession(session: AssessmentSession): void {
  session.updatedAt = new Date().toISOString();
  memorySession = session;
  cachedSnapshot = session;

  if (typeof window !== "undefined") {
    try {
      const raw = JSON.stringify(session);
      cachedRaw = raw;
      window.localStorage.setItem(STORAGE_KEY, raw);
    } catch {
      // Fallback to memory on quota error
    }
  }
  notifyListeners();
}

export function initSession(
  instrumentId = "jungian-16",
  modelType: AssessmentModelType = "jungian",
): AssessmentSession {
  const newSession: AssessmentSession = {
    sessionId: generateUUID(),
    instrumentId,
    modelType,
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null,
    currentIndex: 0,
    responses: {},
    result: null,
  };
  saveSession(newSession);
  return newSession;
}

export function updateSessionResponse(
  questionId: string,
  value: LikertValue,
  nextIndex: number,
): AssessmentSession {
  const current = getSession() ?? initSession();
  current.responses[questionId] = value;
  current.currentIndex = nextIndex;
  saveSession(current);
  return current;
}

export function completeSession(result: AnyAssessmentResult): AssessmentSession {
  const current = getSession() ?? initSession();
  current.result = result;
  current.completedAt = new Date().toISOString();
  saveSession(current);
  return current;
}

export function clearSession(): void {
  memorySession = null;
  cachedRaw = null;
  cachedSnapshot = null;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // No-op
    }
  }
  notifyListeners();
}
