import { useEffect, useState } from "react";

/**
 * Returns prefers-reduced-motion with stable initial value.
 * Uses lazy initializer so the first client render has the correct value,
 * avoiding effect-triggered restarts that destabilize loader animation.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}
