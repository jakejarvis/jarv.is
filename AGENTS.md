# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Build & Development Commands

```bash
pnpm dev            # Development server (binds to 0.0.0.0)
pnpm build          # Production build
pnpm lint           # Lint and type-check the entire codebase
pnpm lint:fix       # Lint with autofixes
pnpm lint path/to/file.tsx  # Lint a single file
pnpm fmt            # Format with oxfmt
pnpm fmt:check      # Check formatting (no writes)
pnpm db:generate    # Generate migration files
pnpm db:migrate     # Apply migrations
```

No test suite exists. Validate changes via `pnpm lint`, `pnpm fmt:check` and `pnpm build`.

`pnpm build` needs `NEXT_PUBLIC_BASE_URL` set (copy `.env.example` to `.env.local`); database, auth and GitHub secrets are optional for a build.

## Code Style

### Formatting & Linting

- Formatter is **oxfmt** (`pnpm fmt` to write, `pnpm fmt:check` to verify), configured in `.oxfmtrc.json`. It sorts imports (groups: builtin → external → `@/` internal → relative, blank line between groups) and Tailwind classes (in `className` and `cn`/`clsx`/`cva` calls). Don't hand-sort; run `pnpm fmt`.
- Indentation is 2 spaces (no tabs), with double quotes, semicolons and trailing commas.
- Linter is **oxlint** with type-aware checks; `pnpm lint` runs `next typegen` then `oxlint` and also type-checks. `pnpm lint:fix` applies autofixes.
- Never run `biome`, `eslint` or `prettier`; they are not part of this repo.

### Import Organization

```typescript
// 1. React/Next.js core
import { useState } from "react";

// 2. External libraries
import { eq, desc } from "drizzle-orm";

// 3. Internal modules using @/ alias
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
```

- Always use `@/` path aliases (never relative `../../`)
- Use `type` keyword for type-only imports: `import type { Foo } from "bar"`

### TypeScript

- **Strict mode** enabled - no implicit any, strict null checks
- **Explicit return types** for API routes and server actions
- **Zod** (v4) for runtime validation of untrusted input (server-action arguments, content frontmatter in content-collections.ts)
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

### Component Patterns

**Prefer Server Components** - Only add `"use client"` when necessary for:

- Event handlers (onClick, onChange, onSubmit)
- React hooks (useState, useEffect, useTransition)
- Browser-only APIs

**Component structure:**

- Arrow function components, **named exports** gathered at the end of the file (`export { Button, buttonVariants };`). Default exports only where Next.js requires them (`page.tsx`, `layout.tsx`, route files) and for config objects in `lib/config/`.
- Props destructured in parameters
- Use `cn()` from `@/lib/utils` for className merging
- Follow shadcn/ui patterns for UI components

```typescript
const Button = ({
  className,
  variant,
  ...rest
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) => {
  return <button className={cn(buttonVariants({ variant, className }))} {...rest} />;
};

export { Button };
```

### Server Actions & Error Handling

- Server actions live in `lib/server/*.ts` files starting with `"use server"`. Every export of such a file is a public endpoint callable by anyone, so authenticate (`auth.api.getSession({ headers: await headers() })`) and validate all arguments inside the action, and only export async functions (types are fine).
- Actions take typed arguments (not `FormData`) and throw `Error` on failure: do the auth check before the `try`, then do the DB work inside a `try/catch` that logs with a `[server/<file>]` prefix and rethrows with `{ cause }`. After mutations, call `updateTag()` for each cache tag the write affects (read-your-writes) and `refresh()` to re-render the caller's page; reserve `revalidatePath()` for when prerendered output itself changed.
- Don't put read queries in a `"use server"` file (that makes them public endpoints); put them in `lib/data/` with `import "server-only"` and call them from server components.

```typescript
"use server";

export const createComment = async (data: {
  content: string;
  pageSlug: string;
  parentId?: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("You must be logged in to comment");
  }

  try {
    await db.insert(schema.comment).values({
      content: data.content,
      pageSlug: data.pageSlug,
      parentId: data.parentId || null,
      userId: session.user.id,
    });

    updateTag(commentsTag(data.pageSlug));
    refresh();
  } catch (error) {
    console.error("[server/comments] error creating comment:", error);
    throw new Error("Failed to create comment", { cause: error });
  }
};
```

**Client-side:** Use `toast` from `@/components/ui/toast` for feedback, `useTransition` for pending states.

### Database (Drizzle ORM)

- Schema in `lib/db/schema.ts`; migrations are generated into `drizzle/` with `pnpm db:generate` and applied with `pnpm db:migrate`. Drizzle ORM is a pinned `1.0.0-rc` prerelease, so check its docs for v1 APIs (e.g. `defineRelations`).
- `cacheComponents` is enabled. Cache expensive or remote reads with `"use cache"` and an explicit `cacheLife(...)` (add `cacheTag(...)` when something needs to invalidate it). Examples: `app/projects/github.ts`, `components/third-party/tweet.tsx`.
- Use `"use cache: remote"` for reads that run at request time (inside a dynamic hole, e.g. after `headers()`/`connection()`) so the entry is shared across server instances; plain `"use cache"` is fine for anything that ends up in a prerendered shell. Example: `lib/data/comments.ts`.
- A throw inside a `"use cache"` function fails the build if it happens during prerender, even when a caller catches it. For data read at build time (`app/projects/github.ts`, `lib/data/stats.ts`), catch inside the cached function and return a fallback; to avoid pinning a failure for long, call a shorter `cacheLife()` on the failure path (see `components/third-party/tweet.tsx`). Only request-time reads (`lib/data/comments.ts`) may throw from the cached function and catch in an uncached wrapper, which keeps errors out of the cache entirely.
- After mutations, call `updateTag()` (server actions) or `revalidateTag()` (route handlers), and only expire tags that some `cacheTag()` actually sets.

```typescript
export const getData = async (slug: string) => {
  "use cache";
  cacheLife("minutes");
  cacheTag("data", `data-${slug}`);
  return db.select().from(schema.table).where(eq(schema.table.slug, slug));
};
```

## Project Structure

```
app/                  # Next.js App Router pages, route handlers (app/api/*), feeds, sitemap
components/           # React components
  ui/                 # shadcn-style primitives on @base-ui/react
  layout/             # Header, footer, menu, page title
  comments/           # Comment system components
  third-party/        # Embeds (tweet, gist, youtube, codepen)
lib/                  # Core utilities and configuration
  db/                 # Drizzle schema and database client
  data/               # Server-only reads (import "server-only"): comments, cached post stats
  server/             # Server actions ("use server") -- mutations only: comments, views
  config/             # Site and author configuration
  auth.ts             # Better Auth server config (GitHub OAuth)
  auth-client.ts      # Better Auth React client
  posts.ts            # Helpers over the content-collections posts
notes/<slug>/index.mdx  # Blog posts (MDX), collected by content-collections.ts
drizzle/              # Generated SQL migrations (do not hand-edit)
```

## Key Dependencies

- **Next.js 16** (App Router, Cache Components, Partial Prefetching) with React 19 and React Compiler
- **Tailwind CSS v4** with shadcn/ui components
- **Drizzle ORM** with Planetscale Postgres
- **Better Auth** for GitHub OAuth authentication
- **Zod** for schema validation
- **MDX** for blog content with remark/rehype plugins
- **content-collections** for loading and validating MDX notes
