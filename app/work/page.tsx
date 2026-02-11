"use client";

import { useState, useMemo } from "react";
import { works, categories, type WorkCategory } from "@/data/work";
import { WorkCard } from "@/components/work-card";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { QuickQuoteModal } from "@/components/quick-quote-modal";
import { motion } from "framer-motion";

export default function WorkPage() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<
    WorkCategory | "all"
  >("all");

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? works
        : works.filter((w) => w.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <ScrollProgress />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />
      <main className="pt-24 pb-16 md:pb-24 px-4 md:px-8 lg:px-16 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Portfolio
          </span>
          <h1 className="font-display text-6xl md:text-8xl text-foreground mt-1 mb-8">
            Work
          </h1>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-transparent text-muted-foreground border-border hover:border-accent hover:text-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-20">
            No projects in this category yet.
          </p>
        )}
      </main>
      <Footer />
      <QuickQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}
