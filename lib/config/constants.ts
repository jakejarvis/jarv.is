// Next.js constants (not needed in frontend)
export const NOTES_DIR = "./notes";

// normalize the timestamp saved when building/deploying (see next.config.js) and fall back to right now:
export const RELEASE_DATE = new Date(process.env.RELEASE_DATE ?? Date.now()).toISOString();
