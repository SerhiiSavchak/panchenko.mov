"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { HERO_VIDEO } from "@/lib/media";

type HeroVideoStatus = "loading" | "playing" | "fallback";

/**
 * Hero background video — true background layer, not interactive.
 * - Autoplay with explicit play() for reliable mobile support
 * - Graceful fallback to poster when autoplay is blocked
 * - No controls, no play icon, no frozen frame
 */
interface HeroVideoProps {
  onReady?: () => void;
}

export function HeroVideo({ onReady }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const onReadyCalled = useRef(false);
  const [status, setStatus] = useState<HeroVideoStatus>("loading");

  const notifyReady = useCallback(() => {
    if (onReadyCalled.current) return;
    onReadyCalled.current = true;
    onReady?.();
  }, [onReady]);

  const attemptPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    const playPromise = v.play();
    if (playPromise === undefined) {
      // Sync play (legacy)
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
        // Autoplay blocked (e.g. mobile Safari, low power mode)
        setStatus("fallback");
        notifyReady();
      });
  }, [notifyReady]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleCanPlay = () => {
      if (status !== "loading") return;
      attemptPlay();
    };
    const handlePlay = () => {
      setStatus("playing");
      notifyReady();
    };
    const handleError = () => {
      setStatus("fallback");
      notifyReady();
    };

    v.addEventListener("canplay", handleCanPlay);
    v.addEventListener("play", handlePlay);
    v.addEventListener("error", handleError);

    // Already loaded (cached or event fired before listener)
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
    };
  }, [status, attemptPlay, notifyReady]);

  const showVideo = status === "playing";

  const videoSrc = HERO_VIDEO.useLocalHero ? "/videos/hero.mp4" : HERO_VIDEO.video;

  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Poster — visible until video is actually playing */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${HERO_VIDEO.poster})`,
          opacity: showVideo ? 0 : 1,
        }}
      />
      <video
        ref={videoRef}
        src={`${videoSrc}#t=0.001`}
        poster={HERO_VIDEO.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        className="hero-video-bg absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: showVideo ? 1 : 0 }}
      />
    </div>
  );
}
