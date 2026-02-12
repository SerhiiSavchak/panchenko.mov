"use client";

import { MagneticButton } from "@/components/magnetic-button";
import { useRef } from "react";
import { useScrollReveal } from "@/lib/scroll-animate";
import { SOCIALS } from "@/data/shared";

interface FinalCTAProps {
  onQuoteOpen: () => void;
}

export function FinalCTA({ onQuoteOpen }: FinalCTAProps) {
  const ref = useRef(null);
  const inView = useScrollReveal(ref, { once: true, rootMargin: "-80px 0px" });

  return (
    <section className="px-4 md:px-8 lg:px-16 py-24 md:py-32" ref={ref}>
      <div
        className={`text-center ${inView ? "scroll-reveal-visible" : ""}`}
      >
        <div
          className="scroll-reveal-item-xl"
          style={{ animationDelay: "0ms" }}
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
            <a href={SOCIALS[0].href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{SOCIALS[0].label}</a>
            <span className="text-border">|</span>
            <a href={SOCIALS[1].href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{SOCIALS[1].label}</a>
            <span className="text-border">|</span>
            <a href={SOCIALS[2].href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{SOCIALS[2].label}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
