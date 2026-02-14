"use client";

import { useRef, useCallback } from "react";
import { useActivePreview } from "./active-preview-context";

const LONG_PRESS_MS = 300;

/**
 * Mobile: long-press shows video preview, single tap navigates immediately.
 * Desktop: unchanged (hover = preview, click = navigate).
 */
export function useLongPressPreview(cardId: string) {
  const preview = useActivePreview();
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPressRef = useRef(false);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!preview?.isMobile) return;
      didLongPressRef.current = false;
      longPressTimerRef.current = setTimeout(() => {
        longPressTimerRef.current = null;
        didLongPressRef.current = true;
        preview.setActiveId(cardId);
      }, LONG_PRESS_MS);
    },
    [preview, cardId]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!preview?.isMobile) return;
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      } else if (didLongPressRef.current) {
        preview.setActiveId(null);
      }
    },
    [preview]
  );

  const onTouchCancel = useCallback(() => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
    if (preview?.isMobile && didLongPressRef.current) {
      preview.setActiveId(null);
    }
  }, [preview]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (!preview?.isMobile) return;
      if (didLongPressRef.current) {
        e.preventDefault();
        didLongPressRef.current = false;
      }
    },
    [preview]
  );

  const isActive = preview?.isMobile ? preview.activeId === cardId : false;

  return {
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    onClick,
    isActive,
  };
}
