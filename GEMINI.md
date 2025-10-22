# GEMINI.md

## Project Overview

This is a boilerplate project for creating a desktop application using web technologies. It combines a Next.js/React frontend with a Tauri (Rust) backend.

The key technologies used are:

- **Frontend:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS, with `shadcn/ui` for UI components.
- **Desktop Framework:** Tauri (using Rust)

The project is structured as a standard Next.js application, with the addition of a `src-tauri` directory that contains the Rust backend for the Tauri desktop application.

## Building and Running

### Frontend (Web)

The following commands are available for running the Next.js application in a web browser:

- `pnpm dev`: Starts the Next.js development server on `http://localhost:3000`.
- `pnpm build`: Creates a production build of the Next.js application.
- `pnpm start`: Starts the production Next.js server.
- `pnpm lint`: Lints the code using ESLint.

### Desktop (Tauri)

The following commands are available for running the application as a desktop app:

- `pnpm tauri dev`: Runs the application in development mode, which will open a desktop window that hot-reloads on changes.
- `pnpm tauri build`: Builds the final, distributable desktop application for your platform.

## Development Conventions

### Styling

- **Tailwind CSS:** The project uses Tailwind CSS for styling. Utility classes are managed with `clsx` and `tailwind-merge`.
- **UI Components:** `shadcn/ui` is used for UI components. These components are not installed as a dependency, but rather copied into the `components/ui` directory to be modified and extended.

### Linting

ESLint is configured via `eslint.config.mjs` and extends the recommended Next.js configurations (`next/core-web-vitals` and `next/typescript`).

### TypeScript

The `tsconfig.json` file is configured for a strict Next.js project. It includes a path alias `@/*` which points to the root directory of the project.
