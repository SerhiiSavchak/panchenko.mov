"use client";

import { useState, useRef } from "react";
import { Section } from "@/components/section";
import { useScrollReveal } from "@/lib/scroll-animate";

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
  const inView = useScrollReveal(ref, { once: true, rootMargin: "-80px 0px" });

  return (
    <Section>
      <div ref={ref} className="flex flex-col items-center">
        <div
          className={`w-full max-w-2xl text-center mb-12 ${inView ? "scroll-reveal-visible" : ""}`}
        >
          <span
            className="scroll-reveal-item text-[11px] uppercase tracking-widest text-muted-foreground block"
            style={{ animationDelay: "0ms" }}
          >
            Questions
          </span>
          <h2
            className="scroll-reveal-item font-display text-5xl md:text-7xl text-foreground mt-1"
            style={{ animationDelay: "100ms" }}
          >
            FAQ
          </h2>
        </div>

        <div className={`w-full max-w-2xl ${inView ? "scroll-reveal-visible" : ""}`}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="scroll-reveal-item border-b border-border"
              style={{ animationDelay: `${150 + i * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group hover:bg-muted/30 transition-colors px-2 -mx-2 rounded"
                aria-expanded={openIndex === i}
              >
                <span className="text-sm text-foreground group-hover:text-accent transition-colors pr-4 text-left">
                  {faq.q}
                </span>
                <span
                  className={`text-muted-foreground shrink-0 text-lg transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`accordion-content ${openIndex === i ? "open" : ""}`}
              >
                <div className="accordion-inner">
                  <p className="text-sm text-muted-foreground pb-6 leading-relaxed pl-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
