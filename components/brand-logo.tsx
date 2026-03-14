"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";

export type BrandLogoVariant = "static" | "header" | "loader";
export type BrandLogoSize = "sm" | "md" | "lg";

const LOGO_SRC = "/logo-panchenko.png";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  className?: string;
  /** Header/footer: enable hover effects. Loader: enable entrance animations */
  animate?: boolean;
}

/**
 * PANCHENKO logo — оригинальная граффити-надпись с прозрачным фоном.
 */
export function BrandLogo({
  variant = "static",
  size = "md",
  className = "",
  animate = true,
}: BrandLogoProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const doAnimate = variant === "loader" && animate && !reducedMotion;

  const sizes = { sm: "h-10", md: "h-12 md:h-14", lg: "h-14 md:h-16" };
  const loaderSize = "w-[min(65vw,11rem)] md:w-[14rem]";

  if (variant === "loader") {
    return (
      <div
        className={`relative overflow-hidden ${doAnimate ? "graffiti-logo-reveal" : ""} ${className}`}
        aria-label="PANCHENKO"
      >
        <Image
          src={LOGO_SRC}
          alt="PANCHENKO"
          width={320}
          height={100}
          className={`${loaderSize} h-auto object-contain object-center drop-shadow-[0_0_16px_rgba(255,255,255,0.15)] mix-blend-screen`}
          priority
          unoptimized
        />
      </div>
    );
  }

  // Header / static — компактный контейнер, mask убирает чёрный фон
  const blockWidths = { sm: "w-[5rem]", md: "w-[6.5rem] md:w-[8rem]", lg: "w-[7rem] md:w-[9rem]" };
  return (
    <div
      className={`inline-flex items-center justify-center leading-[0] logo-graffiti overflow-hidden pointer-events-auto ${blockWidths[size]} ${className}`}
      aria-label="PANCHENKO"
    >
      <div
        className={`${sizes[size]} w-full bg-foreground pointer-events-none ${variant === "header" ? "translate-y-[3px]" : ""}`}
        style={
          {
            maskImage: `url(${LOGO_SRC})`,
            WebkitMaskImage: `url(${LOGO_SRC})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskMode: "luminance",
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskMode: "luminance",
          } as CSSProperties
        }
      />
    </div>
  );
}
