"use client";

import { useRef, useState, useEffect } from "react";
import { works } from "@/data/work";
import { WorkCard } from "@/components/work-card";
import { Section } from "@/components/section";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export function FeaturedWork() {
  const featured = works.slice(0, 9);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Depth parallax offsets for different columns
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const getParallax = (index: number) => {
    const col = index % 3;
    if (col === 0) return y1;
    if (col === 1) return y2;
    return y3;
  };

  return (
    <Section id="featured">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Selected Work
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1">
            Featured
          </h2>
        </div>
        <Link
          href="/work"
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors border-b border-border hover:border-accent pb-1"
        >
          View All
        </Link>
      </div>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featured.map((work, i) => (
          <motion.div
            key={work.slug}
            style={reducedMotion ? {} : { y: getParallax(i) }}
          >
            <WorkCard work={work} index={i} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
