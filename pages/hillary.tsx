import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import Title from "../components/Title/Title";
import Video from "../components/Video/Video";

import thumbnail from "../public/static/images/hillary/thumb.png";

const Hillary = () => (
  <>
    <NextSeo
      title="My Brief Apperance in Hillary Clinton's DNC Video"
      description="My brief apperance in one of Hillary Clinton's 2016 DNC convention videos on substance abuse."
      openGraph={{
        title: "My Brief Apperance in Hillary Clinton's DNC Video",
      }}
    />

    <Title>My Brief Apperance in Hillary Clinton's DNC Video</Title>
    <Content>
      <Video
        webm="/static/images/hillary/convention-720p.webm"
        mp4="/static/images/hillary/convention-720p.mp4"
        thumbnail={thumbnail.src}
        subs="/static/images/hillary/subs.en.vtt"
      />

      <p className="copyright">
        Video is property of{" "}
        <a href="https://www.hillaryclinton.com/" target="_blank" rel="noopener noreferrer">
          Hillary for America
        </a>
        , the{" "}
        <a href="https://democrats.org/" target="_blank" rel="noopener noreferrer">
          Democratic National Committee
        </a>
        , and{" "}
        <a href="https://cnnpressroom.blogs.cnn.com/" target="_blank" rel="noopener noreferrer">
          CNN / WarnerMedia
        </a>
        . &copy; 2016.
      </p>
    </Content>

    <style jsx>{`
      .copyright {
        text-align: center;
        font-size: 0.9em;
        line-height: 1.8;
        margin: 1.25em 1em 0.5em;
        color: var(--medium-light);
      }

      .copyright a {
        font-weight: 700;
      }
    `}</style>
  </>
);

export default Hillary;
