import { prisma } from "../../lib/helpers/prisma";
import type { NextApiHandler } from "next";
import type { PageStats } from "../../types";

const handler: NextApiHandler<PageStats> = async (req, res) => {
  const { slug } = req.query;

  if (typeof slug !== "string" || slug === "") {
    // @ts-expect-error
    return res.status(400).json({ message: "Missing `slug` parameter." });
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

  // disable caching on both ends. see:
  // https://vercel.com/docs/concepts/functions/edge-functions/edge-caching
  res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");

  // add one to this page's count and return the new number
  return res.status(200).json({ hits });
};

export default handler;
