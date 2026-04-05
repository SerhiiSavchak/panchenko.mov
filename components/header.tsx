"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { useLenis } from "@/components/lenis-provider";
import { useTelegramWebView } from "@/lib/telegram-webview-context";

export function Header({ onQuoteOpen }: { onQuoteOpen: () => void }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const { isTelegram } = useTelegramWebView();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { force: true });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const scrollToAbsoluteTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    lenis?.scrollTo(0, { immediate: true, force: true });
  };

  const scrollToWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const el = document.getElementById("works");
    if (!el) return;
    const headerEl = document.querySelector("header");
    const headerH = headerEl?.getBoundingClientRect().height ?? 80;
    if (lenis) {
      lenis.scrollTo(el, { offset: -headerH });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleMobileHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      scrollToAbsoluteTop();
    }
  };

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
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          "pt-[env(safe-area-inset-top,0px)]",
          scrolled
            ? isTelegram
              ? "bg-background/[0.96] border-b border-border"
              : "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 h-20">
          <Link
            href="/"
            aria-label="Home"
            className="logo-graffiti shrink-0 inline-flex cursor-pointer"
            onClick={handleLogoClick}
          >
            <BrandLogo variant="header" size="md" />
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/#works"
              onClick={scrollToWorks}
              className="text-base uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
            >
              Work
            </Link>
            <Link href="/contact" className="text-base uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
              Contact
            </Link>
            <button
              onClick={onQuoteOpen}
              className="px-6 py-3 text-sm uppercase tracking-widest bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Book a Shoot
            </button>
          </nav>

          <button
            className="md:hidden flex flex-col gap-2 p-3"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={cn("block w-7 h-px bg-foreground transition-transform duration-300", mobileOpen && "rotate-45 translate-y-[5px]")} />
            <span className={cn("block w-7 h-px bg-foreground transition-opacity duration-300", mobileOpen && "opacity-0")} />
            <span className={cn("block w-7 h-px bg-foreground transition-transform duration-300", mobileOpen && "-rotate-45 -translate-y-[5px]")} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay - scrollable, safe-area aware */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 overflow-y-auto overflow-x-hidden overscroll-contain transition-opacity duration-300",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "transition-all duration-300",
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
          style={{ transitionDelay: mobileOpen ? "0ms" : "0ms" }}
        >
          <Link
            href="/"
            onClick={handleMobileHomeClick}
            className="font-display text-5xl text-foreground hover:text-accent transition-colors"
          >
            Home
          </Link>
        </div>
        {[
          { href: "/#works", label: "Work", scrollWorks: true },
          { href: "/contact", label: "Contact" },
        ].map((item, i) => (
          <div
            key={item.href}
            className={cn(
              "transition-all duration-300",
              mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{ transitionDelay: mobileOpen ? `${(i + 1) * 100}ms` : "0ms" }}
          >
            <Link
              href={item.href}
              onClick={(e) => {
                setMobileOpen(false);
                if (item.scrollWorks) scrollToWorks(e);
              }}
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

      <div
        className={cn(
          "mobile-bottom-bar md:hidden fixed bottom-0 left-0 right-0 z-50 flex border-t border-border",
          isTelegram ? "bg-background/[0.96]" : "bg-background/90 backdrop-blur-md"
        )}
      >
        <button onClick={onQuoteOpen} className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold bg-accent text-accent-foreground">
          Book
        </button>
        <Link
          href="/#works"
          onClick={scrollToWorks}
          className="flex-1 py-3 text-xs uppercase tracking-widest font-semibold text-center text-foreground border-l border-border"
        >
          Portfolio
        </Link>
      </div>
    </>
  );
}
