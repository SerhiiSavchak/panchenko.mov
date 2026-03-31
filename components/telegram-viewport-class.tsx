"use client";

import { useLayoutEffect } from "react";
import { isTelegramWebViewClient } from "@/lib/telegram-webview";

/** Adds `telegram-webview` on <html> for CSS overrides (blur, scroll, etc.). */
export function TelegramViewportClass() {
  useLayoutEffect(() => {
    if (!isTelegramWebViewClient()) return;
    const root = document.documentElement;
    root.classList.add("telegram-webview");
    return () => {
      root.classList.remove("telegram-webview");
    };
  }, []);
  return null;
}
