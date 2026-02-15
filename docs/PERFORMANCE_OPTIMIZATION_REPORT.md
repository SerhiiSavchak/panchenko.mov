# Performance Optimization Report

**Date:** February 2025  
**Goal:** Improve loading speed and smoothness without reducing perceived visual quality.

---

## 1. Video → GIF Strategy: Decision

### Conclusion: **No videos replaced with GIFs**

| Format | Typical size (3–5s loop, 640×360) | Decoding | Quality |
|--------|-----------------------------------|----------|---------|
| **MP4 (H.264)** | 400KB–2MB | Hardware-accelerated | Full color, smooth |
| **WebM (VP9)** | 300KB–1.5MB | Hardware-accelerated | Full color, smooth |
| **GIF** | 2–8MB | Software, per-frame | 256 colors, banding |

**Reasoning:**
- GIFs are typically **5–10× larger** than MP4 for equivalent quality.
- GIF has no hardware decoding; MP4/WebM use GPU.
- Card previews already use **poster-first + hover-to-load** — video loads only on user interaction.
- Replacing with GIF would mean loading heavier assets with worse quality.

**Recommendation:** Keep optimized MP4 for all secondary content. Use poster images for initial load; load video only on hover/tap.

---

## 2. Media Classification

### Critical (Hero / Main Stage)
| Location | Type | Strategy |
|----------|------|----------|
| Hero | Video (cycling themes) | Preload poster only; mobile SD sources; pause when scrolled out |
| Street Motion | Video (5 themes) | Load only active + next; unload when offscreen |

### Secondary (Card Previews, Decorative)
| Location | Type | Strategy |
|----------|------|----------|
| Featured cards (9) | Video on hover | Poster by default; video loads only on hover |
| Signature Lanes (5) | Video on hover | Same |
| Case study | Video on tap | Poster by default; video only on first tap |
| Reel Rail | Poster only | No video; static images |

---

## 3. Changes Applied

### 3.1 Bundle Optimization
- **Removed GSAP** — Unused dependency (~50KB gzipped). Project uses Framer Motion + CSS animations.
- **Code splitting** — 11 below-fold sections now use `dynamic()` with `ssr: true`:
  - About, Services, FeaturedWork, SignatureLanes, StreetMotion
  - PinnedProcess, ReelRail, Gear, BuildYourShoot, Testimonials, FAQ, FinalCTA
- **Initial JS** — Smaller payload; heavy sections load only when scrolled into view.

### 3.2 Preload Optimization
- **Hero poster only** — Removed second preload (7619638) for below-fold content.
- **fetchPriority="high"** — Added to hero poster preload.
- **No preload** for below-fold images or videos.

### 3.3 Media (Already Optimized)
- **Next.js Image** — WebP/AVIF via `formats` in next.config.
- **Featured cards** — Local MP4 assets (600KB–5MB); load only on hover.
- **Lazy loading** — `loading="lazy"` on all offscreen images.
- **Hero** — Max 2 videos in DOM (current + next); poster-first, deferred load for non-initial.

### 3.4 Animation
- **CSS-only** — All scroll reveals use `transform` and `opacity` (GPU-friendly).
- **prefers-reduced-motion** — Respects user preference.
- **Framer Motion** — Uses `transform`/`opacity` for layout stability.

---

## 4. Featured Video Sizes (Reference)

| Project | Size | Notes |
|---------|------|-------|
| midnight-run-mv | 4.2 MB | 720p Mixkit |
| shadow-play | 4.8 MB | 720p Mixkit |
| neon-nights | 4.2 MB | 720p Mixkit |
| gt3-rs-campaign | 2.8 MB | 720p Mixkit |
| drift-session | 2.3 MB | 720p Mixkit |
| fight-night | 1.1 MB | SD Pexels |
| underground-bout | 1.1 MB | SD Pexels |
| hutsy-financial-brand | 1.6 MB | SD Pexels |
| streetwear-lookbook | 604 KB | SD Pexels |

**Total:** ~22 MB for all 9 featured videos. **Loaded only on hover** — not on initial page load.

---

## 5. GIF vs MP4 Comparison (Example)

For a 3-second loop at 640×360, 15 fps:

| Format | Estimated size | Quality |
|--------|----------------|---------|
| MP4 (H.264) | 400–800 KB | Full color, smooth |
| GIF | 2–5 MB | 256 colors, banding |

**Verdict:** MP4 is always lighter and higher quality. GIF replacement would **not** improve performance.

---

## 6. PageSpeed / Lighthouse Optimizations (Feb 2025)

### 6.1 Above-the-Fold Prioritization
- **Critical inline CSS** — Minimal inline styles in `<head>` for `html`/`body` background and text color to prevent flash of unstyled content.
- **Hero video preload** — First video (Rap 13019-720.mp4) preloaded via `<link rel="preload" as="video">`.
- **Deferred Hero videos** — Only the first (Rap) video loads immediately; Cars, Fight, Brand load after 2.5s via `deferLoad` to reduce initial payload and TBT.
- **ScrollProgress** — Loaded via `dynamic()` with `ssr: false` to avoid blocking first paint.
- **ProofStrip** — Moved to dynamic import (non-critical for LCP).

### 6.2 Font Optimization
- **font-display: swap** — Applied to Inter and Bebas Neue to prevent invisible text during font load.
- **Preconnect** — `assets.mixkit.co`, `videos.pexels.com`, `images.pexels.com` for faster media fetch.

### 6.3 Media Optimization
- **VideoPosterHover** — `fetchPriority="low"` on poster images; `sizes` tuned for grid layouts (50vw/33vw/25vw).
- **VideoInView** — Already uses `preload="none"` and loads only when in view.
- **Hero overlay** — Reduced to 10% (`bg-background/10`) for better visibility.

### 6.4 Files Modified
| File | Changes |
|------|---------|
| `app/layout.tsx` | Preconnect, video preload, critical inline CSS |
| `app/page.tsx` | Dynamic ScrollProgress, dynamic ProofStrip |
| `components/home/hero.tsx` | `deferLoad` for non-initial videos, overlay 10% |
| `components/video-poster-hover.tsx` | `fetchPriority="low"`, `sizes` optimization |

### 6.5 Lighthouse / PageSpeed Testing
Run audits on mobile 4G:
- **Chrome DevTools** → Lighthouse → Mobile, Performance
- **PageSpeed Insights** → https://pagespeed.web.dev/ → Enter URL

---

## 7. Remaining Opportunities

1. **Further compress featured MP4s** — Use ffmpeg to re-encode at lower bitrate (e.g. 800–1200 kbps) for hover previews.
2. **WebP posters** — Featured posters are JPEG; Next.js serves WebP when supported. Consider pre-generating WebP for faster first paint.
3. **Route prefetch** — Next.js prefetches work pages; ensure `prefetch={false}` on non-critical links if needed.
4. **Bundle analyzer** — Add `@next/bundle-analyzer` to identify large chunks for further splitting.

---

## 8. Summary

| Metric | Before | After |
|--------|--------|-------|
| Unused deps | GSAP (50KB) | Removed |
| Preloads | 2 images | 1 video (hero) |
| Below-fold | Eager load | Dynamic (code split) |
| Hero videos | 4 simultaneous | 1 initial, 3 deferred |
| ScrollProgress | Eager | Dynamic (ssr: false) |
| Fonts | Default | display: swap |
| Critical CSS | None | Inline minimal |

**No videos were replaced with GIFs** — the analysis showed MP4 is always more performant and higher quality for the same content.
