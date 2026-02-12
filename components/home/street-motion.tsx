"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, MotionValue, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { STREET_MOTION_VIDEOS } from "@/lib/media";

const WORDS = ["RAP", "CARS", "FIGHT", "BRAND", "CINEMA"] as const;
type WordKey = (typeof WORDS)[number];

const VIDEO_MAP: Record<WordKey, string> = {
  RAP: STREET_MOTION_VIDEOS.rap,
  CARS: STREET_MOTION_VIDEOS.cars,
  FIGHT: STREET_MOTION_VIDEOS.fight,
  BRAND: STREET_MOTION_VIDEOS.brand,
  CINEMA: STREET_MOTION_VIDEOS.cinema,
};

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

  const activeVideo = VIDEO_MAP[WORDS[activeVideoIndex]];

  return (
    <div ref={containerRef} className="relative" style={{ height: `${WORDS.length * 100}vh` }}>
      <motion.div
        style={reducedMotion ? {} : { opacity: backgroundOpacity }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Dynamic background videos */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeVideoIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <StreetMotionVideo src={activeVideo} />
            </motion.div>
          </AnimatePresence>
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

function StreetMotionVideo({ src }: { src: string }) {
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
      onCanPlay={handleCanPlay}
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
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
  const blur = useTransform(
    progress,
    [index - 0.5, index, index + 0.5],
    [8, 0, 8]
  );
  const filterVal = useTransform(blur, (b) => `blur(${b}px)`);
  const negChroma = useTransform(chromaShift, (v) => -v);

  return (
    <motion.div
      style={
        reducedMotion
          ? { opacity }
          : { opacity, scale, filter: filterVal }
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
