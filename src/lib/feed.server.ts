import "@tanstack/react-start/server-only";
import { allFeeds } from "content-collections";
import { Feed } from "feed";

import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { getPosts } from "@/lib/posts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Returns a `Feed` object, which can then be processed with `feed.rss2()` or `feed.atom1()`.
 * @see https://github.com/jpmonette/feed#example
 */
const buildFeed = (): Feed => {
  const posts = getPosts();
  const feedHtmlBySlug = new Map(allFeeds.map(({ slug, feedHtml }) => [slug, feedHtml]));

  const feed = new Feed({
    id: BASE_URL,
    link: BASE_URL,
    title: siteConfig.name,
    description: siteConfig.description,
    copyright: `https://spdx.org/licenses/${siteConfig.license}.html`,
    updated: posts[0] ? new Date(posts[0].date) : undefined,
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

  // posts are already sorted reverse chronologically
  for (const post of posts) {
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
        ${feedHtmlBySlug.get(post.slug) ?? ""}
        <p><a href="${post.permalink}"><strong>Continue reading...</strong></a></p>
      `.trim(),
    });
  }

  return feed;
};

/** A route's GET handler for the RSS or Atom feed (both are prerendered at build time). */
export const createFeedHandler = (feedType: "rss" | "atom") => async (): Promise<Response> => {
  const feed = buildFeed();
  return new Response(feedType === "rss" ? feed.rss2() : feed.atom1(), {
    headers: {
      "content-type": `application/${feedType}+xml; charset=utf-8`,
    },
  });
};
