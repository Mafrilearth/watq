export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Server runtime initialization
    console.info("[Instrumentation:App] Server runtime registered.");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    // Edge runtime initialization
    console.info("[Instrumentation:App] Edge runtime registered.");
  }
}
