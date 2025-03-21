import { JsonLd } from "react-schemaorg";
import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import Video from "../../components/Video";
import { addMetadata } from "../../lib/helpers/metadata";
import { BASE_URL } from "../../lib/config/constants";
import type { VideoObject } from "schema-dts";

import thumbnail from "./thumbnail.png";

export const metadata = addMetadata({
  title: 'Facebook App on "The Lab with Leo Laporte"',
  description: "Powncer app featured in Leo Laporte's TechTV show.",
  alternates: {
    canonical: "/leo",
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
            "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/leo/leo-x4E4eG4YPo22KSTJuZwAk6fpNF1NgG.mp4",
          uploadDate: "2007-05-10T00:00:00Z",
          duration: "PT1M48S",
        }}
      />

      <PageTitle canonical="/leo">TheLab.mov</PageTitle>

      <Video
        src={[
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/leo/leo-lVkSAtUWCqQaDCMqo3SGcuBiSlNWod.webm",
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/leo/leo-x4E4eG4YPo22KSTJuZwAk6fpNF1NgG.mp4",
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/leo/subs.en-HRGnRBH8w8CEyM644OV3qmCdm9Aj61.vtt",
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
        <Link href="https://web.archive.org/web/20070511004304/www.g4techtv.ca" style={{ fontWeight: 700 }}>
          G4techTV Canada
        </Link>{" "}
        &amp;{" "}
        <Link href="https://leolaporte.com/" style={{ fontWeight: 700 }}>
          Leo Laporte
        </Link>
        . &copy; 2007 G4 Media, Inc.
      </p>
    </>
  );
};

export default Page;
