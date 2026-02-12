"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/ui";
import { useRef } from "react";
import { useScrollReveal } from "@/lib/scroll-animate";

const services = [
  {
    title: "Directing",
    desc: "Creative vision from concept to final frame. Storyboarding, shot lists, on-set direction.",
  },
  {
    title: "Shooting",
    desc: "Cinema-grade capture. RED, Sony FX, gimbal, drone. Any environment, any conditions.",
  },
  {
    title: "Editing",
    desc: "Fast-paced cuts, rhythm-driven timelines. Premiere Pro, DaVinci Resolve, After Effects.",
  },
  {
    title: "Color Grading",
    desc: "Cinematic color science. Film emulation, stylized looks, brand-consistent grading.",
  },
  {
    title: "Deliverables",
    desc: "Platform-optimized exports. 4K masters, social cuts, vertical formats, thumbnails.",
  },
  {
    title: "Cinematic Short-Form",
    desc: "The signature. 15-60s pieces that hit harder than most full-length content.",
  },
];

export function Services() {
  const ref = useRef(null);
  const inView = useScrollReveal(ref, { once: true, rootMargin: "-80px 0px" });

  return (
    <Section>
      <SectionHeader label="What I Do" title="Services" />

      <div
        ref={ref}
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border ${inView ? "scroll-reveal-visible" : ""}`}
      >
        {services.map((service, i) => (
          <div
            key={service.title}
            className="scroll-reveal-item bg-background p-6 md:p-8 group hover:bg-muted transition-colors"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <h3 className="font-display text-2xl text-foreground group-hover:text-accent transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
