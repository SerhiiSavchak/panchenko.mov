"use client";

import { useRef, useEffect, useCallback } from "react";
import { useVideoManager } from "@/lib/video-manager";
import { cn } from "@/lib/utils";

interface VideoManagedProps {
  id: string;
  src: string;
  poster: string;
  priority?: number;
  className?: string;
  /** Only load when in viewport (data-src pattern) */
  rootMargin?: string;
}

export function VideoManaged({
  id,
  src,
  poster,
  priority = 5,
  className,
  rootMargin = "100px 0px",
}: VideoManagedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const manager = useVideoManager();

  const play = useCallback(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  const unload = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.removeAttribute("src");
      v.load();
    }
  }, []);

  useEffect(() => {
    if (!manager) return;

    const unregister = manager.register(id, priority, { play, pause, unload });
    return unregister;
  }, [id, priority, manager, play, pause, unload]);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video || !manager) return;

    let loaded = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded) {
            loaded = true;
            video.src = src;
            video.preload = "metadata";
          }
          manager.requestPlay(id);
        } else {
          manager.release(id);
        }
      },
      { threshold: 0.15, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [id, src, manager]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        className={cn("w-full h-full object-cover", className)}
      />
    </div>
  );
}
