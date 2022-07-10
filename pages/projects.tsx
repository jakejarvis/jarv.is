import { graphql } from "@octokit/graphql";
import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Link from "../components/Link";
import RepositoryCard from "../components/RepositoryCard";
import { OctocatOcticon } from "../components/Icons";
import { styled, theme } from "../lib/styles/stitches.config";
import { authorSocial } from "../lib/config";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { User, Repository } from "@octokit/graphql-schema";
import type { Project } from "../types";

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
  fill: theme.colors.text,
});

const Projects = ({ repos }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
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
          {repos.map((repo) => (
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
};

export const getStaticProps: GetStaticProps<{
  repos: Project[];
}> = async () => {
  // don't fail the entire site build if the required API key for this page is missing
  if (typeof process.env.GH_PUBLIC_TOKEN === "undefined" || process.env.GH_PUBLIC_TOKEN === "") {
    console.warn(`ERROR: I can't fetch any GitHub projects without "GH_PUBLIC_TOKEN" set! Skipping for now...`);

    return {
      notFound: true,
    };
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
      username: authorSocial.github,
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
