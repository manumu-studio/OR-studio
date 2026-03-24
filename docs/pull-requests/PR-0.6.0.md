# Pull Request — v0.6.0 Frontend Foundation

**Branch:** `feat/frontend-foundation` → `main`  
**Version:** 0.6.0

---

## Summary

Frontend shell: Raleway font, skip-to-content link, ErrorBoundary, NavProvider, Header with animated logo and responsive navigation, LogoPreloader, SectionWrapper, and IconButton. All components follow the 4-file pattern.

---

## Changes

### Layout

- Root layout: Raleway font via `next/font/google` on body
- Frontend layout: skip-to-content link, ErrorBoundary, NavProvider, Header, LogoPreloader, main
- Metadata: title template `%s | OR Studio`, description

### Components

- **ErrorBoundary** — class component, fallback UI, retry
- **NavProvider** — isNavOpen, toggleNav, closeNav; closes on route change
- **Header** — logo, desktop nav, hamburger, mobile overlay; Escape key, scroll lock
- **AnimatedLogo** — SVG stroke animation, hardcoded paths, useReducedMotion
- **NavbarLinks** — static items, usePathname, stagger animation
- **HamburgerToggleButton** — morph to X, useNav context
- **LogoPreloader** — sessionStorage, prefers-reduced-motion
- **SectionWrapper** — IntersectionObserver fade-in
- **IconButton** — icon slot, variants (default, ghost, outline)

### Styling

- `layout.module.scss` — skip-to-content (sr-only + focus-visible)
- SCSS interpolation for design tokens in multi-value properties

---

## Requirements

- Node 20+ (build; same as PACKET-04)
- Framer Motion (already in project)

---

## Checklist

- [x] Typecheck passes
- [x] Lint passes
- [ ] Build succeeds (Node 20+; Payload "File" issue on Node 18)
- [ ] Skip-to-content visible on Tab
- [ ] Header renders with logo and nav
- [ ] Mobile hamburger opens overlay
- [ ] LogoPreloader shows on first visit
- [ ] Reduced motion: static logo, shorter display
