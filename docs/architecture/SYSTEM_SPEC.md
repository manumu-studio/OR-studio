# OR Studio v2 — System Specification

**Date:** March 11, 2026
**Author:** Manu Murillo (Lead Developer)
**Status:** Planning → Implementation

---

## 1. Project Context

OR Studio v2 is a rebuild of the OR Studio architectural visualization portfolio website. v1 was a static Next.js site with hardcoded JSON data. v2 adds a CMS so the client (OR Studio 3D) can manage content independently.

### What Changed from v1

| Aspect     | v1                               | v2                                        |
| ---------- | -------------------------------- | ----------------------------------------- |
| Router     | Pages Router                     | App Router                                |
| Data       | Static JSON in `/public/data/`   | Payload CMS + MongoDB                     |
| Images     | Local files, `unoptimized: true` | Cloudinary CDN with auto AVIF/WebP        |
| Admin      | None (developer edits JSON)      | Payload admin panel at `/admin`           |
| Forms      | API route + Nodemailer           | Server Action + Nodemailer                |
| Validation | Yup + Zod (mixed)                | Zod only                                  |
| SEO        | Basic meta tags                  | Full: sitemap, robots, JSON-LD, OG images |

### What Stays the Same

- Custom design system (SCSS tokens, no UI framework)
- Framer Motion animations (logo preloader, page transitions, scroll effects)
- 4-file component pattern
- All visual design — ported and improved
- TypeScript strict mode

---

## 2. Stack

| Layer           | Technology      | Version  |
| --------------- | --------------- | -------- |
| Framework       | Next.js         | 15.x     |
| CMS             | Payload CMS     | 3.x      |
| Database        | MongoDB Atlas   | Latest   |
| Image CDN       | Cloudinary      | Latest   |
| Language        | TypeScript      | 5.x      |
| Styling         | SCSS Modules    | Sass 1.x |
| Animation       | Framer Motion   | 11.x     |
| Validation      | Zod             | 4.x      |
| Forms           | react-hook-form | 7.x      |
| Email           | Nodemailer      | 6.x      |
| Deployment      | Vercel          | Latest   |
| Package Manager | pnpm            | 9.x      |

---

## 3. Architecture

### 3.1 Monolith (Payload embedded in Next.js)

Payload CMS 3.x installs directly into the Next.js `/app` folder. No separate backend server.

```
src/app/
├── (payload)/           # CMS admin panel (auto-generated routes)
│   ├── admin/           # Admin UI
│   └── api/             # Payload REST API
├── (frontend)/          # Public site (route group)
│   ├── layout.tsx       # Frontend layout (Header, fonts, styles)
│   ├── page.tsx         # Home (/)
│   ├── works/page.tsx   # Works (/works)
│   ├── about/page.tsx   # About (/about)
│   └── contact/         # Contact (/contact)
│       ├── page.tsx
│       └── actions.ts   # Server Action for form submission
├── sitemap.ts           # Dynamic sitemap
├── robots.ts            # robots.txt
└── manifest.ts          # Web app manifest
```

### 3.2 Data Model

**Collections (repeatable content):**

```
Media
├── alt (text, required)
├── caption (text)
├── orientation (select: landscape | portrait | square)
├── width (number)
├── height (number)
└── [upload config: Cloudinary storage, image sizes]

Categories
├── name (text, unique, required)
├── slug (auto from name)
└── order (number)

Projects
├── title (text, required)
├── slug (auto from title, unique)
├── category (relationship → Categories)
├── featuredImage (upload → Media, required)
├── gallery (array of uploads → Media)
├── description (textarea)
├── order (number)
└── status (select: draft | published)

Users
├── email (required)
├── role (select: admin | editor)
└── [Payload auth: password, login attempts, lock time]
```

**Globals (singleton content):**

```
SiteSettings
├── siteName, logo, contactEmail
├── socialLinks (array: platform + url)
└── navLinks (array: label + href + order)

HomePage
├── heroImages (array → Media)
├── heroTitle, heroSubtitle
├── aboutBanner (group: text + image)
└── workBanners (array, max 3: project ref + image)

ContactPage
├── headerText, subtitleText
└── backgroundImage (→ Media)

AboutPage
├── sectionText (richText)
└── backgroundImage (→ Media)
```

