"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "@/lib/hooks";
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
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const currentKey = CYCLING_WORDS[wordIndex];
  const theme = HERO_THEMES[currentKey];

  // Cycle words every 2.5s
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={reducedMotion ? {} : { scale }} className="absolute inset-0">
        {/* All videos in DOM — load in background, no poster flash when switching */}
        {CYCLING_WORDS.map((key) => {
          const theme = HERO_THEMES[key];
          const isActive = currentKey === key;
          return (
            <motion.div
              key={key}
              initial={false}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
              style={{ pointerEvents: isActive ? "auto" : "none" }}
            >
              <HeroVideo
                src={theme.video}
                srcMobile={theme.videoMobile}
                isActive={isActive}
              />
            </motion.div>
          );
        })}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/65" aria-hidden="true" />
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
          className="relative isolate font-display text-[clamp(3rem,12vw,10rem)] leading-[0.85] tracking-tight text-foreground text-balance"
        >
          <span className="relative z-20">FROM STREET</span>
          <br />
          <span className="relative z-20">TO{"\u2009"}</span>
          <span className="text-accent relative z-10 inline-block min-w-[5.5ch] align-baseline -ml-[0.15em]">
            <span className="invisible" aria-hidden="true">
              B
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={DISPLAY_WORDS[currentKey]}
                  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? {} : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="neon-glow"
                >
                  {DISPLAY_WORDS[currentKey]}
                </motion.span>
              </AnimatePresence>
            </span>
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
          className="mt-4 text-xs uppercase tracking-widest text-accent"
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

const LOAD_TIMEOUT_MS = 8000;

function HeroVideo({
  src,
  srcMobile,
  isActive,
}: {
  src: string;
  srcMobile: string;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    setVideoSrc(isMobile ? srcMobile : src);
    const onResize = () => {
      const m = window.innerWidth < 768;
      setVideoSrc(m ? srcMobile : src);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [src, srcMobile]);

  const attemptPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !isActive) return;
    v.play()
      .then(() => setIsReady(true))
      .catch(() => setHasFailed(true));
  }, [isActive]);

  const handleCanPlay = useCallback(() => {
    if (isActive) attemptPlay();
  }, [attemptPlay, isActive]);

  const handleLoadedData = useCallback(() => {
    if (isActive) attemptPlay();
  }, [attemptPlay, isActive]);

  const handleError = useCallback(() => {
    if (videoSrc === srcMobile) {
      setVideoSrc(src);
    } else {
      setHasFailed(true);
    }
  }, [videoSrc, srcMobile, src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      attemptPlay();
    } else {
      v.pause();
    }
  }, [isActive, attemptPlay]);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.3 && isActive) {
          attemptPlay();
        } else if (!isActive) {
          video.pause();
        }
      },
      { threshold: [0, 0.3, 0.5, 1], rootMargin: "-50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [attemptPlay, isActive]);

  useEffect(() => {
    if (!isActive || hasFailed || isReady) {
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
  }, [isActive, hasFailed, isReady]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Loading overlay: solid dark, no poster/frame — reveal only when video ready */}
      <div
        className="absolute inset-0 bg-background transition-opacity duration-500"
        style={{
          opacity: isReady && !hasFailed ? 0 : 1,
          pointerEvents: "none",
        }}
        aria-hidden
      />
      {hasFailed && (
        <div className="absolute inset-0 bg-background" aria-hidden />
      )}
      {videoSrc && !hasFailed && (
        <video
          ref={videoRef}
          key={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onCanPlay={handleCanPlay}
          onLoadedData={handleLoadedData}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isReady ? 1 : 0 }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
