"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { isTelegramWebViewClient } from "@/lib/telegram-webview";

const SCROLL_THRESHOLD = 80;

export function ScrollProgress() {
  const [telegramWebView, setTelegramWebView] = useState(false);
  useEffect(() => {
    setTelegramWebView(isTelegramWebViewClient());
  }, []);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollY, [0, SCROLL_THRESHOLD], [0, 1]);
  const springOpacity = useSpring(opacity, { stiffness: 200, damping: 30 });

  const yBottom = useTransform(scrollY, [0, SCROLL_THRESHOLD], [12, 0]);
  const yTop = useTransform(scrollY, [0, SCROLL_THRESHOLD], [-12, 0]);
  const springYBottom = useSpring(yBottom, { stiffness: 200, damping: 30 });
  const springYTop = useSpring(yTop, { stiffness: 200, damping: 30 });
  /* transform on fixed + Telegram = extra compositor churn; keep opacity-only */
  const mobileBarMotion = telegramWebView
    ? { opacity: springOpacity }
    : { opacity: springOpacity, y: springYTop };
  const desktopBarMotion = telegramWebView
    ? { opacity: springOpacity }
    : { opacity: springOpacity, y: springYBottom };

  return (
    <>
      {/* Mobile: below header */}
      <motion.div
        className="fixed top-[calc(5rem+env(safe-area-inset-top,0px))] md:top-28 left-0 right-0 z-[9999] h-[3px] w-full overflow-hidden pointer-events-none md:hidden"
        style={mobileBarMotion}
        role="progressbar"
        aria-label="Scroll progress"
      >
        <motion.div
          className="h-full w-full min-w-[2px] bg-accent origin-left"
          style={{ scaleX }}
          aria-hidden
        />
      </motion.div>
      {/* Desktop: footer bottom border */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[9999] h-[2px] w-full overflow-hidden pointer-events-none hidden md:block"
        style={desktopBarMotion}
        role="progressbar"
        aria-label="Scroll progress"
      >
        <motion.div
          className="h-full w-full min-w-[2px] bg-accent origin-left"
          style={{ scaleX }}
          aria-hidden
        />
      </motion.div>
    </>
  );
}
