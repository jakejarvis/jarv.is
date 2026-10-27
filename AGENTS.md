# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Build & Development Commands

```bash
pnpm dev            # Vite dev server on port 3000 (binds to 0.0.0.0)
pnpm build          # Production build (Vite + TanStack Start + Nitro), including prerendering
pnpm start          # Serve the production build locally (node .output/server/index.mjs)
pnpm lint           # Build content-collections, then lint and type-check the entire codebase
pnpm lint:fix       # Lint with autofixes
pnpm fmt            # Format with oxfmt
pnpm fmt:check      # Check formatting (no writes)
pnpm db:generate    # Generate migration files
pnpm db:migrate     # Apply migrations
```

No test suite exists. Validate changes via `pnpm lint`, `pnpm fmt:check` and `pnpm build`, and check behavior against the production build (`pnpm build && pnpm start`), not just `pnpm dev`.

`pnpm build` needs `VITE_BASE_URL` set (copy `.env.example` to `.env.local`); database, auth and GitHub secrets are optional for a build. Server-side env vars aren't loaded from `.env.local` by `pnpm start`, so export them first (e.g. `set -a; . ./.env.local; set +a`).

## Stack & Architecture

- **TanStack Start** (React 19, React Compiler) on **Vite 8**, deployed to Vercel through **Nitro**. File-based routes live in `src/routes/`; `src/routeTree.gen.ts` is generated (committed, never edited by hand).
- **React Server Components** (experimental TanStack Start feature, via `@vitejs/plugin-rsc`) render content only: post bodies, the MDX pages and `/projects`. A GET server function calls `renderServerComponent()` and the route's loader returns the result; the route component just renders it. Everything else is ordinary isomorphic React.
- **Prerendering:** every content page, plus the feeds, sitemap, robots.txt and manifest, is prerendered at build time (see `prerender` in `vite.config.ts` and the lists in `src/lib/config/pages.ts`; posts are discovered by crawling `/notes`). New static pages must be added to `staticPaths`.
- **Dynamic data** (comments, views, post stats, the session) is loaded in the browser after hydration with **TanStack Query** (`src/lib/queries.ts`), so prerendered HTML holds skeletons. There is no server-side data cache: caching is HTTP/CDN headers only.

## Code Style

### Formatting & Linting

- Formatter is **oxfmt** (`pnpm fmt` to write, `pnpm fmt:check` to verify), configured in `.oxfmtrc.json`. It sorts imports (groups: builtin → external → `@/` internal → relative, blank line between groups) and Tailwind classes (in `className` and `cn`/`clsx`/`cva` calls). Don't hand-sort; run `pnpm fmt`.
- Indentation is 2 spaces (no tabs), with double quotes, semicolons and trailing commas.
- Linter is **oxlint** with type-aware checks; `pnpm lint` also type-checks. `pnpm lint:fix` applies autofixes.
- Never run `biome`, `eslint` or `prettier`; they are not part of this repo.

### Import Organization

- Always use `@/` path aliases (→ `src/`, never relative `../../`), including inside `.mdx` files
- Use `type` keyword for type-only imports: `import type { Foo } from "bar"`

### TypeScript

- **Strict mode** enabled - no implicit any, strict null checks
- **Explicit return types** for server functions and server route handlers
- **Zod** (v4) for runtime validation of untrusted input (server-function inputs via `.validator()`, content frontmatter in content-collections.ts)
- Avoid `any` - use `unknown` with type guards when necessary
- Use `as const` for immutable config objects

### Naming Conventions

| Element             | Convention               | Example                      |
| ------------------- | ------------------------ | ---------------------------- |
| Files               | kebab-case               | `comment-form.tsx`           |
| Components          | PascalCase               | `CommentForm`                |
| Functions/Variables | camelCase                | `getComments`, `isPending`   |
| Types/Interfaces    | PascalCase               | `CommentWithUser`            |
| Constants           | camelCase or UPPER_SNAKE | `siteConfig`, `DATABASE_URL` |

Route files follow TanStack Router's conventions: `$param` for path params, `[.]` to escape dots (`feed[.]xml.ts`), `_` suffix to un-nest (`$slug_.opengraph-image[.]png.tsx`).

### Component Patterns

- Arrow function components, **named exports** gathered at the end of the file (`export { Button, buttonVariants };`). Route files export `Route` (and use a `function` component below it); config objects in `lib/config/` use default exports.
- Props destructured in parameters
- Use `cn()` from `@/lib/utils` for className merging
- Follow shadcn/ui patterns for UI components (`components.json`)
- **`"use client"` matters** because RSC is enabled: anything using hooks, event handlers or browser APIs that's imported by a server component (MDX components, `src/components/github-projects.tsx`) needs it. Server components can be `async` and fetch data; they can't use hooks or context.
- Images: use `Image` from `@/components/image` (Vercel image optimizer in production, the raw file elsewhere; widths must be in `images.sizes` in `vite.config.ts`). There is no `next/image`-style static import object: an imported image is a URL string.

### Head & Metadata

