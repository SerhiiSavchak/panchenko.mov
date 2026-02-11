"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { REEL_VIDEOS } from "@/lib/media";

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
  const [triedFallback, setTriedFallback] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!triedFallback) {
      setTriedFallback(true);
      setVideoSrc(REEL_VIDEOS[fallbackIndex % REEL_VIDEOS.length]);
    } else {
      setHasError(true);
    }
  }, [triedFallback, fallbackIndex]);

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
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

  if (hasError) {
    return (
      <div
        className={`bg-muted flex items-center justify-center ${className}`}
        style={
          poster
            ? { backgroundImage: `url(${poster})`, backgroundSize: "cover", backgroundPosition: "center" }
            : undefined
        }
      >
        {!poster && (
          <span className="text-muted-foreground text-xs uppercase tracking-wider">No preview</span>
        )}
      </div>
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
