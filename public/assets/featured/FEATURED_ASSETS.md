# Featured Cards — Local Assets

All media for Featured Work cards is stored locally for reliability and performance.

## Structure

```
public/assets/featured/
├── midnight-run-mv/     # Rap — music video, dark cinematic
├── shadow-play/         # Rap — trap, street
├── neon-nights/         # Rap — neon, night vibes
├── gt3-rs-campaign/     # Cars — luxury sports car
├── drift-session/       # Cars — drift, speed
├── fight-night/         # Fight — combat sports
├── underground-bout/    # Fight — documentary style
├── hutsy-financial-brand/ # Brand — professional
└── streetwear-lookbook/  # Brand — street art, fashion
```

Each folder contains:
- `poster.jpg` — thumbnail/poster (800px width, JPEG)
- `preview.mp4` — hover preview video (720p/SD, optimized)

## Performance

- **Poster-first**: Cards show poster by default; video loads only on hover/tap
- **Lazy loading**: Images use `loading="lazy"` via Next.js Image
- **Next.js optimization**: Posters served as WebP/AVIF when supported
- **No autoplay**: Videos play only on user interaction (hover/tap)

## Sources

| Project | Video | Poster |
|---------|-------|--------|
| midnight-run-mv | Mixkit 47497 (rap) | Mixkit thumb |
| shadow-play | Mixkit 13019 (rap) | Pexels 3209261 |
| neon-nights | Mixkit 47497 (rap) | Pexels 3721311 (neon) |
| gt3-rs-campaign | Mixkit 52427 (sports car) | Pexels 1639897 |
| drift-session | Mixkit 50 (sports car) | Pexels 167636 |
| fight-night | Pexels 9943217 (boxing) | Pexels 4761671 |
| underground-bout | Pexels 9943217 (boxing) | Pexels 4761671 |
| hutsy-financial-brand | Pexels 3571264 (brand) | Pexels 3379934 |
| streetwear-lookbook | Pexels 5752729 (fashion) | Pexels 3721941 (street) |
