# Journal Entry 4

**Date:** 2026-03-11

---

## CMS Globals

Added the four Payload CMS globals that power every page of the site. SiteSettings holds branding, contact email, social links, and navigation. HomePage drives the hero carousel, about preview banner, and featured work banners. ContactPage and AboutPage store their respective page content.

### What Was Built

- **SiteSettings global** — siteName, logo, contactEmail, socialLinks, navLinks. Public read, auth update.
- **HomePage global** — heroTitle, heroSubtitle, heroImages (min 1), aboutBanner group, workBanners (max 3).
- **ContactPage global** — headerText, subtitleText, backgroundImage.
- **AboutPage global** — heading, sectionText (richText/Lexical), backgroundImage.
- **Media, Categories, Projects collections** — added to satisfy globals' relationTo (Packet 2 dependency).

### Decisions

- Globals use kebab-case slugs: site-settings, home-page, contact-page, about-page.
- sectionText uses richText for formatted body content on About page.
- workBanners maxRows 3 matches v1 design.

### Notes

- Build requires Node 20+ (same as Packet 02).
- All globals visible in admin at /admin/globals/\*.

### Next Steps

- Data Seed Migration (Packet 04)
