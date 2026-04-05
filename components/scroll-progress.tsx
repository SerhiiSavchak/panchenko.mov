"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTelegramWebView } from "@/lib/telegram-webview-context";

const SCROLL_THRESHOLD = 80;

export function ScrollProgress() {
  const { isTelegram } = useTelegramWebView();
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

  return (
    <>
      {/* Mobile: below header */}
      <motion.div
        className="fixed left-0 right-0 z-[9999] h-[3px] w-full overflow-hidden pointer-events-none md:hidden"
        style={{
          top: "calc(5rem + env(safe-area-inset-top, 0px))",
          opacity: springOpacity,
          ...(isTelegram ? {} : { y: springYTop }),
        }}
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
        style={{ opacity: springOpacity, y: springYBottom }}
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
