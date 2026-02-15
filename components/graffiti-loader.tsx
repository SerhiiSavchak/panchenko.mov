"use client";

import { useState, useEffect } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useReducedMotion } from "@/lib/hooks";
import { useHeroReady } from "@/lib/hero-ready-context";

const FALLBACK_MS = 15000; // Show content after 15s even if video not ready

export function GraffitiLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const reducedMotion = useReducedMotion();
  const heroReady = useHeroReady();

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }
    if (heroReady?.isReady) setVisible(false);
    const fallback = setTimeout(() => {
      heroReady?.setForceShow();
      setVisible(false);
    }, FALLBACK_MS);
    return () => clearTimeout(fallback);
  }, [reducedMotion, heroReady]);

  useEffect(() => {
    if (!visible) {
      const unmount = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(unmount);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className={`graffiti-loader fixed inset-0 z-[100] overflow-hidden ${!visible ? "graffiti-loader-exit" : ""}`}
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-background" aria-hidden />
      <div
        className="graffiti-loader-noise absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="graffiti-loader-vignette absolute inset-0" aria-hidden />
      <div
        className="graffiti-loader-glow absolute left-1/2 top-1/2 h-[240px] w-[min(85vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[70px]"
        aria-hidden
      />
      <div className="graffiti-loader-sweep absolute inset-0" aria-hidden />

      {/* Content - centered via grid place-items */}
      <div className="graffiti-loader-content absolute inset-0 flex items-center justify-center">
        <div className="graffiti-loader-logo">
          <BrandLogo variant="loader" />
        </div>
      </div>
    </div>
  );
}
