import { buildFeed } from "../lib/build-feed";
import type { GetServerSideProps } from "next";

const AtomFeed = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const feed = buildFeed();
  const { res } = context;

  res.setHeader("content-type", "application/atom+xml; charset=utf-8");
  // cache on edge for one hour
  res.setHeader("cache-control", "s-maxage=3600, stale-while-revalidate");
  res.write(feed.atom1());
  res.end();

  return {
    props: {},
  };
};

export default AtomFeed;
