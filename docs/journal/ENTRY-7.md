# Journal Entry 7

**Date:** 2026-03-12

---

## Contact & About Pages (v0.9.0)

Full Contact and About pages with CMS-driven content, schema-driven contact form, and Lexical rich text.

### What Was Built

- **Contact page** — Server Component fetches ContactPage + SiteSettings globals, passes to ContactSection
- **About page** — Server Component fetches AboutPage global, passes to LandingAbout
- **Contact form Server Action** — Zod validation, DOMPurify sanitization (dynamic import), rate limiting (5/IP/15min), honeypot spam detection
- **Form components** — FloatingLabelInput, PhoneInput, DynamicForm (Zod + useActionState), SendButton, ProgressBar, Spinner
- **Contact composition** — ContactSection (background image, overlay), ContactHeader, ContactForm
- **LandingAbout** — Lexical RichText for body, two-column layout, "Contact us" link

### Decisions

- Dynamic import for DOMPurify in Server Action — avoids "File is not defined" during build
- File polyfill (`scripts/polyfill-file.cjs`) in build script — Payload/Lexical deps need File global
- Explicit `fields` array in DynamicForm — no schema introspection, simpler

### Notes

- Email sending is TODO — integrate Resend/Nodemailer
- ContactPage and AboutPage globals must be populated (seed or admin)

### Next Steps

- SEO + Performance (v0.10.0)
