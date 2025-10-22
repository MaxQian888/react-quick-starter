# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview

- Framework: Next.js (App Router) with TypeScript and Tailwind CSS v4.
- Key entrypoints: `app/layout.tsx`, `app/page.tsx`, global styles in `app/globals.css`.
- Config: `next.config.ts` (minimal), `tsconfig.json` (strict TS, `@/*` path alias), `eslint.config.mjs` (Next core-web-vitals + TS), `postcss.config.mjs` (Tailwind v4 plugin).
- UI utilities: `lib/utils.ts` exports `cn()` (clsx + tailwind-merge). Example component: `components/ui/button.tsx` (Radix Slot + class-variance-authority variants).
- Assets: `public/*`.

Package manager

- Use pnpm (lockfile present). Substitute npm/yarn if you prefer, but examples below use pnpm.

Common commands

- Install deps: `pnpm install`
- Dev server: `pnpm dev` (Next.js dev at <http://localhost:3000>)
- Build (production): `pnpm build`
- Start (after build): `pnpm start`
- Lint all (ESLint flat config): `pnpm run lint`
  - Lint a single file: `pnpm exec eslint components/ui/button.tsx`
  - Auto-fix: `pnpm exec eslint . --fix`
- Type check (no emit): `pnpm exec tsc --noEmit`

Testing

- No test runner or scripts are configured in this repo. There is no single-test command at present.

Architecture and conventions

- Routing: App Router under `app/`.
  - `app/layout.tsx` defines fonts (Geist via `next/font`) and wraps the app; it imports `app/globals.css`.
  - `app/page.tsx` is the home route and demonstrates Tailwind classes and `next/image`.
- Styling: Tailwind CSS v4 via PostCSS plugin (`@tailwindcss/postcss`).
  - `app/globals.css` imports Tailwind and `tw-animate-css`, defines CSS variables for theme (light/dark) and uses `@layer base` with Tailwind `@apply`.
- TypeScript: Strict, bundler module resolution, JSX `react-jsx`.
  - Path alias: `@/*` → repo root (e.g., `@/lib/utils`).
- ESLint: Flat config using `eslint-config-next` (core web vitals + TypeScript), with default ignores for `.next`, `out`, `build`, and `next-env.d.ts`.
- Next config: `next.config.ts` currently uses default options.

Notes from README.md

- Start dev server with `pnpm dev` and edit `app/page.tsx`; app runs at <http://localhost:3000>.

AI/Assistant rules

- No CLAUDE, Cursor, or Copilot rule files are present in this repository.
