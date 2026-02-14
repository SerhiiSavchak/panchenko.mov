"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { QuickQuoteModal } from "@/components/quick-quote-modal";

export default function BTSPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />
      <main className="pt-24 pb-16 md:pb-24 px-4 md:px-8 lg:px-16 min-h-screen">
        <div className="page-enter">
          <Link
            href="/#featured"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
          >
            &larr; Back to Featured
          </Link>
          <span className="block text-[11px] uppercase tracking-widest text-muted-foreground mt-6">
            Behind the Scenes
          </span>
          <h1 className="font-display text-6xl md:text-8xl text-foreground mt-1 mb-4">
            BTS
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mb-12 leading-relaxed">
            Unfiltered moments from set. The raw footage that never makes the final edit but tells the real story.
          </p>
        </div>

        {/* Placeholder grid */}
        <div className="page-enter-delay-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-muted rounded-sm flex items-center justify-center"
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Coming soon
              </span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <QuickQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
