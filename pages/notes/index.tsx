import { NextSeo } from "next-seo";
import Content from "../../components/Content";
import NotesList from "../../components/NotesList";
import { getAllNotes } from "../../lib/helpers/parse-notes";
import { authorName } from "../../lib/config";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import type { NotesByYear } from "../../types";

const Notes = ({ notesByYear }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title="Notes"
        description={`Recent posts by ${authorName}.`}
        openGraph={{
          title: "Notes",
        }}
      />

      <Content>
        <NotesList notesByYear={notesByYear} />
      </Content>
    </>
  );
};

export const getStaticProps: GetStaticProps<{
  notesByYear: NotesByYear;
}> = async () => {
  // parse the year of each note and group them together
  const notes = await getAllNotes();
  const notesByYear: NotesByYear = {};

  notes.forEach((note) => {
    const year = new Date(note.date).getUTCFullYear();
    (notesByYear[year] || (notesByYear[year] = [])).push(note);
  });

  return {
    props: {
      notesByYear,
    },
  };
};

export default Notes;
