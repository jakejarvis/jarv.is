import { prisma } from "../../lib/helpers/prisma";
import { getAllNotes } from "../../lib/helpers/parse-notes";
import { logServerError } from "../../lib/helpers/sentry";
import { NOTES_DIR } from "../../lib/config/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import type { DetailedPageStats, SiteStats } from "../../types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // return overall site stats
    const result = await getSiteStats();

    // let Vercel edge cache results for 15 mins
    res.setHeader("Cache-Control", "public, max-age=0, s-maxage=900, stale-while-revalidate");

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

const getSiteStats = async (): Promise<SiteStats> => {
  // simultaneously fetch the entire hits db and notes from the filesystem
  const [hits, notes] = await Promise.all([
    prisma.hits.findMany({
      orderBy: [
        {
          hits: "desc",
        },
      ],
    }),
    getAllNotes(),
  ]);

  const pages: DetailedPageStats[] = [];
  const total = { hits: 0 };

  hits.forEach((record) => {
    // match slugs from getAllNotes() with db results to populate some metadata
    // TODO: add support for pages other than notes.
    const match = notes.find((note) => `${NOTES_DIR}/${note.slug}` === record.slug);

    // don't reveal via API if the db entry doesn't belong to a valid page
    if (!match) {
      return;
    }

    // merge record with its matching front matter data
    pages.push({
      ...record,
      title: match.title,
      url: match.permalink,
      date: match.date,
    });

    // add these hits to running tally
    total.hits += record.hits;
  });

  return { total, pages };
};

export default handler;
