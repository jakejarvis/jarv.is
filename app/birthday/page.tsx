import PageTitle from "../../components/PageTitle";
import Video from "../../components/Video";
import { metadata as defaultMetadata } from "../layout";
import type { Metadata } from "next";

import thumbnail from "./thumbnail.png";

export const metadata: Metadata = {
  title: "🎉 Cranky Birthday Boy on VHS Tape 📼",
  description: "The origin of my hatred for the Happy Birthday song.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "🎉 Cranky Birthday Boy on VHS Tape 📼",
    images: [thumbnail.src],
    url: "/birthday",
  },
  alternates: {
    ...defaultMetadata.alternates,
    canonical: "/birthday",
  },
};

const Page = () => {
  return (
    <>
      <PageTitle canonical="/birthday">1996.mov</PageTitle>

      <Video src={["/static/birthday/birthday.webm", "/static/birthday/birthday.mp4"]} poster={thumbnail.src} />
    </>
  );
};

export default Page;
