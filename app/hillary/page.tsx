import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import Video from "../../components/Video";
import { metadata as defaultMetadata } from "../layout";
import type { Metadata } from "next";

import thumbnail from "./thumbnail.png";

export const metadata: Metadata = {
  title: "My Brief Apperance in Hillary Clinton's DNC Video",
  description: "My brief apperance in one of Hillary Clinton's 2016 DNC convention videos on substance abuse.",
  openGraph: {
    ...defaultMetadata.openGraph,
    title: "My Brief Apperance in Hillary Clinton's DNC Video",
    images: [thumbnail.src],
    url: "/hillary",
  },
  alternates: {
    ...defaultMetadata.alternates,
    canonical: "/hillary",
  },
};

export default function Page() {
  return (
    <>
      <PageTitle canonical="/hillary">HRC.mov</PageTitle>

      <Video
        src={[
          "/static/hillary/convention-720p.webm",
          "/static/hillary/convention-720p.mp4",
          "/static/hillary/subs.en.vtt",
        ]}
        poster={thumbnail.src}
      />

      <p
        style={{
          textAlign: "center",
          fontSize: "0.9em",
          lineHeight: 1.8,
          margin: "1.25em 1em 0 1em",
          color: "var(--colors-mediumLight)",
        }}
      >
        Video is property of{" "}
        <Link href="https://www.hillaryclinton.com/" style={{ fontWeight: 700 }}>
          Hillary for America
        </Link>
        , the{" "}
        <Link href="https://democrats.org/" style={{ fontWeight: 700 }}>
          Democratic National Committee
        </Link>
        , and{" "}
        <Link href="https://cnnpressroom.blogs.cnn.com/" style={{ fontWeight: 700 }}>
          CNN / WarnerMedia
        </Link>
        . &copy; 2016.
      </p>
    </>
  );
}
