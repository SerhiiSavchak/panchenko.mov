"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionLink({ href, children, className }: SectionLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors border-b border-border hover:border-accent pb-1",
        className
      )}
    >
      {children}
    </Link>
  );
}
