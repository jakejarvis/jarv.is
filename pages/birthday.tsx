import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/page/PageTitle";
import Video from "../components/video/Video";
import { TapeIcon } from "../components/icons";

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

    <PageTitle
      title={
        <>
          <TapeIcon /> 1996.MOV
        </>
      }
    />
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
