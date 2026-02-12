"use client";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function BrandLogo({ className = "", size = "md", animate = true }: BrandLogoProps) {
  const sizes = { sm: "h-6", md: "h-8", lg: "h-12" };

  return (
    <div
      className={`inline-flex items-center gap-1.5 group logo-graffiti ${animate ? "logo-hover" : ""} ${className}`}
    >
      {/* Camera/graffiti mark */}
      <svg
        viewBox="0 0 32 32"
        className={`${sizes[size]} aspect-square`}
        fill="none"
        aria-hidden="true"
      >
        {/* Camera body */}
        <rect x="4" y="8" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" className="text-foreground group-hover:text-accent transition-colors" />
        {/* Lens */}
        <circle cx="16" cy="17" r="6" stroke="currentColor" strokeWidth="1.5" className="text-foreground group-hover:text-accent transition-colors" />
        <circle cx="16" cy="17" r="3" stroke="var(--color-accent)" strokeWidth="1" className="opacity-60 group-hover:opacity-100 transition-opacity" />
        {/* Flash */}
        <rect x="8" y="5" width="6" height="3" rx="1" stroke="currentColor" strokeWidth="1" className="text-foreground/60" />
        {/* Rec dot */}
        <circle cx="24" cy="11" r="1.5" fill="var(--color-accent)" className="group-hover:animate-pulse" />
        {/* Graffiti drip effect */}
        <line x1="7" y1="26" x2="7" y2="30" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" className="opacity-40 group-hover:opacity-80 transition-opacity" />
        <line x1="25" y1="26" x2="25" y2="29" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" className="opacity-30 group-hover:opacity-60 transition-opacity" />
      </svg>

      {/* Text */}
      <div className="flex items-baseline gap-0">
        <span className="font-display text-foreground group-hover:text-foreground transition-colors tracking-tight" style={{ fontSize: size === "sm" ? "1rem" : size === "md" ? "1.25rem" : "1.75rem" }}>
          panchenko
        </span>
        <span className="font-display text-accent tracking-tight" style={{ fontSize: size === "sm" ? "1rem" : size === "md" ? "1.25rem" : "1.75rem" }}>
          .mov
        </span>
      </div>
    </div>
  );
}
