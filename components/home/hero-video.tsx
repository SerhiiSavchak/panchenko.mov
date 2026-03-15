"use client";

import { useEffect } from "react";
import { HERO_VIDEO } from "@/lib/media";
import { useHeroMedia } from "@/lib/use-hero-media";

/**
 * Hero background video — non-interactive visual layer.
 * - Autoplay with explicit play() for mobile Safari / Chrome
 * - Graceful fallback to poster when autoplay blocked
 * - No controls, no play icon, no broken states
 * - Pauses when scrolled out for performance (optional)
 */
interface HeroVideoProps {
  onReady?: () => void;
  /** When true, video is paused (e.g. when hero is off-screen) */
  paused?: boolean;
}

export function HeroVideo({ onReady, paused = false }: HeroVideoProps) {
  const { videoRef, status, pause, play } = useHeroMedia({ onReady });

  useEffect(() => {
    if (status !== "playing") return;
    if (paused) pause();
    else play();
  }, [paused, status, pause, play]);

  const showVideo = status === "playing";
  const videoSrc = HERO_VIDEO.useLocalHero ? "/videos/hero.mp4" : HERO_VIDEO.video;

  return (
    <div className="absolute inset-0" aria-hidden>
      {/* Poster — visible until video is playing; premium fallback when autoplay blocked */}
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
        controls={false}
        controlsList="nodownload nofullscreen noremoteplayback"
        className="hero-video-bg absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: showVideo ? 1 : 0 }}
      />
    </div>
  );
}
