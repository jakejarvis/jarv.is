import Content from "../../components/Content";
import PageTitle from "../../components/PageTitle";
import Video from "../../components/Video";
import { metadata as defaultMetadata } from "../layout";
import type { Metadata } from "next";

import thumbnail from "../../public/static/images/birthday/thumb.png";

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

export default function Page() {
  return (
    <>
      <PageTitle>📼 1996.MOV</PageTitle>

      <Content>
        <Video
          src={{
            webm: "/static/images/birthday/birthday.webm",
            mp4: "/static/images/birthday/birthday.mp4",
          }}
          poster={thumbnail.src}
        />
      </Content>
    </>
  );
}
