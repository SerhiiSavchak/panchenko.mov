"use client";

import { useState, useEffect } from "react";

export function GraffitiLoader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const hideAt = reducedMotion ? 400 : 2400;
    const timer = setTimeout(() => setVisible(false), hideAt);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) {
      const unmount = setTimeout(() => setMounted(false), 600);
      return () => clearTimeout(unmount);
    }
  }, [visible]);

  if (!mounted) return null;

  return (
    <div
      className={`graffiti-loader fixed inset-0 z-[100] bg-background flex items-center justify-center ${!visible ? "graffiti-loader-exit" : ""}`}
    >
      <div className="relative">
        <div
          className="absolute -inset-16 bg-accent/10 blur-3xl rounded-full graffiti-glow"
          aria-hidden="true"
        />
        <div className="relative graffiti-logo-box">
          <svg
            viewBox="0 0 500 80"
            className="w-72 md:w-[28rem] h-auto relative"
            aria-label="panchenko.mov"
          >
            {/* Graffiti drip elements - street art style */}
            {!reducedMotion && (
              <>
                <rect x="78" y="55" width="2" fill="var(--color-accent)" className="graffiti-drip graffiti-drip-1" />
                <rect x="248" y="55" width="2" fill="var(--color-foreground)" className="graffiti-drip graffiti-drip-2" />
                <rect x="420" y="55" width="2" fill="var(--color-accent)" className="graffiti-drip graffiti-drip-3" />
              </>
            )}
            <text
              x="10"
              y="48"
              fontSize="52"
              fill="var(--color-foreground)"
              style={{ fontFamily: "var(--font-display)" }}
              className="graffiti-text"
              strokeDasharray={600}
              stroke="var(--color-foreground)"
              strokeWidth="0.5"
            >
              panchenko
            </text>
            <text
              x="365"
              y="48"
              fontSize="52"
              fill="var(--color-accent)"
              style={{ fontFamily: "var(--font-display)" }}
              className="graffiti-mov"
            >
              .mov
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
