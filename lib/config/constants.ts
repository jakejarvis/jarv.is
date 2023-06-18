// Next.js constants (not needed in frontend)

// directory containing .mdx files relative to project root
export const NOTES_DIR = "notes";

// normalize the timestamp saved when building/deploying (see next.config.js) and fall back to right now
export const RELEASE_DATE = new Date(process.env.RELEASE_DATE || Date.now()).toISOString();

// detect if running locally via `next dev` (phase is checked in next.config.js)
export const IS_DEV_SERVER = process.env.IS_DEV_SERVER === "true";

// attempt to normalize the various environment flags
export const BUILD_ENV = process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV;
