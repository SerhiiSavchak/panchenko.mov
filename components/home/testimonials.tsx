"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/ui";
import { useRef } from "react";
import { useScrollReveal } from "@/lib/scroll-animate";

const testimonials = [
  {
    quote:
      "PANchenko turned our vision into something we couldn't have imagined. The video went viral the day we posted it.",
    name: "Toronto Artist",
    role: "Rap / Music Video",
  },
  {
    quote:
      "Best car content I've ever had made. He understands angles, speed, and making machines look alive.",
    name: "Dealership Owner",
    role: "Automotive Brand",
  },
  {
    quote:
      "Working with PANchenko is working with someone who actually cares about the craft. Every frame is intentional.",
    name: "Brand Manager",
    role: "Hutsy Financial",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useScrollReveal(ref, {
    once: true,
    rootMargin: "-60px 0px",
    rootMarginMobile: "100px 0px -40px 0px",
  });

  return (
    <Section>
      <SectionHeader label="What They Say" title="Clients" />

      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${inView ? "scroll-reveal-visible" : ""}`}
      >
        {testimonials.map((t, i) => (
          <blockquote
            key={i}
            className="scroll-reveal-item border-l border-border pl-6"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <p className="text-sm text-foreground leading-relaxed italic">
              {`"${t.quote}"`}
            </p>
            <footer className="mt-4">
              <span className="text-xs text-accent font-semibold">
                {t.name}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                {t.role}
              </span>
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}
