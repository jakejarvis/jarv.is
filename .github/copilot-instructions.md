This file provides guidance to GitHub Copilot when working with code in this repository.

## Project Overview

This is a personal website (jarv.is) built with Next.js, TypeScript, and various modern web technologies. The site uses the Next.js App Router and is designed to be deployed on Vercel. It includes features like blog posts (notes), projects showcase, contact form, and hit counter API.

## Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type check
pnpm typecheck

# Generate database migrations (using Drizzle)
pnpm db:generate

# Apply database migrations (using Drizzle)
pnpm db:migrate
```

## Environment Setup

The project requires several environment variables to function properly. The environment variables are documented and type-checked in `lib/env.ts`. Use `.env.example` as a template if a `.env` or `.env.local` file does not already exist.

Required server environment variables:

- `AUTH_SECRET`: Random value for authentication encryption
- `AUTH_GITHUB_CLIENT_ID`: Client ID from GitHub OAuth App
- `AUTH_GITHUB_CLIENT_SECRET`: Client secret from GitHub OAuth App
- `DATABASE_URL`: PostgreSQL connection string (Neon)
- `GITHUB_TOKEN`: GitHub API token for projects page
- `RESEND_API_KEY`: Resend API key for contact form
- `RESEND_TO_EMAIL`: Destination email for contact form

Required client environment variables:

- `NEXT_PUBLIC_GITHUB_REPO`: Repository in format "username/repo"
- `NEXT_PUBLIC_GITHUB_USERNAME`: GitHub username

## Architecture

### Core Technologies

- **Next.js App Router**: Modern React framework with server components
- **TypeScript**: Type safety throughout the project
- **Tailwind CSS**: Styling with utility classes
- **Drizzle ORM**: Database interactions with type safety
- **Better Auth**: Authentication system
- **MDX**: For notes/blog content with enhanced features
- **Neon PostgreSQL**: Serverless database

### Database Schema

The Drizzle ORM database schema is defined in `lib/db/schema.ts`.

### Content Structure

- `/app`: Next.js App Router pages and layouts
- `/components`: React components organized by feature
- `/lib`: Utility functions and configurations
- `/notes`: MDX content for blog posts
- `/public`: Static assets

## Development Considerations

1. When using ANY library, always use `use context7` to lookup documentation from the context7 MCP server, which provides access to all project-specific configuration files and standards

2. Always prefer React Server Components (RSC) over client components

3. React components follow patterns from Tailwind v4 with shadcn/ui components

4. The project assumes deployment to Vercel and makes use of Vercel-specific features

5. When working with MDX content, note the custom plugins and transformations in `next.config.ts`

6. Database operations use Drizzle ORM with Neon's serverless PostgreSQL client

7. The repository uses strict linting and type checking through ESLint and TypeScript

## External Documentation Lookup

1. The Context7 MCP server is available to reference documentation for any library or dependency

2. Before installing any package, running commands, or creating/updating dependency files, you MUST use `use context7` to retrieve the most up-to-date and authoritative documentation for the relevant stack, library, or technology

3. Do NOT rely solely on model training data or general knowledge; Context7 must be consulted for all dependency and setup actions
