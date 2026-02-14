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
  /** On mobile: first tap activates, second tap navigates. Returns true if navigation was prevented. */
  handleCardTap: (cardId: string, href: string) => (e: React.MouseEvent) => void;
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

  const handleCardTap = useCallback(
    (cardId: string, href: string) => {
      return (e: React.MouseEvent) => {
        if (!isMobile) return; // Desktop: let Link handle navigation
        if (activeId === cardId) {
          // Second tap: navigate (don't preventDefault)
          setActiveId(null);
          return;
        }
        // First tap: activate preview, prevent navigation
        e.preventDefault();
        setActiveId(cardId);
      };
    },
    [isMobile, activeId]
  );

  const value: ActivePreviewContextValue = {
    activeId,
    setActiveId,
    isMobile,
    handleCardTap,
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
