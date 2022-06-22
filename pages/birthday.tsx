import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Video from "../components/Video";

import thumbnail from "../public/static/images/birthday/thumb.png";

const Birthday = () => {
  return (
    <>
      <NextSeo
        title="🎉 Cranky Birthday Boy on VHS Tape 📼"
        description="The origin of my hatred for the Happy Birthday song."
        openGraph={{
          title: "🎉 Cranky Birthday Boy on VHS Tape 📼",
        }}
      />

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
};

export default Birthday;
