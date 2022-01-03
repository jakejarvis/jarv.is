import { buildFeed } from "../lib/build-feed";
import type { GetServerSideProps } from "next";

const AtomFeed = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const feed = buildFeed();
  const { res } = context;

  res.setHeader("content-type", "application/atom+xml");
  res.write(feed.atom1());
  res.end();

  return {
    props: {},
  };
};

export default AtomFeed;
