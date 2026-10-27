import { createFileRoute } from "@tanstack/react-router";

import { createFeedHandler } from "@/lib/feed.server";

export const Route = createFileRoute("/feed.xml")({
  server: {
    handlers: {
      GET: createFeedHandler("rss"),
    },
  },
});
