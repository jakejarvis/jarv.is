import { JsonLd } from "react-schemaorg";
import type { VideoObject } from "schema-dts";
import { PageTitle } from "@/components/layout/page-title";
import { Video } from "@/components/video";
import { env } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";

import thumbnail from "./thumbnail.png";

export const metadata = createMetadata({
  title: 'Facebook App on "The Lab with Leo Laporte"',
  description: "Powncer app featured in Leo Laporte's TechTV show.",
  canonical: "/leo",
  openGraph: {
    videos: [
      {
        url: "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/leo-uoCXHS9gViyRnQhr8CEGXFvj4VGh5Y.webm",
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
          "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/leo-uoCXHS9gViyRnQhr8CEGXFvj4VGh5Y.webm",
        thumbnailUrl: `${env.NEXT_PUBLIC_BASE_URL}${thumbnail.src}`,
        embedUrl: `${env.NEXT_PUBLIC_BASE_URL}/leo`,
        uploadDate: "2007-05-10T00:00:00Z",
        duration: "PT1M48S",
      }}
    />

    <PageTitle canonical="/leo">TheLab.mov</PageTitle>

    <Video
      src={[
        "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/leo-uoCXHS9gViyRnQhr8CEGXFvj4VGh5Y.webm",
        "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/leo-Blp1bsf872vuY05LuSw7fjZBHURWT1.mp4",
        "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/leo.en-TsoyI7XMA10Uaj8EFZV1bQ65At35gz.vtt",
      ]}
      poster={thumbnail.src}
    />

    <p className="mx-4 mt-5 mb-0 text-center text-muted-foreground text-sm leading-relaxed">
      Video is property of{" "}
      <a
        href="https://web.archive.org/web/20070511004304/www.g4techtv.ca"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold"
      >
        G4techTV Canada
      </a>{" "}
      &amp;{" "}
      <a
        href="https://leo.fm/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold"
      >
        Leo Laporte
      </a>
      . &copy; 2007 G4 Media, Inc.
    </p>
  </>
);

export default Page;
