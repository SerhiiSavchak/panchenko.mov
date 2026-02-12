"use client";

import { useState, useEffect } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { useReducedMotion } from "@/lib/hooks";

export function GraffitiLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const duration = reducedMotion ? 400 : 1800;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) {
      const unmount = setTimeout(() => setMounted(false), 500);
      return () => clearTimeout(unmount);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className={`graffiti-loader fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${!visible ? "graffiti-loader-exit" : ""}`}
    >
      {/* Layered background */}
      <div className="absolute inset-0 bg-background" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div
        className="absolute -inset-24 bg-accent/8 blur-[100px] rounded-full graffiti-loader-glow"
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
        <BrandLogo variant="loader" className="mx-auto" />
      </div>
    </div>
  );
}
