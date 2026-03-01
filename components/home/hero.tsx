"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";
import { HERO_VIDEO } from "@/lib/media";
import { useHeroReady } from "@/lib/hero-ready-context";

interface HeroProps {
  onQuoteOpen: () => void;
}

export function Hero({ onQuoteOpen }: HeroProps) {
  const heroReady = useHeroReady();
  const onVideoReady = useCallback(() => heroReady?.setReady(), [heroReady]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video layer — pointer-events: none so CTA clicks pass through */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <HeroVideo onReady={onVideoReady} />
        {/* Dark overlay — improves text contrast on video */}
        <div className="absolute inset-0 bg-background/25" aria-hidden="true" />
      </div>

      <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-auto">
        {/* Floating badges — blur-to-focus, staggered cascade */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {["In-house @hutsyfinancial", "Toronto", "Cinematic short-form"].map((badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.4,
                delay: 0.5 + i * 0.22,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="text-[10px] uppercase tracking-widest text-foreground/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
            >
              {badge}
            </motion.span>
          ))}
        </div>

        {/* Headline — two-line cinematic reveal: first line descends, second pops */}
        <h1 className="relative font-display text-[clamp(3.5rem,14vw,11rem)] leading-[0.88] tracking-tight text-foreground text-balance overflow-hidden">
          <motion.span
            className="relative z-20 block"
            initial={{ opacity: 0, y: "-0.3em", filter: "blur(12px)", scale: 0.97 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 1.6,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            EVERY FRAME
          </motion.span>
          <motion.span
            className="text-accent relative z-10 neon-glow block"
            initial={{ opacity: 0, y: 48, filter: "blur(6px)", scale: 0.92 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{
              duration: 1.3,
              delay: 1.35,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            TELLS
          </motion.span>
        </h1>

        {/* Subtext — each line fades up with stagger */}
        <div className="mt-6 flex flex-col items-center gap-1 text-sm md:text-base text-foreground/90 max-w-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          {[
            "Toronto-based filmmaker.",
            "In-house @hutsyfinancial.",
            "Brand & product storytelling.",
            "Cinematic short-form.",
          ].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.1,
                delay: 1.7 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.1,
            delay: 2.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-4 text-xs uppercase tracking-widest text-accent"
        >
          {"Let\u2019s make something timeless."}
        </motion.p>

        {/* Buttons — scale + fade with subtle bounce */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            delay: 2.5,
            ease: [0.34, 1.4, 0.64, 1],
          }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <MagneticButton variant="primary" onClick={onQuoteOpen}>Book a Shoot</MagneticButton>
          <MagneticButton variant="secondary" href="#featured">Watch Work</MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator — final reveal */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1,
          delay: 3.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-accent to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}

const LOAD_TIMEOUT_MS = 8000;

function HeroVideo({ onReady }: { onReady?: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const attemptPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => {
        setIsReady(true);
        onReady?.();
      })
      .catch(() => setHasFailed(true));
  }, [onReady]);

  const handleCanPlay = useCallback(() => attemptPlay(), [attemptPlay]);
  const handleLoadedData = useCallback(() => attemptPlay(), [attemptPlay]);

  const handleError = useCallback(() => setHasFailed(true), []);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.1) {
          attemptPlay();
        }
      },
      { threshold: [0, 0.1, 0.3, 0.5, 1], rootMargin: "0px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [attemptPlay]);

  useEffect(() => {
    if (hasFailed || isReady) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }
    timeoutRef.current = setTimeout(() => setHasFailed(true), LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasFailed, isReady]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {hasFailed && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_VIDEO.fallbackImage})` }}
          aria-hidden
        />
      )}
      {!hasFailed && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster={HERO_VIDEO.poster}
          onCanPlay={handleCanPlay}
          onLoadedData={handleLoadedData}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO.video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
