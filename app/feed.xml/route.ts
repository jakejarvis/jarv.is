import { buildFeed } from "../../lib/helpers/build-feed";

export const dynamic = "force-static";

export const GET = async () => {
  const feed = await buildFeed();

  return new Response(feed.rss2(), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
};
