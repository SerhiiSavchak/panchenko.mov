"use client";

import { useState, useRef } from "react";
import { Section } from "@/components/section";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    q: "How much does a project cost?",
    a: "Starting from $300 for short-form reels. Use the Build Your Shoot calculator above for a custom estimate, or reach out for a quote.",
  },
  {
    q: "What's the typical turnaround time?",
    a: "Standard is 5-7 business days for editing after the shoot. Rush delivery (72h or 24h) available for an additional fee.",
  },
  {
    q: "Do I get the raw footage?",
    a: "Raw files can be included for an additional fee. By default you receive final edited, color-graded deliverables in all requested formats.",
  },
  {
    q: "How many revisions are included?",
    a: "Depends on your edit tier: 1 round for Basic, 2 for Pro, unlimited for Insane. Additional revisions billed hourly.",
  },
  {
    q: "Do you travel outside Toronto?",
    a: "Absolutely. Travel fees apply for shoots outside the GTA. I've shot across Ontario and internationally.",
  },
  {
    q: "What equipment do you use?",
    a: "Sony FX3, A7S III, BMPCC 6K Pro, DJI RS gimbal, RODE wireless, Aputure lighting. Full cinema kit on every shoot.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section>
      <div ref={ref} className="flex flex-col items-center">
        <div className="w-full max-w-2xl text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-widest text-muted-foreground"
          >
            Questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl text-foreground mt-1"
          >
            FAQ
          </motion.h2>
        </div>

        <div className="w-full max-w-2xl">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
              className="border-b border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left cursor-pointer group hover:bg-muted/30 transition-colors px-2 -mx-2 rounded"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm text-foreground group-hover:text-accent transition-colors pr-4 text-left">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground shrink-0 text-lg"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted-foreground pb-6 leading-relaxed pl-2">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
