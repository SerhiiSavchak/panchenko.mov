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
const LOAD_TIMEOUT_MS = 4000; // Align with loader max wait; notify so loader can dismiss

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
        notifyReady(); // play() succeeded — we have playing video
      })
      .catch(() => {
        clearLoadTimeout();
        setShowVideo(true);
        notifyReady(); // Autoplay blocked — show current frame
      });
  }, [notifyReady, clearLoadTimeout]);

  // Called when we have a displayable frame (canplay/loadeddata/play or readyState on mount)
  const handleHasData = useCallback(() => {
    setShowVideo(true);
    notifyReady(); // Signal ready — loader can dismiss when minTime also passed
    tryPlay();
  }, [notifyReady, tryPlay]);

  const handleCanPlay = useCallback(() => {
    handleHasData();
  }, [handleHasData]);

  // Mount: check if video already loaded (pre-hydration events missed)
  useLayoutEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (v.readyState >= CAN_PLAY_STATE) {
      handleHasData();
      return;
    }

    tryPlay(); // Attempt play; canplay will fire when ready
  }, [handleHasData, tryPlay]);

  // Timeout fallback — stop waiting after LOAD_TIMEOUT_MS
  useEffect(() => {
    if (notifiedRef.current) return;
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setShowVideo(true);
      notifyReady(); // Fallback — show whatever we have
    }, LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [notifyReady]);

  return (
    <div className="absolute inset-0">
      {/* Base: gradient + poster — poster is first frame, prevents black screen */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: HERO_VIDEO.poster ? `url(${HERO_VIDEO.poster})` : undefined,
          backgroundColor: "#0a0f14",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/80 pointer-events-none"
        aria-hidden
      />

      {/* Video — fades in over poster when first frame ready */}
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
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
        style={{ opacity: showVideo ? 1 : 0 }}
      />
    </div>
  );
}
