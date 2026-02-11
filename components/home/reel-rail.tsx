"use client";

import { Section } from "@/components/section";
import { VideoInView } from "@/components/video-in-view";

const reels = [
  { src: "/reels/reel-1.mp4", label: "BTS" },
  { src: "/reels/reel-2.mp4", label: "BTS" },
  { src: "/reels/reel-3.mp4", label: "RAW" },
  { src: "/reels/reel-4.mp4", label: "BTS" },
  { src: "/reels/reel-5.mp4", label: "RAW" },
  { src: "/reels/reel-6.mp4", label: "BTS" },
  { src: "/reels/reel-7.mp4", label: "CUT" },
  { src: "/reels/reel-8.mp4", label: "BTS" },
  { src: "/reels/reel-9.mp4", label: "RAW" },
  { src: "/reels/reel-10.mp4", label: "BTS" },
];

export function ReelRail() {
  return (
    <Section>
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
        Behind the Scenes
      </span>
      <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1 mb-10">
        BTS / Raw Cuts
      </h2>
      <p className="text-sm text-muted-foreground mb-8 max-w-lg">
        Camcorder energy. Uncut moments from set. The raw footage that never
        makes the final edit but tells the real story.
      </p>

      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
        {reels.map((reel, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-48 md:w-56 aspect-[9/16] bg-muted overflow-hidden relative"
          >
            <VideoInView
              src={reel.src}
              fallbackIndex={i}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 px-1.5 py-0.5 text-[9px] uppercase tracking-wider bg-background/60 text-foreground backdrop-blur-sm border border-border">
              {reel.label}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
