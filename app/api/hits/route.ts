import { NextResponse } from "next/server";
import { unstable_cache as cache } from "next/cache";
import { getViews as _getViews } from "@/lib/posts";
import { POSTS_DIR } from "@/lib/config/constants";

const getViews = cache(_getViews, undefined, {
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
  const views = await getViews();

  const total = {
    hits: Object.values(views).reduce((acc, curr) => acc + curr, 0),
  };
  const pages = Object.entries(views).map(([slug, hits]) => ({
    slug: `${POSTS_DIR}/${slug}`,
    hits,
  }));

  pages.sort((a, b) => b.hits - a.hits);

  return NextResponse.json({ total, pages });
};
