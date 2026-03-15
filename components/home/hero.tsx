"use client";

import { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";
import { HeroVideo } from "@/components/home/hero-video";
import { useHeroReady } from "@/lib/hero-ready-context";
import { useLoaderDismissed } from "@/lib/loader-dismissed-context";
import { useReducedMotion } from "@/lib/hooks";

const CYCLING_WORDS = ["RAP", "CARS", "FIGHT", "BRAND"] as const;

interface HeroProps {
  onQuoteOpen: () => void;
}

const HERO_VISIBILITY_THRESHOLD = 0.3;

export function Hero({ onQuoteOpen }: HeroProps) {
  const heroReady = useHeroReady();
  const onVideoReady = useCallback(() => heroReady?.setReady(), [heroReady]);
  const loaderDismissed = useLoaderDismissed()?.isDismissed ?? false;
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const currentWord = CYCLING_WORDS[wordIndex];
  const measureRef = useRef<HTMLSpanElement>(null);
  const [wordWidth, setWordWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [videoPaused, setVideoPaused] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVideoPaused((entry?.intersectionRatio ?? 0) < HERO_VISIBILITY_THRESHOLD);
      },
      { threshold: HERO_VISIBILITY_THRESHOLD }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setWordWidth(measureRef.current.offsetWidth);
    }
  }, [currentWord]);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <HeroVideo onReady={onVideoReady} paused={videoPaused} />
        <div className="absolute inset-0 bg-background/25" aria-hidden="true" />
      </div>

      <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full px-6 sm:px-8 md:px-12 text-center pointer-events-auto">
        {/* Badge — based in worldwide */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6 sm:mb-8">
          <motion.span
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={loaderDismissed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(8px)" }}
            transition={{
              duration: 1.4,
              delay: 0.5,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="text-[10px] uppercase tracking-widest text-foreground/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          >
            based in worldwide
          </motion.span>
        </div>

        {/* Headline — FROM STREET TO [word] — анимация после скрытия лоадера */}
        <motion.h1
          className="relative font-display text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-tight text-foreground text-balance overflow-hidden mt-2"
          initial={{ opacity: 0, y: "-0.3em", filter: "blur(12px)", scale: 0.97 }}
          animate={loaderDismissed ? { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 } : { opacity: 0, y: "-0.3em", filter: "blur(12px)", scale: 0.97 }}
          transition={{
            duration: 1.6,
            delay: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="relative z-20 block">FROM STREET</span>
          <span className="relative z-20 block flex justify-center">
            <span className="inline-flex items-baseline gap-[0.12em] relative">
              <span
                ref={measureRef}
                className="absolute left-0 top-0 opacity-0 pointer-events-none select-none whitespace-nowrap"
                aria-hidden
              >
                {currentWord}
              </span>
              <span className="whitespace-nowrap">TO</span>
              <motion.span
                animate={{ width: wordWidth || "auto" }}
                transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
                className="text-accent relative z-10 inline-block align-baseline min-h-[1.2em] overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    initial={reducedMotion ? {} : { opacity: 0, y: 16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reducedMotion ? {} : { opacity: 0, y: -16, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="neon-glow inline-block"
                  >
                    {currentWord}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
            </span>
          </span>
        </motion.h1>

        {/* Subtext — minimal, 2 lines */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={loaderDismissed ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(4px)" }}
          transition={{
            duration: 1.1,
            delay: 1.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-8 text-sm md:text-base text-foreground/90 max-w-xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] space-y-1"
        >
          <span className="block">Brand & product storytelling.</span>
          <span className="block">Cinematic short-form.</span>
        </motion.div>

        {/* Buttons — scale + fade with subtle bounce */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.88 }}
          animate={loaderDismissed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.88 }}
          transition={{
            duration: 1.2,
            delay: 2.2,
            ease: [0.34, 1.4, 0.64, 1],
          }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <MagneticButton variant="primary" onClick={onQuoteOpen}>Book a Shoot</MagneticButton>
          <MagneticButton variant="secondary" href="#featured">Watch Work</MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator — final reveal */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={loaderDismissed ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.9 }}
        transition={{
          duration: 1,
          delay: 2.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-10"
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
