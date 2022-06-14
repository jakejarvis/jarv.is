import { Feed } from "feed";
import { getAllNotes } from "./parse-notes";
import * as config from "../config";
import { RELEASE_DATE } from "../config/constants";
import { favicons } from "../config/seo";
import type { GetServerSidePropsContext, PreviewData } from "next";
import type { ParsedUrlQuery } from "querystring";

export type BuildFeedOptions = {
  edgeCacheAge?: number; // in seconds, defaults to 43200 (12 hours)
};

// handles literally *everything* about building the server-side rss/atom feeds and writing the response.
// all the page needs to do is `return buildFeed(context, { format: "rss" })` from getServerSideProps.
export const buildFeed = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  type: "rss" | "atom" | "json",
  options?: BuildFeedOptions
): Promise<{ props: Record<string, unknown> }> => {
  const { res } = context;

  // https://github.com/jpmonette/feed#example
  const feed = new Feed({
    id: `${config.baseUrl}/`,
    link: `${config.baseUrl}/`,
    title: config.siteName,
    description: config.longDescription,
    copyright: "https://creativecommons.org/licenses/by/4.0/",
    updated: new Date(RELEASE_DATE),
    image: `${config.baseUrl}${favicons.meJpg.src}`,
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
  const notes = await getAllNotes();
  notes.forEach((note) => {
    feed.addItem({
      guid: note.permalink,
      link: note.permalink,
      title: note.title,
      description: note.description,
      image: note.image && `${config.baseUrl}${note.image}`,
      author: [
        {
          name: config.authorName,
          link: `${config.baseUrl}/`,
        },
      ],
      date: new Date(note.date),
    });
  });

  // cache on edge for 12 hours by default
  res.setHeader(
    "cache-control",
    `public, max-age=0, s-maxage=${options?.edgeCacheAge ?? 86400}, stale-while-revalidate`
  );

  // generates RSS by default
  if (type === "rss") {
    res.setHeader("content-type", "application/rss+xml; charset=utf-8");
    res.write(feed.rss2());
  } else if (type === "atom") {
    res.setHeader("content-type", "application/atom+xml; charset=utf-8");
    res.write(feed.atom1());
  } else if (type === "json") {
    // rare but including as an option because why not...
    // https://www.jsonfeed.org/
    res.setHeader("content-type", "application/feed+json; charset=utf-8");
    res.write(feed.json1());
  } else {
    throw new TypeError(`Invalid feed type "${type}", must be "rss", "atom", or "json".`);
  }

  res.end();

  return {
    props: {},
  };
};
