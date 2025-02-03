import Content from "../../components/Content";
import PageTitle from "../../components/PageTitle";
import Video from "../../components/Video";
import type { Metadata } from "next";

import thumbnail from "../../public/static/images/birthday/thumb.png";

export const metadata: Metadata = {
  title: "🎉 Cranky Birthday Boy on VHS Tape 📼",
  description: "The origin of my hatred for the Happy Birthday song.",
  openGraph: {
    title: "🎉 Cranky Birthday Boy on VHS Tape 📼",
    images: [thumbnail.src],
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
            image: thumbnail.src,
          }}
        />
      </Content>
    </>
  );
}
