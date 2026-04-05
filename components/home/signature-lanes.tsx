"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/ui";
import { VideoPosterHover } from "@/components/video-poster-hover";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useLongPressPreview } from "@/lib/use-long-press-preview";

const lanes = [
  {
    title: "Brand",
    href: "/work/after-hours",
    video: {
      video: "/assets/featured/after-hours/preview.mp4",
      poster: "/assets/featured/after-hours/poster.jpg",
    },
  },
  {
    title: "Reels",
    href: "/work/built-daily",
    video: {
      video: "/assets/featured/built-daily/preview.mp4",
      poster: "/assets/featured/built-daily/poster.jpg",
    },
  },
  {
    title: "City",
    href: "/work/city-frequency",
    video: {
      video: "/assets/featured/city-frequency/preview.mp4",
      poster: "/assets/featured/city-frequency/poster.jpg",
    },
  },
  {
    title: "Editorial",
    href: "/work/relocation",
    video: {
      video: "/assets/featured/relocation/preview.mp4",
      poster: "/assets/featured/relocation/poster.jpg",
    },
  },
  {
    title: "Music Video",
    href: "/work/red-room-session",
    video: {
      video: "/assets/featured/red-room-session/preview.mp4",
      poster: "/assets/featured/red-room-session/poster.jpg",
    },
  },
];

function LaneCard({
  lane,
  index,
  inView,
}: {
  lane: (typeof lanes)[number];
  index: number;
  inView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardId = `lane-${lane.title}`;
  const longPress = useLongPressPreview(cardId);
  const isActive = longPress.isActive || isHovered;
  const v = lane.video;

  return (
    <div
      className={`snap-start shrink-0 w-56 md:w-72 lane-reveal ${inView ? "lane-visible" : ""}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link
        href={lane.href}
        className="interactive-card group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={longPress.onTouchStart}
        onTouchEnd={longPress.onTouchEnd}
        onTouchCancel={longPress.onTouchCancel}
        onClick={longPress.onClick}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-700">
          <VideoPosterHover
            src={v.video}
            poster={v.poster}
            alt={lane.title}
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
}

export function SignatureLanes() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), {
      threshold: 0.2,
      rootMargin: "-60px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Section>
      <SectionHeader label="Signature Lanes" title="What I Shoot" className="mb-10" />

      <div ref={ref} className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide min-w-0 w-full">
        {lanes.map((lane, i) => (
          <LaneCard key={lane.title} lane={lane} index={i} inView={inView} />
        ))}
      </div>
    </Section>
  );
}
