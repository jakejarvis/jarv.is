import path from "path";
import glob from "fast-glob";
import { getAllPosts } from "../lib/helpers/posts";
import config from "../lib/config";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // start with manual routes
  const routes: MetadataRoute.Sitemap = [
    {
      // homepage
      url: config.baseUrl,
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: new Date(process.env.RELEASE_DATE || Date.now()), // timestamp frozen when a new build is deployed
    },
    { url: `${config.baseUrl}/tweets/` },
  ];

  // add each directory in the app folder as a route (excluding special routes)
  const appDir = path.resolve(process.cwd(), "app");
  (
    await glob("*", {
      cwd: appDir,
      deep: 0,
      onlyDirectories: true,
      markDirectories: true,
      ignore: [
        // don't include special routes, see: https://nextjs.org/docs/app/api-reference/file-conventions/metadata
        "api",
        "feed.atom",
        "feed.xml",
      ],
    })
  ).forEach((route) => {
    routes.push({
      // make all URLs absolute
      url: `${config.baseUrl}/${route}`,
    });
  });

  (await getAllPosts()).forEach((post) => {
    routes.push({
      url: post.permalink,
      // pull lastModified from front matter date
      lastModified: new Date(post.date),
    });
  });

  return routes;
};

export default sitemap;
