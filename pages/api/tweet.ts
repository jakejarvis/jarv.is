import { NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextRequest) => {
  const tweetId = req.nextUrl.searchParams.get("id");

  if (typeof tweetId !== "string") {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  // https://react-tweet.vercel.app/twitter-theme/api-reference
  try {
    const tweet = await getTweet(tweetId);
    return NextResponse.json(
      { data: tweet ?? null },
      {
        status: tweet ? 200 : 404,
        headers: {
          // cache on edge for 12 hours
          "Cache-Control": "public, max-age=0, s-maxage=43200, stale-while-revalidate",
        },
      }
    );
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any
  ) {
    return NextResponse.json({ error: error.message ?? "Bad request." }, { status: 400 });
  }
};
