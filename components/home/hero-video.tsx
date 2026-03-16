"use client";

import { useEffect } from "react";
import { HERO_VIDEO } from "@/lib/media";
import { useHeroMedia } from "@/lib/hero-media-context";
import { useHeroMediaLifecycle } from "@/lib/use-hero-media-lifecycle";

/**
 * Hero background video — non-interactive visual layer.
 * - Single poster layer (no duplication with video poster attribute)
 * - Deterministic reveal: video or fallback, never broken
 * - No controls, no play icon
 */
interface HeroVideoProps {
  /** When true, video is paused (e.g. when hero is off-screen) */
  paused?: boolean;
}

export function HeroVideo({ paused = false }: HeroVideoProps) {
  const ctx = useHeroMedia();
  const { setVideoRef, pause, play } = useHeroMediaLifecycle();

  const status = ctx?.status ?? "idle";
  const showVideo = status === "playing";
  const showPoster = !showVideo;

  useEffect(() => {
    if (status !== "playing") return;
    if (paused) pause();
    else play();
  }, [paused, status, pause, play]);

  const videoSrc = HERO_VIDEO.useLocalHero ? "/videos/hero.mp4" : HERO_VIDEO.video;

  if (!ctx) return null;

  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Single poster layer — visible until video is playing; fallback when autoplay blocked */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${HERO_VIDEO.poster})`,
          opacity: showPoster ? 1 : 0,
          pointerEvents: "none",
        }}
      />
      <video
        ref={setVideoRef}
        src={`${videoSrc}#t=0.001`}
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
        className="hero-video-bg absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: showVideo ? 1 : 0 }}
      />
    </div>
  );
}
