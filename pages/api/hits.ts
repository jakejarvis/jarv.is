import { getAllNotes } from "../../lib/helpers/parse-notes";
import { prisma } from "../../lib/helpers/prisma";
import { logServerError } from "../../lib/helpers/sentry";
import type { NextApiRequest, NextApiResponse } from "next";

type PageStats = {
  slug: string;
  hits: number | bigint;
  title?: string;
  url?: string;
  date?: string;
};

type SiteStats = {
  total: {
    hits: number;
  };
  pages: PageStats[];
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      // 405 Method Not Allowed
      return res.status(405).end();
    }

    const { slug } = req.query;

    if (slug) {
      const { hits } = await incrementPageHits(slug as string);

      // disable caching on both ends
      res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");

      // return in JSON format
      return res.status(200).json({ hits });
    } else {
      // return overall site stats if slug not specified
      const siteStats = await getSiteStats();

      // let Vercel edge cache results for 15 mins
      res.setHeader("Cache-Control", "public, max-age=0, s-maxage=900, stale-while-revalidate");

      // return in JSON format
      return res.status(200).json(siteStats);
    }
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
  const pageHits = await prisma.hits.upsert({
    where: { slug },
    create: {
      slug,
    },
    update: {
      hits: {
        increment: 1,
      },
    },
  });

  // send client the *new* hit count
  return { slug, hits: Number(pageHits.hits) };
};

const getSiteStats = async (): Promise<SiteStats> => {
  const notes = await getAllNotes();
  const pages: SiteStats["pages"] = await prisma.hits.findMany({
    orderBy: [
      {
        hits: "desc",
      },
    ],
  });

  const siteStats: SiteStats = {
    total: { hits: 0 },
    pages,
  };

  pages.forEach((page) => {
    // match URLs from RSS feed with db to populate some metadata
    const match = notes.find((note) => `notes/${note.slug}` === page.slug);
    if (match) {
      page.title = match.title;
      page.url = match.permalink;
      page.date = match.date;
    }

    // fixes "TypeError: Do not know how to serialize a BigInt"
    page.hits = Number(page.hits);

    // add these hits to running tally
    siteStats.total.hits += page.hits;

    return page;
  });

  return siteStats;
};

export default handler;
