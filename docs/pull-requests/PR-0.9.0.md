# Pull Request — v0.9.0 Contact & About Pages

**Branch:** `feat/contact-about-pages` → `main`  
**Version:** 0.9.0

---

## Summary

Contact and About pages with CMS-driven content. Contact form uses Server Action with Zod validation, DOMPurify sanitization, rate limiting, and honeypot. About page renders Lexical rich text from Payload.

---

## Changes

### New Pages

- `/contact` — Server Component, ContactPage + SiteSettings globals
- `/about` — Server Component, AboutPage global

### Contact Form

- Server Action: Zod schema, DOMPurify (dynamic import), rate limit (5/IP/15min), honeypot
- DynamicForm: react-hook-form + @hookform/resolvers/zod, useActionState
- FloatingLabelInput, PhoneInput, SendButton, ProgressBar, Spinner

### Components

- ContactSection, ContactHeader, ContactForm
- LandingAbout — Lexical RichText, two-column layout

### Build

- File polyfill (`scripts/polyfill-file.cjs`) for Node.js build compatibility

---

## Requirements

- MongoDB with ContactPage, AboutPage, SiteSettings globals populated
- Cloudinary env vars for images

---

## Checklist

- [x] Typecheck passes
- [x] Lint passes
- [x] Build succeeds
- [ ] Contact form validates and submits
- [ ] Rate limiting blocks after 5 submissions
- [ ] Honeypot returns fake success
- [ ] About page rich text renders
- [ ] prefers-reduced-motion respected
