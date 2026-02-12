# Refactor Summary — panchenko.mov

## New Folder Structure

```
components/
  ui/                    # Shared UI primitives
    button.tsx
    section-header.tsx
    badge.tsx
    section-link.tsx
    section.tsx
    media-block.tsx
    input.tsx
    form-field.tsx
    index.ts
  section.tsx            # Re-export from ui (backward compat)
  ... (unchanged: brand-logo, camera-viewfinder, footer, header, etc.)

lib/
  hooks/
    use-reduced-motion.ts
    index.ts
  scroll-animate.ts
  media.ts
  utils.ts

data/
  shared.ts              # PROJECT_TYPES, BUDGET_RANGES, SOCIALS
  gear.ts
  work.ts

docs/
  REFACTOR.md
```

## Summary of Improvements

### 1. UI Primitives
- **Button** — primary, secondary, ghost, link variants; replaces duplicated button styles
- **SectionHeader** — label + title + optional subtitle; used in 10+ sections
- **Badge** — BTS/category badges; used in About, WorkCard, ReelRail
- **SectionLink** — "View All" / "Get a quote" style links
- **Section** — now uses `useScrollReveal` instead of custom IntersectionObserver
- **FormField, Input, Textarea, Select** — shared form styling for QuickQuoteModal and Contact page

### 2. Hooks
- **useReducedMotion** — replaces 4+ duplicate `useEffect` + `matchMedia` patterns in Hero, BuildYourShoot, MagneticButton, GraffitiLoader

### 3. Shared Data
- **data/shared.ts** — PROJECT_TYPES, BUDGET_RANGES, SOCIALS; removes duplication between QuickQuoteModal and Contact page

### 4. Animation Logic
- Section now uses centralized `useScrollReveal` from lib
- Removed dead `@keyframes glitch` (never used)

### 5. Removed Dead Code
- `@keyframes glitch` in globals.css

### 6. Packages Component
- `Packages` is not used on the home page — kept for potential future use

## What Was Refactored and Why

| Component / Area | Change | Reason |
|------------------|--------|--------|
| Section | Uses useScrollReveal | Single source of truth for scroll logic |
| FeaturedWork, Services, Packages, Gear, ReelRail, SignatureLanes, PinnedProcess, Testimonials, BuildYourShoot | SectionHeader | Eliminates 18+ lines of repeated label+title markup |
| About, WorkCard, ReelRail | Badge | Unifies badge styling |
| FeaturedWork | SectionLink | Reusable link style |
| QuickQuoteModal, Contact | FormField, Input, Textarea, Select | Shared form styling |
| QuickQuoteModal, Contact | PROJECT_TYPES, BUDGET_RANGES, SOCIALS | Single source for form options |
| Hero, BuildYourShoot, MagneticButton, GraffitiLoader | useReducedMotion | Replaces 4 duplicate matchMedia implementations |
| globals.css | Remove glitch keyframes | Dead code |
| Packages | Button variant="link" | Uses primitive |

## Scalability

- New sections: use Section + SectionHeader
- New forms: use FormField, Input, Textarea, Select
- New badges: use Badge
- Reduced motion: use useReducedMotion
- Animation tokens: consider extracting to lib/animations.ts or CSS variables
