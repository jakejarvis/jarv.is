// Next.js constants (not needed in frontend)

import path from "path";

// directory containing .mdx files relative to project root
export const NOTES_DIR = path.join(process.cwd(), "notes");

// normalize the timestamp saved when building/deploying (see next.config.js) and fall back to right now:
export const RELEASE_DATE = new Date(process.env.NEXT_PUBLIC_RELEASE_DATE || Date.now()).toISOString();
