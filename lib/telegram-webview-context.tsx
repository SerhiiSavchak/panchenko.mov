"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type TelegramWebViewState = {
  /** UA resolved on client (after layout). */
  resolved: boolean;
  /** Telegram in-app browser (iOS/Android). */
  isTelegram: boolean;
};

const TelegramWebViewContext = createContext<TelegramWebViewState>({
  resolved: false,
  isTelegram: false,
});

export function TelegramWebViewProvider({ children }: { children: ReactNode }) {
  const [resolved, setResolved] = useState(false);
  const [isTelegram, setIsTelegram] = useState(false);

  useLayoutEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const tg = /Telegram/i.test(ua);
    setIsTelegram(tg);
    setResolved(true);
    if (tg) {
      document.documentElement.dataset.telegramWebview = "true";
    }
  }, []);

  const value = useMemo(
    () => ({ resolved, isTelegram }),
    [resolved, isTelegram]
  );

  return (
    <TelegramWebViewContext.Provider value={value}>
      {children}
    </TelegramWebViewContext.Provider>
  );
}

export function useTelegramWebView(): TelegramWebViewState {
  return useContext(TelegramWebViewContext);
}
