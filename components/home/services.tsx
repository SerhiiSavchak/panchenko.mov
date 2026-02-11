"use client";

import { Section } from "@/components/section";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section>
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
        What I Do
      </span>
      <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1 mb-12">
        Services
      </h2>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="bg-background p-6 md:p-8 group hover:bg-muted transition-colors"
          >
            <h3 className="font-display text-2xl text-foreground group-hover:text-accent transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
