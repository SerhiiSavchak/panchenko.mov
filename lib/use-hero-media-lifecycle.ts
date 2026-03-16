"use client";

import { useRef, useCallback, useEffect } from "react";
import {
  useHeroMedia,
  HERO_MEDIA_TIMING,
  isRevealAllowed,
  type HeroMediaStatus,
} from "./hero-media-context";

/**
 * Connects a video element to the hero media lifecycle.
 * Uses ref callback to attach listeners immediately when element mounts.
 *
 * Key improvements:
 * - Video loads with poster on top (video never hidden during load)
 * - play() failure goes to fallback but resolveReveal lets loader dismiss
 * - retryPlay() allows recovery when Hero becomes visible after loader
 * - Single fallback timeout; loader has its own safety net
 */
export function useHeroMediaLifecycle() {
  const ctx = useHeroMedia();
  const ctxRef = useRef(ctx);
  ctxRef.current = ctx;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const listenersRef = useRef<(() => void) | null>(null);
  const fallbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    const c = ctxRef.current;
    if (!c) return;

    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }

    listenersRef.current?.();
    listenersRef.current = null;
    videoRef.current = null;

    if (!el) return;
    videoRef.current = el;

    const { setStatus, revealApi } = c;
    const { resolveReveal } = revealApi;

    const attemptPlay = () => {
      const v = videoRef.current;
      if (!v) return;

      setStatus("attempting_play");
      const playPromise = v.play();

      if (playPromise === undefined) {
        setStatus("playing");
        resolveReveal();
        return;
      }

      playPromise
        .then(() => {
          setStatus("playing");
          resolveReveal();
        })
        .catch(() => {
          setStatus("fallback");
          resolveReveal();
        });
    };

    const handleCanPlay = () => {
      const v = videoRef.current;
      if (!v) return;

      if (v.paused) {
        attemptPlay();
      } else {
        setStatus("playing");
        resolveReveal();
      }
    };

    const handlePlay = () => {
      setStatus("playing");
      resolveReveal();
    };

    const handleError = () => {
      setStatus("fallback");
      resolveReveal();
    };

    const handleStalled = () => {
      setStatus("fallback");
      resolveReveal();
    };

    const handleAbort = () => {
      setStatus("fallback");
      resolveReveal();
    };

    el.addEventListener("canplay", handleCanPlay);
    el.addEventListener("play", handlePlay);
    el.addEventListener("error", handleError);
    el.addEventListener("stalled", handleStalled);
    el.addEventListener("abort", handleAbort);

    listenersRef.current = () => {
      el.removeEventListener("canplay", handleCanPlay);
      el.removeEventListener("play", handlePlay);
      el.removeEventListener("error", handleError);
      el.removeEventListener("stalled", handleStalled);
      el.removeEventListener("abort", handleAbort);
    };

    setStatus("loading");

    if (el.readyState >= 3) {
      if (el.paused) {
        attemptPlay();
      } else {
        setStatus("playing");
        resolveReveal();
      }
      return;
    }

    fallbackTimeoutRef.current = setTimeout(() => {
      fallbackTimeoutRef.current = null;
      const current = ctxRef.current;
      if (!current) return;

      current.setStatus((s: HeroMediaStatus) => {
        if (isRevealAllowed(s)) return s;
        return "fallback";
      });
      current.revealApi.resolveReveal();
    }, HERO_MEDIA_TIMING.MEDIA_FALLBACK_TIMEOUT_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      listenersRef.current?.();
      listenersRef.current = null;
    };
  }, []);

  const pause = useCallback(() => videoRef.current?.pause(), []);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      const c = ctxRef.current;
      if (c) {
        c.setStatus("fallback");
        c.revealApi.resolveReveal();
      }
    });
  }, []);

  /**
   * Retry play() when Hero is visible (e.g. after loader dismissal).
   * Call only when status is fallback — HeroVideo controls this.
   */
  const retryPlay = useCallback(() => {
    const v = videoRef.current;
    const c = ctxRef.current;
    if (!v || !c) return;

    c.setStatus((s: HeroMediaStatus) => {
      if (s !== "fallback" && s !== "error") return s;
      return "attempting_play";
    });

    v.play()
      .then(() => {
        const curr = ctxRef.current;
        if (curr) {
          curr.setStatus("playing");
          curr.revealApi.resolveReveal();
        }
      })
      .catch(() => {
        const curr = ctxRef.current;
        if (curr) {
          curr.setStatus("fallback");
          curr.revealApi.resolveReveal();
        }
      });
  }, []);

  return {
    setVideoRef,
    pause,
    play,
    retryPlay,
  };
}
