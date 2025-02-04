import Content from "../../components/Content";
import PostsList from "../../components/PostsList";
import { getAllPosts } from "../../lib/helpers/posts";
import config from "../../lib/config";
import type { PostsByYear } from "../../types";
import { metadata as defaultMetadata } from "../layout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: `Recent posts by ${config.authorName}.`,
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "Notes",
  },
  alternates: {
    ...defaultMetadata.alternates,
    canonical: "/notes",
  },
};

export default async function Page() {
  // parse the year of each note and group them together
  const notes = await getAllPosts();
  const notesByYear: PostsByYear = {};

  notes.forEach((note) => {
    const year = new Date(note.date).getUTCFullYear();
    (notesByYear[year] || (notesByYear[year] = [])).push(note);
  });

  return (
    <>
      <Content>
        <PostsList postsByYear={notesByYear} />
      </Content>
    </>
  );
}
