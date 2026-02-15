"use client";

import { Section } from "@/components/section";
import { SectionHeader, Button } from "@/components/ui";
import { MagneticButton } from "@/components/magnetic-button";
import { useRef } from "react";
import { useScrollReveal } from "@/lib/scroll-animate";

const tiers = [
  {
    name: "Starter",
    price: "From $1,500",
    features: [
      "Half-day shoot (4hrs)",
      "1 edited video (60-90s)",
      "Basic color grading",
      "2 social cuts",
      "1 revision round",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "From $3,500",
    features: [
      "Full-day shoot (8hrs)",
      "2-3 edited videos",
      "Cinematic color grading",
      "All social formats",
      "Moodboard + direction",
      "2 revision rounds",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "From $7,000",
    features: [
      "Multi-day production",
      "Full creative direction",
      "5+ deliverables",
      "Advanced color + VFX",
      "All formats + 4K master",
      "Unlimited revisions",
      "Priority turnaround",
    ],
    highlighted: false,
  },
];

interface PackagesProps {
  onQuoteOpen: () => void;
}

export function Packages({ onQuoteOpen }: PackagesProps) {
  const ref = useRef(null);
  const inView = useScrollReveal(ref, {
    once: true,
    rootMargin: "-60px 0px",
    rootMarginMobile: "100px 0px -40px 0px",
  });

  return (
    <Section>
      <SectionHeader label="Investment" title="Packages" />

      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-px bg-border ${inView ? "scroll-reveal-visible" : ""}`}
      >
        {tiers.map((tier, i) => (
          <div
            key={tier.name}
            className={`scroll-reveal-item-lg p-6 md:p-8 flex flex-col ${
              tier.highlighted
                ? "bg-muted border border-accent/20"
                : "bg-background"
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {tier.highlighted && (
              <span className="text-[10px] uppercase tracking-widest text-accent mb-3">
                Most Popular
              </span>
            )}
            <h3 className="font-display text-3xl text-foreground">
              {tier.name}
            </h3>
            <p className="font-display text-xl text-accent mt-2">
              {tier.price}
            </p>
            <ul className="mt-6 flex flex-col gap-3 flex-1">
              {tier.features.map((f) => (
                <li
                  key={f}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="text-accent mt-0.5">+</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <MagneticButton
                variant={tier.highlighted ? "primary" : "secondary"}
                onClick={onQuoteOpen}
                className="w-full text-center"
              >
                Get Started
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button variant="link" onClick={onQuoteOpen} className="!p-0 !tracking-widest">
          Need something custom? Get a quote
        </Button>
      </div>
    </Section>
  );
}
