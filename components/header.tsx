"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/brand-logo";

export function Header({ onQuoteOpen }: { onQuoteOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 h-16">
          <Link href="/" aria-label="Home">
            <BrandLogo size="sm" />
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
              className="px-5 py-2 text-xs uppercase tracking-widest bg-accent text-accent-foreground hover:bg-accent/90 transition-colors cursor-pointer"
            >
              Book a Shoot
            </button>
          </nav>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={cn("block w-6 h-px bg-foreground transition-transform duration-300", mobileOpen && "rotate-45 translate-y-[4px]")} />
            <span className={cn("block w-6 h-px bg-foreground transition-opacity duration-300", mobileOpen && "opacity-0")} />
            <span className={cn("block w-6 h-px bg-foreground transition-transform duration-300", mobileOpen && "-rotate-45 -translate-y-[4px]")} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8"
          >
            {[
              { href: "/", label: "Home" },
              { href: "/work", label: "Work" },
              { href: "/contact", label: "Contact" },
            ].map((item, i) => (
              <motion.div key={item.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link href={item.href} onClick={() => setMobileOpen(false)} className="font-display text-5xl text-foreground hover:text-accent transition-colors">
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <button onClick={() => { setMobileOpen(false); onQuoteOpen(); }} className="mt-4 px-8 py-3 text-sm uppercase tracking-widest bg-accent text-accent-foreground cursor-pointer">
                Book a Shoot
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-background/90 backdrop-blur-md">
        <button onClick={onQuoteOpen} className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold bg-accent text-accent-foreground cursor-pointer">
          Book
        </button>
        <Link href="/work" className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold text-center text-foreground border-l border-border">
          Portfolio
        </Link>
      </div>
    </>
  );
}
