import { NextResponse } from "next/server";
import redis from "../../../lib/helpers/redis";

export const dynamic = "force-static";
export const revalidate = 1800; // 30 mins

export const GET = async (): Promise<
  NextResponse<{
    total: {
      hits: number;
    };
    pages: Array<{
      slug: string;
      hits: number;
    }>;
  }>
> => {
  // get all keys (aka slugs)
  const slugs = await redis.scan(0, {
    type: "string",
    // set an arbitrary yet generous upper limit, just in case...
    count: 99,
  });

  // get the value (number of hits) for each key (the slug of the page) and pair them together
  const pages = await Promise.all(
    slugs[1].map(async (slug) => {
      const hits = (await redis.get(slug)) as number;
      return {
        slug,
        hits,
      };
    })
  );

  // sort by hits
  pages.sort((a, b) => b.hits - a.hits);

  // calculate total hits
  const total = { hits: 0 };
  pages.forEach((page) => {
    // add these hits to running tally
    total.hits += page.hits;
  });

  return NextResponse.json({ total, pages });
};
