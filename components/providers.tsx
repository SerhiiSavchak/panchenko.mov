"use client";

import { type ReactNode } from "react";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollTopOnHomeEnter } from "@/components/scroll-top-on-home-enter";
import { ActivePreviewProvider } from "@/lib/active-preview-context";
import { HeroMediaProvider } from "@/lib/hero-media-context";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <ScrollTopOnHomeEnter />
      <HeroMediaProvider>
        <ActivePreviewProvider>{children}</ActivePreviewProvider>
      </HeroMediaProvider>
    </LenisProvider>
  );
}
