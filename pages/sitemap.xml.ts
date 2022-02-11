import { getServerSideSitemap } from "next-sitemap";
import { getAllNotes } from "../lib/parse-notes";
import { baseUrl } from "../lib/config";
import type { GetServerSideProps } from "next";
import type { ISitemapField } from "next-sitemap";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // TODO: make this not manual (serverless functions can't see filesystem at runtime)
  const pages: ISitemapField[] = [
    { loc: "/", priority: 1.0, changefreq: "weekly" }, // homepage
    { loc: "/notes/", changefreq: "weekly" },
    { loc: "/birthday/" },
    { loc: "/cli/" },
    { loc: "/contact/" },
    { loc: "/hillary/" },
    { loc: "/leo/" },
    { loc: "/license/", priority: 0.1, changefreq: "yearly" },
    { loc: "/previously/" },
    { loc: "/privacy/", priority: 0.1, changefreq: "yearly" },
    { loc: "/projects/", changefreq: "daily" },
    { loc: "/uses/" },
    { loc: "/y2k/" },
  ];

  // push notes separately and use their metadata
  const notes = getAllNotes();
  notes.map((note) =>
    pages.push({
      loc: `/notes/${note.slug}/`,
      // pull lastMod from front matter date
      lastmod: note.date,
      priority: 0.7,
    })
  );

  // make all relative URLs absolute
  pages.map((page) => (page.loc = `${baseUrl}${page.loc}`));

  // cache on edge for 12 hours
  const { res } = context;
  res.setHeader("cache-control", "s-maxage=43200, stale-while-revalidate");

  // next-sitemap takes care of the rest of the response for us
  return getServerSideSitemap(context, pages);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
