# Pull Request — v0.8.0 Home Page

**Branch:** `feat/home-page` → `main`  
**Version:** 0.8.0

---

## Summary

Complete Home page with hero carousel, about banner, and featured work banners. All content from Payload CMS HomePage global. Full-viewport scroll-snap sections with Framer Motion animations.

---

## Changes

### New Page

- `/` — Server Component with `payload.findGlobal({ slug: 'home-page', depth: 2 })`
- Static metadata (title, description)
- `force-dynamic` for build compatibility

### New Components

- **ScrollSections** — Client orchestrator, scroll-snap container
- **LandingPageSection** — Hero carousel (4s interval), crossfade, pause on hover/focus
- **AboutBanner** — CMS text over BannerImage, scroll reveal
- **WorkBanner** — Featured project with image, title, "View Project" link
- **BannerImage** — Reusable full-viewport image with fade-in, Cloudinary loader

### Hooks

- **useLandingCarousel** — Auto-rotation with pause/resume for a11y

---

## Requirements

- Node 20+ (build fails on Node 18)
- MongoDB with HomePage global populated (run seed or add via /admin)
- Cloudinary env vars for images

---

## Checklist

- [x] Typecheck passes
- [x] Lint passes
- [x] Build succeeds (Node 20)
- [ ] Hero carousel auto-rotates
- [ ] Hero pauses on hover
- [ ] Scroll-snap works
- [ ] AboutBanner displays
- [ ] WorkBanner(s) display
- [ ] prefers-reduced-motion respected
