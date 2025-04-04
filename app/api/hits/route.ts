import { NextResponse } from "next/server";
import { unstable_cache as cache } from "next/cache";
import redis from "../../../lib/helpers/redis";

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
  const { total, pages } = await cache(
    async () => {
      // get all keys (aka slugs)
      const slugs = await redis.scan(0, {
        match: "hits:*",
        type: "string",
        // set an arbitrary yet generous upper limit, just in case...
        count: 99,
      });

      // get the value (number of hits) for each key (the slug of the page)
      const values = await redis.mget<string[]>(...slugs[1]);

      // pair the slugs with their hit values
      const pages = slugs[1].map((slug, index) => ({
        slug: slug.split(":").pop() as string, // remove the "hits:" prefix
        hits: parseInt(values[index], 10),
      }));

      // sort descending by hits
      pages.sort((a, b) => b.hits - a.hits);

      // calculate total hits
      const total = { hits: 0 };
      pages.forEach((page) => {
        // add these hits to running tally
        total.hits += page.hits;
      });

      return { total, pages };
    },
    undefined,
    {
      revalidate: 1800, // 30 minutes
      tags: ["hits"],
    }
  )();

  return NextResponse.json({ total, pages });
};
