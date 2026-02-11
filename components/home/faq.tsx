"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How much does a project cost?",
    a: "Starting from $1,500 for a half-day shoot with 1 edit. Pricing depends on scope, location, and deliverables. Reach out for a custom quote.",
  },
  {
    q: "What's the typical turnaround time?",
    a: "Standard is 5-7 business days for editing after the shoot. Rush delivery (48hrs) available for an additional fee.",
  },
  {
    q: "Do I get the raw footage?",
    a: "Raw files can be included for an additional fee. By default you receive final edited, color-graded deliverables in all requested formats.",
  },
  {
    q: "How many revisions are included?",
    a: "Depending on your package: 1-2 rounds for Starter/Pro, unlimited for Premium. Additional revisions are billed hourly.",
  },
  {
    q: "Do you travel outside Toronto?",
    a: "Absolutely. Travel fees apply for shoots outside the GTA. I've shot across Ontario and internationally.",
  },
  {
    q: "What equipment do you use?",
    a: "Cinema cameras (RED, Sony FX series), professional lighting, gimbal stabilizers, drones, and premium audio gear. Full kit depends on the project.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
        Questions
      </span>
      <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1 mb-12">
        FAQ
      </h2>

      <div className="max-w-2xl">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-border">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
              aria-expanded={openIndex === i}
            >
              <span className="text-sm text-foreground group-hover:text-accent transition-colors pr-4">
                {faq.q}
              </span>
              <span
                className={`text-muted-foreground transition-transform duration-300 shrink-0 ${
                  openIndex === i ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-muted-foreground pb-5 leading-relaxed">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
