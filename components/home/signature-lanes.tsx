"use client";

import { Section } from "@/components/section";
import { VideoInView } from "@/components/video-in-view";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { SIGNATURE_LANE_VIDEOS } from "@/lib/media";

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
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
        Signature Lanes
      </span>
      <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1 mb-10">
        What I Shoot
      </h2>

      <div ref={ref} className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {lanes.map((lane, i) => (
          <div
            key={lane.title}
            className={`snap-start shrink-0 w-56 md:w-72 lane-reveal ${inView ? "lane-visible" : ""}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Link href={`/work?category=${lane.category}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <VideoInView
                  src={lane.video}
                  fallbackIndex={i}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <h3 className="absolute bottom-4 left-4 font-display text-2xl text-foreground group-hover:text-accent transition-colors">
                  {lane.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
