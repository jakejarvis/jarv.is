import { getServerSideSitemap } from "next-sitemap";
import urlJoin from "url-join";
import { getAllNotes } from "../lib/helpers/parse-notes";
import { baseUrl } from "../lib/config";
import { RELEASE_DATE } from "../lib/config/constants";
import type { GetServerSideProps } from "next";
import type { ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: make this not manual (serverless functions can't see filesystem at runtime)
  const pages: ISitemapField[] = [
    {
      // homepage
      loc: "/",
      priority: 1.0,
      changefreq: "weekly",
      lastmod: RELEASE_DATE,
    },
    { loc: "/notes/", changefreq: "weekly", lastmod: RELEASE_DATE },
    { loc: "/birthday/" },
    { loc: "/cli/" },
    { loc: "/contact/" },
    { loc: "/hillary/" },
    { loc: "/leo/" },
    { loc: "/license/", priority: 0.1, changefreq: "yearly" },
    { loc: "/previously/" },
    { loc: "/privacy/", priority: 0.1, changefreq: "yearly" },
    { loc: "/projects/", changefreq: "daily" },
    { loc: "/stats/", priority: 0.1, changefreq: "yearly" },
    { loc: "/uses/" },
    { loc: "/y2k/" },
  ];

  // push notes separately and use their metadata
  const notes = await getAllNotes();
  notes.map((note) =>
    pages.push({
      loc: urlJoin("/notes/", note.slug, "/"),
      // pull lastMod from front matter date
      lastmod: new Date(note.date).toISOString(),
      priority: 0.7,
    })
  );

  // make all relative URLs absolute
  pages.map((page) => (page.loc = urlJoin(baseUrl, page.loc)));

  // cache on edge for 12 hours
  const { res } = context;
  res.setHeader("cache-control", "s-maxage=43200, stale-while-revalidate");

  // next-sitemap takes care of the rest of the response for us
  return getServerSideSitemap(context, pages);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
