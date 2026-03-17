"use client";

import { useEffect, useRef } from "react";
import { HERO_VIDEO } from "@/lib/media";
import { HERO_MEDIA_TIMING } from "@/lib/hero-media-context";
import { useHeroMedia } from "@/lib/hero-media-context";
import { useHeroMediaLifecycle } from "@/lib/use-hero-media-lifecycle";

/**
 * Hero background video — non-interactive visual layer.
 *
 * Architecture:
 * - Video loads with opacity 1 (poster covers it) — avoids browser throttling of hidden media
 * - Poster is on top; fades out when video reaches "playing"
 * - Retry play() when loader dismisses (Hero becomes visible) if first attempt failed
 */
interface HeroVideoProps {
  /** When true, video is paused (e.g. when hero is off-screen) */
  paused?: boolean;
  /** When true, loader has dismissed — Hero is visible, safe to retry play if in fallback */
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

  const videoSrc = HERO_VIDEO.useLocalHero ? "/videos/hero.mp4" : HERO_VIDEO.video;

  if (!ctx) return null;

  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Video: native poster covers black until loaded; our div layer provides stable first frame */}
      <video
        ref={setVideoRef}
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
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        className="hero-video-bg absolute inset-0 h-full w-full object-cover"
        style={{ opacity: 1 }}
      />
      {/* Poster: on top, solid bg fallback so never transparent over black; fades out when video playing */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 z-[1]"
        style={{
          backgroundColor: "var(--color-background)",
          backgroundImage: `url(${HERO_VIDEO.poster})`,
          opacity: showPoster ? 1 : 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
