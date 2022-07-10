import { prisma } from "../../lib/helpers/prisma";
import { logServerError } from "../../lib/helpers/sentry";
import type { NextApiRequest, NextApiResponse } from "next";
import type { PageStats } from "../../types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.query?.slug) {
      return res.status(400).json({ message: "Missing `slug` parameter." });
    }

    // add one to this page's count and return the new number
    const result = await incrementPageHits(req.query.slug as string);

    // disable caching on both ends
    res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");

    // send result as JSON
    return res.status(200).json(result);
  } catch (error) {
    // extract just the error message to send back to client
    const message = error instanceof Error ? error.message : error;

    // log full error to console and sentry
    await logServerError(error);

    // 500 Internal Server Error
    return res.status(500).json({ message });
  }
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

export default handler;
