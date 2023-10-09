import { prisma } from "../../lib/helpers/prisma";
import type { NextApiHandler } from "next";
import type { SiteStats } from "../../types";

const handler: NextApiHandler<SiteStats> = async (req, res) => {
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

  // let Vercel edge cache results for 15 mins
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=900, stale-while-revalidate");

  return res.status(200).json({ total, pages });
};

export default handler;
