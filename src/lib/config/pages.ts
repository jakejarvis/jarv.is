/**
 * Every non-post page that's prerendered at build time. Posts are discovered by crawling links from /notes.
 * Also used by the sitemap.
 */
export const staticPaths = [
  "/",
  "/notes",
  "/cli",
  "/license",
  "/previously",
  "/privacy",
  "/uses",
  "/zip",
] as const;
