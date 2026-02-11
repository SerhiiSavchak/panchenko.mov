"use client";

import { Section } from "@/components/section";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section>
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
        What They Say
      </span>
      <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1 mb-12">
        Clients
      </h2>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="border-l border-border pl-6"
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
          </motion.blockquote>
        ))}
      </div>
    </Section>
  );
}
