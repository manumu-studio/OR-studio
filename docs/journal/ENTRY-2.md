# Journal Entry 2

**Date:** 2026-03-11

---

## Media Collection + Cloudinary Storage

Integrated Cloudinary as the image CDN for the Media collection. All uploads now go to Cloudinary instead of local storage.

### What Was Built

- **Media collection** with alt (required), caption, orientation fields
- **4 image sizes** on upload: thumbnail (120×80), card (600×400), hero (1920×1080), gallery (1400×900)
- **Custom Cloudinary adapter** for `@payloadcms/plugin-cloud-storage` (no built-in)
- **Cloudinary image loader** for `next/image` — replaces v1's `unoptimized: true` with proper CDN transforms (f*auto, q_auto, w*\*)
- **Zod env validation** for Cloudinary vars

### Decisions

- `folder: 'or-studio'` — all uploads under one Cloudinary folder
- `disableLocalStorage: true` — Cloudinary is single source
- Global loader in next.config for all CMS images

### Notes

- Build requires Node 20+ (undici/File global)
- Manual upload test: add real Cloudinary credentials to .env, upload via /admin → Media

### Next Steps

- Categories + Projects collections
