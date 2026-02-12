"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  /** Full width */
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold",
  secondary:
    "border border-foreground/20 text-foreground hover:border-accent hover:text-accent",
  ghost: "text-foreground hover:text-accent",
  link:
    "text-muted-foreground hover:text-accent border-b border-border hover:border-accent pb-1",
};

export function Button({
  variant = "primary",
  children,
  className,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 text-sm uppercase tracking-widest transition-colors rounded-none",
        variantStyles[variant],
        fullWidth && "w-full text-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
