"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/ui";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Brief",
    desc: "We discuss your vision, goals, references, and vibe. I ask the right questions so nothing gets lost.",
  },
  {
    num: "02",
    title: "Moodboard",
    desc: "Visual direction, color palettes, shot references, music. We align on the look before a single frame is shot.",
  },
  {
    num: "03",
    title: "Shoot",
    desc: "Full production day(s). Cinema-grade gear, creative direction, raw energy. No corporate stiffness.",
  },
  {
    num: "04",
    title: "Edit",
    desc: "Rhythm-driven cuts, color grading, sound design. Two rounds of revisions included.",
  },
  {
    num: "05",
    title: "Delivery",
    desc: "4K master + all social formats. Ready to post, ready to go viral.",
  },
];

export function PinnedProcess() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <Section>
      <SectionHeader label="How It Works" title="Process" />

      <div ref={containerRef} className="relative">
        {/* Desktop: sticky timeline */}
        <div className="hidden md:block">
          <div className="flex gap-0">
            {steps.map((step, i) => (
              <ProcessStep
                key={step.num}
                step={step}
                index={i}
                total={steps.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-l-2 border-border pl-6 hover:border-accent transition-colors"
            >
              <span className="font-display text-3xl text-accent">
                {step.num}
              </span>
              <h3 className="font-display text-xl text-foreground mt-1">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProcessStep({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const stepProgress = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1]
  );
  const barOpacity = useTransform(stepProgress, [0, 0.5], [0.2, 1]);

  return (
    <div className="flex-1 relative">
      <motion.div
        className="h-px bg-accent mb-6"
        style={{ opacity: barOpacity }}
      />
      <span className="font-display text-4xl text-accent">{step.num}</span>
      <h3 className="font-display text-xl text-foreground mt-2">
        {step.title}
      </h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed pr-4">
        {step.desc}
      </p>
    </div>
  );
}
