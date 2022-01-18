import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import Title from "../components/Title/Title";
import Video from "../components/Video/Video";
import { TapeIcon } from "../components/helpers/icons";

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
        url={[
          { src: "/static/images/birthday/birthday.webm", type: "video/webm" },
          { src: "/static/images/birthday/birthday.mp4", type: "video/mp4" },
        ]}
        config={{
          // @ts-ignore
          file: {
            attributes: {
              poster: thumbnail.src,
              controlsList: "nodownload",
              preload: "metadata",
              autoPlay: false,
            },
          },
        }}
        controls={true}
      />
    </Content>
  </>
);

export default Birthday;
