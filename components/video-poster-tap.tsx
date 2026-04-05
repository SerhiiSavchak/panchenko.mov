"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Poster by default. Tap/click to play with sound. Optional native fullscreen while playing. */
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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const handleToggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    const startPlayback = () => {
      v.muted = false;
      v.volume = 1;
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          v.muted = true;
          v.play()
            .then(() => {
              v.muted = false;
              setIsPlaying(true);
            })
            .catch(() => {});
        });
    };

    if (!hasLoaded) {
      v.preload = "auto";
      v.src = src;
      v.load();
      setHasLoaded(true);

      let kicked = false;
      const kick = () => {
        if (kicked) return;
        kicked = true;
        startPlayback();
      };

      v.addEventListener("canplay", kick, { once: true });
      v.addEventListener("error", () => {}, { once: true });
      queueMicrotask(() => {
        if (v.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) kick();
      });
    } else if (isPlaying) {
      v.pause();
      setIsPlaying(false);
    } else {
      startPlayback();
    }
  }, [src, hasLoaded, isPlaying]);

  const toggleFullscreen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const el = containerRef.current;
      if (!el) return;
      if (document.fullscreenElement) {
        void document.exitFullscreen?.();
      } else {
        void el.requestFullscreen?.().catch(() => {});
      }
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-muted group/vpt",
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
        priority
        className={cn(
          "object-cover transition-opacity duration-300",
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      />
      <video
        ref={videoRef}
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
        aria-label={isPlaying ? "Pause video" : "Play video with sound"}
      >
        <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center text-2xl">
          {isPlaying ? "❚❚" : "▶"}
        </span>
      </button>
      {isPlaying && (
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute bottom-3 right-3 z-20 px-3 py-1.5 text-[10px] uppercase tracking-widest bg-background/80 text-foreground border border-border hover:border-accent hover:text-accent transition-colors"
          aria-label={isFs ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFs ? "Exit" : "Fullscreen"}
        </button>
      )}
    </div>
  );
}
