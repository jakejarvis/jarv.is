import { createFileRoute } from "@tanstack/react-router";
import { allPosts } from "content-collections";

const BASE_URL = process.env.VITE_BASE_URL || "https://jarv.is";

// Static routes to include in the sitemap
const staticRoutes = [
  "/",
  "/notes",
  "/contact",
  "/projects",
  "/birthday",
  "/hillary",
  "/leo",
  "/cli",
  "/zip",
  "/previously",
  "/license",
  "/privacy",
  "/uses",
  "/tweets",
  "/y2k",
];

export const Route = createFileRoute("/sitemap/xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: Array<{
          loc: string;
          lastmod?: string;
          priority?: number;
        }> = [];

        // Homepage with highest priority
        urls.push({
          loc: BASE_URL,
          lastmod: new Date().toISOString(),
          priority: 1.0,
        });

        // Static routes
        for (const route of staticRoutes) {
          if (route === "/") continue; // already added
          urls.push({ loc: `${BASE_URL}${route}` });
        }

        // Blog posts
        const sortedPosts = [...allPosts].sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        for (const post of sortedPosts) {
          urls.push({
            loc: post.permalink,
            lastmod: new Date(post.date).toISOString(),
          });
        }

        // Sort alphabetically by URL
        urls.sort((a, b) => (a.loc < b.loc ? -1 : 1));

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls.map(
            (url) =>
              `  <url><loc>${url.loc}</loc>${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}${url.priority ? `<priority>${url.priority}</priority>` : ""}</url>`,
          ),
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
          },
        });
      },
    },
  },
});
