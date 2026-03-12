"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

  const sizes = { sm: "h-14", md: "h-28 md:h-40", lg: "h-32 md:h-44" };
  const loaderSize = "w-[min(90vw,22rem)] md:w-[28rem]";

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
          className={`${loaderSize} h-auto object-contain object-center drop-shadow-[0_0_16px_rgba(255,255,255,0.15)]`}
          priority
          unoptimized
        />
      </div>
    );
  }

  // Header / static — блок обрезан по фактическому контенту (PNG имеет прозрачные поля ~50% по ширине)
  const blockWidths = { sm: "w-[6rem]", md: "w-[9rem] md:w-[14rem]", lg: "w-[10rem] md:w-[16rem]" };
  return (
    <div
      className={`inline-flex items-center justify-center leading-[0] logo-graffiti overflow-hidden ${blockWidths[size]} ${className}`}
      aria-label="PANCHENKO"
    >
      <div className={`${sizes[size]} flex shrink-0 items-center justify-center`}>
        <Image
          src={LOGO_SRC}
          alt="PANCHENKO"
          width={400}
          height={125}
          className="max-h-full w-auto object-contain object-center block"
          priority
          unoptimized
        />
      </div>
    </div>
  );
}
