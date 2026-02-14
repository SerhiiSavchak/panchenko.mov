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

  // Preload next video (use mobile URL on small screens)
  useEffect(() => {
    const nextIndex = (wordIndex + 1) % CYCLING_WORDS.length;
    const nextKey = CYCLING_WORDS[nextIndex];
    const theme = HERO_THEMES[nextKey];
    const href =
      typeof window !== "undefined" && window.innerWidth < 768
        ? theme.videoMobile
        : theme.video;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = href;
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
            <HeroVideo
              src={theme.video}
              srcMobile={theme.videoMobile}
              poster={theme.poster}
            />
          </motion.div>
        </AnimatePresence>
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

function HeroVideo({
  src,
  srcMobile,
  poster,
}: {
  src: string;
  srcMobile: string;
  poster: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Pick source on mount (SSR-safe: avoid loading wrong resolution)
  useEffect(() => {
    setVideoSrc(window.innerWidth < 768 ? srcMobile : src);
  }, [src, srcMobile]);

  const attemptPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play()
      .then(() => setAutoplayFailed(false))
      .catch(() => {
        setAutoplayFailed(true);
        v.pause();
      });
  }, []);

  const handleCanPlay = useCallback(() => {
    attemptPlay();
  }, [attemptPlay]);

  const handleError = useCallback(() => {
    if (videoSrc === srcMobile) {
      setVideoSrc(src);
      setHasError(false);
    } else {
      setHasError(true);
    }
  }, [videoSrc, srcMobile, src]);

  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.3) {
          attemptPlay();
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.3, 0.5, 1], rootMargin: "-50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [attemptPlay]);

  if (hasError) {
    return (
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Poster layer: prevents black flash before video loads; stays visible if autoplay fails */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${poster})`,
          opacity: autoplayFailed || !videoSrc ? 1 : 0,
          pointerEvents: "none",
        }}
        aria-hidden
      />
      {videoSrc && (
        <video
          ref={videoRef}
          key={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          poster={poster}
          onCanPlay={handleCanPlay}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: autoplayFailed ? 0 : 1 }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
