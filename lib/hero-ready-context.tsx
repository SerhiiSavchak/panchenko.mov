"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface HeroReadyContextValue {
  isReady: boolean;
  setReady: () => void;
}

const HeroReadyContext = createContext<HeroReadyContextValue | null>(null);

export function HeroReadyProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const setReady = useCallback(() => setIsReady(true), []);
  return (
    <HeroReadyContext.Provider value={{ isReady, setReady }}>
      {children}
    </HeroReadyContext.Provider>
  );
}

export function useHeroReady() {
  const ctx = useContext(HeroReadyContext);
  return ctx;
}
