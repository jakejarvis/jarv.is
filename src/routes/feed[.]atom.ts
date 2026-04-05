import { createFileRoute } from "@tanstack/react-router";

import { buildFeed } from "@/lib/build-feed";

export const Route = createFileRoute("/feed.atom")({
  server: {
    handlers: {
      GET: async () => {
        const feed = buildFeed();

        return new Response(feed.atom1(), {
          headers: {
            "content-type": "application/atom+xml; charset=utf-8",
          },
        });
      },
    },
  },
});
