"use client";

import { works } from "@/data/work";
import { WorkCard } from "@/components/work-card";
import { Section } from "@/components/section";
import Link from "next/link";

export function FeaturedWork() {
  const featured = works.slice(0, 9);

  return (
    <Section id="featured">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Selected Work
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1">
            Featured
          </h2>
        </div>
        <Link
          href="/work"
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors border-b border-border hover:border-accent pb-1"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {featured.map((work, i) => (
          <WorkCard key={work.slug} work={work} index={i} />
        ))}
      </div>
    </Section>
  );
}
