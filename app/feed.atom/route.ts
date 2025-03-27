import { buildFeed } from "../../lib/helpers/build-feed";

export const dynamic = "force-static";

export const GET = async () => {
  const feed = await buildFeed();

  return new Response(feed.atom1(), {
    headers: {
      "content-type": "application/atom+xml; charset=utf-8",
    },
  });
};
