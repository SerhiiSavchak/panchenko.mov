# Video Performance Optimization — Summary

## Goal
Reduce video-related lag while keeping perceived quality high. Max 1–2 videos decoding at once.

## Changes

### 1. Video Policy (2025 update)
- **Hero**: Max 2 videos in DOM (current + next in cycle); deferred load for non-initial; mobile SD sources.
- **VideoManager removed** — was unused; cards use VideoPosterHover (poster-first, load on hover/long-press).

### 2. Components

| Component | Use |
|-----------|-----|
| **VideoPosterHover** | Poster by default; loads and plays video only on hover (desktop) or long-press (mobile). `preload="metadata"` when active. |
| **VideoPosterOnly** | Static poster only; no video. |
| **VideoPosterTap** | Poster by default; tap to play/pause. Loads video on first tap. |

### 3. Section-by-Section

| Section | Before | After |
|---------|--------|-------|
| **Hero** | Video always playing | Pause when scrolled out (IntersectionObserver, &lt;30% visible) |
| **Featured Work (WorkCard)** | 9 cards with autoplay video in view | Poster by default; video only on hover |
| **Signature Lanes (What I Shoot)** | 5 cards with autoplay VideoInView | Poster by default; video only on hover |
| **ReelRail (BTS / Raw Cuts)** | 10 videos autoplay in view | Posters only; no video |
| **StreetMotion** | 5 videos in DOM, all with src | Load `src` only when active or next (max 2); unload when off |
| **Case Study (work/[slug])** | VideoInView autoplay | Poster by default; tap to play/pause |

### 4. Hero Video
- **Mobile-optimized sources**: 720p/SD on viewport &lt;768px to avoid decoding overload on iPhone
- **Responsive preload**: next video preloads mobile or desktop URL based on screen size
- **Error fallback**: if mobile URL 404s, falls back to desktop URL; if both fail, shows poster
- **Autoplay fallback**: if `play()` fails (e.g. Low Power Mode), poster stays visible
- IntersectionObserver: pause when section &lt;30% visible
- `preload="auto"`, `poster`, `playsInline`, `muted`, `autoPlay` for iOS compatibility

### 5. StreetMotion
- `shouldPreload` only for active + next
- `src` set only when `shouldPreload`; clear when off
- `preload="none"`; poster always visible

### 6. Video Policy
- **Hero**: 1 video; pauses when scrolled out
- **StreetMotion**: 1 active at a time; load only active+next
- **Grid cards**: 0 videos by default; 1 on hover
- **ReelRail**: 0 videos
- **Case study**: 0 videos by default; 1 on tap

### 7. Lazy Loading
- WorkCard, SignatureLanes: video loads only on hover
- Case study: video loads only on first tap
- StreetMotion: src set only when needed

### 8. CLS
- All media containers use fixed aspect ratios
- No layout shift from video loading

### 9. VideoInView
- Unloads video (`removeAttribute("src")`, `load()`) when out of viewport to free memory
- Loads only when in view (IntersectionObserver, threshold 0.25)
- `preload="none"` until in view; poster shown until loaded

### 10. GIF vs Video Strategy
- **Recommendation: use optimized MP4, not GIF**
- GIFs are typically 5–10× larger than H.264 MP4 for same quality
- Lightweight looped MP4 with `muted` + `playsInline` + `loop` is the best alternative
- No GIFs in current codebase; all motion uses video

## Files Touched
- `components/video-poster-hover.tsx`
- `components/video-poster-only.tsx`
- `components/video-poster-tap.tsx`
- `components/providers.tsx` — ActivePreviewProvider, WorkFilterProvider (VideoManager removed)
- `components/work-card.tsx` — VideoPosterHover
- `components/home/signature-lanes.tsx` — VideoPosterHover
- `components/home/reel-rail.tsx` — VideoPosterOnly
- `components/home/street-motion.tsx` — src only when shouldPreload
- `components/home/hero.tsx` — pause when offscreen
- `app/work/[slug]/case-study-client.tsx` — VideoPosterTap
