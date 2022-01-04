import * as Sentry from "@sentry/node";
import { getAllNotes } from "../../lib/parse-notes";
import pRetry from "p-retry";
import faunadb from "faunadb";
const q = faunadb.query;
import type { NextApiRequest, NextApiResponse } from "next";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || "",
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      return res.status(405).send(""); // 405 Method Not Allowed
    }

    const client = new faunadb.Client({
      secret: process.env.FAUNADB_SERVER_SECRET,
      checkNewVersion: false, // https://github.com/fauna/faunadb-js/pull/504
    });
    const { slug } = req.query;
    let result;

    if (!slug || slug === "/") {
      // return overall site stats if slug not specified
      result = await getSiteStats(client);

      // let Vercel edge cache results for 15 mins
      res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");
    } else {
      // increment this page's hits. retry 3 times in case of Fauna "contended transaction" error:
      // https://sentry.io/share/issue/9c60a58211954ed7a8dfbe289bd107b5/
      result = await pRetry(() => incrementPageHits(slug, client), {
        onFailedAttempt: (error) => {
          console.warn(`Attempt ${error.attemptNumber} failed, trying again...`);
        },
        retries: 3,
      });

      // disable caching on both ends
      res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    // log error to sentry, give it 2 seconds to finish sending
    Sentry.captureException(error);
    await Sentry.flush(2000);

    const message = error instanceof Error ? error.message : "Unknown error.";

    // 500 Internal Server Error
    return res.status(500).json({ success: false, message });
  }
};

const incrementPageHits = async (slug, client) => {
  const result = await client.query(
    q.Let(
      { match: q.Match(q.Index("hits_by_slug"), slug) },
      q.If(
        q.Exists(q.Var("match")),
        q.Let(
          {
            ref: q.Select("ref", q.Get(q.Var("match"))),
            hits: q.ToInteger(q.Select("hits", q.Select("data", q.Get(q.Var("match"))))),
          },
          q.Update(q.Var("ref"), { data: { hits: q.Add(q.Var("hits"), 1) } })
        ),
        q.Create(q.Collection("hits"), { data: { slug, hits: 1 } })
      )
    )
  );

  // send client the *new* hit count
  return result.data;
};

const getSiteStats = async (client) => {
  const notes = getAllNotes();
  const { data: pages } = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("hits")), { size: 99 }),
      q.Lambda((x) => q.Select("data", q.Get(x)))
    )
  );

  const stats = {
    total: { hits: 0 },
    pages,
  };

  pages.map((page: any) => {
    // match URLs from RSS feed with db to populate some metadata
    const match: any = notes.find((note) => `notes/${note.slug}` === page.slug);
    if (match) {
      page.title = match.title;
      page.url = match.permalink;
      page.date = match.date;
    }

    // add these hits to running tally
    stats.total.hits += page.hits;

    return page;
  });

  // sort by hits (descending)
  stats.pages.sort((a, b) => (a.hits > b.hits ? -1 : 1));

  return stats;
};

export default handler;