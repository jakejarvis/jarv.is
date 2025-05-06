import { env } from "@/lib/env";
import { JsonLd } from "react-schemaorg";
import PageTitle from "@/components/layout/page-title";
import Link from "@/components/link";
import Video from "@/components/video";
import { createMetadata } from "@/lib/metadata";
import type { VideoObject } from "schema-dts";

import thumbnail from "./thumbnail.png";

export const metadata = createMetadata({
  title: "My Brief Apperance in Hillary Clinton's DNC Video",
  description: "My brief apperance in one of Hillary Clinton's 2016 DNC convention videos on substance abuse.",
  canonical: "/hillary",
  openGraph: {
    videos: [
      {
        url: "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/convention-ZTUBLwMcmOE8EJ4tNAhpCli4NAHKcG.webm",
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
          contentUrl:
            "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/convention-ZTUBLwMcmOE8EJ4tNAhpCli4NAHKcG.webm",
          thumbnailUrl: `${env.NEXT_PUBLIC_BASE_URL}${thumbnail.src}`,
          embedUrl: `${env.NEXT_PUBLIC_BASE_URL}/hillary`,
          uploadDate: "2016-07-25T00:00:00Z",
          duration: "PT1M51S",
        }}
      />

      <PageTitle canonical="/hillary">HRC.mov</PageTitle>

      <Video
        src={[
          "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/convention-ZTUBLwMcmOE8EJ4tNAhpCli4NAHKcG.webm",
          "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/convention-T6klrrArGL0IO4QPaloIiIH164UqUC.mp4",
          "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/convention.en-uHnecgVCrT9xA8EkzdEaeIwB0rHFC9.vtt",
        ]}
        poster={thumbnail.src}
      />

      <p className="text-muted-foreground mx-4 mt-5 mb-0 text-center text-sm leading-relaxed">
        Video is property of{" "}
        <Link href="https://www.hillaryclinton.com/" className="font-bold">
          Hillary for America
        </Link>
        , the{" "}
        <Link href="https://democrats.org/" className="font-bold">
          Democratic National Committee
        </Link>
        , and{" "}
        <Link href="https://cnnpressroom.blogs.cnn.com/" className="font-bold">
          CNN / WarnerMedia
        </Link>
        . &copy; 2016.
      </p>
    </>
  );
};

export default Page;
