import { Feed } from "feed";
import urlJoin from "url-join";
import { getAllNotes } from "./parse-notes";
import * as config from "../config";
import { RELEASE_DATE } from "../config/constants";
import { favicons } from "../config/seo";
import type { GetServerSidePropsContext, PreviewData } from "next";
import type { ParsedUrlQuery } from "querystring";

export type BuildFeedOptions = {
  type?: "rss" | "atom" | "json"; // defaults to rss
  edgeCacheAge?: number; // defaults to 3600 (one hour)
};

// handles literally *everything* about building the server-side rss/atom feeds and writing the response.
// all the page needs to do is `return buildFeed(context, { format: "rss" })` from getServerSideProps.
export const buildFeed = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  options: BuildFeedOptions = {}
): Promise<{ props: Record<string, unknown> }> => {
  const { res } = context;

  // https://github.com/jpmonette/feed#example
  const feed = new Feed({
    id: urlJoin(config.baseUrl, "/"),
    link: urlJoin(config.baseUrl, "/"),
    title: config.siteName,
    description: config.longDescription,
    copyright: "https://creativecommons.org/licenses/by/4.0/",
    updated: new Date(RELEASE_DATE),
    image: urlJoin(config.baseUrl, favicons.meJpg.src),
    feedLinks: {
      rss: urlJoin(config.baseUrl, "feed.xml"),
      atom: urlJoin(config.baseUrl, "feed.atom"),
    },
    author: {
      name: config.authorName,
      link: urlJoin(config.baseUrl, "/"),
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
      image: note.image ? urlJoin(config.baseUrl, note.image) : "",
      author: [
        {
          name: config.authorName,
          link: urlJoin(config.baseUrl, "/"),
        },
      ],
      date: new Date(note.date),
    });
  });

  // cache on edge for one hour by default
  res.setHeader("cache-control", `s-maxage=${options.edgeCacheAge ?? 3600}, stale-while-revalidate`);

  // generates RSS by default
  if (options.type === "atom") {
    res.setHeader("content-type", "application/atom+xml; charset=utf-8");
    res.write(feed.atom1());
  } else if (options.type === "json") {
    // rare but including as an option because why not...
    // https://www.jsonfeed.org/
    res.setHeader("content-type", "application/feed+json; charset=utf-8");
    res.write(feed.json1());
  } else {
    res.setHeader("content-type", "application/rss+xml; charset=utf-8");
    res.write(feed.rss2());
  }

  res.end();

  return {
    props: {},
  };
};
