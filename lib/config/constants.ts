// path to directory with .mdx files, relative to project root
export const POSTS_DIR = "notes";

// path to an image used in various places to represent the site, relative to project root
// IMPORTANT: must be included in next.config.ts under "outputFileTracingIncludes"
export const AVATAR_PATH = "app/avatar.jpg";

// maximum width of content wrapper (e.g. for images) in pixels
export const MAX_WIDTH = 865;

// same logic as metadataBase: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#default-value
export const BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" && process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" && process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`;
