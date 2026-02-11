"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { REEL_FALLBACKS } from "@/lib/media";

interface VideoInViewProps {
  src: string;
  poster?: string;
  className?: string;
  fallbackIndex?: number;
}

export function VideoInView({
  src,
  poster,
  className = "",
  fallbackIndex = 0,
}: VideoInViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (videoSrc === src && REEL_FALLBACKS.length > 0) {
      setVideoSrc(REEL_FALLBACKS[fallbackIndex % REEL_FALLBACKS.length]);
    } else {
      setHasError(true);
    }
  }, [videoSrc, src, fallbackIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  if (hasError) {
    return (
      <div
        className={`bg-muted ${className}`}
        style={
          poster
            ? { backgroundImage: `url(${poster})`, backgroundSize: "cover" }
            : undefined
        }
      />
    );
  }

  return (
    <video
      ref={videoRef}
      key={videoSrc}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className={className}
      onError={handleError}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}
