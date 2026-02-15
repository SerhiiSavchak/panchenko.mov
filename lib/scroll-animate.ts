/**
 * Lightweight scroll-triggered animations using Intersection Observer.
 * Replaces Framer Motion for simple reveal/parallax effects - better performance.
 *
 * On mobile (<768px), uses rootMarginMobile when provided for earlier triggers.
 */

import { useEffect, useLayoutEffect, useState, useRef, type RefObject } from "react";

const MOBILE_BREAKPOINT = 768;

function getRootMargin(
  rootMargin: string | undefined,
  rootMarginMobile: string | undefined
): string {
  const desktop = rootMargin ?? "-50px 0px";
  if (typeof window === "undefined") return desktop;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return desktop;
  }
  if (window.innerWidth < MOBILE_BREAKPOINT && rootMarginMobile !== undefined) {
    return rootMarginMobile;
  }
  return desktop;
}

export function useScrollReveal(
  ref: RefObject<Element | null>,
  options?: {
    once?: boolean;
    threshold?: number;
    rootMargin?: string;
    /** More generous rootMargin on mobile for earlier trigger (e.g. "80px 0px -40px 0px") */
    rootMarginMobile?: string;
  }
) {
  const [isVisible, setIsVisible] = useState(false);
  const [rootMargin, setRootMargin] = useState(() =>
    getRootMargin(options?.rootMargin, options?.rootMarginMobile)
  );

  useLayoutEffect(() => {
    const updateRootMargin = () => {
      setRootMargin(getRootMargin(options?.rootMargin, options?.rootMarginMobile));
    };
    updateRootMargin();
    window.addEventListener("resize", updateRootMargin);
    return () => window.removeEventListener("resize", updateRootMargin);
  }, [options?.rootMargin, options?.rootMarginMobile]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else if (!options?.once) setIsVisible(false);
      },
      {
        threshold: options?.threshold ?? 0.05,
        rootMargin,
        root: null,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options?.once, options?.threshold, rootMargin]);

  return isVisible;
}

export function useScrollProgress(ref: RefObject<Element | null>) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        const scrollTop = window.scrollY;
        const elementTop = rect.top + scrollTop;
        const scrolled = scrollTop + windowHeight - elementTop;
        const total = elementHeight + windowHeight;
        const p = Math.max(0, Math.min(1, scrolled / total));
        setProgress(p);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ref]);

  return progress;
}
