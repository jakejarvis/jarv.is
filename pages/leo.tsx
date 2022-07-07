import { NextSeo } from "next-seo";
import Content from "../components/Content";
import PageTitle from "../components/PageTitle";
import Link from "../components/Link";
import Video from "../components/Video";
import { styled, theme } from "../lib/styles/stitches.config";

import thumbnail from "../public/static/images/leo/thumb.png";

const Copyright = styled("p", {
  textAlign: "center",
  fontSize: "0.9em",
  lineHeight: 1.8,
  margin: "1.25em 1em 0 1em",
  color: theme.colors.mediumLight,
});

const Leo = () => {
  return (
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
            vtt: "/static/images/leo/subs.en.vtt",
            image: thumbnail.src,
          }}
        />

        <Copyright>
          Video is property of{" "}
          <Link href="https://web.archive.org/web/20070511004304/www.g4techtv.ca" css={{ fontWeight: 700 }}>
            G4techTV Canada
          </Link>{" "}
          &amp;{" "}
          <Link href="https://leolaporte.com/" css={{ fontWeight: 700 }}>
            Leo Laporte
          </Link>
          . &copy; 2007 G4 Media, Inc.
        </Copyright>
      </Content>
    </>
  );
};

export default Leo;
