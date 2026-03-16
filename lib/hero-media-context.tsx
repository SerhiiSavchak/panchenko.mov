"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";

/** Explicit hero media lifecycle states */
export type HeroMediaStatus =
  | "idle"
  | "loading"
  | "canplay"
  | "attempting_play"
  | "playing"
  | "fallback"
  | "error";

/** Centralized timing — single source of truth */
export const HERO_MEDIA_TIMING = {
  /** Minimum loader display for polish */
  MIN_REVEAL_DELAY_MS: 900,
  /** Max wait before forcing fallback (must be >= MEDIA_FALLBACK_TIMEOUT_MS) */
  MAX_REVEAL_WAIT_MS: 6000,
  /** Media fallback if canplay/play never resolve */
  MEDIA_FALLBACK_TIMEOUT_MS: 5000,
} as const;

/** Derived: safe to reveal hero (playing or intentional fallback) */
export function isRevealAllowed(status: HeroMediaStatus): boolean {
  return status === "playing" || status === "fallback" || status === "error";
}

interface HeroMediaContextValue {
  status: HeroMediaStatus;
  setStatus: React.Dispatch<React.SetStateAction<HeroMediaStatus>>;
  /** Resolves when hero can be revealed. Never resolves into broken state. */
  revealPromise: Promise<void>;
  /** Call when media reaches playing or fallback. Idempotent. */
  resolveReveal: () => void;
  /** Call from loader maxWait: force fallback so loader can dismiss safely. */
  forceFallback: () => void;
}

const HeroMediaContext = createContext<HeroMediaContextValue | null>(null);

export function HeroMediaProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<HeroMediaStatus>("idle");
  const resolveRef = useRef<(() => void) | null>(null);
  const resolvedRef = useRef(false);

  const [revealPromise] = useState(
    () =>
      new Promise<void>((resolve) => {
        resolveRef.current = resolve;
      })
  );

  const resolveReveal = useCallback(() => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    resolveRef.current?.();
    resolveRef.current = null;
  }, []);

  const forceFallback = useCallback(() => {
    setStatus((s) => {
      if (isRevealAllowed(s)) return s;
      return "fallback";
    });
    resolveReveal();
  }, [resolveReveal]);

  return (
    <HeroMediaContext.Provider
      value={{
        status,
        setStatus,
        revealPromise,
        resolveReveal,
        forceFallback,
      }}
    >
      {children}
    </HeroMediaContext.Provider>
  );
}

export function useHeroMedia() {
  return useContext(HeroMediaContext);
}
