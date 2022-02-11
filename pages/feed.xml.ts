import { buildFeed } from "../lib/build-feed";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const feed = buildFeed();
  const { res } = context;

  res.setHeader("content-type", "application/rss+xml; charset=utf-8");
  // cache on edge for one hour
  res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");
  res.write(feed.rss2());
  res.end();

  return {
    props: {},
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
