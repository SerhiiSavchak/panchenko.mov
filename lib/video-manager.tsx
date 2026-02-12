"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

const MAX_ACTIVE_VIDEOS = 2;

interface VideoSlot {
  id: string;
  play: () => void;
  pause: () => void;
  unload: () => void;
  priority: number; // higher = more important (hero=10, featured=5, grid=1)
}

 interface VideoManagerContextValue {
  register: (id: string, priority: number, callbacks: Omit<VideoSlot, "id" | "priority">) => () => void;
  requestPlay: (id: string) => boolean;
  release: (id: string) => void;
  activeCount: number;
  activeIds: Set<string>;
}

const VideoManagerContext = createContext<VideoManagerContextValue | null>(null);

export function VideoManagerProvider({ children }: { children: ReactNode }) {
  const slotsRef = useRef<Map<string, VideoSlot>>(new Map());
  const activeRef = useRef<Set<string>>(new Set());
  const [, forceUpdate] = useState(0);

  const getActiveSorted = useCallback(() => {
    return Array.from(activeRef.current)
      .map((id) => slotsRef.current.get(id))
      .filter(Boolean) as VideoSlot[];
  }, []);

  const evictLowest = useCallback(() => {
    const active = getActiveSorted();
    if (active.length < MAX_ACTIVE_VIDEOS) return;
    const byPriority = active.sort((a, b) => a.priority - b.priority);
    const toEvict = byPriority[0];
    if (toEvict) {
      toEvict.pause();
      toEvict.unload();
      activeRef.current.delete(toEvict.id);
      forceUpdate((n) => n + 1);
    }
  }, [getActiveSorted]);

  const register = useCallback(
    (id: string, priority: number, callbacks: Omit<VideoSlot, "id" | "priority">) => {
      slotsRef.current.set(id, { id, priority, ...callbacks });
      return () => {
        slotsRef.current.delete(id);
        activeRef.current.delete(id);
      };
    },
    []
  );

  const requestPlayImpl = useCallback(
    (id: string): boolean => {
      const slot = slotsRef.current.get(id);
      if (!slot) return false;

      if (activeRef.current.has(id)) return true;
      if (activeRef.current.size >= MAX_ACTIVE_VIDEOS) evictLowest();

      activeRef.current.add(id);
      slot.play();
      forceUpdate((n) => n + 1);

      if (process.env.NODE_ENV === "development") {
        console.debug(
          "[VideoManager] Playing:",
          id,
          "| Active:",
          Array.from(activeRef.current)
        );
      }
      return true;
    },
    [evictLowest]
  );

  const releaseImpl = useCallback((id: string) => {
    const slot = slotsRef.current.get(id);
    if (slot) {
      slot.pause();
      slot.unload();
      activeRef.current.delete(id);
      forceUpdate((n) => n + 1);
      if (process.env.NODE_ENV === "development") {
        console.debug("[VideoManager] Released:", id);
      }
    }
  }, []);

  const [activeIds, setActiveIds] = useState<Set<string>>(new Set());

  const requestPlayWithUpdate = useCallback(
    (id: string): boolean => {
      const ok = requestPlayImpl(id);
      if (ok) setActiveIds(new Set(activeRef.current));
      return ok;
    },
    [requestPlayImpl]
  );

  const releaseWithUpdate = useCallback((id: string) => {
    releaseImpl(id);
    setActiveIds(new Set(activeRef.current));
  }, [releaseImpl]);

  const value: VideoManagerContextValue = {
    register,
    requestPlay: requestPlayWithUpdate,
    release: releaseWithUpdate,
    activeCount: activeIds.size,
    activeIds,
  };

  return (
    <VideoManagerContext.Provider value={value}>
      {children}
    </VideoManagerContext.Provider>
  );
}

export function useVideoManager() {
  const ctx = useContext(VideoManagerContext);
  return ctx;
}
