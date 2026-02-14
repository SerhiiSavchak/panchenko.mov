"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui";
import { VideoPosterHover } from "@/components/video-poster-hover";

interface NavCardProps {
  title: string;
  description: string;
  href: string;
  video: string;
  poster: string;
  badge: string;
  index: number;
}

export function NavCard({
  title,
  description,
  href,
  video,
  poster,
  badge,
  index,
}: NavCardProps) {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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
        href={href}
        className="interactive-card group block relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      >
        <div className="relative aspect-[4/5] bg-muted overflow-hidden">
          <VideoPosterHover
            src={video}
            poster={poster}
            alt={title}
            aspectRatio="4/5"
            isActive={isActive}
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
          <span className="absolute top-3 left-3">
            <Badge>{badge}</Badge>
          </span>
        </div>

        <div className="flex items-start justify-between gap-2 pt-3">
          <div>
            <h3 className="font-display text-xl leading-none text-foreground group-hover:text-accent group-focus-visible:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
