"use client";

import { type ReactNode } from "react";
import { ActivePreviewProvider } from "@/lib/active-preview-context";
import { WorkFilterProvider } from "@/lib/work-filter-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ActivePreviewProvider>
      <WorkFilterProvider>{children}</WorkFilterProvider>
    </ActivePreviewProvider>
  );
}
