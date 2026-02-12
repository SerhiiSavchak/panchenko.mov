"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Poster by default. Tap/click to play video inline. */
interface VideoPosterTapProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  aspectRatio?: "16/9" | "4/5" | "3/4";
}

export function VideoPosterTap({
  src,
  poster,
  alt,
  className,
  aspectRatio = "16/9",
}: VideoPosterTapProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleToggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!hasLoaded) {
      v.src = src;
      v.preload = "auto";
      setHasLoaded(true);
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    } else if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [src, hasLoaded, isPlaying]);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatio === "16/9" && "aspect-video",
        aspectRatio === "4/5" && "aspect-[4/5]",
        aspectRatio === "3/4" && "aspect-[3/4]",
        className
      )}
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 80vw"
        loading="lazy"
        className={cn(
          "object-cover transition-opacity duration-300",
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
          isPlaying ? "opacity-100" : "opacity-0"
        )}
        style={{ opacity: isPlaying ? 1 : 0 }}
        onClick={handleToggle}
      />
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "absolute inset-0 flex items-center justify-center z-10 bg-black/20 hover:bg-black/30 transition-colors",
          isPlaying && "opacity-0 pointer-events-none"
        )}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-2xl">
          {isPlaying ? "❚❚" : "▶"}
        </span>
      </button>
    </div>
  );
}
