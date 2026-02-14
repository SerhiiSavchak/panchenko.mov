"use client";

import { type ReactNode } from "react";
import { VideoManagerProvider } from "@/lib/video-manager";
import { ActivePreviewProvider } from "@/lib/active-preview-context";
import { WorkFilterProvider } from "@/lib/work-filter-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <VideoManagerProvider>
      <ActivePreviewProvider>
        <WorkFilterProvider>{children}</WorkFilterProvider>
      </ActivePreviewProvider>
    </VideoManagerProvider>
  );
}
