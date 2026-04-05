# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Build & Development Commands

```bash
pnpm dev            # Development server (binds to 0.0.0.0)
pnpm build          # Production build
pnpm typecheck      # Type checking
pnpm lint           # Lint entire codebase
pnpm lint path/to/file.tsx  # Lint a single file
pnpm db:generate    # Generate migration files
pnpm db:migrate     # Apply migrations
```

No test suite exists. Validate changes via `pnpm typecheck` and `pnpm lint`.

## Code Style

### Formatting (Biome)

- **Line width:** 80 characters
- **Indentation:** 2 spaces (no tabs)
- **Quotes:** Double quotes, no JSX single quotes
- **Trailing commas:** ES5 style
- **Semicolons:** Required
- **Tailwind:** Classes auto-sorted via `biome --write --unsafe`

### Import Organization

```typescript
// 1. React/Next.js core
import { useState } from "react";

// 2. External libraries
import { eq, desc } from "drizzle-orm";

// 3. Internal modules using @/ alias
import { db } from "@/lib/db";
import Button from "@/components/ui/button";
```

- Always use `@/` path aliases (never relative `../../`)
- Use `type` keyword for type-only imports: `import type { Foo } from "bar"`

### TypeScript

- **Strict mode** enabled - no implicit any, strict null checks
- **Explicit return types** for API routes and server actions
- **Zod** for runtime validation - share schemas between client and server
- Avoid `any` - use `unknown` with type guards when necessary
- Use `as const` for immutable config objects

### Naming Conventions

| Element             | Convention               | Example                      |
| ------------------- | ------------------------ | ---------------------------- |
| Files               | kebab-case               | `contact-form.tsx`           |
| Components          | PascalCase               | `ContactForm`                |
| Functions/Variables | camelCase                | `getComments`, `isPending`   |
| Types/Interfaces    | PascalCase               | `CommentWithUser`            |
| Constants           | camelCase or UPPER_SNAKE | `siteConfig`, `DATABASE_URL` |

### Component Patterns

**Prefer Server Components** - Only add `"use client"` when necessary for:

- Event handlers (onClick, onChange, onSubmit)
- React hooks (useState, useEffect, useTransition)
- Browser-only APIs

**Component structure:**

- Arrow function components with default exports
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
export default Button;
```

### Server Actions & Error Handling

```typescript
"use server";

export type ActionState = { success: boolean; message: string; errors?: Record<string, string[]> };

export const submitForm = async (state: ActionState, payload: FormData): Promise<ActionState> => {
  try {
    const data = Schema.safeParse(Object.fromEntries(payload));
    if (!data.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: data.error.flatten().fieldErrors,
      };
    }
    // Perform action...
    return { success: true, message: "Success!" };
  } catch (error) {
    console.error("[server/action] error:", error);
    return { success: false, message: "Internal server error" };
  }
};
```

**Client-side:** Use `toast` from sonner for feedback, `useTransition` for pending states.

### Database (Drizzle ORM)

- Schema in `lib/db/schema.ts`
- Use `"use cache"` directive with `cacheTag()` for cached queries
- Use `revalidatePath()` and `revalidateTag()` after mutations

```typescript
export const getData = async (slug: string) => {
  "use cache";
  cacheTag("data", `data-${slug}`);
  return db.select().from(schema.table).where(eq(schema.table.slug, slug));
};
```

## Project Structure

```
app/              # Next.js App Router pages and API routes
components/       # React components organized by feature
  ui/             # shadcn/ui base components
  layout/         # Header, footer, page layout
  comments/       # Comment system components
lib/              # Core utilities and configuration
  db/             # Drizzle schema and database client
  server/         # Server actions (contact, comments, views)
  config/         # Site and author configuration
  schemas/        # Shared Zod validation schemas
