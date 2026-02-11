"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { WorkItem } from "@/data/work";

interface WorkCardProps {
  work: WorkItem;
  index: number;
}

export function WorkCard({ work, index }: WorkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link
        href={`/work/${work.slug}`}
        className="group block relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[4/5] bg-muted overflow-hidden">
          <Image
            src={work.thumbnail}
            alt={work.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Hover video preview */}
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={work.previewVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Purple glow on hover */}
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background: "linear-gradient(135deg, transparent 40%, rgba(168,85,247,0.1) 60%, transparent 80%)",
            }}
          />

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
    </motion.div>
  );
}
