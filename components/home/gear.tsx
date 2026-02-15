"use client";

import { useRef } from "react";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/ui";
import Image from "next/image";
import { GEAR } from "@/data/gear";
import { useScrollReveal } from "@/lib/scroll-animate";

export function Gear() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useScrollReveal(ref, {
    once: true,
    threshold: 0.02,
    rootMargin: "-60px 0px",
    rootMarginMobile: "120px 0px -40px 0px",
  });

  return (
    <Section>
      <div className={`md:flex md:gap-16 ${inView ? "section-in-view" : ""}`}>
        <div className="md:w-1/3 md:sticky md:top-24 md:self-start mb-10 md:mb-0 gear-heading-reveal">
          <SectionHeader
            label="Tools"
            title={
              <>
                Gear I
                <br />
                Shoot With
              </>
            }
            subtitle="Cinema-grade kit for every type of shoot. No rentals, no compromises."
            className="mb-0"
          />
        </div>

        {/* Gear cards - static images */}
        <div ref={ref} className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {GEAR.map((item, i) => (
            <GearCard key={item.name} item={item} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </Section>
  );
}
function GearCard({
  item,
  index,
  inView,
}: {
  item: (typeof GEAR)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className={`group relative bg-card border border-border overflow-hidden hover:border-accent/40 transition-colors gear-card-reveal ${inView ? "gear-card-visible" : ""}`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
          className="object-cover transition-transform duration-400 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-5 relative">
        <span className="text-[10px] uppercase tracking-wider text-accent">
          {item.role}
        </span>
        <h3 className="font-display text-2xl text-foreground mt-1 group-hover:text-accent transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );
}

