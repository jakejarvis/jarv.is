import Layout from "../../components/Layout";
import Container from "../../components/Container";
import List from "../../components/notes/List";
import { getAllNotes } from "../../lib/parse-notes";
import type { GetStaticProps } from "next";

const Notes = ({ notes }) => (
  <Layout>
    <Container title="Notes" description="Recent posts by Jake Jarvis.">
      <List notes={notes} />
    </Container>
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  const notes = getAllNotes();

  return {
    props: {
      notes,
    },
  };
};

export default Notes;
