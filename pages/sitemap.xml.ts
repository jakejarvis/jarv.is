import { SitemapStream, streamToPromise, SitemapItemLoose, EnumChangefreq } from "sitemap";
import { getAllNotes } from "../lib/helpers/parse-notes";
import { baseUrl } from "../lib/config";
import { RELEASE_DATE } from "../lib/config/constants";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const stream = new SitemapStream({ hostname: baseUrl });

  // TODO: make this not manual (serverless functions can't see filesystem at runtime)
  const pages: SitemapItemLoose[] = [
    {
      // homepage
      url: "/",
      priority: 1.0,
      changefreq: EnumChangefreq.WEEKLY,
      lastmod: RELEASE_DATE, // timestamp frozen when a new build is deployed
    },
    { url: "/birthday/" },
    { url: "/cli/" },
    { url: "/contact/" },
    { url: "/hillary/" },
    { url: "/leo/" },
    { url: "/license/", priority: 0.1, changefreq: EnumChangefreq.YEARLY },
    { url: "/previously/" },
    { url: "/privacy/", priority: 0.1, changefreq: EnumChangefreq.YEARLY },
    { url: "/projects/", changefreq: EnumChangefreq.DAILY },
    { url: "/stats/", priority: 0.1, changefreq: EnumChangefreq.YEARLY },
    { url: "/uses/" },
    { url: "/y2k/" },
  ];

  // push notes separately and use their metadata
  const notes = await getAllNotes();
  notes.forEach((note) =>
    pages.push({
      url: `/notes/${note.slug}/`,
      // pull lastMod from front matter date
      lastmod: new Date(note.date).toISOString(),
    })
  );

  // set lastmod of /notes/ page to most recent post's date
  pages.push({
    url: "/notes/",
    lastmod: new Date(notes[0].date).toISOString(),
  });

  // sort alphabetically by URL
  pages.sort((a, b) => (a.url < b.url ? -1 : 1));

  // translate array of all pages to sitemap's stream
  pages.forEach((page) => {
    stream.write(page);
  });
  stream.end();

  // cache on edge for 12 hours
  const { res } = context;
  res.setHeader("cache-control", "public, max-age=0, s-maxage=43200, stale-while-revalidate");
  res.setHeader("content-type", "application/xml; charset=utf-8");

  // finally write the resulting XML
  res.write(await streamToPromise(stream));
  res.end();

  return {
    props: {},
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
