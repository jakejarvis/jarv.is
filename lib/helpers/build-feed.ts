import { Feed } from "feed";
import { getAllPosts } from "./posts";
import * as config from "../config";
import { BASE_URL } from "../config/constants";

import ogImage from "../../app/opengraph-image.jpg";

export const buildFeed = async (): Promise<Feed> => {
  // https://github.com/jpmonette/feed#example
  const feed = new Feed({
    id: BASE_URL,
    link: BASE_URL,
    title: config.siteName,
    description: config.longDescription,
    copyright: config.licenseUrl,
    updated: new Date(process.env.RELEASE_DATE || Date.now()),
    image: `${BASE_URL}${ogImage.src}`,
    feedLinks: {
      rss: `${BASE_URL}/feed.xml`,
      atom: `${BASE_URL}/feed.atom`,
    },
    author: {
      name: config.authorName,
      link: BASE_URL,
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
          link: BASE_URL,
        },
      ],
      date: new Date(post.date),
    });
  });

  return feed;
};
