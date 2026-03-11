# PR — v0.4.0: CMS Globals

**Version:** 0.4.0
**Branch:** feat/cms-globals

---

## Summary

Adds four Payload CMS globals — singleton content types that power every page of the site. SiteSettings holds branding, contact email, social links, and navigation. HomePage drives the hero carousel, about preview banner, and featured work banners. ContactPage and AboutPage store their respective page content.

## Changes

- SiteSettings global: siteName, logo, contactEmail, socialLinks, navLinks
- HomePage global: heroTitle, heroSubtitle, heroImages, aboutBanner, workBanners
- ContactPage global: headerText, subtitleText, backgroundImage
- AboutPage global: heading, sectionText (richText), backgroundImage
- Media, Categories, Projects collections (Packet 2 dependency)
- Registered in payload.config.ts; types in payload-types.ts

## Testing

- `pnpm typecheck` — pass
- `pnpm lint` — pass
- `pnpm build` — requires Node 20+

## Manual Verification

1. Start dev server, go to /admin
2. Open Globals → Site Settings — verify siteName, logo, contactEmail, socialLinks, navLinks
3. Open Globals → Home Page — verify hero, aboutBanner, workBanners (max 3)
4. Open Globals → Contact Page — verify headerText, subtitleText, backgroundImage
5. Open Globals → About Page — verify heading, sectionText (rich text editor), backgroundImage
