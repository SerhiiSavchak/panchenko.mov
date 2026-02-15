"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "@/lib/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";
import { HERO_THEMES, type HeroThemeKey } from "@/lib/media";
import { useHeroReady } from "@/lib/hero-ready-context";

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
  const heroReady = useHeroReady();
  const onVideoReady = useCallback(() => heroReady?.setReady(), [heroReady]);
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const currentKey = CYCLING_WORDS[wordIndex];
  const nextKey = CYCLING_WORDS[(wordIndex + 1) % CYCLING_WORDS.length];

  // Cycle words every 2.5s
  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [reducedMotion]);

  // Only render current + next video (max 2 in DOM) — reduces decode/memory on mobile
  const videosToRender = [currentKey, nextKey];
  const uniqueVideos = Array.from(new Set(videosToRender));

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {uniqueVideos.map((key) => {
          const theme = HERO_THEMES[key];
          const isActive = currentKey === key;
          const isInitial = key === CYCLING_WORDS[0];
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
                themeKey={key}
                deferLoad={!isInitial}
                onReady={isInitial ? onVideoReady : undefined}
              />
            </motion.div>
          );
        })}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/10" aria-hidden="true" />
      </div>

      <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Floating badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {["In-house @hutsyfinancial", "Toronto", "Cinematic short-form"].map((badge) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-[10px] uppercase tracking-widest text-muted-foreground"
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
      </div>

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

const LOAD_TIMEOUT_MS = 15000;
const RETRY_DELAY_MS = 1500;

function HeroVideo({
  src,
  srcMobile,
  isActive,
  themeKey,
  deferLoad,
  onReady,
}: {
  src: string;
  srcMobile: string;
  isActive: boolean;
  themeKey: HeroThemeKey;
  deferLoad?: boolean;
  onReady?: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(() => (deferLoad ? null : src));
  const [deferReady, setDeferReady] = useState(!deferLoad);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!deferLoad || deferReady) {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      setVideoSrc(isMobile ? srcMobile : src);
      const onResize = () => {
        const m = window.innerWidth < 768;
        setVideoSrc(m ? srcMobile : src);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, [deferLoad, deferReady, src, srcMobile]);

  // Defer non-initial: load next video early so it's ready before switch (2.5s)
  useEffect(() => {
    if (!deferLoad) return;
    const id = setTimeout(() => setDeferReady(true), 1000);
    return () => clearTimeout(id);
  }, [deferLoad]);

  const attemptPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !isActive) return;
    const tryPlay = () => {
      v.play()
        .then(() => {
          setIsReady(true);
          setHasFailed(false);
          onReady?.();
        })
        .catch(() => {
          setRetryCount((c) => {
            if (c < 2) {
              setTimeout(tryPlay, RETRY_DELAY_MS);
              return c + 1;
            }
            setHasFailed(true);
            return c;
          });
        });
    };
    tryPlay();
  }, [isActive, onReady]);

  const handleCanPlay = useCallback(() => {
    if (isActive) attemptPlay();
  }, [attemptPlay, isActive]);

  const handleLoadedData = useCallback(() => {
    if (isActive) attemptPlay();
  }, [attemptPlay, isActive]);

  const handleError = useCallback(() => {
    if (videoSrc === srcMobile) {
      setVideoSrc(src);
    } else if (retryCount < 3) {
      setRetryCount((c) => c + 1);
      setTimeout(() => {
        setVideoSrc((prev) => (prev === srcMobile ? src : srcMobile));
      }, RETRY_DELAY_MS);
    } else {
      setHasFailed(true);
    }
  }, [videoSrc, srcMobile, src, retryCount]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) {
      attemptPlay();
    } else {
      v.pause();
    }
  }, [isActive, attemptPlay]);

  // Hero is above-the-fold: use permissive threshold (0.1) for mobile address bar / dynamic viewport
  useEffect(() => {
    const el = containerRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.1 && isActive) {
          attemptPlay();
        } else if (!isActive) {
          video.pause();
        }
      },
      { threshold: [0, 0.1, 0.3, 0.5, 1], rootMargin: "0px 0px" }
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
      {hasFailed && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-background"
          aria-hidden
        >
          <span className="text-muted-foreground text-xs uppercase">Video unavailable</span>
        </div>
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
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: themeKey === "fight" ? "brightness(1.35) contrast(1.05)" : undefined,
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
