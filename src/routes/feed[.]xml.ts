import { createFileRoute } from "@tanstack/react-router";

import { buildFeed } from "@/lib/build-feed";

export const Route = createFileRoute("/feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const feed = buildFeed();

        return new Response(feed.rss2(), {
          headers: {
            "content-type": "application/rss+xml; charset=utf-8",
          },
        });
      },
    },
  },
});
