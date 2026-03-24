# Pull Request — v0.10.0 Docker Development Environment

**Branch:** `feat/docker-setup` → `main`  
**Version:** 0.10.0

---

## Summary

Docker + Docker Compose setup for local development. Clone and run `docker compose up` to get the full stack (Next.js + Payload CMS + MongoDB) running without any local dependencies beyond Docker. Includes production-ready standalone build target.

---

## Changes

### Docker Infrastructure

- Multi-stage Dockerfile (base, deps, dev, production)
- docker-compose.yml with app, mongodb, and mongo-express services
- MongoDB 7.0 with healthcheck and persistent named volume
- MongoDB init script for database and user creation
- .dockerignore for lean build context
- .env.docker template for local development

### Configuration Updates

- `output: 'standalone'` in next.config.mjs for production Docker builds
- 5 convenience scripts in package.json (docker:up, docker:down, docker:build, docker:admin, docker:clean)
- .env.docker added to .gitignore

### Architecture Decisions

- Anonymous volume for node_modules (prevents host/container binary conflicts)
- WATCHPACK_POLLING for hot reload across Docker filesystem boundary
- Profiles for mongo-express (opt-in admin UI)
- Named volume for MongoDB data persistence
- Standalone output reduces production image to ~150MB

---

## Usage

```bash
# Start development (app + mongodb)
pnpm docker:up

# Start with DB admin UI
pnpm docker:admin

# Rebuild after dependency changes
pnpm docker:build

# Stop services (data persists)
pnpm docker:down

# Nuclear reset (destroys MongoDB data)
pnpm docker:clean
```

---

## Requirements

- Docker Desktop or Docker Engine
- .env.docker file with Cloudinary credentials (copy from .env.example)

---

## Checklist

- [x] Typecheck passes
- [x] Lint passes
- [x] Non-Docker workflow (`pnpm dev`) unaffected
- [x] GitHub Actions CI unaffected
- [x] .env.docker gitignored
- [x] Documentation complete (packet report, journal, task reports)
