const test = require("node:test");
const assert = require("node:assert/strict");
const { createStore } = require("zustand/vanilla");
const { subscribeWithSelector } = require("zustand/middleware");

// =========================================================================
// ZUSTAND V5 STORE MECHANICS & INVARIANT PROOFS
// =========================================================================

test("Zustand v5: UI Store initial state and atomic locale toggle", () => {
  const store = createStore(
    subscribeWithSelector((set) => ({
      locale: "en",
      _hasHydrated: false,
      setLocale: (locale) => set({ locale }),
      toggleLocale: () => set((state) => ({ locale: state.locale === "en" ? "id" : "en" })),
      setHasHydrated: (_hasHydrated) => set({ _hasHydrated }),
    })),
  );

  // Initial state verification
  assert.equal(store.getState().locale, "en");
  assert.equal(store.getState()._hasHydrated, false);

  // Toggle locale: en -> id
  store.getState().toggleLocale();
  assert.equal(store.getState().locale, "id");

  // Toggle locale: id -> en
  store.getState().toggleLocale();
  assert.equal(store.getState().locale, "en");

  // Direct setLocale
  store.getState().setLocale("id");
  assert.equal(store.getState().locale, "id");
});

test("Zustand v5: subscribeWithSelector notifies only on selected slice change", () => {
  const store = createStore(
    subscribeWithSelector((set) => ({
      locale: "en",
      theme: "dark",
      counter: 0,
      setLocale: (locale) => set({ locale }),
      increment: () => set((s) => ({ counter: s.counter + 1 })),
    })),
  );

  let localeNotificationCount = 0;
  let counterNotificationCount = 0;

  // Subscribe only to 'locale'
  const unsubscribeLocale = store.subscribe(
    (state) => state.locale,
    () => {
      localeNotificationCount++;
    },
  );

  // Subscribe only to 'counter'
  const unsubscribeCounter = store.subscribe(
    (state) => state.counter,
    () => {
      counterNotificationCount++;
    },
  );

  // Mutating counter should NOT trigger locale subscriber
  store.getState().increment();
  store.getState().increment();
  assert.equal(counterNotificationCount, 2);
  assert.equal(localeNotificationCount, 0);

  // Mutating locale should trigger locale subscriber
  store.getState().setLocale("id");
  assert.equal(counterNotificationCount, 2);
  assert.equal(localeNotificationCount, 1);

  // Cleanup listeners
  unsubscribeLocale();
  unsubscribeCounter();
});

test("Zustand v5: Assessment Store records responses and navigation bounds", () => {
  const store = createStore(
    subscribeWithSelector((set, get) => ({
      activeModel: "jungian",
      currentIndex: 0,
      responses: {},
      soundEnabled: true,
      setActiveModel: (activeModel) => set({ activeModel, currentIndex: 0, responses: {} }),
      recordResponse: (questionId, value) =>
        set((state) => ({
          responses: { ...state.responses, [questionId]: value },
        })),
      nextQuestion: (total) => {
        const { currentIndex } = get();
        if (currentIndex < total - 1) {
          set({ currentIndex: currentIndex + 1 });
        }
      },
      prevQuestion: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) {
          set({ currentIndex: currentIndex - 1 });
        }
      },
      resetAssessment: () => set({ currentIndex: 0, responses: {} }),
    })),
  );

  // Record response
  store.getState().recordResponse("q_01", 5);
  store.getState().recordResponse("q_02", 4);
  assert.deepEqual(store.getState().responses, { q_01: 5, q_02: 4 });

  // Navigation forwards
  store.getState().nextQuestion(24);
  assert.equal(store.getState().currentIndex, 1);

  // Navigation backwards
  store.getState().prevQuestion();
  assert.equal(store.getState().currentIndex, 0);

  // Backwards boundary invariant (cannot go below 0)
  store.getState().prevQuestion();
  assert.equal(store.getState().currentIndex, 0);

  // Switching model resets progress
  store.getState().setActiveModel("bigfive");
  assert.equal(store.getState().activeModel, "bigfive");
  assert.deepEqual(store.getState().responses, {});
  assert.equal(store.getState().currentIndex, 0);
});
