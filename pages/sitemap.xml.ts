// WARNING: THIS FILE CONTAINS HISTORICAL LEVELS OF HACKINESS AND SHOULD NOT BE REPLICATED NOR ADMIRED.

import { getAllNotes } from "../lib/parse-notes";
import { baseUrl } from "../lib/config";
import type { GetServerSideProps } from "next";

const Sitemap = () => null;

type Page = {
  relUrl: string;
  priority?: number;
  changeFreq?: string;
  lastMod?: string | Date;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: make this not manual (serverless functions can't see /pages at runtime)
  const pages: Page[] = [
    { relUrl: "/", priority: 1.0, changeFreq: "weekly" }, // homepage
    { relUrl: "/notes/", changeFreq: "weekly" },
    { relUrl: "/birthday/" },
    { relUrl: "/cli/" },
    { relUrl: "/contact/" },
    { relUrl: "/hillary/" },
    { relUrl: "/leo/" },
    { relUrl: "/license/", priority: 0.1, changeFreq: "yearly" },
    { relUrl: "/previously/" },
    { relUrl: "/privacy/", priority: 0.1, changeFreq: "yearly" },
    { relUrl: "/projects/", changeFreq: "daily" },
    { relUrl: "/uses/" },
    { relUrl: "/y2k/" },
  ];

  // push notes separately and use their metadata
  const notes = getAllNotes();
  notes.map((note) =>
    pages.push({
      relUrl: `/notes/${note.slug}/`,
      // pull lastMod from front matter date
      lastMod: note.date,
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.relUrl}</loc>
    <priority>${page.priority ? page.priority.toFixed(1) : 0.7}</priority>
    <changefreq>${page.changeFreq || "monthly"}</changefreq>
    <lastmod>${page.lastMod || new Date().toISOString()}</lastmod>
  </url>`
    )
    .join("")
    .trim()}
</urlset>`;

  const { res } = context;
  res.setHeader("content-type", "application/xml; charset=utf-8");
  // cache on edge for one hour
  res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