### 3.3 Data Flow

```
Client Browser
     ↓ request
Next.js Server Component
     ↓ payload.find() / payload.findGlobal()  [Local API, no HTTP]
MongoDB Atlas
     ↓ document
Server Component renders HTML
     ↓ hydrate
Client Components (animations, interactivity)
     ↓ images
Cloudinary CDN (auto AVIF/WebP, responsive sizes)
```

### 3.4 Image Pipeline

```
Admin uploads image → Payload Media collection → Cloudinary storage adapter
                                                        ↓
Frontend renders <Image> → Cloudinary loader → Cloudinary URL with transforms
                                                        ↓
                                              Auto format (AVIF/WebP)
                                              Responsive widths
                                              Quality optimization
                                              CDN edge delivery
```

---

## 4. Pages & Content Mapping

### Home Page (/)

- **Hero:** Rotating background images (from `HomePage.heroImages`), title + subtitle
- **About Banner:** Text + background image (from `HomePage.aboutBanner`)
- **Work Banners (×3):** Project reference + background image (from `HomePage.workBanners`)

### Works Page (/works)

- **Category Filter:** Tabs (desktop) + Dropdown (mobile) from `Categories` collection
- **Project Grid:** Cards from `Projects` collection, filtered by category
- **Lightbox:** Full-screen gallery when clicking a project card

### About Page (/about)

- **Section:** Rich text + background image (from `AboutPage` global)

### Contact Page (/contact)

- **Header:** Text from `ContactPage` global
- **Form:** Schema-driven (Zod), Server Action submission → Nodemailer → SMTP

---

## 5. Components Ported from v1

| Component             | Source (v1)   | Changes in v2                     |
| --------------------- | ------------- | --------------------------------- |
| AnimatedLogo          | ✅ Port as-is | SVG stroke animation              |
| LogoPreloader         | ✅ Port       | Add `prefers-reduced-motion`      |
| Header                | ✅ Rewrite    | App Router (`usePathname`)        |
| HamburgerToggleButton | ✅ Port as-is | Clean in v1                       |
| NavbarLinks           | ✅ Port       | App Router navigation             |
| BannerImage           | ✅ Port       | Cloudinary URLs                   |
| GridCard              | ✅ Port       | Cloudinary loader, proper `sizes` |
| CategoryTabs          | ✅ Port as-is | Data from CMS                     |
| DropdownMenu          | ✅ Port as-is | Data from CMS                     |
| WorksGrid             | ✅ Port       | CMS data, Cloudinary images       |
| ModalShell            | ✅ Rewrite    | **Add focus trap** (v1 WCAG fix)  |
| LightboxGallery       | ✅ Port       | **Add reduced motion** (v1 fix)   |
| DynamicForm           | ✅ Rewrite    | Zod replaces Yup                  |
| FloatingLabelInput    | ✅ Port as-is | Well-built in v1                  |
| PhoneInput            | ✅ Port as-is | Well-built in v1                  |
| SendButton            | ✅ Port as-is | Clean                             |
| SectionWrapper        | ✅ Port       | Intersection observer             |
| Spinner               | ✅ Port as-is | CSS animation                     |
| ProgressBar           | ✅ Port as-is | Clean                             |

---

## 6. Security Model

- **Authentication:** Payload built-in (admin panel login)
- **Access Control:** Collection-level (public read for published, authenticated write)
- **Rate Limiting:** Server Action for contact form
- **Input Sanitization:** DOMPurify on user inputs
- **Env Validation:** Zod schema at startup
- **CSP Headers:** Via `next.config.ts`
- **CORS:** Configured for Payload admin

---

## 7. Performance Targets

| Metric                   | Target  |
| ------------------------ | ------- |
| LCP                      | < 2.5s  |
| CLS                      | < 0.1   |
| FID                      | < 100ms |
| Lighthouse Performance   | 90+     |
| Lighthouse Accessibility | 95+     |
| Lighthouse SEO           | 100     |

---

## 8. Deployment

- **Platform:** Vercel
- **Database:** MongoDB Atlas (connection string in env)
- **Images:** Cloudinary (API keys in env)
- **Email:** Gmail SMTP via Nodemailer (credentials in env)
- **Domain:** orstudio3d.com (DNS pointed to Vercel)
