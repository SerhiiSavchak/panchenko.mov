"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.3;
    const y = (e.clientY - top - height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const baseStyles = {
    primary:
      "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold",
    secondary:
      "border border-foreground/20 text-foreground hover:border-accent hover:text-accent",
    ghost: "text-foreground hover:text-accent",
  };

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "inline-flex items-center justify-center px-6 py-3 text-sm uppercase tracking-widest transition-colors rounded-none cursor-pointer",
        baseStyles[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick}>
      {inner}
    </button>
  );
}
