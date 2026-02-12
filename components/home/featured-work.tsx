"use client";

import { works } from "@/data/work";
import { WorkCard } from "@/components/work-card";
import { Section } from "@/components/section";
import { SectionHeader, SectionLink } from "@/components/ui";

export function FeaturedWork() {
  const featured = works.slice(0, 9);

  return (
    <Section id="featured">
      <div className="flex items-end justify-between mb-10">
        <SectionHeader label="Selected Work" title="Featured" className="mb-0" />
        <SectionLink href="/work">View All</SectionLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featured.map((work, i) => (
          <WorkCard key={work.slug} work={work} index={i} />
        ))}
      </div>
    </Section>
  );
}
