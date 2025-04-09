import { Feed } from "feed";
import { getFrontMatter, getContent } from "./posts";
import * as config from "../config";
import { BASE_URL, RELEASE_TIMESTAMP } from "../config/constants";
import type { Item as FeedItem } from "feed";

import ogImage from "../../app/opengraph-image.jpg";

/**
 * Returns a `Feed` object, which can then be processed with `feed.rss2()`, `feed.atom1()`, or `feed.json1()`.
 * @see https://github.com/jpmonette/feed#example
 */
export const buildFeed = async (): Promise<Feed> => {
  const feed = new Feed({
    id: `${BASE_URL}`,
    link: `${BASE_URL}`,
    title: config.siteName,
    description: config.longDescription,
    copyright: config.licenseUrl,
    updated: new Date(RELEASE_TIMESTAMP),
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

  // parse posts into feed items
  const frontmatter = await getFrontMatter();
  const posts: FeedItem[] = await Promise.all(
    frontmatter.map(async (post) => ({
      guid: post.permalink,
      link: post.permalink,
      title: post.title,
      description: post.description,
      author: [
        {
          name: config.authorName,
          link: `${BASE_URL}`,
        },
      ],
      date: new Date(post.date),
      content: `
        ${await getContent(post.slug)}
        <p><a href="${post.permalink}"><strong>Continue reading...</strong></a></p>
      `.trim(),
    }))
  );

  // sort posts reverse chronologically in case the promises resolved out of order
  posts.sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime());

  // officially add each post to the feed
  posts.forEach((post) => {
    feed.addItem(post);
  });

  return feed;
};
