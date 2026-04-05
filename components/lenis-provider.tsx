"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import type { LenisOptions } from "lenis";
import { useTelegramWebView } from "@/lib/telegram-webview-context";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({
  children,
  options = {},
}: {
  children: React.ReactNode;
  options?: LenisOptions;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const optionsRef = useRef(options);
  const { resolved, isTelegram } = useTelegramWebView();

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!resolved) return;
    if (isTelegram) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    const lenisInstance = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      syncTouch: false,
      anchors: true,
      ...optionsRef.current,
    });

    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
      setLenis(null);
    };
  }, [resolved, isTelegram]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
