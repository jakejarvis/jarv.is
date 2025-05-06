# Project Information for GitHub Copilot

This repository contains the source code for [jarv.is](https://jarv.is/), a personal website for Jake Jarvis built with Next.js.

## Project Overview

- **Type**: Personal website with blog
- **Framework**: Next.js (uses latest features like App Router, Partial Prerendering)
- **Primary Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: Upstash Redis
- **Content**: MDX for blog posts with custom components
- **Deployment**: Vercel

## Project Structure

```
/
├── app/           # Pages and layouts using Next.js App Router
├── components/    # Reusable React components
├── lib/           # Utility functions, configurations, and helpers
├── notes/         # Blog posts written in MDX format along with any images
└── public/        # Static assets
```

## Code Style & Conventions

- **Formatting**: Prettier is used for code formatting
- **Linting**: ESLint with custom configuration
- **JavaScript/TypeScript**:
  - Use double quotes for strings
  - 2-space indentation (no tabs)
  - Trailing commas in objects and arrays
  - Maximum line length of 120 characters
  - TypeScript is strictly typed
- **React Components**:
  - Prefer function components with hooks
  - Use named exports for components
  - Client components are marked with "use client" directive
- **CSS**:
  - Use Tailwind utility classes
  - Custom CSS variables for theming (light/dark mode)
  - `cn()` from `lib/utils.ts` utility for conditional class names

## Preferred Solutions

- When suggesting code changes, maintain the existing patterns and structure
- **React Server Components when possible, Client Components when necessary**
- MDX for content-heavy pages
- Image optimization through Next.js Image component
- Cache and revalidate data appropriately with tags

## Other Notes

- Dynamic theme switching (light/dark mode) is supported
- Accessibility is important - maintain proper heading levels, skip links, etc.
- Performance optimization is a priority (bundle sizes, image optimization, etc.)

This document should be updated when significant architectural or dependency changes are made to the project.
