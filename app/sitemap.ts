import { env } from "../lib/env";
import path from "path";
import glob from "fast-glob";
import { getFrontMatter } from "../lib/helpers/posts";
import type { MetadataRoute } from "next";

// routes in /app (in other words, directories containing a page.tsx/mdx file) are automatically included; add a route
// here to exclude it.
const excludedRoutes = [
  // homepage is already included manually
  "./",
  // other excluded pages
  "./license",
  "./privacy",
];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // start with manual routes
  const routes: MetadataRoute.Sitemap = [
    {
      // homepage
      url: env.NEXT_PUBLIC_BASE_URL,
      priority: 1.0,
      lastModified: new Date(),
    },
  ];

  const [staticRoutes, frontmatter] = await Promise.all([
    // static routes in app directory
    glob("**/page.{tsx,mdx}", {
      cwd: path.join(process.cwd(), "app"),
      ignore: [
        ...excludedRoutes.map((route) => `${route}/page.{tsx,mdx}`),
        // don't include dynamic routes
        "**/\\[*\\]/page.{tsx,mdx}",
      ],
    }),

    // blog posts
    getFrontMatter(),
  ]);

  // add each directory in the app folder as a route (excluding special routes)
  staticRoutes.forEach((route) => {
    routes.push({
      // remove matching page.(tsx|mdx) file and make all URLs absolute
      url: `${env.NEXT_PUBLIC_BASE_URL}/${route.replace(/\/page\.(tsx|mdx)$/, "")}`,
    });
  });

  frontmatter.forEach((post) => {
    routes.push({
      url: post.permalink,
      // pull lastModified from front matter date
      lastModified: new Date(post.date),
    });
  });

  // sort alphabetically by URL, sometimes fast-glob returns results in a different order
  routes.sort((a, b) => (a.url < b.url ? -1 : 1));

  return routes;
};

export default sitemap;
