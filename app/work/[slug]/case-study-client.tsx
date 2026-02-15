"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { QuickQuoteModal } from "@/components/quick-quote-modal";
import { MagneticButton } from "@/components/magnetic-button";
import { VideoPosterTap } from "@/components/video-poster-tap";
import { useScrollReveal } from "@/lib/scroll-animate";
import type { WorkItem } from "@/data/work";

export function CaseStudyClient({ work }: { work: WorkItem }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const detailsRef = useRef(null);
  const galleryRef = useRef(null);
  const detailsInView = useScrollReveal(detailsRef, { once: true });
  const galleryInView = useScrollReveal(galleryRef, { once: true });

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />

      <main className="pt-24 pb-16 md:pb-24 overflow-x-clip">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="page-enter">
            <Link href="/work" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
              &larr; Back to Work
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-4 mt-4 mb-8">
              <div>
                <span className="px-2 py-1 text-[10px] uppercase tracking-wider border border-border text-muted-foreground">{work.category}</span>
                <h1 className="font-display text-6xl md:text-8xl text-foreground mt-2">{work.title}</h1>
              </div>
              <span className="font-display text-2xl text-muted-foreground">{work.year}</span>
            </div>
          </div>
        </div>

        {/* Preview video */}
        <div className="page-enter-delay-1 px-4 md:px-8 lg:px-16 mb-12">
          <VideoPosterTap
            src={work.previewVideo}
            poster={work.thumbnail}
            alt={work.title}
            aspectRatio="16/9"
          />
        </div>

        {/* Details */}
        <div
          ref={detailsRef}
          className={`px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ${detailsInView ? "scroll-reveal-visible" : ""}`}
        >
          <div className="scroll-reveal-item" style={{ animationDelay: "0ms" }}>
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">About</h3>
            <p className="text-sm text-foreground leading-relaxed">{work.shortDesc}</p>
          </div>
          <div className="scroll-reveal-item" style={{ animationDelay: "100ms" }}>
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Services</h3>
            <ul className="flex flex-col gap-1">
              {work.services.map((s) => (
                <li key={s} className="text-sm text-foreground flex items-center gap-2"><span className="text-accent">+</span>{s}</li>
              ))}
            </ul>
          </div>
          <div className="scroll-reveal-item" style={{ animationDelay: "200ms" }}>
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Results</h3>
            <p className="text-sm text-accent font-semibold">{work.results}</p>
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mt-6 mb-3">Credits</h3>
            <p className="text-sm text-muted-foreground">{work.credits}</p>
          </div>
        </div>

        {/* Gallery */}
        <div ref={galleryRef} className="px-4 md:px-8 lg:px-16 mb-16">
          <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Gallery</h3>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${galleryInView ? "scroll-reveal-visible" : ""}`}>
            {work.gallery.map((img, i) => (
              <div
                key={i}
                className="scroll-reveal-item relative aspect-video bg-muted overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Image src={img} alt={`${work.title} gallery ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 md:px-8 lg:px-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">{"Want something like this?"}</h2>
          <MagneticButton variant="primary" onClick={() => setQuoteOpen(true)}>Book a Shoot</MagneticButton>
        </div>
      </main>

      <Footer />
      <QuickQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
