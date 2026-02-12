"use client";

import { useRef, useState, useEffect } from "react";
import { Section } from "@/components/section";
import Image from "next/image";
import { GEAR_IMAGES, GEAR_VIDEOS } from "@/lib/media";
import { useScrollReveal } from "@/lib/scroll-animate";

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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useScrollReveal(ref, { once: true, rootMargin: "-80px 0px" });

  return (
    <Section>
      <div className={`md:flex md:gap-16 ${inView ? "section-in-view" : ""}`}>
        {/* Sticky heading */}
        <div className="md:w-1/3 md:sticky md:top-24 md:self-start mb-10 md:mb-0 gear-heading-reveal">
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

        {/* Gear cards - video default, image on hover */}
        <div ref={ref} className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {gear.map((item, i) => (
            <GearCard
              key={item.name}
              item={item}
              index={i}
              inView={inView}
              imageSrc={GEAR_IMAGES[i % GEAR_IMAGES.length]}
              videoSrc={GEAR_VIDEOS[i % GEAR_VIDEOS.length]}
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
  imageSrc,
  videoSrc,
}: {
  item: (typeof gear)[number];
  index: number;
  inView: boolean;
  imageSrc: string;
  videoSrc: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2, rootMargin: "-40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-card border border-border overflow-hidden hover:border-accent/40 transition-colors gear-card-reveal ${inView ? "gear-card-visible" : ""}`}
      style={{ animationDelay: `${index * 70}ms` }}
      onMouseEnter={() => {
        setIsHovered(true);
        videoRef.current?.pause();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        videoRef.current?.play().catch(() => {});
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={imageSrc}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 group-hover:scale-105 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <Image
          src={imageSrc}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
      </div>

      <div className="p-5 relative">
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
    </div>
  );
}
