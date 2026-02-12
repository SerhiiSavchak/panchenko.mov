"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

/** Static poster only. No video. Use for grid items that should not autoplay. */
interface VideoPosterOnlyProps {
  poster: string;
  alt: string;
  className?: string;
  aspectRatio?: "4/5" | "3/4" | "9/16" | "16/9";
}

export function VideoPosterOnly({
  poster,
  alt,
  className,
  aspectRatio = "9/16",
}: VideoPosterOnlyProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatio === "4/5" && "aspect-[4/5]",
        aspectRatio === "3/4" && "aspect-[3/4]",
        aspectRatio === "9/16" && "aspect-[9/16]",
        aspectRatio === "16/9" && "aspect-video",
        className
      )}
    >
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="(max-width: 768px) 40vw, 224px"
        loading="lazy"
        className="object-cover"
      />
    </div>
  );
}
