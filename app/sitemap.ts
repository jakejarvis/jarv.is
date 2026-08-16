import path from "node:path";

import type { MetadataRoute } from "next";
import { glob } from "tinyglobby";

import { getFrontMatter } from "@/lib/posts";

const getStaticRoutes = async (): Promise<string[]> => {
  "use cache";

  return glob("**/page.{tsx,mdx}", {
    cwd: path.join(process.cwd(), "app"),
    expandDirectories: false,
    ignore: [
      // don't include dynamic routes or route groups
      "**/{\\[*\\],\\(*\\)}/page.{tsx,mdx}",
    ],
  });
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // start with manual routes
  const routes: MetadataRoute.Sitemap = [
    {
      // homepage
      url: process.env.NEXT_PUBLIC_BASE_URL ?? "/",
      priority: 1.0,
      lastModified: new Date(process.env.BUILD_TIME ?? 0),
    },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/tweets` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/y2k` },
  ];

  const staticRoutes = await getStaticRoutes();
  const frontmatter = getFrontMatter();

  // normalize static routes and blog slugs to be absolute URLs
  staticRoutes.forEach((route) => {
    const routePath = route
      .replace(/(^|\/)page\.(tsx|mdx)$/, "")
      .split("/")
      .filter((segment) => !/^\(.+\)$/.test(segment))
      .join("/");

    routes.push({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${routePath}`,
    });
  });

  // enrich blog entries with frontmatter dates
  frontmatter.forEach((post) => {
    routes.push({
      url: post.permalink,
      lastModified: new Date(post.date),
    });
  });

  // sort alphabetically by URL, sometimes glob returns results in a different order
  routes.sort((a, b) => (a.url < b.url ? -1 : 1));

  return routes;
};

export default sitemap;
