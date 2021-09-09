import * as Sentry from "@sentry/node";
import { graphql } from "@octokit/graphql";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  environment: process.env.NODE_ENV || process.env.VERCEL_ENV || "",
});

export default async (req, res) => {
  try {
    // some rudimentary error handling
    if (req.method !== "GET") {
      throw new Error(`Method ${req.method} not allowed.`);
    }
    if (!process.env.GH_PUBLIC_TOKEN) {
      throw new Error("GitHub API credentials aren't set.");
    }

    let result;
    if (typeof req.query.top !== "undefined") {
      // get most popular repos (/projects/?top)
      result = await fetchRepos("STARGAZERS");
    } else {
      // default to latest repos
      result = await fetchRepos("PUSHED_AT");
    }

    // let Vercel edge and browser cache results for 15 mins
    res.setHeader("Cache-Control", "public, max-age=900, s-maxage=900, stale-while-revalidate");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(200).json(result);
  } catch (error) {
    console.error(error);

    // log error to sentry, give it 2 seconds to finish sending
    Sentry.captureException(error);
    await Sentry.flush(2000);

    const message = error instanceof Error ? error.message : "Unknown error.";

    res.status(400).json({ success: false, message: message });
  }
};

const fetchRepos = async (sort) => {
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
      limit: 16,
      sort: sort,
      headers: {
        authorization: `token ${process.env.GH_PUBLIC_TOKEN}`,
      },
    }
  );

  const repos = user.repositories.edges.map(({ node: repo }) => ({
    name: repo.name,
    url: repo.url,
    description: repo.description,
    updatedAt: new Date(repo.pushedAt),
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage,
  }));

  return repos;
};
