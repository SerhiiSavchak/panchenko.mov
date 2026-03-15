"use client";

import { useRef, useEffect, useState, useCallback } from "react";

export type HeroMediaStatus = "loading" | "playing" | "fallback";

/**
 * Hero media lifecycle hook.
 * Manages video element: load → canplay → attempt play → playing | fallback.
 * Guarantees: onReady fires exactly once when media is in a safe visual state.
 */
export function useHeroMedia(options: { onReady?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onReadyCalled = useRef(false);
  const [status, setStatus] = useState<HeroMediaStatus>("loading");

  const notifyReady = useCallback(() => {
    if (onReadyCalled.current) return;
    onReadyCalled.current = true;
    options.onReady?.();
  }, [options.onReady]);

  const attemptPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    const playPromise = v.play();
    if (playPromise === undefined) {
      setStatus("playing");
      notifyReady();
      return;
    }

    playPromise
      .then(() => {
        setStatus("playing");
        notifyReady();
      })
      .catch(() => {
        setStatus("fallback");
        notifyReady();
      });
  }, [notifyReady]);

  // Safety: force fallback if video never loads (e.g. stalled, browser bug)
  useEffect(() => {
    if (status !== "loading") return;
    const t = setTimeout(() => {
      setStatus((s) => (s === "loading" ? "fallback" : s));
      notifyReady();
    }, 5000);
    return () => clearTimeout(t);
  }, [status, notifyReady]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleCanPlay = () => {
      if (v.paused) attemptPlay();
      else {
        setStatus("playing");
        notifyReady();
      }
    };

    const handlePlay = () => {
      setStatus("playing");
      notifyReady();
    };

    const handleError = () => {
      setStatus("fallback");
      notifyReady();
    };

    const handleStalled = () => {
      setStatus("fallback");
      notifyReady();
    };

    const handleAbort = () => {
      setStatus("fallback");
      notifyReady();
    };

    v.addEventListener("canplay", handleCanPlay);
    v.addEventListener("play", handlePlay);
    v.addEventListener("error", handleError);
    v.addEventListener("stalled", handleStalled);
    v.addEventListener("abort", handleAbort);

    if (v.readyState >= 3) {
      if (v.paused) attemptPlay();
      else {
        setStatus("playing");
        notifyReady();
      }
    }

    return () => {
      v.removeEventListener("canplay", handleCanPlay);
      v.removeEventListener("play", handlePlay);
      v.removeEventListener("error", handleError);
      v.removeEventListener("stalled", handleStalled);
      v.removeEventListener("abort", handleAbort);
    };
  }, [attemptPlay, notifyReady]);

  const pause = useCallback(() => videoRef.current?.pause(), []);
  const play = useCallback(() => videoRef.current?.play().catch(() => {}), []);

  return {
    videoRef,
    status,
    isReady: status === "playing" || status === "fallback",
    pause,
    play,
  };
}
