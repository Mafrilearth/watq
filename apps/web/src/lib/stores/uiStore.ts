import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  locale: "en" | "id";
  setLocale: (locale: "en" | "id") => void;
  toggleLocale: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
      toggleLocale: () =>
        set((state) => ({ locale: state.locale === "en" ? "id" : "en" })),
    }),
    {
      name: "watq_ui_preferences",
    }
  )
);
