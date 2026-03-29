"use client";

import { useEffect, useMemo, useState } from "react";
import { works, categories } from "@/data/work";
import { WorkCard } from "@/components/work-card";
import { Section } from "@/components/section";
import { SectionHeader } from "@/components/ui";

const INITIAL_WORKS_LIMIT = 6;

export function Works() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]["value"]>("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? works
        : works.filter((w) => w.category === activeCategory),
    [activeCategory]
  );

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  const visibleWorks = useMemo(() => {
    if (showAll || filtered.length <= INITIAL_WORKS_LIMIT) return filtered;
    return filtered.slice(0, INITIAL_WORKS_LIMIT);
  }, [filtered, showAll]);

  const showShowAllButton =
    filtered.length > INITIAL_WORKS_LIMIT && !showAll;

  return (
    <Section id="works">
      <SectionHeader
        label="Portfolio"
        title="Works"
        className="mb-10"
      />

      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
              activeCategory === cat.value
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-transparent text-muted-foreground border-border hover:border-accent hover:text-accent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {visibleWorks.map((work, i) => (
          <WorkCard
            key={work.slug}
            work={work}
            index={i}
            priority={i < 6}
          />
        ))}
      </div>

      {showShowAllButton && (
        <div className="flex justify-center mt-10 md:mt-12">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="px-6 py-3 text-xs uppercase tracking-widest border border-border text-muted-foreground hover:border-accent hover:text-accent transition-colors"
          >
            Show all
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-muted-foreground text-sm text-center py-20">
          No projects in this category yet.
        </p>
      )}
    </Section>
  );
}
