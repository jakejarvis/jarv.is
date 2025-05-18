# Copilot Instructions

This file provides guidance to GitHub Copilot when working with code in this repository.

## Project Overview

This is a personal website (jarv.is) built with Next.js, TypeScript, and various modern web technologies. The site uses the Next.js App Router and is designed to be deployed on Vercel. It includes features like blog posts (notes), projects showcase, contact form, and hit counter API.

## Development Commands

```bash
# Install dependencies
pnpm install

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

# Database migrations (using Drizzle)
npx drizzle-kit generate
```

## Environment Setup

The project requires several environment variables to function properly. Copy `.env.example` to a new `.env` file and populate the required values. The environment variables are documented and type-checked in `lib/env.ts`.

Required server environment variables:

- `AUTH_SECRET`: Random value for authentication encryption
- `AUTH_GITHUB_CLIENT_ID`: Client ID from GitHub OAuth App
- `AUTH_GITHUB_CLIENT_SECRET`: Client secret from GitHub OAuth App
- `DATABASE_URL`: PostgreSQL connection string (Neon)
- `GITHUB_TOKEN`: GitHub API token for projects page
- `RESEND_API_KEY`: Resend API key for contact form
- `RESEND_TO_EMAIL`: Destination email for contact form
- `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile secret key

Required client environment variables:

- `NEXT_PUBLIC_GITHUB_REPO`: Repository in format "username/repo"
- `NEXT_PUBLIC_GITHUB_USERNAME`: GitHub username
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile site key

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

The database schema is defined in `lib/db/schema.ts` and includes tables for:

- User accounts and sessions (auth system)
- Pages (for hit counter)
- Comments system

### Content Structure

- `/app`: Next.js App Router pages and layouts
- `/components`: React components organized by feature
- `/lib`: Utility functions and configurations
- `/notes`: MDX content for blog posts
- `/public`: Static assets

### Important Features

1. **Authentication**: GitHub OAuth integration via Better Auth
2. **MDX Processing**: Custom rehype/remark plugins for enhanced content
3. **Comments System**: GitHub-authenticated commenting system
4. **Hit Counter**: Simple analytics for page views
5. **Contact Form**: With Cloudflare Turnstile protection

## Development Considerations

1. The project assumes deployment to Vercel and makes use of Vercel-specific features

2. When working with MDX content, note the custom plugins and transformations in `next.config.ts`

3. Database operations use Drizzle ORM with Neon's serverless PostgreSQL client

4. The repository uses strict linting and type checking through ESLint and TypeScript

5. React components follow patterns from shadcn/ui style system

6. Always prefer React Server Components (RSC) over client components, and server actions ("use server") over API routes
