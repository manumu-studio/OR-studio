# PR — v0.2.0: Media Collection + Cloudinary Storage

**Version:** 0.2.0
**Branch:** feat/media-cloudinary

---

## Summary

Adds the Media collection with Cloudinary cloud storage. Images uploaded via the Payload admin are stored in Cloudinary CDN. A custom `next/image` loader enables optimized delivery (AVIF/WebP, quality, width).

## Changes

- Media collection with alt, caption, orientation
- Cloudinary storage adapter (custom, plugin has no built-in)
- Cloudinary image loader for next/image
- Zod env validation for Cloudinary vars

## Testing

- `pnpm typecheck` — pass
- `pnpm lint` — pass
- `pnpm dev` — server starts
- `pnpm build` — requires Node 20+

## Manual Verification

1. Add Cloudinary credentials to .env
2. Start dev server, go to /admin
3. Upload image in Media collection
4. Confirm image appears in Cloudinary dashboard under `or-studio/` folder
