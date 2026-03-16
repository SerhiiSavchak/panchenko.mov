"use client";

import { type ReactNode } from "react";
import { LenisProvider } from "@/components/lenis-provider";
import { ActivePreviewProvider } from "@/lib/active-preview-context";
import { WorkFilterProvider } from "@/lib/work-filter-context";
import { HeroMediaProvider } from "@/lib/hero-media-context";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <HeroMediaProvider>
        <ActivePreviewProvider>
          <WorkFilterProvider>{children}</WorkFilterProvider>
        </ActivePreviewProvider>
      </HeroMediaProvider>
    </LenisProvider>
  );
}
