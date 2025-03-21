import { JsonLd } from "react-schemaorg";
import PageTitle from "../../components/PageTitle";
import Video from "../../components/Video";
import { addMetadata } from "../../lib/helpers/metadata";
import { BASE_URL } from "../../lib/config/constants";
import type { VideoObject } from "schema-dts";

import thumbnail from "./thumbnail.png";

export const metadata = addMetadata({
  title: "🎉 Cranky Birthday Boy on VHS Tape 📼",
  description: "The origin of my hatred for the Happy Birthday song.",
  alternates: {
    canonical: "/birthday",
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
            "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/birthday/birthday-8iayCEy1jfEHpNGZkdBPvxPFOuGz0g.mp4",
          uploadDate: "1996-02-06T00:00:00Z",
          duration: "PT6M10S",
        }}
      />

      <PageTitle canonical="/birthday">1996.mov</PageTitle>

      <Video
        src={[
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/birthday/birthday-9HG65MrSNWJjzg679VtirX7MLPpAaV.webm",
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/birthday/birthday-8iayCEy1jfEHpNGZkdBPvxPFOuGz0g.mp4",
        ]}
        poster={thumbnail.src}
        crossOrigin="anonymous"
      />
    </>
  );
};

export default Page;
