"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const MOBILE_BREAKPOINT = 768;

/** Poster by default. Loads and plays video ONLY on hover (desktop) or tap (mobile). */
interface VideoPosterHoverProps {
  src: string;
  poster: string;
  alt: string;
  /** Mobile-optimized URL (SD/720p) for reliable decode on iPhone. Falls back to src if not provided. */
  mobileSrc?: string;
  className?: string;
  aspectRatio?: "4/5" | "3/4" | "16/9" | "9/16" | "video";
  /** Controlled mode: parent controls active state (e.g. Link hover) */
  isActive?: boolean;
  /** Fill parent container (absolute inset-0) */
  fill?: boolean;
  /** Above-the-fold: use priority loading, no lazy (first 6 cards) */
  priority?: boolean;
}

export function VideoPosterHover({
  src,
  poster,
  alt,
  mobileSrc,
  className,
  aspectRatio = "4/5",
  isActive: isActiveProp,
  fill,
  priority = false,
}: VideoPosterHoverProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActiveInternal, setIsActiveInternal] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState(src);

  const isActive = isActiveProp !== undefined ? isActiveProp : isActiveInternal;

  useEffect(() => {
    const pickSrc = () =>
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT && mobileSrc
        ? mobileSrc
        : src;
    setVideoSrc(pickSrc());
    const onResize = () => setVideoSrc(pickSrc());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [src, mobileSrc]);

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
        aspectRatio === "9/16" && "aspect-[9/16]",
        aspectRatio === "video" && "aspect-video",
        fill && "absolute inset-0 w-full h-full",
        className
      )}
      onMouseEnter={isActiveProp === undefined ? handleActivate : undefined}
      onMouseLeave={isActiveProp === undefined ? handleDeactivate : undefined}
      onClick={isActiveProp === undefined ? handleActivate : undefined}
    >
      {/* Skeleton placeholder - no layout shift (aspect ratio reserved) */}
      <div
        className={cn(
          "absolute inset-0 skeleton-shimmer transition-opacity duration-300",
          imageLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        aria-hidden
      />
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        quality={85}
        onLoad={() => setImageLoaded(true)}
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
          preload="metadata"
          poster={poster}
          onLoadedData={handleLoadedData}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            hasLoaded ? "opacity-100" : "opacity-0"
          )}
          style={{ opacity: hasLoaded ? 1 : 0 }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
