import faunadb from "faunadb";
import pRetry from "p-retry";
import { getAllNotes } from "../../lib/helpers/parse-notes";
import { logServerError } from "../../lib/helpers/sentry";
import type { NextApiRequest, NextApiResponse } from "next";

type PageStats = {
  slug: string;
  hits: number;
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

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET || "",
      checkNewVersion: false, // https://github.com/fauna/faunadb-js/pull/504
    });
    const { slug } = req.query;

    if (slug) {
      // increment this page's hits. retry 3 times in case of Fauna "contended transaction" error:
      // https://sentry.io/share/issue/9c60a58211954ed7a8dfbe289bd107b5/
      const { hits } = await pRetry(() => incrementPageHits(slug, client), {
        onFailedAttempt: (error) => {
          console.warn(`Attempt ${error.attemptNumber} failed, trying again...`);
        },
        retries: 3,
      });

      // disable caching on both ends
      res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");

      // return in JSON format
      return res.status(200).json({ hits });
    } else {
      // return overall site stats if slug not specified
      const siteStats = await getSiteStats(client);

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
    return res.status(500).json({ success: false, message });
  }
};

const incrementPageHits = async (slug: string | string[], client: faunadb.Client): Promise<PageStats> => {
  const q = faunadb.query;
  const result: { data: PageStats } = await client.query(
    q.Let(
      {
        match: q.Match(q.Index("hits_by_slug"), slug),
      },
      q.If(
        q.Exists(q.Var("match")),
        q.Let(
          {
            ref: q.Select("ref", q.Get(q.Var("match"))),
            hits: q.ToInteger(q.Select("hits", q.Select("data", q.Get(q.Var("match"))))),
          },
          q.Update(q.Var("ref"), {
            data: {
              hits: q.Add(q.Var("hits"), 1),
            },
          })
        ),
        q.Create(q.Collection("hits"), {
          data: {
            slug,
            hits: 1,
          },
        })
      )
    )
  );

  // send client the *new* hit count
  return result.data;
};

const getSiteStats = async (client: faunadb.Client): Promise<SiteStats> => {
  const notes = await getAllNotes();
  const q = faunadb.query;

  const { data: pages }: { data: SiteStats["pages"] } = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("hits")), { size: 99 }),
      q.Lambda((x) => q.Select("data", q.Get(x)))
    )
  );

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

    // add these hits to running tally
    siteStats.total.hits += page.hits;

    return page;
  });

  // sort by hits (descending)
  siteStats.pages.sort((a, b) => (a.hits > b.hits ? -1 : 1));

  return siteStats;
};

export default handler;
