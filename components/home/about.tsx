"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { WORK_IMAGES } from "@/lib/media";
import { useScrollReveal } from "@/lib/scroll-animate";

const ABOUT_PHOTOS = [
  WORK_IMAGES[8],
  WORK_IMAGES[7],
  WORK_IMAGES[0],
  WORK_IMAGES[6],
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useScrollReveal(sectionRef, { once: true, rootMargin: "-80px 0px" });

  const lines = [
    "Started on the streets of Toronto shooting rap videos with no budget and too much ambition.",
    "Every frame was practice. Every edit was school. The grind turned into a language -- cinematic short-form that hits hard and feels real.",
    "From underground music videos to high-end brand storytelling. From raw fight night coverage to polished automotive content.",
    "Now in-house at @hutsyfinancial, building brand narratives while still taking on passion projects that push the craft.",
    "Rap. Cars. Fight energy. Brand storytelling. If it moves, I make it cinematic.",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative px-4 md:px-8 lg:px-16 py-20 md:py-32 overflow-hidden"
    >
      {/* Background oversized text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none about-bg-text"
        aria-hidden="true"
      >
        <span className="font-display text-[clamp(6rem,20vw,18rem)] text-foreground/[0.03] uppercase whitespace-nowrap">
          PANchenko
        </span>
      </div>

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-overlay" aria-hidden="true" />

      <div className="relative flex flex-col md:flex-row gap-12 md:gap-16 items-center">
        {/* Photos grid - multiple images */}
        <div
          className={`w-full md:w-5/12 shrink-0 about-photos ${inView ? "about-visible" : ""}`}
        >
          <div className="grid grid-cols-2 gap-2">
            <div className="relative aspect-[3/4] bg-muted overflow-hidden">
              <Image
                src={ABOUT_PHOTOS[0]}
                alt="PANchenko behind the scenes"
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 px-2 py-1 text-[10px] uppercase tracking-wider bg-background/60 text-foreground backdrop-blur-sm border border-border">
                BTS
              </div>
            </div>
            <div className="grid grid-rows-2 gap-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ABOUT_PHOTOS[1]}
                  alt="PANchenko at work"
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ABOUT_PHOTOS[2]}
                  alt="PANchenko creative"
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text right */}
        <div className="w-full md:w-7/12">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            About
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1 mb-8">
            PANchenko
          </h2>

          <div className="flex flex-col gap-4">
            {lines.map((line, i) => (
              <p
                key={i}
                className={`text-sm text-muted-foreground leading-relaxed about-line ${inView ? "about-visible" : ""}`}
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                {line}
              </p>
            ))}
          </div>

          <div
            className={`mt-8 flex flex-wrap gap-3 about-tags ${inView ? "about-visible" : ""}`}
            style={{ animationDelay: "600ms" }}
          >
            {["Street Culture", "Rap Visuals", "Brand Storytelling", "Toronto"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[10px] uppercase tracking-widest border border-border text-muted-foreground"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
