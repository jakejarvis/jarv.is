/**
 * Locale code to define the site's language in ISO-639 format. Defaults to `en-US`.
 * @see https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes#Table
 */
export const SITE_LOCALE = "en-US";

/**
 * Consistent timezone for the site. Doesn't really matter what it is, as long as it's the same everywhere to avoid
 * hydration complaints.
 * @see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
 */
export const SITE_TZ = "America/New_York";

/** Path to directory with .mdx files, relative to project root. */
export const POSTS_DIR = "notes";

/**
 * Path to an image used in various places to represent the site, relative to project root. This path must be included
 * in [next.config.ts](../../next.config.ts) under `outputFileTracingIncludes`.
 */
export const AVATAR_PATH = "app/avatar.jpg";

/** Maximum width of content wrapper (e.g. for images) in pixels. */
export const MAX_WIDTH = 865;

/** Chooses the most appropriate URL for the current deployment. Defined in [`next.config.ts`](../../next.config.ts). */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

/** Freezes time at build. Defined in [`next.config.ts`](../../next.config.ts). */
export const RELEASE_TIMESTAMP = process.env.NEXT_PUBLIC_RELEASE_TIMESTAMP!;
