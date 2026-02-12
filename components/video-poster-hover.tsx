"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Poster by default. Loads and plays video ONLY on hover (desktop) or tap (mobile). */
interface VideoPosterHoverProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  aspectRatio?: "4/5" | "3/4" | "16/9" | "video";
  /** Controlled mode: parent controls active state (e.g. Link hover) */
  isActive?: boolean;
  /** Fill parent container (absolute inset-0) */
  fill?: boolean;
}

export function VideoPosterHover({
  src,
  poster,
  alt,
  className,
  aspectRatio = "4/5",
  isActive: isActiveProp,
  fill,
}: VideoPosterHoverProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActiveInternal, setIsActiveInternal] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const isActive = isActiveProp !== undefined ? isActiveProp : isActiveInternal;

  const handleActivate = useCallback(() => {
    if (isActiveProp === undefined) setIsActiveInternal(true);
  }, [isActiveProp]);

  const handleDeactivate = useCallback(() => {
    if (isActiveProp === undefined) setIsActiveInternal(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.removeAttribute("src");
      v.load();
    }
    setHasLoaded(false);
  }, [isActiveProp]);

  const handleLoadedData = useCallback(() => {
    setHasLoaded(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatio === "4/5" && "aspect-[4/5]",
        aspectRatio === "3/4" && "aspect-[3/4]",
        aspectRatio === "16/9" && "aspect-video",
        aspectRatio === "video" && "aspect-video",
        fill && "absolute inset-0 w-full h-full",
        className
      )}
      onMouseEnter={isActiveProp === undefined ? handleActivate : undefined}
      onMouseLeave={isActiveProp === undefined ? handleDeactivate : undefined}
      onClick={isActiveProp === undefined ? handleActivate : undefined}
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
        className={cn(
          "object-cover transition-opacity duration-300",
          isActive && hasLoaded ? "opacity-0" : "opacity-100"
        )}
      />
      {isActive && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          onLoadedData={handleLoadedData}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            hasLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ opacity: hasLoaded ? 1 : 0 }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
