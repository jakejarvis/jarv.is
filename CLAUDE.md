# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Type check
pnpm typecheck

# Lint code
pnpm lint

# Generate database migrations
pnpm db:generate

# Apply database migrations
pnpm db:migrate
```

## Environment Setup

Environment variables are strictly type-checked in `lib/env.ts`. Copy `.env.example` to `.env` or `.env.local` and populate required values.

Key required variables:

- `DATABASE_URL`: PostgreSQL connection string (Neon)
- `AUTH_SECRET`: Random value for authentication encryption
- `AUTH_GITHUB_CLIENT_ID` / `AUTH_GITHUB_CLIENT_SECRET`: GitHub OAuth App credentials
- `RESEND_API_KEY` / `RESEND_TO_EMAIL`: For contact form emails
- `NEXT_PUBLIC_GITHUB_REPO` / `NEXT_PUBLIC_GITHUB_USERNAME`: For projects page

## Architecture

### Tech Stack

- **Next.js App Router**: Server components with TypeScript
- **Tailwind CSS v4**: Utility-first styling with shadcn/ui components
- **Drizzle ORM**: Type-safe database interactions with Neon PostgreSQL
- **Better Auth**: Authentication with GitHub OAuth
- **MDX**: Enhanced markdown for blog posts with custom plugins

### Key Structure

- `/app`: App Router pages and API routes
- `/components`: Feature-organized React components
- `/lib`: Core utilities, configs, and database schema
- `/notes`: MDX blog content files
- Database schema: `lib/db/schema.ts` with users, sessions, comments, and page views

### Content & Features

- Blog posts (`/notes`) are MDX files with frontmatter
- Comments system with nested threads
- Hit counter API (`/api/hits`)
- GitHub projects showcase
- Contact form with Vercel BotID protection
- RSS/Atom feeds
- Theme toggle (dark/light mode)

## Development Notes

- Always prefer React Server Components over client components
- Database operations use Drizzle ORM with Neon's serverless client
- MDX processing includes custom remark/rehype plugins configured in `next.config.ts`
- Deployment assumes Vercel with specific environment handling
- Strict ESLint and TypeScript configuration enforced
