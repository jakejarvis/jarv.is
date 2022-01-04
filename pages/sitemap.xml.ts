import fs from "fs";
import { globby } from "globby";
import { baseUrl } from "../lib/config";
import type { GetServerSideProps } from "next";

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pages = await globby(["pages/*.tsx", "pages/notes/index.tsx", "!pages/_*.tsx", "notes/*.mdx"]);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
    .map((page) => {
      // very, VERY hacky way to remove unnecessary directories and file extensions
      const relUrl = page.includes("index.tsx")
        ? page.replace("pages/", "").replace("index.tsx", "")
        : `${page.replace("pages/", "").replace(".tsx", "").replace(".mdx", "")}/`;
      const fileMod = fs.statSync(page).mtime.toISOString();
      const changeFreq = "weekly";
      const priority = page === "pages/index.tsx" ? "1.0" : "0.7";

      return `
  <url>
    <loc>${baseUrl}/${relUrl}</loc>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${fileMod}</lastmod>
  </url>`;
    })
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
