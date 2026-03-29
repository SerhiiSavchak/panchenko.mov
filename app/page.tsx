import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { HomeIntro } from "@/components/site/home-intro";
import { WorkIndex } from "@/components/site/work-index";
import { FaqSection } from "@/components/site/faq-section";
import { FinalCta } from "@/components/site/final-cta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HomeIntro />
        <WorkIndex />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
