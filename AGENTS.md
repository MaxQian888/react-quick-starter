# Repository Guidelines

## Project Structure & Module Organization

- `app/` Next.js App Router (routes: `page.tsx`, `layout.tsx`, global styles in `globals.css`).
- `components/ui/` Reusable UI components (shadcn patterns), e.g., `components/ui/button.tsx`.
- `lib/` Shared utilities (e.g., `lib/utils.ts`).
- `public/` Static assets (SVGs, icons).
- `src-tauri/` Tauri desktop wrapper (Rust code, config, icons).
- Root configs: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `components.json`.

## Build, Test, and Development Commands

- `pnpm dev` — Run Next.js in development.
- `pnpm build` — Create a production build.
- `pnpm start` — Serve the production build.
- `pnpm lint` — Run ESLint. Use `--fix` to auto-fix.
- `pnpm tauri dev` — Launch desktop app (requires Rust toolchain).
- `pnpm tauri build` — Build desktop binaries.

## Coding Style & Naming Conventions

- Language: TypeScript with React 19 and Next.js 16.
- Linting: `eslint.config.mjs` is the source of truth; keep code warning-free.
- Styling: Tailwind CSS v4 (utility-first). Co-locate minimal component-specific styles.
- Components: PascalCase names/exports; files in `components/ui/` mirror export names.
- Routes: Next app files are lowercase (`page.tsx`, `layout.tsx`).
- Code: camelCase variables/functions; hooks start with `use*`.

## Testing Guidelines

- No test runner is configured yet. Recommended: Vitest (unit) and Playwright (e2e).
- Name tests `*.test.ts`/`*.test.tsx`; co-locate next to source or in `tests/`.
- Prioritize `lib/` utilities and complex UI logic for coverage.

## Commit & Pull Request Guidelines

- Prefer Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `ci:`.
- Link issues in the footer: `Closes #123`.
- PRs should include: brief scope/intent, screenshots for UI changes, validation steps, and pass `pnpm lint`.
- Keep changes focused; avoid unrelated refactors.

## Security & Configuration Tips

- Use `.env.local` for secrets; do not commit `.env*` files.
- Only expose safe client values via `NEXT_PUBLIC_*`.
- Tauri: minimize capabilities in `src-tauri/tauri.conf.json`; avoid broad filesystem access.
