"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";

interface HeroReadyContextValue {
  isReady: boolean;
  setReady: () => void;
  /** Resolves when media is ready for reveal. Use for Promise-based coordination. */
  readyPromise: Promise<void>;
}

const HeroReadyContext = createContext<HeroReadyContextValue | null>(null);

export function HeroReadyProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const resolveRef = useRef<(() => void) | null>(null);
  const [readyPromise] = useState(
    () =>
      new Promise<void>((resolve) => {
        resolveRef.current = resolve;
      })
  );

  const setReady = useCallback(() => {
    if (resolveRef.current) {
      resolveRef.current();
      resolveRef.current = null;
    }
    setIsReady(true);
  }, []);

  return (
    <HeroReadyContext.Provider value={{ isReady, setReady, readyPromise }}>
      {children}
    </HeroReadyContext.Provider>
  );
}

export function useHeroReady() {
  return useContext(HeroReadyContext);
}
