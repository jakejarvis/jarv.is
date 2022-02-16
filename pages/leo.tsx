import { NextSeo } from "next-seo";
import Content from "../components/Content/Content";
import PageTitle from "../components/PageTitle/PageTitle";
import Link from "../components/Link/Link";
import Video from "../components/Video/Video";

import thumbnail from "../public/static/images/leo/thumb.png";

const Leo = () => (
  <>
    <NextSeo
      title='Facebook App on "The Lab with Leo Laporte"'
      description="Powncer app featured in Leo Laporte's TechTV show."
      openGraph={{
        title: 'Facebook App on "The Lab with Leo Laporte"',
      }}
    />

    <PageTitle>Facebook App on "The Lab with Leo Laporte"</PageTitle>

    <Content>
      <Video
        src={{
          webm: "/static/images/leo/leo.webm",
          mp4: "/static/images/leo/leo.mp4",
        }}
        thumbnail={thumbnail.src}
        subs="/static/images/leo/subs.en.vtt"
      />

      <p className="copyright">
        Video is property of{" "}
        <Link href="https://web.archive.org/web/20070511004304/http://www.g4techtv.ca/" style={{ fontWeight: 700 }}>
          G4techTV Canada
        </Link>{" "}
        &amp;{" "}
        <Link href="https://leolaporte.com/" style={{ fontWeight: 700 }}>
          Leo Laporte
        </Link>
        . &copy; 2007 G4 Media, Inc.
      </p>
    </Content>

    <style jsx>{`
      .copyright {
        text-align: center;
        font-size: 0.9em;
        line-height: 1.8;
        margin: 1.25em 1em 0 1em;
        color: var(--medium-light);
      }
    `}</style>
  </>
);

export default Leo;
