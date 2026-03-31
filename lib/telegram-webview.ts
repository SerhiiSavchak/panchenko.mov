/**
 * Telegram in-app browser / Mini App WebView detection (client-only).
 * Used for targeted fixes without affecting Safari/Chrome.
 */
export function isTelegramWebViewClient(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as Window & { Telegram?: { WebApp?: unknown } };
  if (w.Telegram?.WebApp != null) return true;
  try {
    return /\bTelegram\b/i.test(navigator.userAgent || "");
  } catch {
    return false;
  }
}
