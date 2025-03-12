import { NextResponse } from "next/server";
import { prisma } from "../../../lib/helpers/prisma";
import type { hits as Hits } from "@prisma/client";

export const revalidate = 900; // 15 mins

export const GET = async (): Promise<
  NextResponse<{
    total: Pick<Hits, "hits">;
    pages: Hits[];
  }>
> => {
  // fetch all rows from db sorted by most hits
  const pages = await prisma.hits.findMany({
    orderBy: [
      {
        hits: "desc",
      },
    ],
  });

  const total = { hits: 0 };

  // calculate total hits
  pages.forEach((page) => {
    // add these hits to running tally
    total.hits += page.hits;
  });

  return NextResponse.json({ total, pages });
};
