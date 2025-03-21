import { JsonLd } from "react-schemaorg";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import Video from "../../components/Video";
import { addMetadata } from "../../lib/helpers/metadata";
import { BASE_URL } from "../../lib/config/constants";
import type { VideoObject } from "schema-dts";

import thumbnail from "./thumbnail.png";

export const metadata = addMetadata({
  title: "My Brief Apperance in Hillary Clinton's DNC Video",
  description: "My brief apperance in one of Hillary Clinton's 2016 DNC convention videos on substance abuse.",
  alternates: {
    canonical: "/hillary",
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
          thumbnailUrl: `${BASE_URL}${thumbnail.src}`,
          contentUrl:
            "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/hillary/convention-720p-YLGreYE59PzmPo4epB21HQG6jXgYL5.mp4",
          uploadDate: "2016-07-25T00:00:00Z",
          duration: "PT1M51S",
        }}
      />

      <PageTitle canonical="/hillary">HRC.mov</PageTitle>

      <Video
        src={[
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/hillary/convention-720p-JbNlxyfqE3nz4ACjtfbpbjcR2gOY89.webm",
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/hillary/convention-720p-YLGreYE59PzmPo4epB21HQG6jXgYL5.mp4",
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/hillary/subs.en-k2txNECkQvwxWP8DjfP6GPBPo20vnO.vtt",
        ]}
        poster={thumbnail.src}
        crossOrigin="anonymous"
      />

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
