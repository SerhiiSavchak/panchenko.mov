"use client";

import { type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaBlockProps {
  src: string;
  alt: string;
  sizes?: string;
  aspectRatio?: "4/3" | "3/4" | "16/9" | "9/16";
  /** Gradient overlay */
  gradient?: boolean;
  /** Badge overlay */
  badge?: ReactNode;
  className?: string;
  imageClassName?: string;
}

export function MediaBlock({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  aspectRatio = "4/3",
  gradient = true,
  badge,
  className,
  imageClassName,
}: MediaBlockProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatio === "4/3" && "aspect-[4/3]",
        aspectRatio === "3/4" && "aspect-[3/4]",
        aspectRatio === "16/9" && "aspect-[16/9]",
        aspectRatio === "9/16" && "aspect-[9/16]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading="lazy"
        className={cn("object-cover", imageClassName)}
      />
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      )}
      {badge && (
        <div className="absolute top-2 left-2 z-10">{badge}</div>
      )}
    </div>
  );
}
