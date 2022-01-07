import Layout from "../components/Layout";
import Content from "../components/Content";
import PageTitle from "../components/page/PageTitle";
import Video from "../components/video/Video";

import thumbnail from "../public/static/images/leo/thumb.png";

const Leo = () => (
  <>
    <Layout
      title='Facebook App on "The Lab with Leo Laporte"'
      description="Powncer app featured in Leo Laporte's TechTV show."
    >
      <PageTitle title='Facebook App on "The Lab with Leo Laporte"' />
      <Content>
        <Video
          url={[
            { src: "/static/images/leo/leo.webm", type: "video/webm" },
            { src: "/static/images/leo/leo.mp4", type: "video/mp4" },
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
              tracks: [
                {
                  kind: "subtitles",
                  src: "/static/images/leo/subs.en.vtt",
                  srcLang: "en",
                  label: "English",
                  default: true,
                },
              ],
            },
          }}
          controls={true}
        />
        <p className="copyright">
          Video is property of{" "}
          <a
            href="https://web.archive.org/web/20070511004304/http://www.g4techtv.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            G4techTV Canada
          </a>{" "}
          &amp;{" "}
          <a href="https://leolaporte.com/" target="_blank" rel="noopener noreferrer">
            Leo Laporte
          </a>
          . &copy; 2007 G4 Media, Inc.
        </p>
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
      </Content>
    </Layout>
  </>
);

export default Leo;
