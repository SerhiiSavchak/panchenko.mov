"use client";

import { useEffect, useState } from "react";

export type BrandLogoVariant = "static" | "header" | "loader";
export type BrandLogoSize = "sm" | "md" | "lg";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  size?: BrandLogoSize;
  className?: string;
  /** Header/footer: enable hover effects. Loader: enable entrance animations */
  animate?: boolean;
}

/**
 * Unified logo: graffiti + cinema camera. Works static (header/footer) and animated (loader).
 * Dark + neon compatible. Clean vector SVG. Scalable.
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

  const sizes = { sm: "h-6", md: "h-8", lg: "h-12" };
  const loaderSize = "w-72 md:w-[28rem]";

  if (variant === "loader") {
    return (
      <div
        className={`relative ${doAnimate ? "animated-logo-box" : ""} ${className}`}
        aria-label="panchenko.mov"
      >
        <svg
          viewBox="0 0 520 100"
          className={`${loaderSize} h-auto relative`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Cinema camera — detailed body + lens */}
          <g className={doAnimate ? "animated-logo-camera" : ""} transform="translate(0, 10)">
            {/* Body */}
            <path
              d="M 10 18 L 10 52 L 62 52 L 62 18 L 54 18 L 54 8 L 18 8 L 18 18 Z"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="text-foreground"
            />
            {/* Lens */}
            <circle
              cx="36"
              cy="35"
              r="16"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              className="text-foreground"
            />
            <circle
              cx="36"
              cy="35"
              r="10"
              stroke="var(--color-accent)"
              strokeWidth="2"
              fill="none"
              className="opacity-70 neon-glow"
            />
            <circle
              cx="36"
              cy="35"
              r="5"
              stroke="var(--color-accent)"
              strokeWidth="1"
              fill="none"
              className="opacity-50"
            />
            {/* Viewfinder */}
            <path
              d="M 44 4 L 44 14 L 52 14 L 52 4 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-foreground/60"
            />
            {/* REC */}
            <circle
              cx="56"
              cy="22"
              r="4"
              fill="var(--color-accent)"
              className={doAnimate ? "animated-logo-rec" : ""}
            />
            {/* Graffiti drips */}
            {doAnimate && (
              <>
                <line
                  x1="16"
                  y1="52"
                  x2="14"
                  y2="68"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  className="animated-logo-drip animated-logo-drip-1"
                />
                <line
                  x1="58"
                  y1="52"
                  x2="60"
                  y2="65"
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  className="animated-logo-drip animated-logo-drip-2"
                />
              </>
            )}
          </g>

          {/* Text — panchenko.mov как единое целое */}
          <text
            y="56"
            fontSize="46"
            fill="var(--color-foreground)"
            style={{ fontFamily: "var(--font-display)" }}
            className={doAnimate ? "animated-logo-text" : ""}
            stroke="var(--color-foreground)"
            strokeWidth="0.5"
            strokeDasharray={doAnimate ? 600 : undefined}
          >
            <tspan x="88">panchenko</tspan>
            <tspan fill="var(--color-accent)" className="neon-glow">.mov</tspan>
          </text>
        </svg>
      </div>
    );
  }

  // Header / static — compact icon + text
  return (
    <div
      className={`inline-flex items-center gap-2 group logo-graffiti ${animate ? "logo-hover" : ""} ${className}`}
      aria-label="panchenko.mov"
    >
      <svg
        viewBox="0 0 48 48"
        className={`${sizes[size]} aspect-square shrink-0`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {/* Cinema camera icon */}
        <path
          d="M 8 14 L 8 38 L 40 38 L 40 14 L 32 14 L 32 6 L 16 6 L 16 14 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground group-hover:text-accent transition-colors"
        />
        <circle
          cx="24"
          cy="26"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-foreground group-hover:text-accent transition-colors"
        />
        <circle
          cx="24"
          cy="26"
          r="6"
          stroke="var(--color-accent)"
          strokeWidth="1"
          className="opacity-70 group-hover:opacity-100 transition-opacity"
        />
        <circle
          cx="24"
          cy="26"
          r="3"
          stroke="var(--color-accent)"
          strokeWidth="0.5"
          className="opacity-50"
        />
        <path
          d="M 34 4 L 34 10 L 40 10 L 40 4 Z"
          stroke="currentColor"
          strokeWidth="1"
          className="text-foreground/60"
        />
        <circle
          cx="36"
          cy="18"
          r="2.5"
          fill="var(--color-accent)"
          className="group-hover:animate-pulse"
        />
        {/* Drips */}
        <line
          x1="12"
          y1="38"
          x2="10"
          y2="46"
          stroke="var(--color-accent)"
          strokeWidth="1"
          className="opacity-50 group-hover:opacity-80 transition-opacity"
        />
        <line
          x1="36"
          y1="38"
          x2="38"
          y2="44"
          stroke="var(--color-accent)"
          strokeWidth="1"
          className="opacity-40 group-hover:opacity-60 transition-opacity"
        />
      </svg>

      <div
        className={`flex items-baseline gap-0 font-display tracking-tight ${
          size === "sm" ? "text-base" : size === "md" ? "text-xl" : "text-2xl"
        }`}
      >
        <span className="text-foreground group-hover:text-foreground transition-colors">
          panchenko
        </span>
        <span className="text-accent transition-colors neon-glow">.mov</span>
      </div>
    </div>
  );
}
