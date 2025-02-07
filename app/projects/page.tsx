import { graphql } from "@octokit/graphql";
import Content from "../../components/Content";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import RelativeTime from "../../components/RelativeTime";
import commaNumber from "comma-number";
import config from "../../lib/config";
import { metadata as defaultMetadata } from "../layout";
import { GoStar, GoRepoForked } from "react-icons/go";
import { SiGithub } from "react-icons/si";
import type { Metadata } from "next";
import type { User, Repository } from "@octokit/graphql-schema";
import type { Project } from "../../types";

import styles from "./styles.module.css";

export const revalidate = 600; // 10 minutes

export const metadata: Metadata = {
  title: "Projects",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Projects",
    url: "/projects",
  },
  alternates: {
    ...defaultMetadata.alternates,
    canonical: "/projects",
  },
};

async function getRepos(): Promise<Project[] | null> {
  // don't fail the entire site build if the required API key for this page is missing
  if (!process.env.GH_PUBLIC_TOKEN || process.env.GH_PUBLIC_TOKEN === "") {
    console.warn(`ERROR: I can't fetch any GitHub projects without "GH_PUBLIC_TOKEN" set! Skipping for now...`);

    return null;
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
        authorization: `token ${process.env.GH_PUBLIC_TOKEN}`,
      },
    }
  );

  const results = user.repositories.edges as Array<{ node: Repository }>;

  const repos = results.map<Project>(({ node: repo }) => ({
    name: repo.name,
    url: repo.url,
    description: repo.description as string,
    updatedAt: repo.pushedAt,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage as Project["language"],
  }));

  return repos;
}

export default async function Page() {
  const repos = await getRepos();

  return (
    <>
      <PageTitle>💾 Projects</PageTitle>

      <Content>
        <div className={styles.grid}>
          {repos?.map((repo) => (
            <div key={repo.name} className={styles.card}>
              <Link
                // @ts-ignore
                href={repo.url}
                className={styles.name}
              >
                {repo.name}
              </Link>

              {repo.description && <p className={styles.description}>{repo.description}</p>}

              <div className={styles.meta}>
                {repo.language && (
                  <div className={styles.metaItem}>
                    {repo.language.color && (
                      <span className={styles.metaLanguage} style={{ backgroundColor: repo.language.color }} />
                    )}
                    {repo.language.name}
                  </div>
                )}

                {repo.stars && repo.stars > 0 && (
                  <div className={styles.metaItem}>
                    <Link
                      // @ts-ignore
                      href={`${repo.url}/stargazers`}
                      title={`${commaNumber(repo.stars)} ${repo.stars === 1 ? "star" : "stars"}`}
                      underline={false}
                      className={styles.metaLink}
                    >
                      <GoStar className={styles.metaIcon} />
                      {commaNumber(repo.stars)}
                    </Link>
                  </div>
                )}

                {repo.forks && repo.forks > 0 && (
                  <div className={styles.metaItem}>
                    <Link
                      // @ts-ignore
                      href={`${repo.url}/network/members`}
                      title={`${commaNumber(repo.forks)} ${repo.forks === 1 ? "fork" : "forks"}`}
                      underline={false}
                      className={styles.metaLink}
                    >
                      <GoRepoForked className={styles.metaIcon} />
                      {commaNumber(repo.forks)}
                    </Link>
                  </div>
                )}

                {/* only use relative "time ago" on client side, since it'll be outdated via SSG and cause hydration errors */}
                <div className={styles.metaItem}>
                  <RelativeTime date={repo.updatedAt} verb="Updated" staticFormat="MMM D, YYYY" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.viewMore}>
          <Link href={`https://github.com/${config.authorSocial.github}`}>
            View more on <SiGithub className={styles.githubIcon} /> GitHub...
          </Link>
        </p>
      </Content>
    </>
  );
}
