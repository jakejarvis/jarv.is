import { graphql } from "@octokit/graphql";
import Layout from "../components/Layout";
import Container from "../components/Container";
import PageTitle from "../components/page/PageTitle";
import RepositoryGrid from "../components/projects/RepositoryGrid";
import { ProjectsIcon } from "../components/icons";
import type { GetStaticProps } from "next";

export default function Projects({ repos }) {
  return (
    <Layout>
      <Container title="👨‍💻 Projects">
        <PageTitle
          title={
            <>
              <ProjectsIcon /> Projects
            </>
          }
        />
        <RepositoryGrid repos={repos} />
      </Container>
    </Layout>
  );
}

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

  const repos = user.repositories.edges.map(({ node: repo }) => ({
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
