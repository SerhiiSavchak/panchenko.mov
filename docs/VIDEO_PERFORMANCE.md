# Video Performance Optimization — Summary

## Goal
Reduce video-related lag while keeping perceived quality high. Max 1–2 videos decoding at once.

## Changes

### 1. VideoManager (lib/video-manager.tsx)
- Context + hook for max 2 concurrent active videos
- `register(id, priority, { play, pause, unload })` — components register
- `requestPlay(id)` — request slot; evicts lowest-priority if full
- `release(id)` — release slot
- Dev-only logs: `[VideoManager] Playing:`, `Released:`

### 2. New Components

| Component | Use |
|-----------|-----|
| **VideoPosterHover** | Poster by default; loads and plays video only on hover (desktop) or tap (mobile). Supports controlled `isActive` from parent. |
| **VideoPosterOnly** | Static poster only; no video. |
| **VideoPosterTap** | Poster by default; tap to play/pause. Loads video on first tap. |
| **VideoManaged** | Uses VideoManager; loads when in viewport (data-src); respects concurrency. |

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
- IntersectionObserver: pause when section &lt;30% visible
- `preload="auto"`; poster for instant display
- One video at a time (cycling)

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
- `VideoInView` is no longer used after these changes
- Can be removed or kept for future use

## Files Touched
- `lib/video-manager.tsx` (new)
- `components/video-poster-hover.tsx` (new)
- `components/video-poster-only.tsx` (new)
- `components/video-poster-tap.tsx` (new)
- `components/video-managed.tsx` (new)
- `components/providers.tsx` (new)
- `app/layout.tsx` — VideoManagerProvider
- `components/work-card.tsx` — VideoPosterHover
- `components/home/signature-lanes.tsx` — VideoPosterHover
- `components/home/reel-rail.tsx` — VideoPosterOnly
- `components/home/street-motion.tsx` — src only when shouldPreload
- `components/home/hero.tsx` — pause when offscreen
- `app/work/[slug]/case-study-client.tsx` — VideoPosterTap
