# Journal Entry 1

**Date:** 2026-03-11

---

## Project Scaffolding Complete

Initialized the OR Studio v2 monolith with the full stack in place.

### What Was Built

- **Next.js 15** App Router with Payload CMS 3.x embedded
- **MongoDB** via `@payloadcms/db-mongodb`
- **TypeScript** strict mode (`strict`, `noImplicitReturns`, `noUncheckedIndexedAccess`)
- **ESLint + Prettier** with Conventional Commits rules
- **Husky** pre-commit (lint-staged) and commit-msg (commitlint) hooks
- **SCSS** design tokens and global styles ported from v1
- **Route groups:** `(frontend)` for public site, `(payload)` for admin
- **GitHub Actions** CI: typecheck → lint → build on push/PR

### Decisions

- Payload config uses `MONGODB_URI` (with `DATABASE_URI` fallback)
- Dev auto-login: `dev@orstudio.com` / `password` (development only)
- Commitlint enforces scoped Conventional Commits (e.g. `feat(config): add husky`)

### Next Steps

- Next: Media collection + Cloudinary storage
- Then: Categories + Projects collections
