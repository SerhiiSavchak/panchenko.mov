"use client";

import { type ReactNode } from "react";
import { VideoManagerProvider } from "@/lib/video-manager";
import { ActivePreviewProvider } from "@/lib/active-preview-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <VideoManagerProvider>
      <ActivePreviewProvider>{children}</ActivePreviewProvider>
    </VideoManagerProvider>
  );
}
