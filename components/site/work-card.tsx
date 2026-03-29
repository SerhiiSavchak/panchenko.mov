"use client";

import Link from "next/link";
import Image from "next/image";
import type { WorkItem } from "@/data/work";
import { categories } from "@/data/work";

interface WorkCardProps {
  work: WorkItem;
  index: number;
}

export function WorkCard({ work, index }: WorkCardProps) {
  const categoryLabel = categories.find((c) => c.value === work.category)?.label || work.category;

  return (
    <Link
      href={`/work/${work.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <article className="fade-in-up">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted mb-4">
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-medium mb-1 group-hover:text-muted-foreground transition-colors">
              {work.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {categoryLabel}
            </p>
          </div>
          <span className="text-sm text-muted-foreground tabular-nums">
            {work.year}
          </span>
        </div>
      </article>
    </Link>
  );
}
