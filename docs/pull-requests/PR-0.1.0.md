# Pull Request — v0.1.0 Project Scaffolding

**Branch:** `feature/project-scaffolding` → `main`  
**Version:** 0.1.0

---

## Summary

Bootstrap of the OR Studio v2 monolith: Next.js 15, Payload CMS 3.x, MongoDB, strict TypeScript, SCSS design system, and CI pipeline.

---

## Changes

### Infrastructure

- Next.js 15 App Router with Payload CMS embedded
- MongoDB adapter for Payload
- TypeScript strict configuration
- ESLint + Prettier
- Husky + lint-staged + commitlint (Conventional Commits)
- GitHub Actions CI workflow

### Structure

- `src/app/(frontend)/` — public site shell
- `src/app/(payload)/` — Payload admin
- `src/collections/Users.ts` — auth collection only
- `src/styles/` — design tokens + globals from v1

### Scripts

- `pnpm dev` — dev server
- `pnpm typecheck` — TypeScript check
- `pnpm lint` — ESLint
- `pnpm build` — production build

---

## Requirements

- Node 20.9.0+
- pnpm 9+
- MongoDB connection string
- `PAYLOAD_SECRET` (min 32 chars)

---

## Checklist

- [x] Typecheck passes
- [x] Lint passes
- [x] Build succeeds (Node 20)
- [x] `/` loads placeholder home
- [x] `/admin` loads Payload panel
