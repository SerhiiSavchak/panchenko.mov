"use client";

import { type ReactNode } from "react";
import { VideoManagerProvider } from "@/lib/video-manager";

export function Providers({ children }: { children: ReactNode }) {
  return <VideoManagerProvider>{children}</VideoManagerProvider>;
}
