import { env } from "../../lib/env";
import { notFound } from "next/navigation";
import { graphql } from "@octokit/graphql";
import { GitForkIcon, StarIcon } from "lucide-react";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import RelativeTime from "../../components/RelativeTime";
import { addMetadata } from "../../lib/helpers/metadata";
import * as config from "../../lib/config";
import type { User } from "@octokit/graphql-schema";

import styles from "./page.module.css";

export const metadata = addMetadata({
  title: "Projects",
  description: `Most-starred repositories by @${config.authorSocial?.github} on GitHub`,
  alternates: {
    canonical: "/projects",
  },
});

const getRepos = async () => {
  // don't fail the entire site build if the required API key for this page is missing
  if (!env.GITHUB_TOKEN) {
    console.warn(`ERROR: I can't fetch any GitHub projects without "GITHUB_TOKEN" set! Disabling projects page.`);

    // just return a 404 since this page would be blank anyways
    notFound();
  }

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
      username: config.authorSocial.github,
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
              revalidate: 600, // 10 minutes
              tags: ["github-api"],
            },
          });
        },
      },
    }
  );

  return user.repositories.edges?.map((edge) => edge!.node);
};

const Page = async () => {
  const repos = await getRepos();

  return (
    <>
      <PageTitle canonical="/projects">Projects</PageTitle>

      <div className={styles.grid}>
        {repos?.map((repo) => (
          <div key={repo!.name} className={styles.card}>
            <Link href={repo!.url} className={styles.name}>
              {repo!.name}
            </Link>

            {repo!.description && <p className={styles.description}>{repo!.description}</p>}

            <div className={styles.meta}>
              {repo!.primaryLanguage && (
                <div className={styles.metaItem}>
                  {repo!.primaryLanguage.color && (
                    <span
                      className={styles.metaIcon}
                      style={{ backgroundColor: repo!.primaryLanguage.color, borderRadius: "50%" }}
                    />
                  )}
                  <span>{repo!.primaryLanguage.name}</span>
                </div>
              )}

              {repo!.stargazerCount > 0 && (
                <div className={styles.metaItem}>
                  <Link
                    href={`${repo!.url}/stargazers`}
                    title={`${Intl.NumberFormat(config.siteLocale || "en-US").format(repo!.stargazerCount)} ${repo!.stargazerCount === 1 ? "star" : "stars"}`}
                    plain
                    className={styles.metaLink}
                  >
                    <StarIcon size="1.25em" className={styles.metaIcon} />
                    <span>{Intl.NumberFormat(config.siteLocale || "en-US").format(repo!.stargazerCount)}</span>
                  </Link>
                </div>
              )}

              {repo!.forkCount > 0 && (
                <div className={styles.metaItem}>
                  <Link
                    href={`${repo!.url}/network/members`}
                    title={`${Intl.NumberFormat(config.siteLocale || "en-US").format(repo!.forkCount)} ${repo!.forkCount === 1 ? "fork" : "forks"}`}
                    plain
                    className={styles.metaLink}
                  >
                    <GitForkIcon size="1.25em" className={styles.metaIcon} />
                    <span>{Intl.NumberFormat(config.siteLocale || "en-US").format(repo!.forkCount)}</span>
                  </Link>
                </div>
              )}

              <div className={styles.metaItem}>
                <span
                  className={styles.metaIcon}
                  style={{
                    // invisible icon hack to fix line height
                    width: 0,
                    marginRight: 0,
                  }}
                />
                <span>
                  Updated <RelativeTime date={repo!.pushedAt} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          textAlign: "center",
          marginBottom: 0,
          fontWeight: 500,
        }}
      >
        <Link href={`https://github.com/${config.authorSocial.github}`}>
          View more on{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="1.2em"
            width="1.2em"
            style={{
              display: "inline",
              width: "1.2em",
              height: "1.2em",
              verticalAlign: "-0.2em",
              margin: "0 0.15em",
              fill: "var(--colors-text)",
            }}
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>{" "}
          GitHub...
        </Link>
      </p>
    </>
  );
};

export default Page;
