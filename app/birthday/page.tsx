import { JsonLd } from "react-schemaorg";
import type { VideoObject } from "schema-dts";

import { PageTitle } from "@/components/layout/page-title";
import { Video } from "@/components/video";
import { createMetadata } from "@/lib/metadata";

import thumbnail from "./thumbnail.png";

export const metadata = createMetadata({
  title: "🎉 Cranky Birthday Boy on VHS Tape 📼",
  description: "The origin of my hatred for the Happy Birthday song.",
  canonical: "/birthday",
  openGraph: {
    videos: [
      {
        url: "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/birthday-pavk1LBK4H6xF8ZWeR0oTcaabGuQ8T.webm",
        type: "video/webm",
      },
    ],
  },
});

const Page = () => (
  <>
    <JsonLd<VideoObject>
      item={{
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: metadata.title as string,
        description: metadata.description as string,
        contentUrl:
          "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/birthday-pavk1LBK4H6xF8ZWeR0oTcaabGuQ8T.webm",
        thumbnailUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${thumbnail.src}`,
        embedUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/birthday`,
        uploadDate: "1996-02-06T00:00:00Z",
        duration: "PT6M10S",
      }}
    />

    <PageTitle canonical="/birthday">1996.mov</PageTitle>

    <Video
      src={[
        "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/birthday-pavk1LBK4H6xF8ZWeR0oTcaabGuQ8T.webm",
        "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/birthday-EkbYbrKY8reheQ4UPcP22ipzpMZ2MC.mp4",
      ]}
      poster={thumbnail.src}
    />
  </>
);

export default Page;
