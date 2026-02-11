"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";
import { HERO_THEMES, type HeroThemeKey } from "@/lib/media";

const CYCLING_WORDS: HeroThemeKey[] = ["rap", "cars", "fight", "brand"];
const DISPLAY_WORDS: Record<HeroThemeKey, string> = {
  rap: "RAP",
  cars: "CARS",
  fight: "FIGHT",
  brand: "BRAND",
};

interface HeroProps {
  onQuoteOpen: () => void;
}

export function Hero({ onQuoteOpen }: HeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const currentKey = CYCLING_WORDS[wordIndex];
  const theme = HERO_THEMES[currentKey];

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Cycle words every 2.5s
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Preload next video
  useEffect(() => {
    const nextIndex = (wordIndex + 1) % CYCLING_WORDS.length;
    const nextKey = CYCLING_WORDS[nextIndex];
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = HERO_THEMES[nextKey].video;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [wordIndex]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={reducedMotion ? {} : { scale }} className="absolute inset-0">
        {/* Video crossfade */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <HeroVideo src={theme.video} poster={theme.poster} />
          </motion.div>
        </AnimatePresence>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/65" aria-hidden="true" />
        {/* Film grain */}
        <div className="absolute inset-0 noise-overlay opacity-[0.04]" aria-hidden="true" />
      </motion.div>

      <motion.div
        style={reducedMotion ? {} : { y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center"
      >
        {/* Floating badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {["In-house @hutsyfinancial", "Toronto", "Cinematic short-form"].map((badge) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="px-3 py-1 text-[10px] uppercase tracking-widest border border-border text-muted-foreground bg-background/40 backdrop-blur-sm"
            >
              {badge}
            </motion.span>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-tight text-foreground text-balance"
        >
          FROM STREET
          <br />
          TO{" "}
          <span className="text-accent relative inline-block min-w-[4ch]">
            <AnimatePresence mode="wait">
              <motion.span
                key={DISPLAY_WORDS[currentKey]}
                initial={reducedMotion ? {} : { opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reducedMotion ? {} : { opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
                className="inline-block neon-glow"
              >
                {DISPLAY_WORDS[currentKey]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 flex flex-col items-center gap-1 text-sm md:text-base text-muted-foreground max-w-xl"
        >
          <span>Toronto-based filmmaker.</span>
          <span>{"In-house @hutsyfinancial."}</span>
          <span>{"Brand & product storytelling."}</span>
          <span>Cinematic short-form.</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 text-xs uppercase tracking-widest text-accent neon-glow"
        >
          {"Let\u2019s make something timeless."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <MagneticButton variant="primary" onClick={onQuoteOpen}>Book a Shoot</MagneticButton>
          <MagneticButton variant="secondary" href="#featured">Watch Work</MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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

function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCanPlay = useCallback(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      onCanPlay={handleCanPlay}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
