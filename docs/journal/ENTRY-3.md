# Journal Entry 3

**Date:** 2026-03-11

---

## Categories & Projects Collections

Added the core content types for the Works page. Categories group projects by type; Projects hold portfolio items with images, category, and publication status.

### What Was Built

- **Categories collection** — name (unique), slug (auto-generated from name), order. Public read, auth write.
- **Projects collection** — title, slug (auto), category (→ categories), featuredImage (→ media), gallery (array → media), description, order, status (draft | published). Published-only public read.
- **Slug hooks** — beforeValidate generates kebab-case slug from name/title when slug is empty.
- **payload-types.ts** — Category, Project, CategoriesSelect, ProjectsSelect interfaces.

### Decisions

- `featuredImage` separate from `gallery` — clearer than v1's array-position convention
- `status` as select (draft | published) — simple, no full versioning
- `views` and `storyline` dropped — dead fields in v1

### Notes

- Build requires Node 20+ (same as Packet 01)
- Categories will be seeded in Packet 04

### Next Steps

- CMS Globals (Packet 03)
