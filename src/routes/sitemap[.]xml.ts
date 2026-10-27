import { createFileRoute } from "@tanstack/react-router";

import { sitemapPaths } from "@/lib/config/pages";
import { getPosts } from "@/lib/posts";

type SitemapEntry = {
  url: string;
  lastModified?: Date;
  priority?: number;
};

const BASE_URL = import.meta.env.VITE_BASE_URL;

/** Same XML (and formatting) Next.js generated from app/sitemap.ts. */
const toXml = (entries: SitemapEntry[]): string =>
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(({ url, lastModified, priority }) =>
      [
        "<url>",
        `<loc>${url}</loc>`,
        ...(lastModified ? [`<lastmod>${lastModified.toISOString()}</lastmod>`] : []),
        ...(priority === undefined ? [] : [`<priority>${priority}</priority>`]),
        "</url>",
      ].join("\n"),
    ),
    "</urlset>",
    "",
  ].join("\n");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const entries: SitemapEntry[] = [
          ...sitemapPaths.map((path): SitemapEntry =>
            path === "/"
              ? // prerendered, so "now" is the build time
                { url: BASE_URL, lastModified: new Date(), priority: 1 }
              : { url: `${BASE_URL}${path}` },
          ),
          ...getPosts().map((post) => ({ url: post.permalink, lastModified: new Date(post.date) })),
        ];

        // alphabetical by URL
        entries.sort((a, b) => (a.url < b.url ? -1 : 1));

        return new Response(toXml(entries), {
          headers: { "content-type": "application/xml" },
        });
      },
    },
  },
});
