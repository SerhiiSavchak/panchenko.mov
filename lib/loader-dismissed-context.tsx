"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface LoaderDismissedContextValue {
  isDismissed: boolean;
  setDismissed: () => void;
}

const LoaderDismissedContext = createContext<LoaderDismissedContextValue | null>(null);

export function LoaderDismissedProvider({ children }: { children: React.ReactNode }) {
  const [isDismissed, setIsDismissed] = useState(false);
  const setDismissed = useCallback(() => setIsDismissed(true), []);
  return (
    <LoaderDismissedContext.Provider value={{ isDismissed, setDismissed }}>
      {children}
    </LoaderDismissedContext.Provider>
  );
}

export function useLoaderDismissed() {
  return useContext(LoaderDismissedContext);
}