notes/            # MDX blog content files
```

## Key Dependencies

- **Next.js 15+** with App Router and React 19
- **Tailwind CSS v4** with shadcn/ui components
- **Drizzle ORM** with Planetscale Postgres
- **Better Auth** for GitHub OAuth authentication
- **Zod** for schema validation
- **MDX** for blog content with remark/rehype plugins

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, but it invokes Vite through `vp dev` and `vp build`.

## Vite+ Workflow

`vp` is a global binary that handles the full development lifecycle. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

### Start

- create - Create a new project from a template
- migrate - Migrate an existing project to Vite+
- config - Configure hooks and agent integration
- staged - Run linters on staged files
- install (`i`) - Install dependencies
- env - Manage Node.js versions

### Develop

- dev - Run the development server
- check - Run format, lint, and TypeScript type checks
- lint - Lint code
- fmt - Format code
- test - Run tests

### Execute

- run - Run monorepo tasks
- exec - Execute a command from local `node_modules/.bin`
- dlx - Execute a package binary without installing it as a dependency
- cache - Manage the task cache

### Build

- build - Build for production
- pack - Build libraries
- preview - Preview production build

### Manage Dependencies

Vite+ automatically detects and wraps the underlying package manager such as pnpm, npm, or Yarn through the `packageManager` field in `package.json` or package manager-specific lockfiles.

- add - Add packages to dependencies
- remove (`rm`, `un`, `uninstall`) - Remove packages from dependencies
- update (`up`) - Update packages to latest versions
- dedupe - Deduplicate dependencies
- outdated - Check for outdated packages
- list (`ls`) - List installed packages
- why (`explain`) - Show why a package is installed
- info (`view`, `show`) - View package information from the registry
- link (`ln`) / unlink - Manage local package links
- pm - Forward a command to the package manager

### Maintain

- upgrade - Update `vp` itself to the latest version

These commands map to their corresponding tools. For example, `vp dev --port 3000` runs Vite's dev server and works the same as Vite. `vp test` runs JavaScript tests through the bundled Vitest. The version of all tools can be checked using `vp --version`. This is useful when researching documentation, features, and bugs.

## Common Pitfalls

- **Using the package manager directly:** Do not use pnpm, npm, or Yarn directly. Vite+ can handle all package manager operations.
- **Always use Vite commands to run tools:** Don't attempt to run `vp vitest` or `vp oxlint`. They do not exist. Use `vp test` and `vp lint` instead.
- **Running scripts:** Vite+ built-in commands (`vp dev`, `vp build`, `vp test`, etc.) always run the Vite+ built-in tool, not any `package.json` script of the same name. To run a custom script that shares a name with a built-in command, use `vp run <script>`. For example, if you have a custom `dev` script that runs multiple services concurrently, run it with `vp run dev`, not `vp dev` (which always starts Vite's dev server).
- **Do not install Vitest, Oxlint, Oxfmt, or tsdown directly:** Vite+ wraps these tools. They must not be installed directly. You cannot upgrade these tools by installing their latest versions. Always use Vite+ commands.
- **Use Vite+ wrappers for one-off binaries:** Use `vp dlx` instead of package-manager-specific `dlx`/`npx` commands.
- **Import JavaScript modules from `vite-plus`:** Instead of importing from `vite` or `vitest`, all modules should be imported from the project's `vite-plus` dependency. For example, `import { defineConfig } from 'vite-plus';` or `import { expect, test, vi } from 'vite-plus/test';`. You must not install `vitest` to import test utilities.
- **Type-Aware Linting:** There is no need to install `oxlint-tsgolint`, `vp lint --type-aware` works out of the box.

## CI Integration

For GitHub Actions, consider using [`voidzero-dev/setup-vp`](https://github.com/voidzero-dev/setup-vp) to replace separate `actions/setup-node`, package-manager setup, cache, and install steps with a single action.

```yaml
- uses: voidzero-dev/setup-vp@v1
  with:
    cache: true
- run: vp check
- run: vp test
```

## Review Checklist for Agents

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to validate changes.
<!--VITE PLUS END-->
