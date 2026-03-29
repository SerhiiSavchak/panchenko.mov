import { works } from "@/data/work";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ProjectHero } from "@/components/work/project-hero";
import { ProjectMeta } from "@/components/work/project-meta";
import { ProjectGallery } from "@/components/work/project-gallery";
import { ProjectNavigation } from "@/components/site/project-navigation";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return { title: "Not Found" };
  return {
    title: `${work.title} | PANchenko`,
    description: work.shortDesc,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Filter to featured works only (same as homepage)
  const featuredWorks = works.filter((w) => w.category !== "reels");
  const workIndex = featuredWorks.findIndex((w) => w.slug === slug);
  const work = featuredWorks[workIndex];
  
  if (!work) notFound();

  const previous = workIndex > 0 ? featuredWorks[workIndex - 1] : null;
  const next = workIndex < featuredWorks.length - 1 ? featuredWorks[workIndex + 1] : null;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>&larr;</span>
            <span>All Work</span>
          </Link>
        </div>
        
        <ProjectHero work={work} />
        <ProjectMeta work={work} />
        <ProjectGallery work={work} />
        <ProjectNavigation previous={previous} next={next} />
      </main>
      <Footer />
    </>
  );
}
