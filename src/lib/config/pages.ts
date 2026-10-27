/**
 * Every non-post page that's prerendered at build time. Posts are discovered by crawling links from /notes.
 */
export const staticPaths = [
  "/",
  "/notes",
  "/cli",
  "/leo",
  "/license",
  "/previously",
  "/privacy",
  "/uses",
  "/zip",
] as const;

/** Non-HTML routes that are also prerendered into static files. */
export const staticFiles = [
  "/feed.xml",
  "/feed.atom",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
] as const;

/**
 * Pages listed in the sitemap besides posts: the prerendered ones, plus /projects (rendered on request) and the
 * external sites proxied under /tweets and /y2k (see vercel.json).
 */
export const sitemapPaths = [...staticPaths, "/projects", "/tweets", "/y2k"] as const;
