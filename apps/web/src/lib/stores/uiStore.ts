import { useEffect, useState } from "react";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

export interface UIState {
  locale: "en" | "id";
  _hasHydrated: boolean;
  setLocale: (locale: "en" | "id") => void;
  toggleLocale: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

/**
 * Modern Zustand v5 UI Preferences Store.
 * Equipped with:
 * - `subscribeWithSelector`: Fine-grained external subscriptions.
 * - `persist`: LocalStorage persistence with hydration event hooks.
 * - `devtools`: Redux DevTools time-travel debugging in non-production.
 */
export const useUIStore = create<UIState>()(
  devtools(
    persist(
      subscribeWithSelector((set) => ({
        locale: "en",
        _hasHydrated: false,
        setLocale: (locale) => set({ locale }, false, "ui/setLocale"),
        toggleLocale: () =>
          set(
            (state) => ({ locale: state.locale === "en" ? "id" : "en" }),
            false,
            "ui/toggleLocale",
          ),
        setHasHydrated: (hasHydrated) =>
          set({ _hasHydrated: hasHydrated }, false, "ui/setHasHydrated"),
      })),
      {
        name: "watq_ui_preferences",
        // Hydration tracking callback to prevent SSR mismatches
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
    {
      name: "WATQ UI Store",
      enabled: process.env.NODE_ENV !== "production",
    },
  ),
);

// ============================================================================
// ATOMIC SELECTORS (Zero-re-render optimization)
// ============================================================================

export const useLocale = () => useUIStore((state) => state.locale);
export const useSetLocale = () => useUIStore((state) => state.setLocale);
export const useToggleLocale = () => useUIStore((state) => state.toggleLocale);
export const useUIHasHydrated = () => useUIStore((state) => state._hasHydrated);

/**
 * Universal SSR hydration hook for Zustand stores in Next.js App Router.
 * Ensures the component returns undefined or fallback during initial server render,
 * and updates cleanly once client hydration has finished, avoiding React 19 mismatch errors.
 */
export function useHydratedStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  selector: (state: T) => F,
  fallback?: F,
): F | undefined {
  const result = store(selector as (state: T) => unknown) as F;
  const [data, setData] = useState<F | undefined>(fallback);

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
}
