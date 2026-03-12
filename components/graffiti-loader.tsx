"use client";

import { useState, useEffect, useRef } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useReducedMotion } from "@/lib/hooks";
import { useHeroReady } from "@/lib/hero-ready-context";

const MIN_DISPLAY_MS = 800;
const MAX_WAIT_MS = 5000;
const LOADER_DISMISSED_KEY = "graffiti-loader-dismissed";

// React Strict Mode в dev монтирует компонент дважды — пропускаем второй mount
let mountCount = 0;

export function GraffitiLoader() {
  mountCount++;
  const isStrictModeRemount = mountCount > 1;

  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const dismissedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const heroReady = useHeroReady();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(LOADER_DISMISSED_KEY)) {
      setVisible(false);
      dismissedRef.current = true;
      return;
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), MIN_DISPLAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (dismissedRef.current) return;
    if (reducedMotion) {
      const t = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem(LOADER_DISMISSED_KEY, "1");
      }, 400);
      return () => clearTimeout(t);
    }
    if (minTimePassed && heroReady?.isReady) {
      setVisible(false);
      sessionStorage.setItem(LOADER_DISMISSED_KEY, "1");
      return;
    }
    const maxTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem(LOADER_DISMISSED_KEY, "1");
    }, MAX_WAIT_MS);
    return () => clearTimeout(maxTimer);
  }, [reducedMotion, heroReady?.isReady, minTimePassed]);

  useEffect(() => {
    if (!visible) {
      const unmount = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(unmount);
    }
  }, [visible]);

  if (!mounted || isStrictModeRemount) return null;

  return (
    <div
      className={`spray-loader fixed inset-0 z-[100] overflow-hidden ${!visible ? "spray-loader-exit" : ""}`}
    >
      {/* Чёрная стена */}
      <div className="spray-loader-wall absolute inset-0 bg-black" aria-hidden />

      {/* Логотип — появляется как нарисованный баллончиком */}
      <div className="spray-loader-content absolute inset-0 flex items-center justify-center">
        <div className="spray-loader-logo spray-can-reveal">
          <BrandLogo variant="loader" animate={false} />
        </div>
      </div>

      {/* Лёгкий туман от баллончика во время рисования */}
      <div className="spray-loader-mist absolute inset-0 pointer-events-none" aria-hidden />
    </div>
  );
}
