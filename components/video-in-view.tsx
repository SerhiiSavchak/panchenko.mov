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
  const containerRef = useRef<HTMLDivElement>(null);
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
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = videoSrc;
            video.preload = "auto";
          }
          video.play().catch(() => {});
        } else {
          video.pause();
          video.removeAttribute("src");
          video.load();
        }
      },
      { threshold: 0.25, rootMargin: "50px 0px" }
    );

    observer.observe(container);
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
    <div ref={containerRef} className={`relative ${className}`}>
      {poster && (
        <div
          className="absolute inset-0 bg-cover bg-center -z-10"
          style={{ backgroundImage: `url(${poster})` }}
          aria-hidden
        />
      )}
      <video
        ref={videoRef}
        key={videoSrc}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        className="absolute inset-0 w-full h-full object-cover"
        onError={handleError}
      />
    </div>
  );
}
