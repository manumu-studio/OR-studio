# OR Studio v2

Architectural visualization portfolio & CMS for [OR Studio 3D](https://orstudio3d.com).

## Stack

- **Next.js 15** (App Router) — React framework
- **Payload CMS 3.x** — Embedded headless CMS with admin panel
- **MongoDB Atlas** — Document database for CMS content
- **Cloudinary** — Image CDN with automatic AVIF/WebP optimization
- **TypeScript** — Strict mode, zero `any` types
- **SCSS Modules** — Custom design token system, no UI frameworks
- **Framer Motion 11** — Animations and page transitions
- **Vercel** — Deployment platform

## Architecture

Payload CMS embeds directly into Next.js. The admin panel lives at `/admin`, the public site at `/`.

All content is managed through the CMS:

- **Works page** — Projects organized by category (Residential, Urban Planning, Commercial, Office)
- **Home page** — Hero images, about banner, featured work banners
- **Contact page** — Header text, background image, form submissions via Nodemailer
- **About page** — Section text, background image

## Getting Started

### Option 1: Docker (Recommended for Quick Start)

```bash
# Copy Docker environment template
cp .env.docker.example .env.docker
# Fill in Cloudinary credentials (MongoDB runs in container)

# Start all services (Next.js + MongoDB)
pnpm docker:up

# Access the site at http://localhost:3000
# Access the admin panel at http://localhost:3000/admin
# Optional: Access MongoDB admin UI at http://localhost:8081
#   pnpm docker:admin
```

### Option 2: Local Development

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local
# Fill in MongoDB, Cloudinary, and SMTP credentials

# Run development server
pnpm dev

# Access the site at http://localhost:3000
# Access the admin panel at http://localhost:3000/admin
```

## Scripts

### Development

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint
pnpm typecheck    # TypeScript check
pnpm test         # Run tests
pnpm seed         # Seed database with v1 data
```

### Docker

```bash
pnpm docker:up      # Start app + MongoDB
pnpm docker:down    # Stop services (data persists)
pnpm docker:build   # Rebuild containers
pnpm docker:admin   # Start with MongoDB admin UI
pnpm docker:clean   # Stop and remove all data
```

## Documentation

- [System Specification](docs/architecture/SYSTEM_SPEC.md)
- [Development Playbook](docs/DEVELOPMENT_PLAYBOOK.md)
- [Implementation Plan](.claude/plans/snoopy-launching-eich.md)

## Development

This project follows an incremental packet-based development process. See the [Development Playbook](docs/DEVELOPMENT_PLAYBOOK.md) for methodology details.

Current progress: **Packet 0** (Project Scaffolding)

## Credits

- **Lead Developer:** Manu Murillo
- **Client:** OR Studio 3D
- **Original Design:** Custom (v1), ported and improved for v2
