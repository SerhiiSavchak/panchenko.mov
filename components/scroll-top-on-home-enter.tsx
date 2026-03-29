"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/lenis-provider";

/**
 * When navigating from another route to `/`, Lenis can leave the viewport offset wrong.
 * Keeps `/#…` hash navigations from being overridden.
 */
export function ScrollTopOnHomeEnter() {
  const pathname = usePathname();
  const lenis = useLenis();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevPath.current;
    prevPath.current = pathname;

    if (pathname !== "/") return;
    if (prev === null || prev === "/") return;
    if (typeof window !== "undefined" && window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}
