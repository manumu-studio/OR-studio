# Journal Entry 5

**Date:** 2026-03-12

---

## Data Seeding & Migration Script

Added an idempotent seed script that migrates all v1 content into the v2 CMS — categories, media (Cloudinary), projects with relationships, and all four globals.

### What Was Built

- **Seed orchestrator** (`src/seed/index.ts`) — runs in order: categories → media → projects → globals
- **Categories seed** — 4 categories (Residential, Urban Planning, Commercial, Office) with display order
- **Media seed** — reads v1 `public/assets/`, uploads to Payload/Cloudinary, returns path→ID map
- **Projects seed** — reads v1 JSON data files, creates projects with category, featuredImage, gallery
- **Globals seed** — SiteSettings, HomePage, ContactPage, AboutPage via `updateGlobal()`
- **Polyfill** — Node 18 File global + dotenv for `pnpm seed` outside Next.js

### Decisions

- `tsx` for seed — runs TypeScript directly, no build step
- Idempotency by name/title/filename — safe re-runs during development
- Explicit slug in create — Payload types require it; matches collection hook logic
- `draft: false` on create — Payload 3 requires it when versions enabled

### Notes

- Seed requires `.env` with MONGODB_URI, PAYLOAD_SECRET, Cloudinary vars
- Build may require Node 20+ (File global)
- Cloudinary upload needs network access

### Next Steps

- Frontend Foundation (Packet 05)
