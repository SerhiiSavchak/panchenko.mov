"use client";

import { type ReactNode, useRef } from "react";
import { useScrollReveal } from "@/lib/scroll-animate";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Root margin for scroll reveal */
  rootMargin?: string;
}

export function Section({
  children,
  className,
  id,
  rootMargin = "-80px 0px",
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useScrollReveal(ref, {
    once: true,
    threshold: 0.08,
    rootMargin,
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      className={cn(
        "px-4 md:px-8 lg:px-16 py-16 md:py-24 section-reveal",
        isInView && "section-visible",
        className
      )}
    >
      {children}
    </section>
  );
}
