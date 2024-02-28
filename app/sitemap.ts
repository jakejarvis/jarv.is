import { getAllPosts } from "../lib/helpers/posts";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const routes: MetadataRoute.Sitemap = [
    {
      // homepage
      url: "/",
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: new Date(process.env.RELEASE_DATE || Date.now()), // timestamp frozen when a new build is deployed
    },
    { url: "/birthday/" },
    { url: "/cli/" },
    { url: "/contact/" },
    { url: "/hillary/" },
    { url: "/leo/" },
    { url: "/license/", priority: 0.1, changeFrequency: "yearly" },
    { url: "/previously/" },
    { url: "/privacy/", priority: 0.1, changeFrequency: "yearly" },
    { url: "/projects/", changeFrequency: "daily" },
    { url: "/tweets/" },
    { url: "/uses/" },
    { url: "/y2k/" },
    { url: "/zip/" },
  ];

  (await getAllPosts()).forEach((post) => {
    routes.push({
      url: `/notes/${post.slug}/`,
      // pull lastModified from front matter date
      lastModified: new Date(post.date),
    });
  });

  // make all URLs absolute
  routes.forEach((page) => (page.url = `${process.env.NEXT_PUBLIC_BASE_URL || ""}${page.url}`));

  return [...routes];
};

export default sitemap;
