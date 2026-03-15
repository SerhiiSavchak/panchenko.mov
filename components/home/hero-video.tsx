"use client";

import { useRef, useEffect, useLayoutEffect, useCallback, useState } from "react";
import { HERO_VIDEO } from "@/lib/media";

/**
 * Hero background video — minimal, reliable implementation.
 *
 * Strategy:
 * - Video loads with page (in SSR HTML, preload in head)
 * - Native poster + custom overlay for Safari compatibility
 * - Single readiness signal: play() succeeded
 * - Handles pre-hydration: events can fire before React attaches handlers (React #15446)
 * - readyState check on mount catches missed events
 */

const VIDEO_SRC = `${HERO_VIDEO.video}#t=0.001`;
const LOAD_TIMEOUT_MS = 8000;

// readyState: 3=HAVE_FUTURE_DATA, 4=HAVE_ENOUGH_DATA — can play
const CAN_PLAY_STATE = 3;

interface HeroVideoProps {
  onReady?: () => void;
}

export function HeroVideo({ onReady }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const notifiedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const notifyReady = useCallback(() => {
    if (notifiedRef.current) return;
    notifiedRef.current = true;
    onReady?.();
  }, [onReady]);

  const clearLoadTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => {
        clearLoadTimeout();
        setShowVideo(true);
        notifyReady();
      })
      .catch(() => {
        clearLoadTimeout();
        notifyReady();
      });
  }, [notifyReady, clearLoadTimeout]);

  const handleCanPlay = useCallback(() => {
    tryPlay();
  }, [tryPlay]);

  // Mount: check if video already loaded (pre-hydration events missed)
  useLayoutEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (v.readyState >= CAN_PLAY_STATE) {
      tryPlay();
      return;
    }

    tryPlay(); // Also attempt immediately — play() may resolve when ready
  }, [tryPlay]);

  // Timeout fallback — stop waiting after LOAD_TIMEOUT_MS
  useEffect(() => {
    if (notifiedRef.current) return;
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      notifyReady(); // Let loader dismiss; poster stays visible
    }, LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [notifyReady]);

  return (
    <div className="absolute inset-0">
      {/* Fallback gradient — visible when video fails or as base */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0a0f14] to-[#050505]"
        aria-hidden
      />

      {/* Poster — visible until first frame (Safari black flash fix) */}
      {HERO_VIDEO.poster && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${HERO_VIDEO.poster})`,
            opacity: showVideo ? 0 : 1,
          }}
          aria-hidden
        />
      )}

      {/* Video — fades in when first frame ready */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={handleCanPlay}
        onLoadedData={handleCanPlay}
        onPlay={handleCanPlay}
        onError={() => {
          clearLoadTimeout();
          notifyReady();
        }}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: showVideo ? 1 : 0 }}
      />
    </div>
  );
}
