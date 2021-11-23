import * as Sentry from "@sentry/node";
import { graphql } from "@octokit/graphql";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || "",
});

export default async (req, res) => {
  try {
    // permissive access control headers
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method !== "GET") {
      return res.status(405).send(); // 405 Method Not Allowed
    }

    // allow custom limit, max. 24 results
    let limit = 24;
    if (req.query.limit && req.query.limit > 0 && req.query.limit < limit) {
      limit = req.query.limit;
    }

    let result;
    if (typeof req.query.top !== "undefined") {
      // get most popular repos (/projects/?top)
      result = await fetchRepos("STARGAZERS", limit);
    } else {
      // default to latest repos
      result = await fetchRepos("PUSHED_AT", limit);
    }

    // let Vercel edge and browser cache results for 15 mins
    res.setHeader("Cache-Control", "public, max-age=900, s-maxage=900, stale-while-revalidate");

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

const fetchRepos = async (sort, limit) => {
  // https://docs.github.com/en/graphql/reference/objects#repository
  const { user } = await graphql(
    `
      query ($username: String!, $sort: String, $limit: Int) {
        user(login: $username) {
          repositories(
            first: $limit
            isLocked: false
            isFork: false
            ownerAffiliations: OWNER
            privacy: PUBLIC
            orderBy: { field: $sort, direction: DESC }
          ) {
            edges {
              node {
                name
                url
                description
                pushedAt
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
      }
    `,
    {
      username: "jakejarvis",
      limit: parseInt(limit, 10),
      sort,
      headers: {
        authorization: `token ${process.env.GH_PUBLIC_TOKEN}`,
      },
    }
  );

  return user.repositories.edges.map(({ node: repo }) => ({
    name: repo.name,
    url: repo.url,
    description: repo.description,
    updatedAt: new Date(repo.pushedAt),
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage,
  }));
};
