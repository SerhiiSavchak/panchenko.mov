"use client";

import { useState } from "react";
import { faqItems } from "@/data/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-12">
            Questions
          </h2>
          
          <div className="divide-y divide-border/50">
            {faqItems.map((item, index) => (
              <div key={index} className="py-6">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-start justify-between gap-4 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-base md:text-lg font-medium">
                    {item.question}
                  </span>
                  <span className="text-muted-foreground text-xl leading-none flex-shrink-0 mt-1">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pt-4 text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
