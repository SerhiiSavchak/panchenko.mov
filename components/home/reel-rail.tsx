"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Section } from "@/components/section";
import { SectionHeader, Badge } from "@/components/ui";
import { VideoPosterHover } from "@/components/video-poster-hover";
import { BTS_RAW_CARDS } from "@/lib/media";
import { useLongPressPreview } from "@/lib/use-long-press-preview";

function ReelCard({
  card,
  index,
  inView,
}: {
  card: (typeof BTS_RAW_CARDS)[number];
  index: number;
  inView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardId = `reel-${card.title}-${index}`;
  const longPress = useLongPressPreview(cardId);
  const isActive = longPress.isActive || isHovered;

  return (
    <Link
      href={card.href}
      className="interactive-card snap-center shrink-0 w-48 md:w-56 block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onTouchStart={longPress.onTouchStart}
      onTouchEnd={longPress.onTouchEnd}
      onTouchCancel={longPress.onTouchCancel}
      onClick={longPress.onClick}
    >
            <div className="relative aspect-[9/16] bg-muted overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
              <VideoPosterHover
                src={card.video}
                poster={card.poster}
                alt={card.title}
                aspectRatio="9/16"
                isActive={isActive}
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2 left-2 z-10">
                <Badge size="sm">{card.badge}</Badge>
              </div>
            </div>
      <h3 className="font-display text-lg leading-none text-foreground mt-3 group-hover:text-accent group-focus-visible:text-accent transition-colors">
        {card.title}
      </h3>
    </Link>
  );
}

export function ReelRail() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.15, rootMargin: "-30px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Section>
      <SectionHeader
        label="Behind the Scenes"
        title="BTS / Raw Cuts"
        subtitle="Camcorder energy. Uncut moments from set. The raw footage that never makes the final edit but tells the real story."
        className="mb-8"
      />

      <div
        ref={ref}
        className={`flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide ${inView ? "lane-visible" : "lane-reveal"}`}
      >
        {BTS_RAW_CARDS.map((card, i) => (
          <ReelCard key={`${card.title}-${i}`} card={card} index={i} inView={inView} />
        ))}
      </div>
    </Section>
  );
}
