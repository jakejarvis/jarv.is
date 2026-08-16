import { NextResponse } from "next/server";

import { buildFeed } from "@/lib/build-feed";

export const GET = () => {
  const feed = buildFeed();

  return new NextResponse(feed.rss2(), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
};
