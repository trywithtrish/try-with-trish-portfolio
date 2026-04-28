# Try With Trish Portfolio

## Getting Started

Install dependencies and run the development server with pnpm:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commands

```bash
pnpm dev      # start dev server
pnpm build    # production build
pnpm lint     # ESLint
```

## Notes

This is a single-page Next.js portfolio. Content lives in `src/lib/data.ts`, shared state and page composition live in `src/components/PortfolioApp.tsx`, and global styles live in `src/app/globals.css`.

The contact form uses EmailJS when these public environment variables are present:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Without those variables, the form uses a dev-friendly simulated success path.
