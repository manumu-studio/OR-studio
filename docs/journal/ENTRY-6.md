# Journal Entry 6

**Date:** 2025-03-12

---

## Works Page Complete (v0.7.0)

Built the full Works page — the portfolio showcase and most complex page in the site.

### What Was Built

- **Works page** — Server Component fetching categories and published projects via Payload Local API
- **WorksControl** — Client orchestrator for filter state and lightbox
- **CategoryTabs** — Desktop filter tabs with Framer Motion underline, keyboard nav
- **DropdownMenu** — Mobile category filter with click-outside
- **WorksGrid + WorksGridItem** — Responsive grid with staggered fade-in (useInView)
- **GridCard** — Project image card with Cloudinary loader, hover overlay
- **ModalShell** — Accessible modal with focus trap (WCAG fix from v1 audit)
- **LightboxGallery** — Full-screen gallery with arrow keys, swipe, reduced motion

### Prerequisites Added

- Media, Categories, Projects collections (Packet 2 scope)
- cloudinary-loader (Packet 1 scope)
- Payload types for Media, Category, Project

### Decisions

- Build requires Node 20+ (Payload/undici "File is not defined" on Node 18)
- Cloudinary remotePatterns added to next.config for next/image
- CSS variables for Works components added to globals.scss

### Next Steps

- Run data seed (Packet 4) or add projects via admin to populate Works page
- Home page (Packet 7)
- Contact + About (Packet 8)
