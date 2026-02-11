"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

export function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const lines = [
    "Started on the streets of Toronto shooting rap videos with no budget and too much ambition.",
    "Every frame was practice. Every edit was school. The grind turned into a language -- cinematic short-form that hits hard and feels real.",
    "From underground music videos to high-end brand storytelling. From raw fight night coverage to polished automotive content.",
    "Now in-house at @hutsyfinancial, building brand narratives while still taking on passion projects that push the craft.",
    "Rap. Cars. Fight energy. Brand storytelling. If it moves, I make it cinematic.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8 lg:px-16 py-20 md:py-32 overflow-hidden"
    >
      {/* Background oversized text */}
      <motion.div
        style={reducedMotion ? {} : { y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-display text-[clamp(6rem,20vw,18rem)] text-foreground/[0.03] uppercase whitespace-nowrap">
          PANchenko
        </span>
      </motion.div>

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-overlay" aria-hidden="true" />

      <div className="relative flex flex-col md:flex-row gap-12 md:gap-16 items-center">
        {/* Image left */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, x: -40, clipPath: "inset(0 100% 0 0)" }}
          animate={
            inView
              ? { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }
              : undefined
          }
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full md:w-5/12 shrink-0"
        >
          <div className="relative aspect-[3/4] bg-muted overflow-hidden">
            <Image
              src="/work/work-8.jpg"
              alt="PANchenko behind the scenes"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 px-2 py-1 text-[10px] uppercase tracking-wider bg-background/60 text-foreground backdrop-blur-sm border border-border">
              BTS
            </div>
          </div>
        </motion.div>

        {/* Text right */}
        <div className="w-full md:w-7/12">
          <motion.span
            initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-widest text-muted-foreground"
          >
            About
          </motion.span>
          <motion.h2
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-foreground mt-1 mb-8"
          >
            PANchenko
          </motion.h2>

          <div className="flex flex-col gap-4">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={reducedMotion ? {} : { opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={
                  inView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : undefined
                }
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {["Street Culture", "Rap Visuals", "Brand Storytelling", "Toronto"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[10px] uppercase tracking-widest border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
