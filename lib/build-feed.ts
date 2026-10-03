import { Feed } from "feed";
import { NextResponse, type NextRequest } from "next/server";

import ogImage from "@/app/opengraph-image.jpg";
import authorConfig from "@/lib/config/author";
import siteConfig from "@/lib/config/site";
import { getPosts } from "@/lib/posts";

/**
 * Returns a `Feed` object, which can then be processed with `feed.rss2()` or `feed.atom1()`.
 * @see https://github.com/jpmonette/feed#example
 */
const buildFeed = (): Feed => {
  const posts = getPosts();

  const feed = new Feed({
    id: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    link: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    title: siteConfig.name,
    description: siteConfig.description,
    copyright: `https://spdx.org/licenses/${siteConfig.license}.html`,
    updated: posts[0] ? new Date(posts[0].date) : undefined,
    image: `${process.env.NEXT_PUBLIC_BASE_URL}${ogImage.src}`,
    feedLinks: {
      rss: `${process.env.NEXT_PUBLIC_BASE_URL}/feed.xml`,
      atom: `${process.env.NEXT_PUBLIC_BASE_URL}/feed.atom`,
    },
    author: {
      name: authorConfig.name,
      link: process.env.NEXT_PUBLIC_BASE_URL,
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
          link: `${process.env.NEXT_PUBLIC_BASE_URL}`,
        },
      ],
      date: new Date(post.date),
      content: `
        ${post.feedHtml}
        <p><a href="${post.permalink}"><strong>Continue reading...</strong></a></p>
      `.trim(),
    });
  }

  return feed;
};

export const createFeedHandler = (
  feedType: "rss" | "atom",
): { GET: (request: NextRequest) => Promise<Response> } => {
  return {
    GET: async () => {
      const feed = buildFeed();
      return new NextResponse(feedType === "rss" ? feed.rss2() : feed.atom1(), {
        headers: {
          "content-type": `application/${feedType}+xml; charset=utf-8`,
        },
      });
    },
  };
};
