"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
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
  /** Max wait before forcing fallback (loader safety net) */
  MAX_REVEAL_WAIT_MS: 6000,
  /** Media fallback if canplay/play never resolve — only timeout in media lifecycle */
  MEDIA_FALLBACK_TIMEOUT_MS: 5000,
} as const;

/** Derived: safe to reveal hero (playing or intentional fallback) */
export function isRevealAllowed(status: HeroMediaStatus): boolean {
  return status === "playing" || status === "fallback" || status === "error";
}

/** Stable API for loader — never changes reference, prevents effect re-runs */
interface HeroRevealApi {
  /** Resolves when hero can be revealed. Never resolves into broken state. */
  revealPromise: Promise<void>;
  /** Call when media reaches playing or fallback. Idempotent. */
  resolveReveal: () => void;
  /** Force fallback so loader can dismiss safely. */
  forceFallback: () => void;
}

interface HeroMediaContextValue {
  status: HeroMediaStatus;
  setStatus: React.Dispatch<React.SetStateAction<HeroMediaStatus>>;
  /** Stable API — use this for loader to avoid effect re-runs on status changes */
  revealApi: HeroRevealApi;
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

  /** Stable object — same reference across renders, safe for loader effect deps */
  const revealApi = useMemo<HeroRevealApi>(
    () => ({
      revealPromise,
      resolveReveal,
      forceFallback,
    }),
    [revealPromise, resolveReveal, forceFallback]
  );

  const value = useMemo<HeroMediaContextValue>(
    () => ({
      status,
      setStatus,
      revealApi,
    }),
    [status, revealApi]
  );

  return (
    <HeroMediaContext.Provider value={value}>
      {children}
    </HeroMediaContext.Provider>
  );
}

export function useHeroMedia() {
  return useContext(HeroMediaContext);
}

/** Hook for loader only — returns stable revealApi to avoid effect churn */
export function useHeroRevealApi() {
  const ctx = useContext(HeroMediaContext);
  return ctx?.revealApi ?? null;
}
