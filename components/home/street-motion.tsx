"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent } from "framer-motion";
import { STREET_MOTION_VIDEOS } from "@/lib/media";

const WORDS = ["RAP", "CARS", "FIGHT", "BRAND", "CINEMA"] as const;
type WordKey = (typeof WORDS)[number];

const VIDEO_ITEMS = WORDS.map((w) => STREET_MOTION_VIDEOS[w.toLowerCase() as keyof typeof STREET_MOTION_VIDEOS]);

const MAX_PRELOAD = 2; // Only current + next load at once

export function StreetMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const wordIndex = useTransform(scrollYProgress, [0, 1], [0, WORDS.length - 1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
  const chromaShift = useTransform(scrollYProgress, [0, 0.5, 1], [0, 3, 0]);

  useMotionValueEvent(wordIndex, "change", (latest) => {
    const idx = Math.floor(latest + 0.3);
    if (idx >= 0 && idx < WORDS.length) setActiveVideoIndex(idx);
  });

  // Preload next video via link (metadata warm-up) - doesn't compete with video fetch
  useEffect(() => {
    const nextIdx = Math.min(activeVideoIndex + 1, WORDS.length - 1);
    if (nextIdx === activeVideoIndex) return;
    const { video } = VIDEO_ITEMS[nextIdx];
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = video;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, [activeVideoIndex]);

  return (
    <div ref={containerRef} className="relative" style={{ height: `${WORDS.length * 100}vh` }}>
      <motion.div
        style={reducedMotion ? {} : { opacity: backgroundOpacity }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Video pool: all in DOM for cache, only current+next preload */}
        <div className="absolute inset-0">
          {VIDEO_ITEMS.map((item, i) => (
            <StreetMotionVideoLayer
              key={i}
              src={item.video}
              poster={item.poster}
              isActive={i === activeVideoIndex}
              shouldPreload={i === activeVideoIndex || i === activeVideoIndex + 1}
            />
          ))}
          <div className="absolute inset-0 bg-background/75" aria-hidden="true" />
        </div>

        <span className="text-[11px] uppercase tracking-widest text-muted-foreground mb-4 relative z-10">
          Street Motion
        </span>

        <div className="relative h-[clamp(4rem,15vw,12rem)] w-full flex items-center justify-center z-10">
          {WORDS.map((word, i) => (
            <MorphWord
              key={word}
              word={word}
              index={i}
              progress={wordIndex}
              chromaShift={chromaShift}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-16 bg-border overflow-hidden z-10">
          <motion.div
            className="w-full bg-accent"
            style={{ height: "100%", scaleY: scrollYProgress, transformOrigin: "top" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Each video: only set src when shouldPreload.

 * Poster shows instantly. No decoding when offscreen.
 */
function StreetMotionVideoLayer({
  src,
  poster,
  isActive,
  shouldPreload,
}: {
  src: string;
  poster: string;
  isActive: boolean;
  shouldPreload: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleCanPlay = useCallback(() => {
    if (isActive) videoRef.current?.play().catch(() => {});
  }, [isActive]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shouldPreload && !v.src) {
      v.src = src;
      v.preload = "auto";
    } else if (!shouldPreload && v.src) {
      v.pause();
      v.removeAttribute("src");
      v.load();
    }
  }, [shouldPreload, src]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isActive) v.play().catch(() => {});
    else v.pause();
  }, [isActive]);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-300 ease-out"
      style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none", zIndex: isActive ? 1 : 0 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        onCanPlay={handleCanPlay}
        onLoadedData={isActive ? () => videoRef.current?.play().catch(() => {}) : undefined}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

function MorphWord({
  word,
  index,
  progress,
  chromaShift,
  reducedMotion,
}: {
  word: string;
  index: number;
  progress: MotionValue<number>;
  chromaShift: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const opacity = useTransform(
    progress,
    [index - 0.5, index, index + 0.5],
    [0, 1, 0]
  );
  const scale = useTransform(
    progress,
    [index - 0.5, index, index + 0.5],
    [0.8, 1, 0.8]
  );
  const negChroma = useTransform(chromaShift, (v) => -v);

  return (
    <motion.div
      style={
        reducedMotion
          ? { opacity }
          : { opacity, scale }
      }
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative">
        {!reducedMotion && (
          <>
            <motion.span
              style={{ x: chromaShift }}
              className="absolute inset-0 font-display text-[clamp(4rem,15vw,12rem)] text-red-500/20 mix-blend-screen"
              aria-hidden="true"
            >
              {word}
            </motion.span>
            <motion.span
              style={{ x: negChroma }}
              className="absolute inset-0 font-display text-[clamp(4rem,15vw,12rem)] text-blue-500/20 mix-blend-screen"
              aria-hidden="true"
            >
              {word}
            </motion.span>
          </>
        )}
        <span className="font-display text-[clamp(4rem,15vw,12rem)] text-foreground relative">
          {word}
        </span>
      </div>
    </motion.div>
  );
}
