import { Feed } from "feed";
import { getAllPosts } from "./posts";
import config from "../config";
import { meJpg } from "../config/favicons";
import { metadata } from "../../app/layout";

export const buildFeed = async (options: { type: "rss" | "atom" | "json" }): Promise<string> => {
  const baseUrl = metadata.metadataBase?.href || `https://${config.siteDomain}/`;

  // https://github.com/jpmonette/feed#example
  const feed = new Feed({
    id: baseUrl,
    link: baseUrl,
    title: config.siteName,
    description: config.longDescription,
    copyright: config.licenseUrl,
    updated: new Date(process.env.RELEASE_DATE || Date.now()),
    image: new URL(meJpg.src, baseUrl).href,
    feedLinks: {
      rss: new URL("feed.xml", baseUrl).href,
      atom: new URL("feed.atom", baseUrl).href,
    },
    author: {
      name: config.authorName,
      link: baseUrl,
      email: config.authorEmail,
    },
  });

  // add posts separately using their frontmatter
  (await getAllPosts()).forEach((post) => {
    feed.addItem({
      guid: post.permalink,
      link: post.permalink,
      title: post.title,
      description: post.description,
      image: post.image || undefined,
      author: [
        {
          name: config.authorName,
          link: baseUrl,
        },
      ],
      date: new Date(post.date),
    });
  });

  if (options.type === "rss") {
    return feed.rss2();
  } else if (options.type === "atom") {
    return feed.atom1();
  } else if (options.type === "json") {
    // rare but including as an option because why not...
    // https://www.jsonfeed.org/
    return feed.json1();
  } else {
    throw new TypeError(`Invalid feed type "${options.type}", must be "rss", "atom", or "json".`);
  }
};
