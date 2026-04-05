# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Build & Development Commands

This project uses **Vite+** (`vp` CLI) as its unified toolchain. Do not use pnpm/npm directly for dev tasks.

```bash
vp install          # Install dependencies (run after pulling changes)
vp dev              # Development server (0.0.0.0:3000)
vp build            # Production build → .output/
vp check            # Run fmt + lint + typecheck in one pass
vp lint             # Lint only (oxlint, type-aware)
vp lint src/routes/contact.tsx  # Lint a single file
vp fmt              # Format only (oxfmt)
vp run check-types    # TypeScript type checking only (tsc --noEmit)
vp run db:generate    # Generate Drizzle migration files
vp run db:migrate     # Apply Drizzle migrations
```

No test suite exists. Validate changes with `vp check`.

### Vite+ Gotchas

- `vp dev` / `vp build` / `vp lint` run built-in tools, not package.json scripts. Use `vp run <script>` to run a custom script that shares a name.
- Do not install oxlint, oxfmt, vitest, or tsdown directly — Vite+ bundles them.
- Import from `vite-plus`, not `vite` or `vitest` (e.g. `import { defineConfig } from "vite-plus"`).
- Use `vp dlx` instead of `npx`/`pnpm dlx`.

## Tech Stack

- **TanStack Start** + **TanStack Router** — file-based routing with SSR, React 19
- **Vite+** — dev server, build, lint (oxlint), format (oxfmt)
- **Tailwind CSS v4** with shadcn/ui components
- **Drizzle ORM** with Postgres
- **Better Auth** for GitHub OAuth
- **Content Collections** for MDX blog posts

## Project Structure

```
src/
  routes/             # TanStack Router file-based routes
    __root.tsx        # Root layout (html, head, body, providers)
    index.tsx         # Homepage
    notes/
      index.tsx       # Blog listing
      $slug.tsx       # Dynamic blog post route
    api/              # API routes (auth, hits)
  components/
    ui/               # shadcn/ui base components
    layout/           # Header, footer, page layout
    comments/         # Comment system
    third-party/      # YouTube, Tweet, CodePen embeds
  lib/
    server/           # Server functions (views, comments, contact)
    db/               # Drizzle schema and client
    config/           # Site and author configuration
    schemas/          # Shared Zod validation schemas
  router.tsx          # TanStack Router instance + type registration
  styles.css          # Global CSS (Tailwind v4)
notes/                # MDX blog content files
content-collections.ts # Content Collections config (MDX pipeline)
vite.config.ts        # Vite+, TanStack Start, Tailwind, React Compiler config
```

## Code Style

### Formatting & Linting

Configured in `vite.config.ts` under `fmt` and `lint` keys — not separate config files.

- **Indentation:** 2 spaces
- **Quotes:** Double quotes
- **Semicolons:** Required
- **Tailwind:** Classes auto-sorted by oxfmt (configured for `className`, `cn`, `clsx`, `cva`)
- **Import sorting:** Auto-sorted by oxfmt (builtin → external → internal `@/` → relative)

### Imports

- Always use `@/` path aliases (maps to `src/`)
- Use `type` keyword for type-only imports: `import type { Foo } from "bar"`

### TypeScript

- **Strict mode** enabled
- **Zod** for runtime validation — share schemas between client and server
- Avoid `any` — use `unknown` with type guards when necessary

### Naming Conventions

| Element          | Convention               | Example                      |
| ---------------- | ------------------------ | ---------------------------- |
| Files            | kebab-case               | `contact-form.tsx`           |
| Components       | PascalCase               | `ContactForm`                |
| Functions/Vars   | camelCase                | `getComments`, `isPending`   |
| Types/Interfaces | PascalCase               | `CommentWithUser`            |
| Constants        | camelCase or UPPER_SNAKE | `siteConfig`, `DATABASE_URL` |

### Component Patterns

- Arrow function components with default exports
- Props destructured in parameters
- Use `cn()` from `@/lib/utils` for className merging
- Follow shadcn/ui patterns for UI components

### Server Functions (TanStack Start)

Server-side logic uses `createServerFn` from `@tanstack/react-start`, **not** `"use server"` directives:

```typescript
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getViewCount = createServerFn()
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    // server-only code here
  });

// For mutations, specify method:
export const incrementViews = createServerFn({ method: "POST" })
  .inputValidator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    // ...
  });
```

### Routing (TanStack Router)

Routes are file-based in `src/routes/`. The route tree is auto-generated in `src/routeTree.gen.ts` — do not edit it manually.

- `createFileRoute` for page routes, `createAPIFileRoute` for API routes
- Use `route.head()` for per-route `<head>` metadata (not a separate metadata export)
- Dynamic params use `$param` naming (e.g. `$slug.tsx`)
- Data loading via `route.loader()`, consumed with `useLoaderData()`

### Database (Drizzle ORM)

- Schema in `src/lib/db/schema.ts`
- No caching directives — TanStack Start does not use `"use cache"` / `revalidatePath`
