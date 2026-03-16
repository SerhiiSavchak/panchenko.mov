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
 * Uses ref callback to attach listeners immediately when element mounts —
 * eliminates canplay race where listeners were attached too late in an effect.
 */
export function useHeroMediaLifecycle() {
  const ctx = useHeroMedia();
  const ctxRef = useRef(ctx);
  ctxRef.current = ctx;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const listenersRef = useRef<(() => void) | null>(null);

  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    const c = ctxRef.current;
    if (!c) return;

      // Cleanup previous
      listenersRef.current?.();
      listenersRef.current = null;
      videoRef.current = null;

      if (!el) return;
      videoRef.current = el;

      const { setStatus, resolveReveal } = c;

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

      // Cannot miss canplay: check readyState immediately
      if (el.readyState >= 3) {
        if (el.paused) {
          attemptPlay();
        } else {
          setStatus("playing");
          resolveReveal();
        }
      }
  }, []);

  useEffect(() => {
    const c = ctxRef.current;
    if (!c) return;

    const t = setTimeout(() => {
      c.setStatus((s: HeroMediaStatus) => {
        if (isRevealAllowed(s)) return s;
        return "fallback";
      });
      c.resolveReveal();
    }, HERO_MEDIA_TIMING.MEDIA_FALLBACK_TIMEOUT_MS);

    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      listenersRef.current?.();
      listenersRef.current = null;
    };
  }, []);

  const pause = useCallback(() => videoRef.current?.pause(), []);
  const play = useCallback(() => {
    videoRef.current?.play().catch(() => {
      ctxRef.current?.setStatus("fallback");
      ctxRef.current?.resolveReveal();
    });
  }, []);

  return {
    setVideoRef,
    pause,
    play,
  };
}
