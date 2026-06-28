# Mekhas

A Shopify-like e-commerce platform for the **Mekhas** brand — built with
[Next.js](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS v4.

## Roadmap

| Phase | Scope | Status |
| ----- | ----- | ------ |
| **1. Coming Soon** | Premium landing page, launch countdown, email capture | ✅ Done |
| 2. Storefront | Dynamic product catalog, cart, checkout | Planned |
| 3. Admin dashboard | Manage products / inventory / orders | Planned |

## Phase 1 — Coming Soon page

A premium, responsive landing page (`/`) featuring:

- Editorial typography (Cormorant Garamond display + Inter body)
- Warm ivory palette with animated, blurred botanical orbs
- Live launch **countdown** (configurable in `src/lib/config.ts`)
- A working **"Notify Me"** email-capture form
- Accessible markup, reduced-motion support, and SEO/OpenGraph metadata

### Notify-me storage

`POST /api/subscribe` validates the email, de-duplicates (case-insensitive),
and appends to `data/subscribers.json` (git-ignored). Swap this route's body
for an ESP (Klaviyo, Mailchimp, etc.) or a database when ready.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Project structure

```
src/
  app/
    layout.tsx            # fonts + metadata
    page.tsx              # Coming Soon page
    globals.css           # theme tokens + animations
    api/subscribe/route.ts# email capture endpoint
  components/
    Countdown.tsx         # live countdown (client)
    NotifyForm.tsx        # email form (client)
  lib/
    config.ts             # brand details + launch date
```

