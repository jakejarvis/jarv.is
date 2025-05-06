// https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment
import "server-only";

import { env } from "@/lib/env";
import * as cheerio from "cheerio";
import { graphql } from "@octokit/graphql";
import type { Repository, User } from "@octokit/graphql-schema";

export const getContributions = async (): Promise<
  Array<{
    date: string;
    count: number;
    level: number;
  }>
> => {
  // thanks @grubersjoe! :) https://github.com/grubersjoe/github-contributions-api/blob/main/src/scrape.ts
  try {
    const response = await fetch(`https://github.com/users/${env.NEXT_PUBLIC_GITHUB_USERNAME}/contributions`, {
      headers: {
        referer: `https://github.com/${env.NEXT_PUBLIC_GITHUB_USERNAME}`,
        "x-requested-with": "XMLHttpRequest",
      },
      cache: "force-cache",
      next: {
        revalidate: 3600, // 1 hour
        tags: ["github-contributions"],
      },
    });

    const $ = cheerio.load(await response.text());

    const days = $(".js-calendar-graph-table .ContributionCalendar-day")
      .get()
      .sort((a, b) => {
        const dateA = a.attribs["data-date"] ?? "";
        const dateB = b.attribs["data-date"] ?? "";

        return dateA.localeCompare(dateB, "en");
      });

    const dayTooltips = $(".js-calendar-graph tool-tip")
      .toArray()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce<Record<string, any>>((map, elem) => {
        map[elem.attribs["for"]] = elem;
        return map;
      }, {});

    return days.map((day) => {
      const attr = {
        id: day.attribs["id"],
        date: day.attribs["data-date"],
        level: day.attribs["data-level"],
      };

      let count = 0;
      if (dayTooltips[attr.id]) {
        const text = dayTooltips[attr.id].firstChild;
        if (text) {
          const countMatch = text.data.trim().match(/^\d+/);
          if (countMatch) {
            count = parseInt(countMatch[0]);
          }
        }
      }

      const level = parseInt(attr.level);

      return {
        date: attr.date,
        count,
        level,
      };
    });
  } catch (error) {
    console.error("[/projects] Failed to fetch contributions:", error);
    return [];
  }
};

export const getRepos = async (): Promise<Repository[] | undefined> => {
  try {
    // https://docs.github.com/en/graphql/reference/objects#repository
    const { user } = await graphql<{ user: User }>(
      `
        query ($username: String!, $sort: RepositoryOrderField!, $limit: Int) {
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
        username: env.NEXT_PUBLIC_GITHUB_USERNAME,
        sort: "STARGAZERS",
        limit: 12,
        headers: {
          accept: "application/vnd.github.v3+json",
          authorization: `token ${env.GITHUB_TOKEN}`,
        },
        request: {
          // override fetch() to use next's extension to cache the response
          // https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options
          fetch: (url: string | URL | Request, options?: RequestInit) => {
            return fetch(url, {
              ...options,
              cache: "force-cache",
              next: {
                revalidate: 3600, // 1 hour
                tags: ["github-repos"],
              },
            });
          },
        },
      }
    );

    return user.repositories.edges?.map((edge) => edge!.node as Repository);
  } catch (error) {
    console.error("[/projects] Failed to fetch repositories:", error);
    return [];
  }
};
