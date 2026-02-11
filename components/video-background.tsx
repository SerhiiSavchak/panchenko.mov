"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { HERO_FALLBACKS } from "@/lib/media";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  overlay?: boolean;
}

export function VideoBackground({
  src,
  poster,
  className = "",
  overlay = true,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (videoSrc === src && HERO_FALLBACKS.length > 0) {
      setVideoSrc(HERO_FALLBACKS[Math.floor(Math.random() * HERO_FALLBACKS.length)]);
    } else {
      setHasError(true);
    }
  }, [videoSrc, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setHasError(true));
  }, [videoSrc]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {!hasError ? (
        <video
          ref={videoRef}
          key={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          onError={handleError}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : poster ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}
      {overlay && (
        <div className="absolute inset-0 bg-background/70" aria-hidden="true" />
      )}
    </div>
  );
}
