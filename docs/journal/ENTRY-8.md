# Journal Entry 8

**Date:** 2026-03-24

---

## Docker Development Environment (v0.10.0)

Full Docker + Docker Compose setup so a new developer can clone and run `docker compose up` to get the entire stack running locally.

### What Was Built

- **Multi-stage Dockerfile** — 4 stages: base (Node 20 Alpine + pnpm), deps (frozen lockfile install), dev (hot reload target), production (standalone output)
- **docker-compose.yml** — app (Next.js + Payload), mongodb (7.0 with healthcheck + named volume), mongo-express (opt-in via `--profile admin`)
- **MongoDB init script** — Creates or-studio database, dev user with readWrite role, marker collection
- **Environment management** — .env.docker for local dev, gitignored to prevent credential leaks
- **Convenience scripts** — docker:up, docker:down, docker:build, docker:admin, docker:clean in package.json
- **Standalone output** — `output: 'standalone'` in next.config.mjs for production Docker builds

### Decisions

- **Anonymous volume for node_modules** — Host node_modules (macOS binaries) must not leak into container (Linux). The `/app/node_modules` anonymous volume isolates them
- **WATCHPACK_POLLING** — Required for hot reload across Docker's filesystem layer on macOS
- **Profiles over default services** — mongo-express is optional; `docker compose up` stays lean by default
- **No auto-seed** — Seed script lives on feat/contact-about-pages; keeping it explicit avoids silent failures on main

### Notes

- Non-Docker workflow (`pnpm dev`) is completely unaffected — standalone output is only used during `next build`
- GitHub Actions CI unchanged — Docker is local-dev only, not part of CI pipeline
- Production Docker stage is ready but untested E2E — will validate in deployment packet

### Next Steps

- SEO + Performance (shifted to v0.11.0 after Docker insertion)
