"use client";

import { useEffect, useRef } from "react";
import { getHeroPosterSrc, getHeroVideoSrc } from "@/lib/media";
import { HERO_MEDIA_TIMING } from "@/lib/hero-media-context";
import { useHeroMedia } from "@/lib/hero-media-context";
import { useHeroMediaLifecycle } from "@/lib/use-hero-media-lifecycle";

/**
 * Hero background video — full-bleed, non-interactive visual layer.
 * Poster fades out when video plays.
 */
interface HeroVideoProps {
  paused?: boolean;
  loaderDismissed?: boolean;
}

export function HeroVideo({ paused = false, loaderDismissed = false }: HeroVideoProps) {
  const ctx = useHeroMedia();
  const { setVideoRef, pause, play, retryPlay } = useHeroMediaLifecycle();

  const status = ctx?.status ?? "idle";
  const showVideo = status === "playing";
  const showPoster = !showVideo;

  const prevLoaderDismissedRef = useRef(false);
  const retryScheduledRef = useRef(false);

  useEffect(() => {
    if (status !== "playing") return;
    if (paused) pause();
    else play();
  }, [paused, status, pause, play]);

  useEffect(() => {
    const wasDismissed = prevLoaderDismissedRef.current;
    prevLoaderDismissedRef.current = loaderDismissed;

    if (!loaderDismissed) return;
    if (wasDismissed) return;

    if (status !== "fallback" && status !== "error") return;
    if (retryScheduledRef.current) return;

    retryScheduledRef.current = true;
    const t = setTimeout(() => {
      retryPlay();
    }, HERO_MEDIA_TIMING.RETRY_AFTER_LOADER_MS);

    return () => clearTimeout(t);
  }, [loaderDismissed, status, retryPlay]);

  const videoSrc = getHeroVideoSrc();
  const posterSrc = getHeroPosterSrc();

  if (!ctx) return null;

  return (
    <div className="absolute inset-0" aria-hidden>
      <video
        ref={setVideoRef}
        src={`${videoSrc}#t=0.001`}
        poster={posterSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        className="hero-video-bg absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 1 }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 z-[1]"
        style={{
          backgroundColor: "var(--color-background)",
          backgroundImage: `url(${posterSrc})`,
          opacity: showPoster ? 1 : 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
