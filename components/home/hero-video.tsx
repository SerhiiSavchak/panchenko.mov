"use client";

import { useRef, useEffect, useState } from "react";
import { HERO_VIDEO } from "@/lib/media";

/**
 * Hero video — один элемент, без лишней логики.
 * Браузер сам показывает poster до первого кадра и запускает autoplay.
 */

interface HeroVideoProps {
  onReady?: () => void;
}

export function HeroVideo({ onReady }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const notified = useRef(false);
  const [playing, setPlaying] = useState(false);

  const handleReady = () => {
    setPlaying(true);
    if (notified.current) return;
    notified.current = true;
    onReady?.();
  };

  // События могут сработать до гидратации — проверяем readyState при mount
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) handleReady();
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Poster — виден сразу, скрывается когда видео играет */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(${HERO_VIDEO.poster})`,
          opacity: playing ? 0 : 1,
        }}
        aria-hidden
      />
      <video
        ref={videoRef}
        src={`${HERO_VIDEO.video}#t=0.001`}
        poster={HERO_VIDEO.poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={handleReady}
        onPlay={handleReady}
        onError={handleReady}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
        style={{ opacity: playing ? 1 : 0 }}
      />
    </div>
  );
}
