"use client";

import { type ReactNode } from "react";
import { LenisProvider } from "@/components/lenis-provider";
import { ScrollTopOnHomeEnter } from "@/components/scroll-top-on-home-enter";
import { TelegramViewportClass } from "@/components/telegram-viewport-class";
import { ActivePreviewProvider } from "@/lib/active-preview-context";
import { HeroMediaProvider } from "@/lib/hero-media-context";
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <TelegramViewportClass />
      <ScrollTopOnHomeEnter />
      <HeroMediaProvider>
        <ActivePreviewProvider>{children}</ActivePreviewProvider>
      </HeroMediaProvider>
    </LenisProvider>
  );
}
