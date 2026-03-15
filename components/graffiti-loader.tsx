"use client";

import { useState, useEffect } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useReducedMotion } from "@/lib/hooks";
import { useHeroReady } from "@/lib/hero-ready-context";
import { useLoaderDismissed } from "@/lib/loader-dismissed-context";

// Loader waits for BOTH min display time AND hero video ready
const MIN_DISPLAY_MS = 2800; // Give video time to load — avoid black screen on reveal
const MAX_WAIT_MS = 5500; // Fallback — never block user longer than this

export function GraffitiLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [maxWaitPassed, setMaxWaitPassed] = useState(false);
  const reducedMotion = useReducedMotion();
  const heroReady = useHeroReady();
  const setLoaderDismissed = useLoaderDismissed()?.setDismissed;

  const hide = () => {
    setVisible(false);
    setLoaderDismissed?.();
  };

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
      const t = setTimeout(hide, 400);
      return () => clearTimeout(t);
    }
    // Hide only when: (minTime AND video ready) OR maxWait fallback
    const canReveal = (minTimePassed && heroReady?.isReady) || maxWaitPassed;
    if (canReveal) {
      hide();
    }
  }, [reducedMotion, heroReady?.isReady, minTimePassed, maxWaitPassed]);

  useEffect(() => {
    if (!visible) {
      const unmount = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(unmount);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className={`spray-loader fixed inset-0 z-[100] overflow-hidden ${!visible ? "spray-loader-exit" : ""}`}
    >
      {/* Чёрная стена */}
      <div className="spray-loader-wall absolute inset-0 bg-black" aria-hidden />

      {/* Логотип + баллончик — появляется как нарисованный распылением */}
      <div className="spray-loader-content absolute inset-0 flex items-center justify-center">
        <div className="spray-loader-scene relative flex items-center justify-center">
          {/* Баллончик в стиле граффити — объёмный, с распылением */}
          <div className="spray-can-icon absolute z-10" aria-hidden>
            <svg
              viewBox="0 0 80 100"
              className="spray-can-svg w-14 h-[5.5rem] md:w-[4.5rem] md:h-[6.5rem]"
            >
              <defs>
                {/* Металлический градиент корпуса */}
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
                {/* Неоновое свечение */}
                <filter id="can-glow">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Корпус — цилиндр с перспективой */}
              <ellipse cx="40" cy="28" rx="18" ry="6" fill="url(#can-body)" />
              <path
                d="M22 28 L22 78 Q22 84 40 84 Q58 84 58 78 L58 28"
                fill="url(#can-body)"
                stroke="#333"
                strokeWidth="1"
              />
              <ellipse cx="40" cy="78" rx="18" ry="6" fill="#151515" />
              {/* Полоски — граффити стиль */}
              <path d="M24 42 Q40 40 56 42" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.9" />
              <path d="M24 56 Q40 54 56 56" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.7" />
              <path d="M24 70 Q40 68 56 70" stroke="#0ea5e9" strokeWidth="2" fill="none" opacity="0.5" />
              {/* Крышка */}
              <ellipse cx="40" cy="18" rx="14" ry="4" fill="url(#can-cap)" />
              <path d="M26 18 L26 24 Q40 26 54 24 L54 18" fill="url(#can-cap)" stroke="#222" strokeWidth="0.5" />
              <rect x="34" y="8" width="12" height="10" rx="2" fill="#333" />
              {/* Сопло + струя */}
              <g filter="url(#can-glow)">
                <path
                  d="M58 42 L75 44 L72 54 L58 52 Z"
                  fill="url(#can-nozzle)"
                  stroke="#38bdf8"
                  strokeWidth="0.5"
                />
                {/* Струя распыления */}
                <g className="spray-stream">
                  <ellipse cx="78" cy="48" rx="12" ry="8" fill="url(#spray-fill)" opacity="0.6" />
                  <circle cx="82" cy="46" r="2" fill="rgba(14,165,233,0.5)" className="spray-dot" />
                  <circle cx="86" cy="48" r="1.5" fill="rgba(14,165,233,0.4)" className="spray-dot spray-dot-2" />
                  <circle cx="90" cy="47" r="1" fill="rgba(14,165,233,0.3)" className="spray-dot spray-dot-3" />
                </g>
              </g>
            </svg>
          </div>
          <div className="spray-loader-logo spray-can-reveal">
            <BrandLogo variant="loader" animate={false} />
          </div>
          {/* Частицы распыления — летят от баллончика к стене */}
          <div className="spray-particles absolute inset-0 pointer-events-none" aria-hidden>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="spray-particle absolute w-1 h-1 rounded-full bg-[#0ea5e9]/60"
                style={{
                  left: `${15 + i * 6}%`,
                  top: `${40 + (i % 3) * 8}%`,
                  animationDelay: `${i * 0.06}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Лёгкий туман от баллончика во время рисования */}
      <div className="spray-loader-mist absolute inset-0 pointer-events-none" aria-hidden />
    </div>
  );
}
