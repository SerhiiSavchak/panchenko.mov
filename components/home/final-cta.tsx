"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FinalCTAProps {
  onQuoteOpen: () => void;
}

export function FinalCTA({ onQuoteOpen }: FinalCTAProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="px-4 md:px-8 lg:px-16 py-24 md:py-32" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.85] text-foreground text-balance">
          READY TO
          <br />
          <span className="text-accent">SHOOT?</span>
        </h2>
        <p className="text-muted-foreground mt-6 text-sm max-w-md mx-auto leading-relaxed">
          {"Let's create something that hits different. Book a call, DM on Instagram, or drop a message on Telegram."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <MagneticButton variant="primary" onClick={onQuoteOpen}>
            Book a Shoot
          </MagneticButton>
          <MagneticButton variant="secondary" href="/contact">
            Contact Page
          </MagneticButton>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-muted-foreground">
          <a
            href="https://instagram.com/panchenko.mov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Instagram
          </a>
          <span className="text-border">|</span>
          <a
            href="https://t.me/panchenko"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Telegram
          </a>
          <span className="text-border">|</span>
          <a
            href="mailto:hello@panchenko.mov"
            className="hover:text-accent transition-colors"
          >
            Email
          </a>
        </div>
      </motion.div>
    </section>
  );
}
