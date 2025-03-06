import { Feed } from "feed";
import { getAllPosts } from "./posts";
import config from "../config";

import meJpg from "../../app/me.jpg";

export const buildFeed = async (options: { type: "rss" | "atom" | "json" }): Promise<string> => {
  // https://github.com/jpmonette/feed#example
  const feed = new Feed({
    id: config.baseUrl,
    link: config.baseUrl,
    title: config.siteName,
    description: config.longDescription,
    copyright: config.licenseUrl,
    updated: new Date(process.env.RELEASE_DATE || Date.now()),
    image: `${config.baseUrl}${meJpg.src}`,
    feedLinks: {
      rss: `${config.baseUrl}/feed.xml`,
      atom: `${config.baseUrl}/feed.atom`,
    },
    author: {
      name: config.authorName,
      link: config.baseUrl,
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
          link: config.baseUrl,
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
