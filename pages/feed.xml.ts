import { buildFeed } from "../lib/helpers/build-feed";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<Record<string, never>> = async (context) => {
  return buildFeed(context, "rss");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
