"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "50+", label: "Projects" },
  { value: "48h", label: "Avg Turnaround" },
  { value: "4+", label: "Years" },
  { value: "Rap / Cars / Brand", label: "Clients" },
];

export function ProofStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="border-y border-border py-8 px-4 md:px-8 lg:px-16"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <div className="font-display text-3xl md:text-4xl text-accent">
              {stat.value}
            </div>
            <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
