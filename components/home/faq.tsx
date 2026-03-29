"use client";

import { useState, useRef } from "react";
import { Section } from "@/components/section";
import { useScrollReveal } from "@/lib/scroll-animate";

const faqs = [
  {
    q: "How much does a project cost?",
    a: "Starting from $300 for short-form reels. Reach out for a detailed quote — scope and deliverables vary by project.",
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
  const inView = useScrollReveal(ref, {
    once: true,
    rootMargin: "-60px 0px",
    rootMarginMobile: "100px 0px -40px 0px",
  });

  return (
    <Section className="!px-6 md:!px-8 lg:!px-16">
      <div ref={ref} className="flex flex-col items-center w-full">
        <div className="w-full max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-muted-foreground block">
            Questions
          </span>
          <h2 className="font-display text-6xl md:text-8xl text-foreground mt-2">
            FAQ
          </h2>
        </div>

        <div className={`w-full max-w-3xl mx-auto ${inView ? "scroll-reveal-visible" : ""}`}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="scroll-reveal-item border-b border-border px-4"
              style={{ animationDelay: `${150 + i * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-7 md:py-8 text-left group hover:bg-muted/30 transition-colors rounded -mx-4 px-4"
                aria-expanded={openIndex === i}
              >
                <span className="text-base md:text-lg text-foreground group-hover:text-accent transition-colors pr-6 text-left leading-snug">
                  {faq.q}
                </span>
                <span
                  className={`text-muted-foreground shrink-0 text-xl md:text-2xl transition-transform duration-300 ${
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
                  <p className="text-base md:text-lg text-muted-foreground pb-7 md:pb-8 leading-relaxed">
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
