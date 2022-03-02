import { graphql } from "@octokit/graphql";
import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import PageTitle from "../components/PageTitle/PageTitle";
import Link from "../components/Link/Link";
import RepositoryCard from "../components/RepositoryCard/RepositoryCard";
import { OctocatOcticon } from "../components/Icons";
import { styled } from "../lib/styles/stitches.config";
import { authorSocial } from "../lib/config";
import type { GetStaticProps } from "next";
import type { RepositoryType } from "../types";

const Wrapper = styled("div", {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  fontSize: "1.1em",
  lineHeight: 1.1,
});

const Card = styled(RepositoryCard, {
  flexGrow: 1,
  margin: "0.6em",
  width: "370px",
});

const ViewMore = styled("p", {
  textAlign: "center",
  marginBottom: 0,
  fontSize: "1.1em",
  fontWeight: 500,
});

const GitHubLogo = styled(OctocatOcticon, {
  width: "1.2em",
  height: "1.2em",
  verticalAlign: "-0.2em",
  margin: "0 0.15em",
  fill: "$text",
});

const Projects = ({ repos }) => (
  <>
    <NextSeo
      title="Projects"
      openGraph={{
        title: "Projects",
      }}
    />

    <PageTitle>💾 Projects</PageTitle>

    <Content>
      <Wrapper>
        {repos.map((repo: RepositoryType) => (
          <Card key={repo.name} {...repo} />
        ))}
      </Wrapper>

      <ViewMore>
        <Link href={`https://github.com/${authorSocial.github}`}>
          View more on <GitHubLogo /> GitHub...
        </Link>
      </ViewMore>
    </Content>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  // https://docs.github.com/en/graphql/reference/objects#repository
  const { user } = await graphql(
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
      username: authorSocial.github,
      sort: "STARGAZERS",
      limit: 12,
      headers: {
        authorization: `token ${process.env.GH_PUBLIC_TOKEN}`,
      },
    }
  );

  const repos: RepositoryType[] = user.repositories.edges.map(({ node: repo }) => ({
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
