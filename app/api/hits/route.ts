import { NextResponse } from "next/server";
import { getViewCounts } from "@/lib/views";

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
