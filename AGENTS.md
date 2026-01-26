# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling and commands

### Install dependencies

- Use a Node package manager (npm, pnpm, yarn, or bun) to install the dependencies defined in `package.json`, for example:
  - `npm install`

### Run the app in development

- Start the development server:
  - `npm run dev`
  - or `pnpm dev`, `yarn dev`, `bun dev`
- The app will be available at `http://localhost:3000`.
- Main entrypoints:
  - Root page: `src/app/page.tsx`
  - Root layout: `src/app/layout.tsx`

### Build and run in production mode

- Build the Next.js app:
  - `npm run build`
- Start the production server (after a successful build):
  - `npm run start`

### Linting and formatting (Biome)

- Lint the entire project:
  - `npm run lint` (runs `biome check`)
- Format the codebase in-place:
  - `npm run format` (runs `biome format --write`)
- Example commands for targeting specific files/directories with Biome:
  - `npx biome check src/app/page.tsx`
  - `npx biome format src/app --write`

### Database (Postgres via Docker Compose)

- A local Postgres instance is defined in `docker-compose.yml` with service name `postgres`.
- Start the database in the background:
  - `docker compose up -d postgres`
- Service configuration:
  - Image: `postgres:17`
  - Host port: `5432`
  - Default credentials (from `docker-compose.yml`):
    - `POSTGRES_USER=docker`
    - `POSTGRES_PASSWORD=docker`
    - `POSTGRES_DB=petshop`

### Testing

- There is currently no test script defined in `package.json`.
- When tests are added, update this section with:
  - The command to run the full suite (e.g. `npm test` or `npm run test`).
  - How to run a single test file or test by name (e.g. `npm test -- path/to/file.test.ts`).

## Codebase structure and architecture

### Framework and configuration

- The project uses **Next.js (App Router)** with the routing root in `src/app`.
- `next.config.ts` enables the **Next.js React Compiler** via `reactCompiler: true`. When modifying React components, keep them idiomatic and side-effect-free where possible to work well with the compiler.
- TypeScript is enabled and configured in `tsconfig.json` with:
  - `strict: true` and `noEmit: true`.
  - Module resolution set to `bundler`.
  - A path alias: `@/*` → `./src/*`. Prefer this alias for imports within `src` (e.g. `import X from "@/app/page"`).

### Routing, layout, and pages

- **Root layout (`src/app/layout.tsx`)**
  - Imports global styles from `src/app/globals.css`.
  - Configures Google Geist fonts using `next/font/google` and exposes them as CSS variables (`--font-geist-sans`, `--font-geist-mono`).
  - Sets `metadata` for the entire application (title and description).
  - Wraps all routes in a shared `<html>`/`<body>` skeleton and applies font and antialiasing classes.
- **Root page (`src/app/page.tsx`)**
  - Currently a minimal `Home` component rendering a placeholder `<h1>Home</h1>`.
  - This is the starting point for implementing the pet shop UI and additional routes.

### Styling and theming

- Global styling is defined in `src/app/globals.css`.
- Tailwind CSS v4 is used via `@import "tailwindcss";`.
- The file defines CSS custom properties and Tailwind theme tokens:
  - `:root` sets `--background` and `--foreground` colors for the default (light) theme.
  - A `@media (prefers-color-scheme: dark)` block overrides these for dark mode.
  - `@theme inline` maps these values and font variables into Tailwind-style tokens:
    - `--color-background`, `--color-foreground`
    - `--font-sans`, `--font-mono`
- The `body` element uses these variables for background, foreground, and font family, combined with the Geist font variables wired in via `layout.tsx`.

### Data and backend integration

- `docker-compose.yml` provisions a Postgres database but there is currently **no backend or API route implementation** in this repository.
- As backend logic is introduced (e.g. Next.js Route Handlers under `src/app/api`, or shared utilities under `src/lib`/`src/services`), document:
  - Where domain logic and data access utilities live.
  - How database connections are managed (client libraries, pooling, configuration via environment variables).
  - Any required startup steps (migrations, seed scripts) and their commands.

### Conventions for future changes

- Keep the `src/app` directory focused on routing, layouts, and high-level page composition.
- Place reusable components and domain-specific modules under `src` (for example `src/components`, `src/features`, `src/lib`) and import them using the `@/` alias.
- When adding tests and additional tooling, extend this `AGENTS.md` to include specific commands and structural notes so future agents can operate effectively.
