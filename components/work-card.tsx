"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { WorkItem } from "@/data/work";
import { Badge } from "@/components/ui";
import { VideoPosterHover } from "@/components/video-poster-hover";

interface WorkCardProps {
  work: WorkItem;
  index: number;
}

export function WorkCard({ work, index }: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setIsInView(true),
      { threshold: 0.15, rootMargin: "-30px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`work-card-reveal ${isInView ? "work-card-visible" : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link
        href={`/work/${work.slug}`}
        className="interactive-card group block relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <div className="relative aspect-[4/5] bg-muted overflow-hidden">
          <VideoPosterHover
            src={work.previewVideo}
            poster={work.thumbnail}
            alt={work.title}
            aspectRatio="4/5"
            isActive={isHovered}
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          <span className="absolute top-3 left-3">
            <Badge>{work.category}</Badge>
          </span>
        </div>

        <div className="flex items-start justify-between gap-2 pt-3">
          <div>
            <h3 className="font-display text-xl leading-none text-foreground group-hover:text-accent group-focus-visible:text-accent transition-colors">
              {work.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{work.shortDesc}</p>
          </div>
          <span className="text-xs text-muted-foreground shrink-0">{work.year}</span>
        </div>
      </Link>
    </div>
  );
}
