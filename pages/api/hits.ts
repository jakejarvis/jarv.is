import { prisma } from "../../lib/helpers/prisma";
import { getAllNotes } from "../../lib/helpers/parse-notes";
import { logServerError } from "../../lib/helpers/sentry";
import type { NextApiRequest, NextApiResponse } from "next";
import type { PageStats, DetailedPageStats, SiteStats } from "../../types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      // 405 Method Not Allowed
      return res.status(405).end();
    }

    const { slug } = req.query;
    let data;

    if (slug) {
      // add one to this page's count and return the new number
      data = await incrementPageHits(slug as string);

      // disable caching on both ends
      res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
    } else {
      // return overall site stats if slug not specified
      data = await getSiteStats();

      // let Vercel edge cache results for 15 mins
      res.setHeader("Cache-Control", "public, max-age=0, s-maxage=900, stale-while-revalidate");
    }

    // send result as JSON
    return res.status(200).json(data);
  } catch (error) {
    // extract just the error message to send back to client
    const message = error instanceof Error ? error.message : "Unknown error.";

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

const getSiteStats = async (): Promise<SiteStats> => {
  const [pages, notes] = await Promise.all([
    prisma.hits.findMany({
      orderBy: [
        {
          hits: "desc",
        },
      ],
    }),
    getAllNotes(),
  ]);

  const total = { hits: 0 };

  pages.forEach((page: DetailedPageStats) => {
    // match URLs from RSS feed with db to populate some metadata
    const match = notes.find((note) => `notes/${note.slug}` === page.slug);

    if (match) {
      page.title = match.title;
      page.url = match.permalink;
      page.date = match.date;
    }

    // add these hits to running tally
    total.hits += page.hits;

    return page;
  });

  return { total, pages };
};

export default handler;
