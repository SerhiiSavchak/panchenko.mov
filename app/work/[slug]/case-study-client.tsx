"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { QuickQuoteModal } from "@/components/quick-quote-modal";
import { MagneticButton } from "@/components/magnetic-button";
import { VideoPosterTap } from "@/components/video-poster-tap";
import { useScrollReveal } from "@/lib/scroll-animate";
import { useLenis } from "@/components/lenis-provider";
import { categoryLabels, type WorkItem } from "@/data/work";

export function CaseStudyClient({ work }: { work: WorkItem }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const lenis = useLenis();
  const detailsRef = useRef(null);
  const galleryRef = useRef(null);
  const detailsInView = useScrollReveal(detailsRef, { once: true });
  const galleryInView = useScrollReveal(galleryRef, { once: true });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [lenis, work.slug]);

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />

      <main className="pt-20 md:pt-28 pb-16 md:pb-24 overflow-x-clip">
        <div className="px-4 md:px-8 lg:px-16">
          <div className="page-enter">
            <Link
              href="/#works"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors mb-4"
            >
              <span aria-hidden>&larr;</span>
              Back to Portfolio
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-4 mt-4 mb-6">
              <div className="max-w-4xl">
                <span className="px-2 py-1 text-[10px] uppercase tracking-wider border border-border text-muted-foreground">
                  {categoryLabels[work.category]}
                </span>
                <h1 className="font-display text-6xl md:text-8xl text-foreground mt-2">{work.title}</h1>
                <p className="text-base md:text-lg text-muted-foreground mt-4 leading-relaxed">{work.headline}</p>
              </div>
              <span className="font-display text-2xl text-muted-foreground shrink-0">{work.year}</span>
            </div>
          </div>
        </div>

        <div className="page-enter-delay-1 px-4 md:px-8 lg:px-16 mb-12">
          <VideoPosterTap
            src={work.video}
            poster={work.poster}
            alt={work.title}
            aspectRatio="16/9"
          />
        </div>

        <div
          ref={detailsRef}
          className={`px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ${detailsInView ? "scroll-reveal-visible" : ""}`}
        >
          <div className="scroll-reveal-item" style={{ animationDelay: "0ms" }}>
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">About</h3>
            <p className="text-sm text-foreground leading-relaxed">{work.description}</p>
          </div>
          <div className="scroll-reveal-item" style={{ animationDelay: "100ms" }}>
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Services</h3>
            <ul className="flex flex-col gap-1">
              {work.services.map((s) => (
                <li key={s} className="text-sm text-foreground flex items-center gap-2">
                  <span className="text-accent">+</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="scroll-reveal-item" style={{ animationDelay: "200ms" }}>
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Results</h3>
            <ul className="flex flex-col gap-2 mb-8">
              {work.results.map((r) => (
                <li key={r} className="text-sm text-accent font-medium leading-snug">
                  {r}
                </li>
              ))}
            </ul>
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">Credits</h3>
            <dl className="space-y-3">
              {work.credits.map((c) => (
                <div key={`${c.role}-${c.value}`} className="mb-3 last:mb-0">
                  <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{c.role}</dt>
                  <dd className="text-sm text-muted-foreground">{c.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div ref={galleryRef} className="px-4 md:px-8 lg:px-16 mb-16">
          <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-6">Gallery</h3>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${galleryInView ? "scroll-reveal-visible" : ""}`}>
            {work.gallery.map((img, i) => (
              <div
                key={img}
                className="scroll-reveal-item relative aspect-video bg-muted overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <Image
                  src={img}
                  alt={`${work.title} gallery ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={88}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 md:px-8 lg:px-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">{"Want something like this?"}</h2>
          <MagneticButton variant="primary" onClick={() => setQuoteOpen(true)}>
            Book a Shoot
          </MagneticButton>
        </div>
      </main>

      <Footer />
      <QuickQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
