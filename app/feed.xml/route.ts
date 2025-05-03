import { NextResponse } from "next/server";
import { buildFeed } from "@/lib/build-feed";

export const dynamic = "force-static";

export const GET = async () => {
  const feed = await buildFeed();

  return new NextResponse(feed.rss2(), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
};
