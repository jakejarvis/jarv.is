import { NextResponse } from "next/server";
import { prisma } from "../../lib/helpers/prisma";
import type { NextRequest } from "next/server";
import type { PageStats } from "../../types";

export const config = {
  runtime: "edge",
  regions: ["iad1"], // the vercel postgres database lives in DC
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextRequest) => {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ message: "Missing `slug` parameter." }, { status: 400 });
  }

  // add one to this page's count and return the new number
  return NextResponse.json(await incrementPageHits(slug), {
    status: 200,
    headers: {
      // disable caching on both ends. see:
      // https://vercel.com/docs/concepts/functions/edge-functions/edge-caching
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
    },
  });
};

const incrementPageHits = async (slug: string): Promise<PageStats> => {
  const { hits } = await prisma.hits.upsert({
    where: { slug },
    create: { slug },
    update: {
      hits: {
        increment: 1,
      },
    },
  });

  // send client the *new* hit count
  return { hits };
};
