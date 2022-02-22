import { NextSeo } from "next-seo";
import { format } from "date-fns";
import Content from "../../components/Content/Content";
import NotesList, { NotesListProps } from "../../components/NotesList/NotesList";
import { getAllNotes } from "../../lib/parse-notes";
import type { GetStaticProps } from "next";

const Notes = ({ notesByYear }: NotesListProps) => (
  <>
    <NextSeo
      title="Notes"
      description="Recent posts by Jake Jarvis."
      openGraph={{
        title: "Notes",
      }}
    />

    <Content>
      <NotesList notesByYear={notesByYear} />
    </Content>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  // parse the year of each note and group them together
  const notesByYear: NotesListProps["notesByYear"] = {};

  getAllNotes().map((note) => {
    const year = format(new Date(note.date), "yyyy");
    (notesByYear[year] || (notesByYear[year] = [])).push(note);
  });

  return {
    props: {
      notesByYear,
    },
  };
};

export default Notes;
