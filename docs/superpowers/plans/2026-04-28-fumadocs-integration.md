# Fumadocs Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Fumadocs as a pnpm workspace subpackage at `docs/` — a full, independently-deployable Next.js documentation site with sidebar, search, and one placeholder MDX page.

**Architecture:** A new pnpm workspace package `docs/` contains a Fumadocs Next.js app (fumadocs-ui + fumadocs-mdx) running in full server mode with no `output: "export"` constraint. The root `pnpm-lock.yaml` is the single lockfile for both packages. TypeScript, ESLint, and Prettier configs are shared by inheritance and auto-discovery. The docs dev server runs on port 3001.

**Tech Stack:** Next.js 16, React 19, fumadocs-ui (latest), fumadocs-core (latest), fumadocs-mdx (latest), TypeScript 5.x.

**Spec:** `docs/superpowers/specs/2026-04-28-fumadocs-integration-design.md`

---

## File Map

| Action | Path                                 | Purpose                                                   |
| ------ | ------------------------------------ | --------------------------------------------------------- |
| Create | `pnpm-workspace.yaml`                | Declares `docs` as workspace package                      |
| Modify | `package.json`                       | Adds `docs:dev`, `docs:build`, `docs:start` scripts       |
| Modify | `.gitignore`                         | Ignores `docs/.next/` and `docs/.source/`                 |
| Create | `docs/package.json`                  | Docs package manifest and scripts                         |
| Create | `docs/tsconfig.json`                 | Extends root tsconfig, overrides `@/*` paths to docs root |
| Create | `docs/next.config.ts`                | Next.js config wrapping fumadocs-mdx MDX plugin           |
| Create | `docs/source.config.ts`              | Fumadocs content collection definition                    |
| Create | `docs/app/source.ts`                 | Fumadocs loader — central content access point            |
| Create | `docs/app/layout.tsx`                | Root layout with `RootProvider` + Fumadocs CSS            |
| Create | `docs/app/page.tsx`                  | Root page that redirects `/` → `/docs`                    |
| Create | `docs/app/docs/layout.tsx`           | `DocsLayout` with sidebar and nav title                   |
| Create | `docs/app/docs/[[...slug]]/page.tsx` | Dynamic doc page with `generateStaticParams`              |
| Create | `docs/app/api/search/route.ts`       | Orama search API route                                    |
| Create | `docs/content/docs/meta.json`        | Sidebar page order                                        |
| Create | `docs/content/docs/index.mdx`        | Placeholder doc page                                      |

---

## Task 1: Configure pnpm workspace and root scripts

**Files:**

- Create: `pnpm-workspace.yaml`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - docs
```

- [ ] **Step 2: Add docs scripts to root `package.json`**

In the `"scripts"` object, add after the `"test:coverage"` line:

```json
"docs:dev": "pnpm -F docs dev",
"docs:build": "pnpm -F docs build",
"docs:start": "pnpm -F docs start"
```

- [ ] **Step 3: Add docs build artifacts to `.gitignore`**

Append to the end of `.gitignore`:

```
# docs workspace
docs/.next/
docs/.source/
```

- [ ] **Step 4: Commit**

```bash
git add pnpm-workspace.yaml package.json .gitignore
git commit -m "chore: add pnpm workspace with docs package"
```

---

## Task 2: Scaffold docs/ package

**Files:**

- Create: `docs/package.json`
- Create: `docs/tsconfig.json`

- [ ] **Step 1: Create `docs/package.json`**

```json
{
  "name": "docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001"
  },
  "dependencies": {
    "fumadocs-ui": "latest",
    "fumadocs-core": "latest",
    "fumadocs-mdx": "latest",
    "next": "^16.2.4",
    "react": "^19.2.5",
    "react-dom": "^19.2.5"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "@types/node": "^22.19.17",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3"
  }
}
```

- [ ] **Step 2: Create `docs/tsconfig.json`**

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

> The `paths` override makes `@/` resolve relative to the `docs/` directory (not the repo root), so `@/app/source` → `docs/app/source.ts`.

- [ ] **Step 3: Install docs dependencies**

```bash
pnpm install
```

Expected: pnpm installs Fumadocs packages into `docs/node_modules/` and updates the root `pnpm-lock.yaml`.

- [ ] **Step 4: Commit**

```bash
git add docs/package.json docs/tsconfig.json pnpm-lock.yaml
git commit -m "chore(docs): scaffold workspace package with Fumadocs deps"
```

---

## Task 3: Configure Next.js and Fumadocs MDX

**Files:**

- Create: `docs/next.config.ts`
- Create: `docs/source.config.ts`
- Create: `docs/app/source.ts`

- [ ] **Step 1: Create `docs/next.config.ts`**

```typescript
import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

const config: NextConfig = {
  reactStrictMode: true,
}

const withMDX = createMDX()

export default withMDX(config)
```

- [ ] **Step 2: Create `docs/source.config.ts`**

```typescript
import { defineDocs, defineConfig } from "fumadocs-mdx/config"

export const docs = defineDocs({
  dir: "content/docs",
})

export default defineConfig()
```

- [ ] **Step 3: Create `docs/app/source.ts`**

```typescript
import { docs } from "@/.source"
import { loader } from "fumadocs-core/source"

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})
```

> `@/.source` is auto-generated by `fumadocs-mdx` the first time `next dev` or `next build` runs. TypeScript will show an error for this import on a fresh clone until you run the dev server once.

- [ ] **Step 4: Commit**

```bash
git add docs/next.config.ts docs/source.config.ts docs/app/source.ts
git commit -m "feat(docs): configure Next.js and Fumadocs MDX plugin"
```

---

## Task 4: Create content skeleton

**Files:**

- Create: `docs/content/docs/meta.json`
- Create: `docs/content/docs/index.mdx`

- [ ] **Step 1: Create `docs/content/docs/meta.json`**

```json
{
  "title": "Documentation",
  "pages": ["index"]
}
```

- [ ] **Step 2: Create `docs/content/docs/index.mdx`**

```mdx
---
title: Getting Started
description: Welcome to the react-quick-starter documentation.
---

