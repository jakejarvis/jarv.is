// path to directory with .mdx files, relative to project root
export const POSTS_DIR = "notes";

// path to an image used in various places to represent the site, relative to project root
// IMPORTANT: must be included in next.config.ts under "outputFileTracingIncludes"
export const AVATAR_PATH = "app/avatar.jpg";

// maximum width of content wrapper (e.g. for images) in pixels
export const MAX_WIDTH = 865;

// defined in next.config.ts
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
export const RELEASE_TIMESTAMP = process.env.NEXT_PUBLIC_RELEASE_TIMESTAMP!;
