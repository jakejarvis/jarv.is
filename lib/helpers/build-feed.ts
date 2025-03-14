import { Feed } from "feed";
import { getAllPosts } from "./posts";
import config from "../config";

import meJpg from "../../public/static/me.jpg";

export const buildFeed = async (): Promise<Feed> => {
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
      author: [
        {
          name: config.authorName,
          link: config.baseUrl,
        },
      ],
      date: new Date(post.date),
    });
  });

  return feed;
};
