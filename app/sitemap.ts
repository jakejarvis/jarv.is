import path from "path";
import glob from "fast-glob";
import { getAllPosts } from "../lib/helpers/posts";
import { metadata } from "./layout";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // start with manual routes
  const routes: MetadataRoute.Sitemap = [
    {
      // homepage
      url: "/",
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: new Date(process.env.RELEASE_DATE || Date.now()), // timestamp frozen when a new build is deployed
    },
    {
      url: "/tweets/",
      changeFrequency: "yearly",
    },
  ];

  // add each directory in the app folder as a route
  (
    await glob("*", {
      cwd: path.join(process.cwd(), "app"),
      onlyDirectories: true,
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
      url: `/${route}/`,
    });
  });

  (await getAllPosts()).forEach((post) => {
    routes.push({
      url: post.permalink,
      // pull lastModified from front matter date
      lastModified: new Date(post.date),
    });
  });

  // make all URLs absolute
  routes.forEach((page) => (page.url = new URL(page.url, metadata.metadataBase || "").href));

  return routes;
};

export default sitemap;
