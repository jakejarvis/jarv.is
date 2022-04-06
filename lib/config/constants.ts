// Next.js constants (not needed in frontend)
export const NOTES_DIR = "./notes";

// normalize the timestamp saved when building/deploying (see next.config.js) and fall back to right now:
export const RELEASE_DATE = new Date(process.env.RELEASE_DATE ?? Date.now()).toISOString();

// detect current backend environment
export const IS_PROD = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
export const IS_DEV_SERVER = !!process.env.IS_DEV_SERVER;
