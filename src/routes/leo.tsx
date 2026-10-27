import { createFileRoute } from "@tanstack/react-router";
import type { VideoObject } from "schema-dts";

import thumbnail from "@/assets/leo-thumbnail.png";
import { PageTitle } from "@/components/layout/page-title";
import { Video } from "@/components/video";
import { createHead, jsonLd } from "@/lib/metadata";

const title = 'Facebook App on "The Lab with Leo Laporte"';
const description = "Powncer app featured in Leo Laporte's TechTV show.";
const webm =
  "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/leo-uoCXHS9gViyRnQhr8CEGXFvj4VGh5Y.webm";

export const Route = createFileRoute("/leo")({
  head: () =>
    createHead({
      title,
      description,
      canonical: "/leo",
      image: { url: "/leo/opengraph-image.png", width: 640, height: 360, type: "image/png" },
      openGraph: {
        video: { url: webm, type: "video/webm" },
      },
      jsonLd: [
        jsonLd<VideoObject>({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: title,
          description,
          contentUrl: webm,
          thumbnailUrl: `${import.meta.env.VITE_BASE_URL}${thumbnail}`,
          embedUrl: `${import.meta.env.VITE_BASE_URL}/leo`,
          uploadDate: "2007-05-10T00:00:00Z",
          duration: "PT1M48S",
        }),
      ],
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageTitle canonical="/leo">TheLab.mov</PageTitle>

      <Video
        src={[
          webm,
          "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/leo-Blp1bsf872vuY05LuSw7fjZBHURWT1.mp4",
          "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/leo.en-TsoyI7XMA10Uaj8EFZV1bQ65At35gz.vtt",
        ]}
        poster={thumbnail}
      />

      <p className="mx-4 mt-5 mb-0 text-center text-sm leading-relaxed text-muted-foreground">
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
        <a href="https://leo.fm/" target="_blank" rel="noopener noreferrer" className="font-bold">
          Leo Laporte
        </a>
        . &copy; 2007 G4 Media, Inc.
      </p>
    </>
  );
}
