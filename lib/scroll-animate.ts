/**
 * Lightweight scroll-triggered animations using Intersection Observer.
 * Replaces Framer Motion for simple reveal/parallax effects - better performance.
 */

import { useEffect, useState, useRef, type RefObject } from "react";

export function useScrollReveal(
  ref: RefObject<Element | null>,
  options?: { once?: boolean; threshold?: number; rootMargin?: string }
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else if (!options?.once) setIsVisible(false);
      },
      {
        threshold: options?.threshold ?? 0.1,
        rootMargin: options?.rootMargin ?? "-50px 0px",
        root: null,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options?.once, options?.threshold, options?.rootMargin]);

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
