import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "react-schemaorg";
import type { VideoObject } from "schema-dts";
import { PageTitle } from "@/components/layout/page-title";
import { Video } from "@/components/video";
import { createHead } from "@/lib/head";

import thumbnail from "@/app/hillary/thumbnail.png";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://jarv.is";

const title = "My Brief Apperance in Hillary Clinton's DNC Video";
const description =
  "My brief apperance in one of Hillary Clinton's 2016 DNC convention videos on substance abuse.";

export const Route = createFileRoute("/hillary")({
  head: () =>
    createHead({
      title,
      description,
      canonical: "/hillary",
    }),
  component: HillaryPage,
});

function HillaryPage() {
  return (
    <>
      <JsonLd<VideoObject>
        item={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: title,
          description,
          contentUrl:
            "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/convention-ZTUBLwMcmOE8EJ4tNAhpCli4NAHKcG.webm",
          thumbnailUrl: `${BASE_URL}${thumbnail}`,
          embedUrl: `${BASE_URL}/hillary`,
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
        poster={thumbnail}
      />

      <p className="mx-4 mt-5 mb-0 text-center text-muted-foreground text-sm leading-relaxed">
        Video is property of{" "}
        <a
          href="https://www.hillaryclinton.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Hillary for America
        </a>
        , the{" "}
        <a
          href="https://democrats.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Democratic National Committee
        </a>
        , and{" "}
        <a
          href="https://cnnpressroom.blogs.cnn.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          CNN / WarnerMedia
        </a>
        . &copy; 2016.
      </p>
    </>
  );
}
