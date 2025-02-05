import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/helpers/prisma";
import type { PageStats } from "../../../types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest): Promise<NextResponse<PageStats>> {
  const slug = req.nextUrl.searchParams.get("slug");

  // extremely basic input validation.
  // TODO: actually check if the note exists before continuing (and allow pages other than notes).
  if (typeof slug !== "string" || !new RegExp(/^notes\/([A-Za-z0-9-]+)$/i).test(slug)) {
    // @ts-expect-error
    return NextResponse.json({ error: "Missing or invalid 'slug' parameter." }, { status: 400 });
  }

  // +1 hit!
  const { hits } = await prisma.hits.upsert({
    where: { slug },
    create: { slug },
    update: {
      hits: {
        increment: 1,
      },
    },
  });

  // add one to this page's count and return the new number
  return NextResponse.json({ hits });
}
