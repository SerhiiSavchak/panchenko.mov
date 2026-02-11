"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { QuickQuoteModal } from "@/components/quick-quote-modal";
import { MagneticButton } from "@/components/magnetic-button";
import { VideoInView } from "@/components/video-in-view";
import type { WorkItem } from "@/data/work";

export function CaseStudyClient({ work }: { work: WorkItem }) {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />

      <main className="pt-24 pb-16 md:pb-24">
        {/* Hero */}
        <div className="px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/work"
              className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
            >
              &larr; Back to Work
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-4 mt-4 mb-8">
              <div>
                <span className="px-2 py-1 text-[10px] uppercase tracking-wider border border-border text-muted-foreground">
                  {work.category}
                </span>
                <h1 className="font-display text-6xl md:text-8xl text-foreground mt-2">
                  {work.title}
                </h1>
              </div>
              <span className="font-display text-2xl text-muted-foreground">
                {work.year}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Preview video */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="px-4 md:px-8 lg:px-16 mb-12"
        >
          <div className="relative aspect-video bg-muted overflow-hidden">
            <VideoInView
              src={work.previewVideo}
              poster={work.thumbnail}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Details grid */}
        <div className="px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              About
            </h3>
            <p className="text-sm text-foreground leading-relaxed">
              {work.shortDesc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Services
            </h3>
            <ul className="flex flex-col gap-1">
              {work.services.map((s) => (
                <li key={s} className="text-sm text-foreground flex items-center gap-2">
                  <span className="text-accent">+</span>
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
              Results
            </h3>
            <p className="text-sm text-accent font-semibold">{work.results}</p>
            <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mt-6 mb-3">
              Credits
            </h3>
            <p className="text-sm text-muted-foreground">{work.credits}</p>
          </motion.div>
        </div>

        {/* Gallery */}
        <div className="px-4 md:px-8 lg:px-16 mb-16">
          <h3 className="text-[11px] uppercase tracking-widest text-muted-foreground mb-6">
            Gallery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {work.gallery.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-video bg-muted overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`${work.title} gallery ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-4 md:px-8 lg:px-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {"Want something like this?"}
          </h2>
          <MagneticButton
            variant="primary"
            onClick={() => setQuoteOpen(true)}
          >
            Book a Shoot
          </MagneticButton>
        </div>
      </main>

      <Footer />
      <QuickQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
