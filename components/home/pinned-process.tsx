"use client";

import { Section } from "@/components/section";
import { SectionHeader } from "@/components/ui";
import { useScrollProgress, useScrollReveal } from "@/lib/scroll-animate";
import { useReducedMotion } from "@/lib/hooks";
import { useRef } from "react";

const STEPS = [
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

const STEP_DELAY_MS = 80;

export function PinnedProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);
  const inView = useScrollReveal(containerRef, {
    once: true,
    threshold: 0.05,
    rootMargin: "-60px 0px",
  });
  const reducedMotion = useReducedMotion();

  return (
    <Section>
      <SectionHeader label="How It Works" title="Process" />

      <div ref={containerRef} className="relative">
        {/* Mobile: top progress bar */}
        <div className="md:hidden mb-8 overflow-hidden rounded-full">
          <div
            className="process-progress-bar h-1 w-full"
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="process-progress-fill w-full"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>

        {/* Desktop: full-width vertical timeline + steps */}
        <div className="hidden md:grid md:grid-cols-[auto_1fr] md:gap-12 lg:gap-16 xl:gap-20 w-full max-w-7xl mx-auto">
          <ProcessTimeline progress={progress} />
          <div className="flex flex-col gap-16 lg:gap-20 min-w-0">
            {STEPS.map((step, i) => (
              <ProcessStep
                key={step.num}
                step={step}
                index={i}
                total={STEPS.length}
                inView={inView}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* Mobile: stacked with left mini-line */}
        <div className="md:hidden flex flex-col gap-8">
          {STEPS.map((step, i) => (
            <ProcessStepMobile
              key={step.num}
              step={step}
              index={i}
              inView={inView}
              reducedMotion={reducedMotion}
              progress={progress}
              total={STEPS.length}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProcessTimeline({ progress }: { progress: number }) {
  return (
    <div className="relative pt-1 pb-1">
      <div
        className="process-timeline-track absolute left-0 top-0 bottom-0 w-px"
        aria-hidden
      />
      <div
        className="process-timeline-fill absolute left-0 top-0 w-px min-h-[20px]"
        style={{
          height: `${Math.max(20, progress * 100)}%`,
        }}
        aria-hidden
      />
    </div>
  );
}

function ProcessStep({
  step,
  index,
  total,
  inView,
  reducedMotion,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  inView: boolean;
  reducedMotion: boolean;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
  const stepInView = useScrollReveal(stepRef, {
    once: true,
    threshold: 0.2,
    rootMargin: "-40px 0px",
  });

  const visible = inView && stepInView;

  return (
    <div
      ref={stepRef}
      className={`process-step-item ${visible ? "process-step-visible" : ""}`}
      style={
        reducedMotion
          ? undefined
          : { animationDelay: `${index * STEP_DELAY_MS}ms` }
      }
    >
      <div className="relative pl-0">
        <span
          className="font-display text-4xl lg:text-5xl text-accent block mb-2"
          style={{ opacity: visible ? 1 : 0.6 }}
        >
          {step.num}
        </span>
        <h3 className="font-display text-xl lg:text-2xl text-foreground">
          {step.title}
        </h3>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

function ProcessStepMobile({
  step,
  index,
  inView,
  reducedMotion,
  progress,
  total,
}: {
  step: (typeof STEPS)[number];
  index: number;
  inView: boolean;
  reducedMotion: boolean;
  progress: number;
  total: number;
}) {
  const stepRef = useRef<HTMLDivElement>(null);
  const stepInView = useScrollReveal(stepRef, {
    once: true,
    threshold: 0.15,
    rootMargin: "-30px 0px",
  });

  const visible = inView && stepInView;
  const stepProgress = Math.max(
    0,
    Math.min(1, (progress * total - index) / 1)
  );
  const lineHeight = visible ? 100 : Math.round(stepProgress * 100);

  return (
    <div
      ref={stepRef}
      className={`relative pl-6 border-l-2 border-border process-step-item ${
        visible ? "process-step-visible" : ""
      }`}
      style={
        reducedMotion
          ? undefined
          : { animationDelay: `${index * STEP_DELAY_MS}ms` }
      }
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 -ml-px bg-accent origin-top transition-transform duration-150"
        style={{ transform: `scaleY(${lineHeight / 100})` }}
        aria-hidden
      />
      <span className="font-display text-3xl text-accent">{step.num}</span>
      <h3 className="font-display text-xl text-foreground mt-1">{step.title}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
        {step.desc}
      </p>
    </div>
  );
}
