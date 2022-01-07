import { format } from "date-fns";
import Layout from "../../components/Layout";
import List from "../../components/notes/List";
import { getAllNotes } from "../../lib/parse-notes";
import type { GetStaticProps } from "next";

const Notes = ({ notesByYear }) => (
  <Layout title="Notes" description="Recent posts by Jake Jarvis.">
    <List notesByYear={notesByYear} />
  </Layout>
);

export const getStaticProps: GetStaticProps = async () => {
  // parse the year of each note and group them together
  const notesByYear = {};
  getAllNotes().map((note) => {
    const year = parseInt(format(new Date(note.date), "yyyy"));
    (notesByYear[year] || (notesByYear[year] = [])).push(note);
  });

  return {
    props: {
      notesByYear,
    },
  };
};

export default Notes;
