import { NextResponse } from "next/server";
import redis from "../../../lib/helpers/redis";

export const revalidate = 900; // 15 mins

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
  const slugs = await redis.scan(0, {
    count: 50,
  });

  // fetch all rows from db sorted by most hits
  const data = await Promise.all(
    slugs[1].map(async (slug) => {
      const hits = (await redis.get(slug)) as number;
      return {
        slug,
        hits,
      };
    })
  );

  // sort by hits
  data.sort((a, b) => b.hits - a.hits);

  // calculate total hits
  const total = { hits: 0 };
  data.forEach((page) => {
    // add these hits to running tally
    total.hits += page.hits;
  });

  return NextResponse.json({ total, pages: data });
};
