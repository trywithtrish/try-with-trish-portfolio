# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

@AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->
## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data.
Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

```bash
pnpm dev      # start dev server (localhost:3000)
pnpm build    # production build
pnpm lint     # ESLint
```

No test suite is configured.

## Stack

- **Next.js 16 / React 19 / TypeScript** — App Router, single route (`/`)
- **Tailwind CSS v4** via PostCSS — configured in `postcss.config.mjs`; utility classes available alongside plain CSS
- **EmailJS** (`@emailjs/browser`) — contact form; requires three `NEXT_PUBLIC_EMAILJS_*` env vars (see below)

## Architecture

The entire site is a single page. `src/app/page.tsx` renders `<PortfolioApp>`, which is the one client component that owns shared state and composes every section:

```
PortfolioApp        (src/components/PortfolioApp.tsx)
  Nav
  Hero
  Featured          ← receives onOpen to open modal
  WorkGrid          ← receives onOpen; has category filter state
  About
  Contact           ← EmailJS form
  Footer
  Modal             ← receives item + onClose
```

`useModal` (`src/hooks/useModal.ts`) manages which `Collab` is open and returns focus to the trigger element on close.

## Content / data

**`src/lib/data.ts` is the single source of truth for all collaboration content.** It exports:
- `FEATURED` — three cards shown in the horizontal phone-frame scroll
- `WORK` — currently aliased to `FEATURED`; will grow as new collabs are added
- `COLORS` and `FILTERS` — drive the category filter in WorkGrid

To add a collaboration, add a `Collab` object to `WORK` (and optionally `FEATURED`).

## Styling

All styles live in `src/app/globals.css` — no CSS Modules, no component-scoped styles. The file uses:
- **`@theme {}`** block (Tailwind v4 syntax) to register design tokens as Tailwind utilities (`bg-cream`, `text-terra`, etc.)
- **`:root {}`** CSS variables as aliases (`--cream`, `--terra`, etc.) for use in plain CSS rules
- **Named CSS classes** (`.section-title`, `.phone-card`, `.modal-backdrop`, etc.) for every component's layout and visual states

Typography: `--font-serif` = Cormorant Garamond (headlines/display), `--font-sans` = DM Sans (body/UI). Both are loaded via `next/font/google` in `layout.tsx`.

## Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |

If any of these are absent, the contact form silently simulates a successful send (dev-friendly fallback in `Contact.tsx`).
