import { env } from "cloudflare:workers";
import { allPosts } from "content-collections";
import { Feed } from "feed";

import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";

const BASE_URL = env.VITE_BASE_URL || "https://jarv.is";

/**
 * Returns a `Feed` object, which can then be processed with `feed.rss2()`, `feed.atom1()`, or `feed.json1()`.
 * @see https://github.com/jpmonette/feed#example
 */
export const buildFeed = (): Feed => {
  const feed = new Feed({
    id: BASE_URL,
    link: BASE_URL,
    title: siteConfig.name,
    description: siteConfig.description,
    copyright: `https://spdx.org/licenses/${siteConfig.license}.html`,
    updated: new Date(),
    image: `${BASE_URL}/opengraph-image.jpg`,
    feedLinks: {
      rss: `${BASE_URL}/feed.xml`,
      atom: `${BASE_URL}/feed.atom`,
    },
    author: {
      name: authorConfig.name,
      link: BASE_URL,
      email: authorConfig.email,
    },
  });

  // Sort posts reverse chronologically
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Add each post to the feed using pre-computed rssContent
  for (const post of sortedPosts) {
    feed.addItem({
      guid: post.permalink,
      link: post.permalink,
      title: post.title,
      description: post.description,
      author: [
        {
          name: authorConfig.name,
          link: BASE_URL,
        },
      ],
      date: new Date(post.date),
      content: `
        ${post.rssContent}
        <p><a href="${post.permalink}"><strong>Continue reading...</strong></a></p>
      `.trim(),
    });
  }

  return feed;
};
