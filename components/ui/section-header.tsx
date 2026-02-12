"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  className?: string;
  /** Optional subtitle below title */
  subtitle?: ReactNode;
}

export function SectionHeader({
  label,
  title,
  className,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 md:mb-12", className)}>
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <h2 className="font-display text-5xl md:text-7xl text-foreground mt-1">
        {title}
      </h2>
      {subtitle && (
        <div className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {subtitle}
        </div>
      )}
    </div>
  );
}
