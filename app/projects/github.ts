import "server-only";
import { graphql } from "@octokit/graphql";
import type { Repository, User } from "@octokit/graphql-schema";
import * as cheerio from "cheerio";
import { cacheLife } from "next/cache";

export const getContributions = async (): Promise<
  Array<{
    date: string;
    count: number;
    level: number;
  }>
> => {
  "use cache";
  cacheLife("minutes");

  // thanks @grubersjoe! :) https://github.com/grubersjoe/github-contributions-api/blob/main/src/scrape.ts
  try {
    const response = await fetch(
      `https://github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/contributions`,
      {
        headers: {
          referer: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`,
          "x-requested-with": "XMLHttpRequest",
        },
      },
    );

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
      .reduce<Record<string, any>>((map, elem) => {
        map[elem.attribs.for] = elem;
        return map;
      }, {});

    return days.map((day) => {
      const attr = {
        id: day.attribs.id,
        date: day.attribs["data-date"],
        level: day.attribs["data-level"],
      };

      let count = 0;
      if (dayTooltips[attr.id]) {
        const text = dayTooltips[attr.id].firstChild;
        if (text) {
          const countMatch = text.data.trim().match(/^\d+/);
          if (countMatch) {
            count = parseInt(countMatch[0], 10);
          }
        }
      }

      const level = parseInt(attr.level, 10);

      return {
        date: attr.date,
        count,
        level,
      };
    });
  } catch (error) {
    console.error("[server/github] Failed to fetch contributions:", error);
    return [];
  }
};

export const getRepos = async (): Promise<Repository[] | undefined> => {
  "use cache";
  cacheLife("minutes");

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
        username: process.env.NEXT_PUBLIC_GITHUB_USERNAME,
        sort: "STARGAZERS",
        limit: 24,
        headers: {
          accept: "application/vnd.github.v3+json",
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      },
    );

    return user.repositories.edges?.map((edge) => edge?.node as Repository);
  } catch (error) {
    console.error("[server/github] Failed to fetch repositories:", error);
    return [];
  }
};
