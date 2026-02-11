"use client";

import { useRef, useEffect, useState } from "react";

interface VideoInViewProps {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoInView({ src, poster, className = "" }: VideoInViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

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
  }, []);

  if (hasError) {
    return (
      <div
        className={`bg-muted ${className}`}
        style={poster ? { backgroundImage: `url(${poster})`, backgroundSize: "cover" } : undefined}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className={className}
      onError={() => setHasError(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
