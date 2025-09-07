import { NextResponse } from "next/server";
import { unstable_cache as cache } from "next/cache";
import { getViewCounts as _getViewCounts } from "@/lib/views";

const getViewCounts = cache(_getViewCounts, undefined, {
  revalidate: 300, // 5 minutes
  tags: ["hits"],
});

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
  // note: while hits have been renamed to views in most places, this API shouldn't change due to it being snapshotted
  const views = await getViewCounts();

  const total = {
    hits: Object.values(views).reduce((acc, curr) => acc + curr, 0),
  };
  const pages = Object.entries(views).map(([slug, views]) => ({
    slug,
    hits: views,
  }));

  pages.sort((a, b) => b.hits - a.hits);

  return NextResponse.json({ total, pages });
};
