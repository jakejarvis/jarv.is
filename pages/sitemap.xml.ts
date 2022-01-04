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
    { relUrl: "/", priority: 1.0 }, // homepage
    { relUrl: "/notes/" },
    { relUrl: "/birthday/" },
    { relUrl: "/cli/" },
    { relUrl: "/contact/" },
    { relUrl: "/hillary/" },
    { relUrl: "/leo/" },
    { relUrl: "/license/", priority: 0.1 },
    { relUrl: "/previously/" },
    { relUrl: "/privacy/", priority: 0.1 },
    { relUrl: "/projects/", changeFreq: "daily" },
    { relUrl: "/uses/" },
  ];
  getAllNotes().map((note) => pages.push({ relUrl: `/notes/${note.slug}/`, lastMod: note.date }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.relUrl}</loc>
    <priority>${page.priority || 0.7}</priority>
    <changefreq>${page.changeFreq || "monthly"}</changefreq>
    <lastmod>${page.lastMod || new Date().toISOString()}</lastmod>
  </url>`
    )
    .join("")}
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
