import { createFileRoute } from "@tanstack/react-router";
import { JsonLd } from "react-schemaorg";
import type { VideoObject } from "schema-dts";

import { PageTitle } from "@/components/layout/page-title";
import { Video } from "@/components/video";
import { createHead } from "@/lib/head";

import thumbnail from "../public/images/birthday/thumbnail.png";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://jarv.is";

const title = "🎉 Cranky Birthday Boy on VHS Tape 📼";
const description = "The origin of my hatred for the Happy Birthday song.";

export const Route = createFileRoute("/birthday")({
  head: () =>
    createHead({
      title,
      description,
      canonical: "/birthday",
    }),
  component: BirthdayPage,
});

function BirthdayPage() {
  return (
    <>
      <JsonLd<VideoObject>
        item={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: title,
          description,
          contentUrl:
            "https://ijyxfbpcm3itvdly.public.blob.vercel-storage.com/birthday-pavk1LBK4H6xF8ZWeR0oTcaabGuQ8T.webm",
          thumbnailUrl: `${BASE_URL}${thumbnail}`,
          embedUrl: `${BASE_URL}/birthday`,
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
        poster={thumbnail}
      />
    </>
  );
}
