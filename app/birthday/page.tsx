import { JsonLd } from "react-schemaorg";
import PageTitle from "../../components/PageTitle";
import Video from "../../components/Video";
import { addMetadata } from "../../lib/helpers/metadata";
import { BASE_URL } from "../../lib/config/constants";
import type { VideoObject } from "schema-dts";

import mp4 from "./birthday.mp4";
import webm from "./birthday.webm";
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
          contentUrl: `${BASE_URL}${webm}`,
          thumbnailUrl: `${BASE_URL}${thumbnail.src}`,
          embedUrl: `${BASE_URL}/birthday`,
          uploadDate: "1996-02-06T00:00:00Z",
          duration: "PT6M10S",
        }}
      />

      <PageTitle canonical="/birthday">1996.mov</PageTitle>

      <Video src={[webm, mp4]} poster={thumbnail.src} />
    </>
  );
};

export default Page;
