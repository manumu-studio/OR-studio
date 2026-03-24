# Multi-stage Dockerfile for OR Studio v2 — Next.js 15 + Payload CMS 3.x
# Targets: dev (hot reload) | production (optimized standalone build)

# ============================================
# Base — shared Node + pnpm setup
# ============================================
FROM node:20-alpine AS base

# Install pnpm globally (matches packageManager in package.json)
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Security: run as non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

# ============================================
# Dependencies — install node_modules
# ============================================
FROM base AS deps

# Copy lockfile and package manifests for cache-efficient installs
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (dev + prod) — needed for build stage
RUN pnpm install --frozen-lockfile

# ============================================
# Development — hot reload via bind mount
# ============================================
FROM base AS dev

WORKDIR /app

# Copy node_modules from deps stage (fallback if no bind mount)
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml ./

# Expose Next.js dev server port
EXPOSE 3000

# Next.js telemetry opt-out
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=development

# Start dev server — src/ is bind-mounted in docker-compose for hot reload
CMD ["pnpm", "dev"]

# ============================================
# Builder — production build
# ============================================
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (provided via --build-arg or .env)
ARG MONGODB_URI
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET

ENV MONGODB_URI=$MONGODB_URI
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm build

# ============================================
# Production — minimal runtime image
# ============================================
FROM base AS production

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy only what's needed for standalone output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Note: scripts/ directory copy deferred to PACKET-14 (deployment)
# COPY --from=builder /app/scripts ./scripts

# Switch to non-root user
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
