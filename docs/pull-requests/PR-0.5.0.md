# PR — v0.5.0: Data Seeding & Migration Script

**Version:** 0.5.0
**Branch:** feat/data-seed

---

## Summary

Adds an idempotent seed script that migrates v1 content into Payload CMS — categories, media (Cloudinary), projects with relationships, and all four globals. Running `pnpm seed` populates a fresh database with the full OR Studio portfolio.

## Changes

- Seed orchestrator (`src/seed/index.ts`) — categories → media → projects → globals
- Categories seeder — 4 categories with display order
- Media seeder — v1 assets → Payload/Cloudinary
- Projects seeder — v1 JSON → Projects with category, featuredImage, gallery
- Globals seeder — SiteSettings, HomePage, ContactPage, AboutPage
- Node 18 polyfill for seed script (File global, dotenv)
- `pnpm seed` script, tsx devDependency

## Testing

- `pnpm typecheck` — pass
- `pnpm lint` — pass
- `pnpm seed` — runs; requires .env and network for Cloudinary

## Manual Verification

1. Ensure `.env` has MONGODB_URI, PAYLOAD_SECRET, Cloudinary vars
2. Run `pnpm seed`
3. Verify in Payload admin: 4 categories, media, projects, globals
4. Run `pnpm seed` again — verify idempotency (skips, no duplicates)
