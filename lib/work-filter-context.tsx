"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { WorkCategory } from "@/data/work";

const VALID_CATEGORIES: (WorkCategory | "all")[] = [
  "all",
  "rap",
  "cars",
  "fight",
  "brand",
  "reels",
];

export function parseCategory(param: string | null): WorkCategory | "all" {
  if (!param || param === "all") return "all";
  const valid = VALID_CATEGORIES.includes(param as WorkCategory | "all");
  return valid ? (param as WorkCategory) : "all";
}

interface WorkFilterContextValue {
  selectedCategory: WorkCategory | "all";
  setSelectedCategory: (cat: WorkCategory | "all") => void;
}

const WorkFilterContext = createContext<WorkFilterContextValue | null>(null);

const DEFAULT_VALUE: WorkFilterContextValue = {
  selectedCategory: "all",
  setSelectedCategory: () => {},
};

function WorkFilterProviderInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isWorkPage = pathname === "/work";

  // URL is source of truth on /work — no flicker, works with back/forward
  const categoryFromUrl = parseCategory(searchParams.get("category"));
  const selectedCategory = isWorkPage ? categoryFromUrl : "all";

  const setSelectedCategory = useCallback(
    (cat: WorkCategory | "all") => {
      if (isWorkPage) {
        const url = cat === "all" ? "/work" : `/work?category=${cat}`;
        router.replace(url, { scroll: false });
      }
    },
    [isWorkPage, router]
  );

  const value: WorkFilterContextValue = {
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <WorkFilterContext.Provider value={value}>
      {children}
    </WorkFilterContext.Provider>
  );
}

export function WorkFilterProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <WorkFilterContext.Provider value={DEFAULT_VALUE}>
          {children}
        </WorkFilterContext.Provider>
      }
    >
      <WorkFilterProviderInner>{children}</WorkFilterProviderInner>
    </Suspense>
  );
}

export function useWorkFilter() {
  const ctx = useContext(WorkFilterContext);
  return ctx;
}
