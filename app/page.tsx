"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
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
import { Testimonials } from "@/components/home/testimonials";
import { FAQ } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";
import { Footer } from "@/components/footer";

// Dynamic imports for heavy new sections
const About = dynamic(
  () => import("@/components/home/about").then((m) => ({ default: m.About })),
  { ssr: false }
);
const Gear = dynamic(
  () => import("@/components/home/gear").then((m) => ({ default: m.Gear })),
  { ssr: false }
);
const BuildYourShoot = dynamic(
  () =>
    import("@/components/home/build-your-shoot").then((m) => ({
      default: m.BuildYourShoot,
    })),
  { ssr: false }
);
const StreetMotion = dynamic(
  () =>
    import("@/components/home/street-motion").then((m) => ({
      default: m.StreetMotion,
    })),
  { ssr: false }
);

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />
      <main>
        <Hero onQuoteOpen={() => setQuoteOpen(true)} />
        <ProofStrip />
        <About />
        <FeaturedWork />
        <Services />
        <SignatureLanes />
        <StreetMotion />
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
