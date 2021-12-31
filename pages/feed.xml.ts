import { getAllNotes } from "../lib/parse-notes";
import { buildFeed } from "../lib/build-feed";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const notes = getAllNotes(["title", "date", "image", "slug", "description"]);
  const feed = buildFeed(notes);

  const { res } = context;
  res.setHeader("content-type", "application/rss+xml");
  res.write(feed.rss2());
  res.end();

  return {
    props: {},
  };
};

const RssPage = () => null;

export default RssPage;
