# Journal Entry 3

**Date:** 2025-03-12

---

## Home Page Full Frontend

Complete landing page with CMS-driven hero carousel, about banner, and featured work banners. Replaces v1's static JSON with Payload HomePage global.

### What Was Built

- **Home page** — Server Component fetches HomePage global via `payload.findGlobal()`, passes to ScrollSections
- **BannerImage** — Reusable full-viewport background image with fade-in, Cloudinary loader, prefers-reduced-motion
- **LandingPageSection** — Hero with auto-rotating images (4s), Framer Motion crossfade, pause on hover/focus
- **AboutBanner** — CMS about text over background image, scroll-triggered reveal
- **WorkBanner** — Featured project sections (max 3), link to /works
- **ScrollSections** — Orchestrator with scroll-snap (y mandatory), full-viewport sections

### Decisions

- `force-dynamic` on home page — avoids MongoDB connection during build
- Type guards (isMedia, isProject) for safe Payload relationship narrowing
- heroImages structure: array of `{ image: Media }` — extract Media for LandingPageSection

### Notes

- Build requires Node 20+ (same as Packet 6)
- HomePage global must be seeded for content
- Carousel pauses on hover/focus per WCAG 2.2.2

### Next Steps

- Contact + About pages (Packet 8)
