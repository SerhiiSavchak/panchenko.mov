"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  /** Smaller variant */
  size?: "sm" | "md";
}

export function Badge({ children, className, size = "md" }: BadgeProps) {
  return (
    <span
      className={cn(
        "px-2 py-1 uppercase tracking-wider bg-background/60 text-foreground backdrop-blur-sm border border-border",
        size === "sm" ? "text-[9px]" : "text-[10px]",
        className
      )}
    >
      {children}
    </span>
  );
}
