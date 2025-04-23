import { env } from "../../lib/env";
import { JsonLd } from "react-schemaorg";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import Video from "../../components/Video";
import { createMetadata } from "../../lib/helpers/metadata";
import type { VideoObject } from "schema-dts";

import webm from "./convention.webm";
import mp4 from "./convention.mp4";
import subtitles from "./subs.en.vtt";
import thumbnail from "./thumbnail.png";

export const metadata = createMetadata({
  title: "My Brief Apperance in Hillary Clinton's DNC Video",
  description: "My brief apperance in one of Hillary Clinton's 2016 DNC convention videos on substance abuse.",
  canonical: "/hillary",
  openGraph: {
    videos: [
      {
        url: `${env.NEXT_PUBLIC_BASE_URL}${webm}`,
        type: "video/webm",
      },
    ],
  },
});

const Page = () => {
  return (
    <>
      <JsonLd<VideoObject>
        item={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: metadata.title as string,
          description: metadata.description as string,
          contentUrl: `${env.NEXT_PUBLIC_BASE_URL}${webm}`,
          thumbnailUrl: `${env.NEXT_PUBLIC_BASE_URL}${thumbnail.src}`,
          embedUrl: `${env.NEXT_PUBLIC_BASE_URL}/hillary`,
          uploadDate: "2016-07-25T00:00:00Z",
          duration: "PT1M51S",
        }}
      />

      <PageTitle canonical="/hillary">HRC.mov</PageTitle>

      <Video src={[webm, mp4, subtitles]} poster={thumbnail.src} />

      <p
        style={{
          textAlign: "center",
          fontSize: "0.9em",
          lineHeight: 1.8,
          margin: "1.25em 1em 0 1em",
          color: "var(--colors-medium-light)",
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
};

export default Page;
