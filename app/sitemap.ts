import path from "path";
import glob from "fast-glob";
import { getFrontMatter } from "../lib/helpers/posts";
import { BASE_URL } from "../lib/config/constants";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // start with manual routes
  const routes: MetadataRoute.Sitemap = [
    {
      // homepage
      url: BASE_URL,
      priority: 1.0,
      lastModified: new Date(process.env.RELEASE_DATE || Date.now()), // timestamp frozen when a new build is deployed
    },
  ];

  // add each directory in the app folder as a route (excluding special routes)
  const appDir = path.resolve(process.cwd(), "app");
  (
    await glob("**/page.{tsx,mdx}", {
      cwd: appDir,
      ignore: [
        // homepage already included manually above
        "page.tsx",
        // don't include dynamic routes
        "notes/[slug]/page.tsx",
      ],
    })
  ).forEach((route) => {
    routes.push({
      // remove matching page.(tsx|mdx) file and make all URLs absolute
      url: `${BASE_URL}/${route.replace(/\/page\.(tsx|mdx)$/, "")}`,
    });
  });

  const frontmatter = await getFrontMatter();
  frontmatter.forEach((post) => {
    routes.push({
      url: post.permalink,
      // pull lastModified from front matter date
      lastModified: new Date(post.date),
    });
  });

  // sort alphabetically by URL, sometimes fast-glob returns results in a different order
  routes.sort((a, b) => (a.url < b.url ? -1 : 1));

  return [...routes];
};

export default sitemap;
