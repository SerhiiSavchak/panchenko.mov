"use client";

import { useRef, useEffect, useState } from "react";

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
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => setHasError(true));
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {!hasError ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setHasError(true)}
        >
          <source src={src} type="video/mp4" />
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
