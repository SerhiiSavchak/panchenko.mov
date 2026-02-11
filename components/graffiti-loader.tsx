"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function GraffitiLoader() {
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), reducedMotion ? 400 : 2400);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="relative">
            {/* Purple glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0.25], scale: 1 }}
              transition={{ duration: 1.5 }}
              className="absolute -inset-16 bg-accent/10 blur-3xl rounded-full"
              aria-hidden="true"
            />

            <motion.div
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <svg
                viewBox="0 0 500 80"
                className="w-72 md:w-[28rem] h-auto relative"
                aria-label="panchenko.mov"
              >
                {/* Drip elements */}
                {!reducedMotion && (
                  <>
                    <motion.rect x="78" y="55" width="2" height="0" fill="var(--color-accent)" initial={{ height: 0 }} animate={{ height: 18 }} transition={{ delay: 1.2, duration: 0.8 }} />
                    <motion.rect x="248" y="55" width="2" height="0" fill="var(--color-foreground)" initial={{ height: 0 }} animate={{ height: 12 }} transition={{ delay: 1.4, duration: 0.6 }} />
                    <motion.rect x="420" y="55" width="2" height="0" fill="var(--color-accent)" initial={{ height: 0 }} animate={{ height: 15 }} transition={{ delay: 1.6, duration: 0.7 }} />
                  </>
                )}

                {/* "panchenko" */}
                <motion.text
                  x="10" y="48"
                  fontSize="52"
                  fill="var(--color-foreground)"
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={reducedMotion ? {} : { strokeDashoffset: 600 }}
                  animate={reducedMotion ? {} : { strokeDashoffset: 0 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                  strokeDasharray={600}
                  stroke="var(--color-foreground)"
                  strokeWidth="0.5"
                >
                  panchenko
                </motion.text>

                {/* ".mov" in accent */}
                <motion.text
                  x="365" y="48"
                  fontSize="52"
                  fill="var(--color-accent)"
                  style={{ fontFamily: "var(--font-display)" }}
                  initial={reducedMotion ? {} : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  .mov
                </motion.text>
              </svg>

              {/* Glitch overlay */}
              {!reducedMotion && (
                <motion.div
                  className="absolute inset-0 mix-blend-screen opacity-0"
                  style={{ background: "linear-gradient(90deg, transparent 30%, rgba(168,85,247,0.15) 50%, transparent 70%)" }}
                  animate={{ opacity: [0, 0.5, 0, 0.3, 0], x: [0, -3, 2, -1, 0] }}
                  transition={{ delay: 0.6, duration: 0.3, repeat: 2, repeatDelay: 0.5 }}
                  aria-hidden="true"
                />
              )}
            </motion.div>

            {/* Scan line */}
            {!reducedMotion && (
              <motion.div
                className="absolute left-0 right-0 h-px bg-accent/40"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.5, ease: "linear", delay: 0.3 }}
                aria-hidden="true"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
