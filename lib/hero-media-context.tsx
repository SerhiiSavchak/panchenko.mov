"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  type ReactNode,
} from "react";
import { HERO_VIDEO } from "@/lib/media";

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
  /** Delay before retrying play() after loader dismissal (viewport now visible) */
  RETRY_AFTER_LOADER_MS: 150,
} as const;

/** Derived: safe to reveal hero (playing or intentional fallback) */
export function isRevealAllowed(status: HeroMediaStatus): boolean {
  return status === "playing" || status === "fallback" || status === "error";
}

/** Stable API for loader — poster-first, never blocks on video */
interface HeroPosterReadyApi {
  /** Resolves when poster image is loaded and Hero can show a stable first frame. */
  posterReadyPromise: Promise<void>;
  /** Force poster ready (safety net if image load fails or times out). */
  forcePosterReady: () => void;
}

/** Legacy API for video lifecycle — used by HeroVideo, not for loader dismissal */
interface HeroRevealApi {
  revealPromise: Promise<void>;
  resolveReveal: () => void;
  forceFallback: () => void;
}

interface HeroMediaContextValue {
  status: HeroMediaStatus;
  setStatus: React.Dispatch<React.SetStateAction<HeroMediaStatus>>;
  /** Poster-first API — loader waits for this, not video */
  posterReadyApi: HeroPosterReadyApi;
  /** Video lifecycle API — used by HeroVideo, not for loader */
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

  // Poster readiness — gates loader dismissal, ensures Hero has stable first frame
  const posterResolveRef = useRef<(() => void) | null>(null);
  const posterResolvedRef = useRef(false);
  const [posterReadyPromise] = useState(
    () =>
      new Promise<void>((resolve) => {
        posterResolveRef.current = resolve;
      })
  );

  const forcePosterReady = useCallback(() => {
    if (posterResolvedRef.current) return;
    posterResolvedRef.current = true;
    posterResolveRef.current?.();
    posterResolveRef.current = null;
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => forcePosterReady();
    img.onerror = () => forcePosterReady();
    img.src = HERO_VIDEO.poster;
    return () => {
      img.onload = null;
      img.onerror = null;
      img.src = "";
    };
  }, [forcePosterReady]);

  const posterReadyApi = useMemo<HeroPosterReadyApi>(
    () => ({
      posterReadyPromise,
      forcePosterReady,
    }),
    [posterReadyPromise, forcePosterReady]
  );

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
      posterReadyApi,
      revealApi,
    }),
    [status, posterReadyApi, revealApi]
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

/** Hook for loader — returns poster-ready API (loader waits for poster, not video) */
export function useHeroPosterReadyApi() {
  const ctx = useContext(HeroMediaContext);
  return ctx?.posterReadyApi ?? null;
}

/** Hook for HeroVideo — returns video lifecycle API */
export function useHeroRevealApi() {
  const ctx = useContext(HeroMediaContext);
  return ctx?.revealApi ?? null;
}
