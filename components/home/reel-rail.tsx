"use client";

import { Section } from "@/components/section";
import { SectionHeader, Badge } from "@/components/ui";
import { VideoPosterOnly } from "@/components/video-poster-only";
import { WORK_IMAGES } from "@/lib/media";

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
      <SectionHeader
        label="Behind the Scenes"
        title="BTS / Raw Cuts"
        subtitle="Camcorder energy. Uncut moments from set. The raw footage that never makes the final edit but tells the real story."
        className="mb-8"
      />

      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
        {reels.map((reel, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-48 md:w-56 aspect-[9/16] bg-muted overflow-hidden relative"
          >
            <VideoPosterOnly
              poster={WORK_IMAGES[i % WORK_IMAGES.length]}
              alt={`Reel ${i + 1} ${reel.label}`}
              aspectRatio="9/16"
            />
            <div className="absolute top-2 left-2 z-10">
              <Badge size="sm">{reel.label}</Badge>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
