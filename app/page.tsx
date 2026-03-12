"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Hero } from "@/components/home/hero";
import { Footer } from "@/components/footer";

const QuickQuoteModal = dynamic(
  () => import("@/components/quick-quote-modal").then((m) => ({ default: m.QuickQuoteModal })),
  { ssr: false }
);

const ScrollProgress = dynamic(
  () => import("@/components/scroll-progress").then((m) => ({ default: m.ScrollProgress })),
  { ssr: false }
);

const ProofStrip = dynamic(
  () => import("@/components/home/proof-strip").then((m) => ({ default: m.ProofStrip })),
  { ssr: true }
);

// Below-fold sections: lazy load to reduce initial bundle and improve TTI
const About = dynamic(
  () => import("@/components/home/about").then((m) => ({ default: m.About })),
  { ssr: true }
);
const FeaturedWork = dynamic(
  () =>
    import("@/components/home/featured-work").then((m) => ({
      default: m.FeaturedWork,
    })),
  { ssr: true }
);
const BuildYourShoot = dynamic(
  () =>
    import("@/components/home/build-your-shoot").then((m) => ({
      default: m.BuildYourShoot,
    })),
  { ssr: true }
);
const FAQ = dynamic(
  () => import("@/components/home/faq").then((m) => ({ default: m.FAQ })),
  { ssr: true }
);
const FinalCTA = dynamic(
  () =>
    import("@/components/home/final-cta").then((m) => ({
      default: m.FinalCTA,
    })),
  { ssr: true }
);

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />
      <main className="relative overflow-x-clip">
        <Hero onQuoteOpen={() => setQuoteOpen(true)} />
        <ProofStrip />
        <About />
        <FeaturedWork />
        <BuildYourShoot onQuoteOpen={() => setQuoteOpen(true)} />
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
