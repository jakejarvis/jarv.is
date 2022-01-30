import { graphql } from "@octokit/graphql";
import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import PageTitle from "../components/PageTitle/PageTitle";
import Link from "../components/Link/Link";
import RepositoryCard from "../components/RepositoryCard/RepositoryCard";
import type { GetStaticProps } from "next";
import type { RepoType } from "../types";

type Props = {
  repos: RepoType[];
};

const Projects = ({ repos }: Props) => (
  <>
    <NextSeo
      title="Projects"
      openGraph={{
        title: "Projects",
      }}
    />

    <PageTitle>💾 Projects</PageTitle>

    <Content>
      <div className="wrapper">
        {repos.map((repo: RepoType) => (
          <div key={repo.name} className="card">
            <RepositoryCard {...repo} />
          </div>
        ))}
      </div>

      <p className="view_more">
        <Link href="https://github.com/jakejarvis?tab=repositories">View more on GitHub...</Link>
      </p>
    </Content>

    <style jsx>{`
      .wrapper {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: flex-start;
        width: 100%;
        font-size: 1.1em;
        line-height: 1.1;
      }

      .card {
        flex-grow: 1;
        margin: 0.5em;
        width: 370px;
      }

      .view_more {
        text-align: center;
        margin-bottom: 0;
        font-size: 1.1em;
        font-weight: 500;
      }
    `}</style>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
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
      limit: 12,
      sort: "STARGAZERS",
      headers: {
        authorization: `token ${process.env.GH_PUBLIC_TOKEN}`,
      },
    }
  );

  const repos: RepoType[] = user.repositories.edges.map(({ node: repo }) => ({
    name: repo.name,
    url: repo.url,
    description: repo.description,
    updatedAt: repo.pushedAt,
    stars: repo.stargazerCount,
    forks: repo.forkCount,
    language: repo.primaryLanguage,
  }));

  return {
    props: {
      repos,
    },
    // fetch updated data and update page every 10 minutes (as needed)
    // https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
    revalidate: 600,
  };
};

export default Projects;
