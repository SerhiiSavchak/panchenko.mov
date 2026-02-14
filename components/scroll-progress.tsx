"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SCROLL_THRESHOLD = 80;

export function ScrollProgress() {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 1]);
  const y = useTransform(scrollY, [0, SCROLL_THRESHOLD], [-12, 0]);
  const springOpacity = useSpring(opacity, { stiffness: 200, damping: 30 });
  const springY = useSpring(y, { stiffness: 200, damping: 30 });
  const pointerEvents = useTransform(opacity, (v) => (v < 0.01 ? "none" : "auto"));

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] flex items-center gap-2 px-3 md:px-6 py-1.5 bg-background/90 backdrop-blur-sm border-b border-border"
      style={{ opacity: springOpacity, y: springY, pointerEvents }}
      role="progressbar"
      aria-label="Scroll progress"
    >
      <span className="text-[8px] md:text-[9px] uppercase tracking-[0.15em] text-muted-foreground shrink-0">
        Scroll
      </span>
      <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
        <motion.div
          className="h-full min-w-[2px] rounded-full bg-accent origin-left"
          style={{ scaleX }}
          aria-hidden
        />
      </div>
    </motion.div>
  );
}
