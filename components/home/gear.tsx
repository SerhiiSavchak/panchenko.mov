"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/section";

const gear = [
  {
    name: "Sony FX3",
    role: "Main Cinema Camera",
    desc: "Full-frame cinema body. S-Cinetone, 4K120. The workhorse.",
  },
  {
    name: "Sony A7S III",
    role: "Low Light Beast",
    desc: "Dual-ISO king. Night shoots, run-and-gun, interview setups.",
  },
  {
    name: "BMPCC 6K Pro",
    role: "RAW Cinema",
    desc: "Blackmagic RAW. When the grade needs to go deeper.",
  },
  {
    name: "DJI RS 3 Pro",
    role: "Stabilization",
    desc: "Gimbal for smooth tracking shots and dynamic movement.",
  },
  {
    name: "RODE Wireless GO II",
    role: "Audio",
    desc: "Dual-channel wireless. Clean audio, zero hassle.",
  },
  {
    name: "Aputure 600d Pro",
    role: "Lighting",
    desc: "Daylight powerhouse. Key light for studio and on-location.",
  },
  {
    name: "Sigma 24mm f/1.4",
    role: "Wide Prime",
    desc: "Wide-angle prime. Cinematic depth, sharp edge-to-edge.",
  },
  {
    name: "Sony Handycam",
    role: "BTS Camcorder",
    desc: "Behind-the-scenes camcorder energy. Raw, unfiltered.",
  },
];

export function Gear() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <Section>
      <div className="md:flex md:gap-16">
        {/* Sticky heading on desktop */}
        <div className="md:w-1/3 md:sticky md:top-24 md:self-start mb-10 md:mb-0">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            Tools
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1">
            Gear I
            <br />
            Shoot With
          </h2>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Cinema-grade kit for every type of shoot. No rentals, no compromises.
          </p>
        </div>

        {/* Gear cards */}
        <div ref={ref} className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gear.map((item, i) => (
            <GearCard
              key={item.name}
              item={item}
              index={i}
              inView={inView}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function GearCard({
  item,
  index,
  inView,
  reducedMotion,
}: {
  item: (typeof gear)[number];
  index: number;
  inView: boolean;
  reducedMotion: boolean;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setTilt({ x: -y, y: x });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="group relative bg-card border border-border p-5 hover:border-accent/40 transition-colors overflow-hidden"
    >
      {/* Neon glow accent */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 30px rgba(200,255,0,0.05)",
        }}
        aria-hidden="true"
      />

      <div className="relative">
        <span className="text-[10px] uppercase tracking-wider text-accent">
          {item.role}
        </span>
        <h3 className="font-display text-2xl text-foreground mt-1 group-hover:text-accent transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  );
}
