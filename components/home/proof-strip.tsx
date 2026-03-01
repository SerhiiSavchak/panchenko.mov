"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/lib/scroll-animate";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "48h", label: "Avg Turnaround" },
  { value: "4+", label: "Years" },
  { value: "Rap / Cars / Brand", label: "Clients" },
];

export function ProofStrip() {
  const ref = useRef(null);
  const inView = useScrollReveal(ref, {
    once: true,
    rootMargin: "-50px 0px",
    rootMarginMobile: "80px 0px -30px 0px",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="border-y border-border py-8 px-4 md:px-8 lg:px-16"
    >
      <div ref={ref} className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${inView ? "scroll-reveal-visible" : ""}`}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="scroll-reveal-item text-center"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="font-display text-3xl md:text-4xl text-accent">
              {stat.value}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