# Getting Started

This is the documentation skeleton for `react-quick-starter`.

Add your content here.
```

- [ ] **Step 3: Commit**

```bash
git add docs/content/
git commit -m "feat(docs): add MDX content skeleton"
```

---

## Task 5: Build root layout and home redirect

**Files:**

- Create: `docs/app/layout.tsx`
- Create: `docs/app/page.tsx`

- [ ] **Step 1: Create `docs/app/layout.tsx`**

```tsx
import "fumadocs-ui/style.css"
import type { ReactNode } from "react"
import { RootProvider } from "fumadocs-ui/provider"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
```

> `suppressHydrationWarning` is required because `RootProvider` injects a theme class on the `<html>` element client-side.

- [ ] **Step 2: Create `docs/app/page.tsx`**

```tsx
import { redirect } from "next/navigation"

export default function Home() {
  redirect("/docs")
}
```

- [ ] **Step 3: Commit**

```bash
git add docs/app/layout.tsx docs/app/page.tsx
git commit -m "feat(docs): add root layout with RootProvider and home redirect"
```

---

## Task 6: Build docs layout

**Files:**

- Create: `docs/app/docs/layout.tsx`

- [ ] **Step 1: Create `docs/app/docs/layout.tsx`**

```tsx
import type { ReactNode } from "react"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { source } from "@/app/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.getPageTree()} nav={{ title: "react-quick-starter" }}>
      {children}
    </DocsLayout>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add docs/app/docs/layout.tsx
git commit -m "feat(docs): add DocsLayout with sidebar"
```

---

## Task 7: Build dynamic docs page

**Files:**

- Create: `docs/app/docs/[[...slug]]/page.tsx`

- [ ] **Step 1: Create `docs/app/docs/[[...slug]]/page.tsx`**

```tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from "fumadocs-ui/page"
import defaultMdxComponents from "fumadocs-ui/mdx"
import { source } from "@/app/source"

type Props = {
  params: Promise<{ slug?: string[] }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  const MDX = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
  }
}
```

> `params` is a `Promise` in Next.js 15+. `page.data.body` is the compiled MDX React component. `page.data.toc` is the table of contents array.

- [ ] **Step 2: Commit**

```bash
git add "docs/app/docs/[[...slug]]/"
git commit -m "feat(docs): add dynamic docs page with metadata and static params"
```

---

## Task 8: Add Orama search route

**Files:**

- Create: `docs/app/api/search/route.ts`

- [ ] **Step 1: Create `docs/app/api/search/route.ts`**

```typescript
import { source } from "@/app/source"
import { createFromSource } from "fumadocs-core/search/server"

export const { GET } = createFromSource(source)

export const runtime = "nodejs"
```

> `createFromSource` builds an Orama full-text search index from all MDX pages. The `GET` handler is called by the Fumadocs search dialog at runtime.

- [ ] **Step 2: Commit**

```bash
git add docs/app/api/search/route.ts
git commit -m "feat(docs): add Orama search API route"
```

---

## Task 9: Verify dev server and production build

- [ ] **Step 1: Start docs dev server**

```bash
pnpm docs:dev
```

Expected output includes:

```
- Local:        http://localhost:3001
- Ready in ...
```

The `docs/.source/` directory is generated automatically by `fumadocs-mdx` on first start.

- [ ] **Step 2: Verify home redirect**

Open `http://localhost:3001` in a browser.
Expected: Automatically redirects to `http://localhost:3001/docs`.

- [ ] **Step 3: Verify docs page**

Navigate to `http://localhost:3001/docs`.
Expected: Fumadocs layout renders with left sidebar showing "Getting Started" under "Documentation". Main area shows the `index.mdx` content.

- [ ] **Step 4: Verify search**

Press `Ctrl+K` (Windows) or `Cmd+K` (Mac) on the docs page.
Expected: Search modal opens. Typing "getting started" shows the index page as a result.

- [ ] **Step 5: Run production build**

Stop the dev server (`Ctrl+C`), then:

```bash
pnpm docs:build
```

Expected: Build completes with no TypeScript errors. Output ends with:

```
Route (app)                             Size
┌ ○ /                                   ...
└ ○ /docs                               ...
```

- [ ] **Step 6: Commit verification artifacts**

```bash
git add -A
git commit -m "chore(docs): verify Fumadocs skeleton builds and runs"
```

---

## Troubleshooting

**`Cannot find module '@/.source'`** — Run `pnpm docs:dev` once to generate the `.source/` directory, then TypeScript errors will clear.

**`source.getPageTree is not a function`** — The Fumadocs version may use `source.pageTree` (property) instead of `source.getPageTree()` (method). Replace in `docs/app/docs/layout.tsx` accordingly.

**`docs.toFumadocsSource is not a function`** — Older Fumadocs uses `createMDXSource(docs)` from `fumadocs-mdx`. Replace `docs/app/source.ts` with:

```typescript
import { docs } from "@/.source"
import { createMDXSource } from "fumadocs-mdx"
import { loader } from "fumadocs-core/source"

export const source = loader({
  baseUrl: "/docs",
  source: createMDXSource(docs),
})
```
