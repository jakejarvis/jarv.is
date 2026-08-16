import { NextResponse } from "next/server";

import { buildFeed } from "@/lib/build-feed";

export const GET = () => {
  const feed = buildFeed();

  return new NextResponse(feed.atom1(), {
    headers: {
      "content-type": "application/atom+xml; charset=utf-8",
    },
  });
};
