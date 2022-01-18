import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import Title from "../components/Title/Title";
import Video from "../components/Video/Video";
import { TapeIcon } from "../components/Icons";

import thumbnail from "../public/static/images/birthday/thumb.png";

const Birthday = () => (
  <>
    <NextSeo
      title="🎉 Cranky Birthday Boy on VHS Tape 📼"
      description="The origin of my hatred for the Happy Birthday song."
      openGraph={{
        title: "🎉 Cranky Birthday Boy on VHS Tape 📼",
      }}
    />

    <Title>
      <TapeIcon /> 1996.MOV
    </Title>

    <Content>
      <Video
        webm="/static/images/birthday/birthday.webm"
        mp4="/static/images/birthday/birthday.mp4"
        thumbnail={thumbnail.src}
      />
    </Content>
  </>
);

export default Birthday;
