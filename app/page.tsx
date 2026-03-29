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

// Below-fold sections: lazy load to reduce initial bundle and improve TTI
const Works = dynamic(
  () => import("@/components/home/works").then((m) => ({ default: m.Works })),
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
        <Works />
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
