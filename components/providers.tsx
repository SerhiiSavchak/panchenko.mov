"use client";

import { type ReactNode } from "react";
import { ActivePreviewProvider } from "@/lib/active-preview-context";
import { WorkFilterProvider } from "@/lib/work-filter-context";
import { HeroReadyProvider } from "@/lib/hero-ready-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HeroReadyProvider>
      <ActivePreviewProvider>
        <WorkFilterProvider>{children}</WorkFilterProvider>
      </ActivePreviewProvider>
    </HeroReadyProvider>
  );
}
