import { works } from "@/data/work";
import { WorkCard } from "./work-card";

export function WorkIndex() {
  // Filter out reels for main portfolio, show only featured work
  const featuredWorks = works.filter((w) => w.category !== "reels");

  return (
    <section className="pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
          {featuredWorks.map((work, index) => (
            <WorkCard key={work.slug} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
