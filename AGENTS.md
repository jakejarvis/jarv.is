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

### Formatting (Prettier)

- **Line width:** 120 characters
- **Indentation:** 2 spaces (no tabs)
- **Quotes:** Double quotes, no JSX single quotes
- **Trailing commas:** ES5 style
- **Semicolons:** Required
- **Tailwind:** Classes auto-sorted via `prettier-plugin-tailwindcss`

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
      return { success: false, message: "Validation failed", errors: data.error.flatten().fieldErrors };
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

### Environment Variables

Type-checked in `lib/env.ts` using `@t3-oss/env-nextjs`. Never access `process.env` directly:

```typescript
import { env } from "@/lib/env";
const apiKey = env.RESEND_API_KEY;
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
