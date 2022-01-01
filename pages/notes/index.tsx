import { format, parseISO } from "date-fns";
import groupBy from "lodash.groupby";
import Layout from "../../components/Layout";
import Container from "../../components/Container";
import List from "../../components/notes/List";
import { getAllNotes } from "../../lib/parse-notes";
import type { GetStaticProps } from "next";

export default function Notes({ notesByYear }) {
  return (
    <>
      <Layout>
        <Container title="Notes" description="Recent posts by Jake Jarvis.">
          <List notesByYear={notesByYear} />
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allNotes = getAllNotes(["date", "slug", "title"]);

  // parse year of each note
  allNotes.map((note: any) => (note.year = parseInt(format(parseISO(note.date), "yyyy"))));

  return {
    props: {
      notesByYear: groupBy(allNotes, "year"),
    },
  };
};
