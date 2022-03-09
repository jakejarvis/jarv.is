import { Feed } from "feed";
import { getAllNotes } from "./parse-notes";
import * as config from "../config";
import type { GetServerSidePropsContext, PreviewData } from "next";
import type { ParsedUrlQuery } from "querystring";

// handles literally *everything* about building the server-side rss/atom feeds and writing the response.
// all the page needs to do is `return buildFeed(context, { format: "rss" })` from getServerSideProps.

export const buildFeed = (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  options?: { type: "rss" | "atom" }
): { props: Record<string, unknown> } => {
  const { res } = context;

  // https://github.com/jpmonette/feed#example
  const feed = new Feed({
    id: `${config.baseUrl}/`,
    link: `${config.baseUrl}/`,
    title: config.siteName,
    description: config.longDescription,
    copyright: "https://creativecommons.org/licenses/by/4.0/",
    updated: new Date(),
    image: `${config.baseUrl}/static/images/me.jpg`,
    feedLinks: {
      rss: `${config.baseUrl}/feed.xml`,
      atom: `${config.baseUrl}/feed.atom`,
    },
    author: {
      name: config.authorName,
      link: `${config.baseUrl}/`,
      email: config.authorEmail,
    },
  });

  // add notes separately using their frontmatter
  const notes = getAllNotes();
  notes.forEach((note) => {
    feed.addItem({
      guid: note.permalink,
      link: note.permalink,
      title: note.title,
      description: note.description,
      image: note.image ? `${config.baseUrl}${note.image}` : "",
      author: [
        {
          name: config.authorName,
          link: config.baseUrl,
        },
      ],
      date: new Date(note.date),
    });
  });

  // cache on edge for one hour
  res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");

  // generates RSS by default
  if (options?.type === "atom") {
    res.setHeader("content-type", "application/atom+xml; charset=utf-8");
    res.write(feed.atom1());
  } else {
    res.setHeader("content-type", "application/rss+xml; charset=utf-8");
    res.write(feed.rss2());
  }

  res.end();

  return {
    props: {},
  };
};
