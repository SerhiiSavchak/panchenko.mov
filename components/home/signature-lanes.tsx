"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/ui";
import { VideoPosterHover } from "@/components/video-poster-hover";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { SIGNATURE_LANE_VIDEOS } from "@/lib/media";
import { useActivePreview } from "@/lib/active-preview-context";

const lanes = [
  { title: "Rap Clips", category: "rap", video: SIGNATURE_LANE_VIDEOS[0] },
  { title: "Cars", category: "cars", video: SIGNATURE_LANE_VIDEOS[1] },
  { title: "Fight", category: "fight", video: SIGNATURE_LANE_VIDEOS[2] },
  { title: "Brand", category: "brand", video: SIGNATURE_LANE_VIDEOS[3] },
  { title: "Reels", category: "reels", video: SIGNATURE_LANE_VIDEOS[4] },
];

export function SignatureLanes() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const preview = useActivePreview();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.2, rootMargin: "-60px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Section>
      <SectionHeader label="Signature Lanes" title="What I Shoot" className="mb-10" />

      <div ref={ref} className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {lanes.map((lane, i) => {
          const cardId = `lane-${lane.category}`;
          const href = `/work?category=${lane.category}`;
          const isActive = preview?.isMobile ? preview.activeId === cardId : hoveredIndex === i;
          const v = lane.video as { video: string; videoMobile?: string; poster: string };
          return (
          <div
            key={lane.title}
            className={`snap-start shrink-0 w-56 md:w-72 lane-reveal ${inView ? "lane-visible" : ""}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Link
              href={href}
              className="interactive-card group block"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={preview ? preview.handleCardTap(cardId, href) : undefined}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-700">
                <VideoPosterHover
                  src={v.video}
                  poster={v.poster}
                  alt={lane.title}
                  mobileSrc={v.videoMobile}
                  aspectRatio="3/4"
                  isActive={isActive}
                  fill
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                <h3 className="absolute bottom-4 left-4 font-display text-2xl text-foreground group-hover:text-accent transition-colors z-10">
                  {lane.title}
                </h3>
              </div>
            </Link>
          </div>
          );
        })}
      </div>
    </Section>
  );
}
