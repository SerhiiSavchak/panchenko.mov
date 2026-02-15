"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { QuickQuoteModal } from "@/components/quick-quote-modal";
import { Hero } from "@/components/home/hero";
import { Footer } from "@/components/footer";

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
const Services = dynamic(
  () =>
    import("@/components/home/services").then((m) => ({
      default: m.Services,
    })),
  { ssr: true }
);
const FeaturedWork = dynamic(
  () =>
    import("@/components/home/featured-work").then((m) => ({
      default: m.FeaturedWork,
    })),
  { ssr: true }
);
const SignatureLanes = dynamic(
  () =>
    import("@/components/home/signature-lanes").then((m) => ({
      default: m.SignatureLanes,
    })),
  { ssr: true }
);
const PinnedProcess = dynamic(
  () =>
    import("@/components/home/pinned-process").then((m) => ({
      default: m.PinnedProcess,
    })),
  { ssr: true }
);
const ReelRail = dynamic(
  () =>
    import("@/components/home/reel-rail").then((m) => ({
      default: m.ReelRail,
    })),
  { ssr: true }
);
const Gear = dynamic(
  () => import("@/components/home/gear").then((m) => ({ default: m.Gear })),
  { ssr: true }
);
const BuildYourShoot = dynamic(
  () =>
    import("@/components/home/build-your-shoot").then((m) => ({
      default: m.BuildYourShoot,
    })),
  { ssr: true }
);
const Testimonials = dynamic(
  () =>
    import("@/components/home/testimonials").then((m) => ({
      default: m.Testimonials,
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
        <Services />
        <SignatureLanes />
        <PinnedProcess />
        <ReelRail />
        <Gear />
        <BuildYourShoot onQuoteOpen={() => setQuoteOpen(true)} />
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
