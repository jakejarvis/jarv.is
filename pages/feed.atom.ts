import { buildFeed } from "../lib/helpers/build-feed";
import type { GetServerSideFeedProps } from "../lib/helpers/build-feed";

export const getServerSideProps: GetServerSideFeedProps = async (context) => {
  return buildFeed(context, "atom");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
