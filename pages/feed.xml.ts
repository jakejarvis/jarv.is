import { buildFeed, GetServerSideFeedProps } from "../lib/helpers/build-feed";

export const getServerSideProps: GetServerSideFeedProps = async (context) => {
  return buildFeed(context, "rss");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
