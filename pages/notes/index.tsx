import { NextSeo } from "next-seo";
import { format } from "date-fns";
import NotesList from "../../components/NotesList/NotesList";
import { getAllNotes } from "../../lib/parse-notes";
import type { GetStaticProps } from "next";

const Notes = ({ notesByYear }) => (
  <>
    <NextSeo
      title="Notes"
      description="Recent posts by Jake Jarvis."
      openGraph={{
        title: "Notes",
      }}
    />

    <NotesList notesByYear={notesByYear} />
  </>
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
