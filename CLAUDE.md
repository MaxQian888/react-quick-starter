# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Tauri desktop application starter built with:

- **Frontend**: Next.js 16 with React 19, TypeScript, and Tailwind CSS v4
- **Desktop Framework**: Tauri 2.9 for cross-platform desktop app capabilities
- **UI Components**: shadcn/ui with Radix UI primitives and Lucide icons
- **State Management**: Zustand for client-side state
- **Styling**: Tailwind CSS with CSS variables and dark mode support

## Development Commands

### Frontend Development

```bash
# Start Next.js development server
pnpm dev
# or
npm run dev

# Build for production
pnpm build
# or
npm run build

# Start production server
pnpm start
# or
npm run start

# Lint code
pnpm lint
# or
npm run lint
```

### Tauri Desktop App Development

```bash
# Run Tauri development mode (starts both frontend dev server and Tauri app)
pnpm tauri dev

# Build Tauri desktop application
pnpm tauri build

# More Tauri commands
pnpm tauri --help
```

## Architecture

### Frontend Structure

- `app/` - Next.js App Router pages and layout
  - `layout.tsx` - Root layout with Geist fonts and global styles
  - `page.tsx` - Main landing page
  - `globals.css` - Global Tailwind styles and CSS variables
- `components/` - Reusable React components
  - `ui/` - shadcn/ui components (Button, etc.)
- `lib/` - Utility functions and configurations
  - `utils.ts` - Tailwind utility function (`cn`) for class merging
- `components.json` - shadcn/ui configuration with path aliases

### Tauri Integration

- `src-tauri/` - Rust backend for desktop functionality
  - `tauri.conf.json` - Tauri configuration (window settings, build commands)
  - `src/main.rs` - Main Rust application entry point
  - `src/lib.rs` - Rust library code
  - `Cargo.toml` - Rust dependencies
- **Build Configuration**: Tauri builds the Next.js app to `out/` directory and bundles it
- **Development**: Tauri runs `pnpm dev` for frontend and serves at `http://localhost:3000`

### Key Technologies

- **Next.js 16** with App Router for React 19 applications
- **Tailwind CSS v4** with PostCSS for styling
- **shadcn/ui** component library built on Radix UI primitives
- **Zustand** for lightweight state management
- **Tauri 2.9** for building cross-platform desktop apps
- **TypeScript** throughout the stack

### Path Aliases (configured in components.json)

- `@/components` → `components/`
- `@/lib` → `lib/`
- `@/utils` → `lib/utils.ts`
- `@/ui` → `components/ui`
- `@/hooks` → `hooks/`

## Development Notes

- The app uses pnpm as the preferred package manager (see pnpm-lock.yaml)
- Tauri configuration is set to build the frontend to `out/` directory (not `.next`)
- The project supports both web and desktop deployment from the same codebase
- shadcn/ui is configured with "new-york" style and CSS variables for theming
