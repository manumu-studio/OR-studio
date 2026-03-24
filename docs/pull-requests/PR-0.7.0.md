# Pull Request — v0.7.0 Works Page

**Branch:** `feat/works-page` → `main`  
**Version:** 0.7.0

---

## Summary

Complete Works page with category filtering, responsive project grid, and accessible lightbox gallery. Includes Media, Categories, and Projects collections required for the page to function.

---

## Changes

### New Page

- `/works` — Server Component with Payload Local API queries for categories and published projects
- `generateMetadata()` for SEO (title, description)

### New Components

- **WorksControl** — Client orchestrator (filter state, lightbox state)
- **CategoryTabs** — Desktop category filter (tabs, keyboard nav, Framer Motion underline)
- **DropdownMenu** — Mobile category filter (toggle, click-outside)
- **WorksGrid** — Responsive CSS Grid (1/2/3 columns)
- **WorksGridItem** — Staggered fade-in with useInView, prefers-reduced-motion
- **GridCard** — Project image card with Cloudinary loader, hover overlay
- **ModalShell** — Accessible modal (focus trap, scroll lock, Escape, WCAG fix)
- **LightboxGallery** — Full-screen gallery (arrow keys, swipe, image counter)

### Collections (Prerequisites)

- **Media** — Upload type for images (alt, caption, orientation, sizes)
- **Categories** — Name, slug, order
- **Projects** — Title, category, featuredImage, gallery, status (draft/published)

### Infrastructure

- `src/lib/cloudinary-loader.ts` — next/image loader for Cloudinary URLs
- `next.config.mjs` — remotePatterns for res.cloudinary.com
- `src/styles/globals.scss` — CSS variables for Works components

---

## Requirements

- Node 20+ (build fails on Node 18)
- MongoDB with categories and projects (run seed or add via admin)
- Cloudinary env vars (optional; images work with local storage)

---

## Checklist

- [x] Typecheck passes
- [x] Lint passes
- [x] Build succeeds (Node 20)
- [x] /works loads
- [x] Category filtering works (tabs + dropdown)
- [x] Grid responsive
- [x] Lightbox opens on project click
- [x] Focus trap in modal
- [x] Arrow keys navigate gallery
