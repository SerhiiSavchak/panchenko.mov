"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { WorkItem } from "@/data/work";

interface WorkCardProps {
  work: WorkItem;
  index: number;
}

export function WorkCard({ work, index }: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIsInView(true);
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15, rootMargin: "-30px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.pause();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isInView) videoRef.current?.play().catch(() => {});
  };

  return (
    <div
      ref={cardRef}
      className={`work-card-reveal ${isInView ? "work-card-visible" : ""}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link
        href={`/work/${work.slug}`}
        className="group block relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[4/5] bg-muted overflow-hidden">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            poster={work.thumbnail}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <source src={work.previewVideo} type="video/mp4" />
          </video>
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 px-2 py-1 text-[10px] uppercase tracking-wider bg-background/60 text-foreground backdrop-blur-sm border border-border">
            {work.category}
          </span>
        </div>

        <div className="flex items-start justify-between gap-2 pt-3">
          <div>
            <h3 className="font-display text-xl leading-none text-foreground group-hover:text-accent transition-colors">
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
