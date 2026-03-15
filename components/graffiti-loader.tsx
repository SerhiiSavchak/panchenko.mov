"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { BrandLogo } from "@/components/brand-logo";
import { useReducedMotion } from "@/lib/hooks";
import { useHeroReady } from "@/lib/hero-ready-context";
import { useLoaderDismissed } from "@/lib/loader-dismissed-context";

const MIN_DISPLAY_MS = 900;  // Краткий показ — hero появляется быстро
const MAX_WAIT_MS = 2000;    // Не блокировать дольше 2с

export function GraffitiLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [maxWaitPassed, setMaxWaitPassed] = useState(false);
  const reducedMotion = useReducedMotion();
  const heroReady = useHeroReady();
  const setLoaderDismissed = useLoaderDismissed()?.setDismissed;

  useEffect(() => {
    const t1 = setTimeout(() => setMinTimePassed(true), MIN_DISPLAY_MS);
    const t2 = setTimeout(() => setMaxWaitPassed(true), MAX_WAIT_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => {
        setVisible(false);
        setLoaderDismissed?.();
      }, 400);
      return () => clearTimeout(t);
    }
    // Hero показываем при minTime ИЛИ video ready — что раньше (не ждём оба)
    const canReveal = minTimePassed || heroReady?.isReady || maxWaitPassed;
    if (canReveal) {
      setVisible(false);
      setLoaderDismissed?.();
    }
  }, [reducedMotion, minTimePassed, maxWaitPassed, heroReady?.isReady, setLoaderDismissed]);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => setMounted(false), 400);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!mounted || typeof document === "undefined") return null;

  const content = (
    <div
      className={`spray-loader fixed inset-0 z-[100] overflow-hidden ${!visible ? "spray-loader-exit" : ""}`}
      aria-hidden
    >
      <div className="spray-loader-wall absolute inset-0 bg-black" aria-hidden />
      <div className="spray-loader-content absolute inset-0 flex items-center justify-center">
        <div className="spray-loader-scene relative flex items-center justify-center">
          <div className="spray-can-icon absolute z-10" aria-hidden>
            <svg viewBox="0 0 80 100" className="spray-can-svg w-14 h-[5.5rem] md:w-[4.5rem] md:h-[6.5rem]">
              <defs>
                <linearGradient id="can-body" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1a1a1a" />
                  <stop offset="15%" stopColor="#2d2d2d" />
                  <stop offset="50%" stopColor="#e8e8e8" />
                  <stop offset="85%" stopColor="#2d2d2d" />
                  <stop offset="100%" stopColor="#1a1a1a" />
                </linearGradient>
                <linearGradient id="can-cap" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4a4a4a" />
                  <stop offset="50%" stopColor="#2a2a2a" />
                  <stop offset="100%" stopColor="#1a1a1a" />
                </linearGradient>
                <linearGradient id="can-nozzle" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
                <radialGradient id="spray-fill" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(14,165,233,0.8)" />
                  <stop offset="100%" stopColor="rgba(14,165,233,0)" />
                </radialGradient>
                <filter id="can-glow">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <ellipse cx="40" cy="28" rx="18" ry="6" fill="url(#can-body)" />
              <path d="M22 28 L22 78 Q22 84 40 84 Q58 84 58 78 L58 28" fill="url(#can-body)" stroke="#333" strokeWidth="1" />
              <ellipse cx="40" cy="78" rx="18" ry="6" fill="#151515" />
              <path d="M24 42 Q40 40 56 42" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.9" />
              <path d="M24 56 Q40 54 56 56" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.7" />
              <path d="M24 70 Q40 68 56 70" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5" />
              <ellipse cx="40" cy="18" rx="14" ry="4" fill="url(#can-cap)" />
              <path d="M26 18 L26 24 Q40 26 54 24 L54 18" fill="url(#can-cap)" stroke="#222" strokeWidth="0.5" />
              <rect x="34" y="8" width="12" height="10" rx="2" fill="#333" />
              <g filter="url(#can-glow)">
                <path d="M58 42 L75 44 L72 54 L58 52 Z" fill="url(#can-nozzle)" stroke="#38bdf8" strokeWidth="0.5" />
                <g className="spray-stream">
                  <ellipse cx="78" cy="48" rx="12" ry="8" fill="url(#spray-fill)" opacity="0.6" />
                  <circle cx="82" cy="46" r="2" fill="rgba(14,165,233,0.5)" className="spray-dot" />
                  <circle cx="86" cy="48" r="1.5" fill="rgba(14,165,233,0.4)" className="spray-dot spray-dot-2" />
                  <circle cx="90" cy="47" r="1" fill="rgba(14,165,233,0.3)" className="spray-dot spray-dot-3" />
                </g>
              </g>
            </svg>
          </div>
          <div className="spray-loader-logo loader-logo-visible">
            <BrandLogo variant="loader" animate={false} />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
