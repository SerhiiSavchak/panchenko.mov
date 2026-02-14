"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const SCROLL_BAR_THRESHOLD = 80;

export function Header({ onQuoteOpen }: { onQuoteOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const top = useTransform(scrollY, [0, SCROLL_BAR_THRESHOLD], [0, 24]);
  const springTop = useSpring(top, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed left-0 right-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
        style={{ top: springTop }}
      >
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 h-16">
          <Link href="/" aria-label="Home" className="logo-graffiti logo-hover">
            <BrandLogo variant="header" size="sm" />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/work" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
              Work
            </Link>
            <Link href="/contact" className="text-sm uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
              Contact
            </Link>
            <button
              onClick={onQuoteOpen}
              className="px-5 py-2 text-xs uppercase tracking-widest bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Book a Shoot
            </button>
          </nav>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={cn("block w-6 h-px bg-foreground transition-transform duration-300", mobileOpen && "rotate-45 translate-y-[4px]")} />
            <span className={cn("block w-6 h-px bg-foreground transition-opacity duration-300", mobileOpen && "opacity-0")} />
            <span className={cn("block w-6 h-px bg-foreground transition-transform duration-300", mobileOpen && "-rotate-45 -translate-y-[4px]")} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay - CSS transitions */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        {[
          { href: "/", label: "Home" },
          { href: "/work", label: "Work" },
          { href: "/contact", label: "Contact" },
        ].map((item, i) => (
          <div
            key={item.href}
            className={cn(
              "transition-all duration-300",
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{ transitionDelay: mobileOpen ? `${i * 100}ms` : "0ms" }}
          >
            <Link
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-5xl text-foreground hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          </div>
        ))}
        <div
          className={cn(
            "transition-all duration-300",
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
          style={{ transitionDelay: mobileOpen ? "300ms" : "0ms" }}
        >
          <button
            onClick={() => {
              setMobileOpen(false);
              onQuoteOpen();
            }}
            className="mt-4 px-8 py-3 text-sm uppercase tracking-widest bg-accent text-accent-foreground"
          >
            Book a Shoot
          </button>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-background/90 backdrop-blur-md">
        <button onClick={onQuoteOpen} className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold bg-accent text-accent-foreground">
          Book
        </button>
        <Link href="/work" className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold text-center text-foreground border-l border-border">
          Portfolio
        </Link>
      </div>
    </>
  );
}
