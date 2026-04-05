import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "react-schemaorg";
import type { VideoObject } from "schema-dts";

import thumbnail from "@/app/leo/thumbnail.png";
import { PageTitle } from "@/components/layout/page-title";
import { Video } from "@/components/video";
import { createHead } from "@/lib/head";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://jarv.is";

const title = 'Facebook App on "The Lab with Leo Laporte"';
const description = "Powncer app featured in Leo Laporte's TechTV show.";

export const Route = createFileRoute("/leo")({
  head: () =>
    createHead({
      title,
      description,
      canonical: "/leo",
    }),
  component: LeoPage,
});

function LeoPage() {
  return (
    <>
      <JsonLd<VideoObject>
        item={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: title,
          description,
          contentUrl:
            "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/leo-uoCXHS9gViyRnQhr8CEGXFvj4VGh5Y.webm",
          thumbnailUrl: `${BASE_URL}${thumbnail}`,
          embedUrl: `${BASE_URL}/leo`,
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
        poster={thumbnail}
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
        <a href="https://leo.fm/" target="_blank" rel="noopener noreferrer" className="font-bold">
          Leo Laporte
        </a>
        . &copy; 2007 G4 Media, Inc.
      </p>
    </>
  );
}
