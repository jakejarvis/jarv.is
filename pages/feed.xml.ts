import { buildFeed } from "../lib/build-feed";
import type { GetServerSideProps } from "next";

const RssFeed = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const feed = buildFeed();
  const { res } = context;

  res.setHeader("content-type", "application/rss+xml");
  res.write(feed.rss2());
  res.end();

  return {
    props: {},
  };
};

export default RssFeed;
