"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Dispatch exception to Sentry telemetry
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#08090C] text-slate-100 flex items-center justify-center p-6 antialiased font-sans">
        <div className="w-full max-w-lg rounded-2xl bg-white/[0.03] border border-white/10 p-8 text-center backdrop-blur-xl shadow-2xl space-y-6">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center font-mono text-xl">
            !
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-medium tracking-tight text-white">
              System Execution Disruption
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
              An unhandled anomaly occurred within the application runtime. Diagnostics have been
              transmitted to telemetry.
            </p>
          </div>

          {error.digest && (
            <div className="inline-block px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] text-slate-400">
              Digest: {error.digest}
            </div>
          )}

          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-xl bg-[#D4F024] text-[#08090C] font-semibold text-xs hover:bg-[#c2dd1f] transition-colors"
            >
              Recover Session
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
