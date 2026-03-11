# PR — v0.3.0: Categories & Projects Collections

**Version:** 0.3.0
**Branch:** feat/works-collections

---

## Summary

Adds Categories and Projects collections — the core content types for the Works page. Categories group projects by type (Residential, Urban Planning, Commercial, Office). Projects hold portfolio items with featured image, gallery, category, and draft/published status.

## Changes

- Categories collection: name, slug (auto), order
- Projects collection: title, slug, category, featuredImage, gallery, description, order, status
- Slug auto-generation via beforeValidate hooks
- Published-only read for Projects (public); all for authenticated
- Registered in payload.config.ts

## Testing

- `pnpm typecheck` — pass
- `pnpm lint` — pass
- `pnpm build` — requires Node 20+

## Manual Verification

1. Start dev server, go to /admin
2. Create categories (e.g. Residential, Urban Planning) — verify slug auto-generates
3. Create project with category, featured image, gallery — verify relationships work
4. Set status to Published — verify public API returns it; Draft projects hidden when logged out
