import { getAllNotes } from "../lib/parse-notes";
import { buildFeed } from "../lib/build-feed";
import type { GetServerSideProps } from "next";

const AtomPage = () => null;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const notes = getAllNotes(["title", "date", "image", "slug", "description"]);
  const feed = buildFeed(notes);

  const { res } = context;
  res.setHeader("content-type", "application/atom+xml");
  res.write(feed.atom1());
  res.end();

  return {
    props: {},
  };
};

export default AtomPage;
