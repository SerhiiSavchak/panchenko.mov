"use client";

import { Section } from "@/components/section";
import { VideoInView } from "@/components/video-in-view";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const lanes = [
  { title: "Rap Clips", category: "rap", video: "/reels/reel-1.mp4" },
  { title: "Cars", category: "cars", video: "/reels/reel-2.mp4" },
  { title: "Fight", category: "fight", video: "/reels/reel-3.mp4" },
  { title: "Brand", category: "brand", video: "/reels/reel-4.mp4" },
  { title: "Reels", category: "reels", video: "/reels/reel-5.mp4" },
];

export function SignatureLanes() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
          <motion.div
            key={lane.title}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="snap-start shrink-0 w-56 md:w-72"
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
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