- Set page metadata with a route's `head()` using `createHead()` from `@/lib/metadata` (defaults live in `defaultHead`, set by `src/routes/__root.tsx`). JSON-LD goes through `jsonLd()` into `head().meta`.
- TanStack Router keeps only the last `meta` per `name`/`property`, so tags that repeat (e.g. `article:tag`) are rendered as `<meta>` elements in the page component instead (React hoists them into `<head>`).

### Server Functions & Error Handling

- Server functions live in `src/lib/functions/*.ts`, created with `createServerFn({ method }).validator(zodSchema).handler(...)`. Every one is a public endpoint callable by anyone, so authenticate (`auth.api.getSession({ headers: getRequestHeaders() })`) and validate all input inside it.
- Mutations are POST server functions (there is no `"use server"`): do the auth check before the `try`, then do the DB work inside a `try/catch` that logs with a `[functions/<file>]` prefix and rethrows with `{ cause }`. On the client, call them from event handlers (with `useTransition` for pending state) and then invalidate the affected queries (e.g. `invalidateComments()` in `src/lib/queries.ts`).
- Public GET server functions set CDN caching explicitly with `setResponseHeaders()` (`Vercel-CDN-Cache-Control`, browsers `max-age=0`). Vercel's CDN cache is per deployment.
- Server-only modules (DB access, secrets, heavy server libraries) are named `*.server.ts(x)` and start with `import "@tanstack/react-start/server-only"`; import protection keeps them out of client bundles. Server functions and server route handlers may import them.
- Read secrets from `process.env` inside handlers; public values come from `import.meta.env.VITE_*` (see `src/env.d.ts`).

**Client-side:** Use `toast` from `@/components/ui/toast` for feedback, `useTransition` for pending states.

```typescript
export const createComment = createServerFn({ method: "POST" })
  .validator(z.object({ content: z.string().trim().min(1), pageSlug: z.string() }))
  .handler(async ({ data: { content, pageSlug } }): Promise<void> => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session || !session.user) {
      throw new Error("You must be logged in to comment");
    }

    try {
      await db.insert(schema.comment).values({ content, pageSlug, userId: session.user.id });
    } catch (error) {
      console.error("[functions/comments] error creating comment:", error);
      throw new Error("Failed to create comment", { cause: error });
    }
  });
```

### Database (Drizzle ORM)

- Schema in `src/lib/db/schema.ts`; migrations are generated into `drizzle/` with `pnpm db:generate` and applied with `pnpm db:migrate`. Drizzle ORM is a pinned `1.0.0-rc` prerelease, so check its docs for v1 APIs (e.g. `defineRelations`).
- Only server functions, server routes and `*.server.ts` modules may import `@/lib/db`.

### Content

- Posts are `notes/<slug>/index.mdx` (co-located images); standalone pages are `src/content/pages/<name>/index.mdx` with a thin route in `src/routes/<name>.tsx`. Both are compiled by `@mdx-js/rollup` and rendered as server components with the map in `src/components/mdx-components.tsx` (passed as a prop; there's no MDX provider).
- `content-collections.ts` builds post metadata (`posts`, safe to import anywhere via `@/lib/posts`) and feed HTML (`feeds`, only for the feed routes).
- Syntax highlighting is Shiki, run by the async `CodeBlock` server component.

### Hosting config

- Redirects and rewrites live in `vercel.json`; the Vercel image optimizer and per-file content types are set through `nitro({ vercel: { config } })` in `vite.config.ts`.

## Project Structure

```
src/
  routes/             # File-based routes: pages, server routes (feeds, sitemap, OG images, api/*)
  router.tsx          # Router + TanStack Query client
  components/         # React components (ui/ = shadcn-style primitives on @base-ui/react)
  content/pages/      # Standalone MDX pages (/cli, /uses, …)
  lib/
    functions/        # Server functions (createServerFn): content, comments, stats, views
    data/             # Server-only DB reads (*.server.ts)
    content/          # RSC rendering of MDX and /projects (render.server.tsx)
    db/               # Drizzle schema and database client
    config/           # Site, author and page-list configuration
    auth.server.ts    # Better Auth server config (GitHub OAuth)
    auth-client.ts    # Better Auth React client
    metadata.ts       # head() helpers
    posts.ts          # Helpers over the content-collections posts
    queries.ts        # TanStack Query options for client-side data
  styles/globals.css  # Tailwind entry point
notes/<slug>/index.mdx  # Blog posts (MDX)
public/               # Static files served as-is (icons, OG images, .well-known)
drizzle/              # Generated SQL migrations (do not hand-edit)
```

## Key Dependencies

- **TanStack Start** with experimental React Server Components, TanStack Router and TanStack Query; React 19 and React Compiler
- **Vite 8** and **Nitro** (Vercel preset)
- **Tailwind CSS v4** with shadcn/ui components
- **Drizzle ORM** with Planetscale Postgres
- **Better Auth** for GitHub OAuth authentication
- **Zod** for schema validation
- **MDX** (`@mdx-js/rollup`) with remark/rehype plugins, **content-collections** for post metadata
- **takumi** for generated OG images
