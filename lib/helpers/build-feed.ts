import { cache } from "react";
import { Feed } from "feed";
import { getFrontMatter, getContent } from "./posts";
import * as config from "../config";
import { BASE_URL } from "../config/constants";

import ogImage from "../../app/opengraph-image.jpg";

/**
 * Returns a `Feed` object, which can then be processed with `feed.rss2()`, `feed.atom1()`, or `feed.json1()`.
 * @see https://github.com/jpmonette/feed#example
 */
export const buildFeed = cache(async (): Promise<Feed> => {
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
  const posts = await getFrontMatter();
  for (const post of posts) {
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
      content: `
        ${await getContent(post.slug)}
        <p><a href="${post.permalink}"><strong>Continue reading...</strong></a></p>
      `.trim(),
    });
  }

  return feed;
});
