"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const MOBILE_BREAKPOINT = 768;

interface ActivePreviewContextValue {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
}

const ActivePreviewContext = createContext<ActivePreviewContextValue | null>(null);

export function ActivePreviewProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const value: ActivePreviewContextValue = {
    activeId,
    setActiveId,
    isMobile,
  };

  return (
    <ActivePreviewContext.Provider value={value}>
      {children}
    </ActivePreviewContext.Provider>
  );
}

export function useActivePreview() {
  const ctx = useContext(ActivePreviewContext);
  return ctx;
}
