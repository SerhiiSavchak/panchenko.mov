"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { ScrollProgress } from "@/components/scroll-progress";
import { QuickQuoteModal } from "@/components/quick-quote-modal";
import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { FeaturedWork } from "@/components/home/featured-work";
import { Services } from "@/components/home/services";
import { SignatureLanes } from "@/components/home/signature-lanes";
import { PinnedProcess } from "@/components/home/pinned-process";
import { ReelRail } from "@/components/home/reel-rail";
import { Packages } from "@/components/home/packages";
import { Testimonials } from "@/components/home/testimonials";
import { FAQ } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";
import { Footer } from "@/components/footer";

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />
      <main>
        <Hero onQuoteOpen={() => setQuoteOpen(true)} />
        <ProofStrip />
        <FeaturedWork />
        <Services />
        <SignatureLanes />
        <PinnedProcess />
        <ReelRail />
        <Packages onQuoteOpen={() => setQuoteOpen(true)} />
        <Testimonials />
        <FAQ />
        <FinalCTA onQuoteOpen={() => setQuoteOpen(true)} />
      </main>
      <Footer />
      <QuickQuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
      />
    </>
  );
}
