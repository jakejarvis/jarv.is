import { getAllNotes } from "../lib/parseNotes";
import { buildFeed } from "../lib/buildFeed";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context && context.res) {
    const { res } = context;

    const notes = getAllNotes(["title", "date", "image", "slug", "description"]);

    const feed = buildFeed(notes);
    res.setHeader("content-type", "application/rss+xml");
    res.write(feed.rss2());
    res.end();
  }

  return {
    props: {},
  };
};

const RssPage = () => null;

export default RssPage;
