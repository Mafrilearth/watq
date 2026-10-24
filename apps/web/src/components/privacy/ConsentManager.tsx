"use client";

import { ConsentBanner, ConsentDialog, ConsentRoot, offline } from "@c15t/nextjs";
import type { ReactNode } from "react";

export function ConsentManager({ children }: { children: ReactNode }) {
  return (
    <ConsentRoot
      config={{
        mode: offline(),
      }}
    >
      {children}
      <ConsentBanner />
      <ConsentDialog />
    </ConsentRoot>
  );
}
