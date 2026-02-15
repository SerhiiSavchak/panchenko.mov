"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface HeroReadyContextValue {
  isReady: boolean;
  setReady: () => void;
  setForceShow: () => void;
}

const HeroReadyContext = createContext<HeroReadyContextValue | null>(null);

export function HeroReadyProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [forceShow, setForceShowState] = useState(false);
  const setReady = useCallback(() => setIsReady(true), []);
  const setForceShow = useCallback(() => setForceShowState(true), []);
  const effectiveReady = isReady || forceShow;
  return (
    <HeroReadyContext.Provider
      value={{ isReady: effectiveReady, setReady, setForceShow }}
    >
      {children}
    </HeroReadyContext.Provider>
  );
}

export function useHeroReady() {
  const ctx = useContext(HeroReadyContext);
  return ctx;
}
