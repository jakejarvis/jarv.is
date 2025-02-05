import { graphql } from "@octokit/graphql";
import Content from "../../components/Content";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import RepositoryCard from "../../components/RepositoryCard";
import { SiGithub } from "react-icons/si";
import config from "../../lib/config";
import { metadata as defaultMetadata } from "../layout";
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
          {repos?.map((repo) => <RepositoryCard key={repo.name} className={styles.card} {...repo} />)}
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
