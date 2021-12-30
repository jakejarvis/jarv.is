import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import Layout from "../components/Layout";
import Container from "../components/Container";
import PageTitle from "../components/page/PageTitle";
import RepositoryGrid from "../components/projects/RepositoryGrid";
import Loading from "../components/loading/Loading";
import { ProjectsIcon } from "../components/icons";

function Grid() {
  // start fetching repos from API immediately
  const { data, error } = useSWR("/api/projects/?sort=top&limit=12", fetcher);

  if (error) {
    return <div>error: {error.message}</div>;
  }

  // show spinning loading indicator if data isn't fetched yet
  if (!data) {
    return (
      <div>
        <Loading boxes={3} width={50} />
        <style jsx>{`
          div {
            text-align: center;
            margin: 2.5em auto;
          }
        `}</style>
      </div>
    );
  }

  // we have data!
  return <RepositoryGrid repos={data} />;
}

export default function Projects() {
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
        <Grid />
      </Container>
    </Layout>
  );
}
