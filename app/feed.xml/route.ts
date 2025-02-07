import { buildFeed } from "../../lib/helpers/build-feed";

export const dynamic = "force-static";

export const GET = async () => {
  return new Response(await buildFeed({ type: "rss" }), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
};
