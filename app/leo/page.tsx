import PageTitle from "../../components/PageTitle";
import Link from "../../components/Link";
import Video from "../../components/Video";
import { addMetadata } from "../../lib/helpers/metadata";

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
      <PageTitle canonical="/leo">TheLab.mov</PageTitle>

      <Video src={["/static/leo/leo.webm", "/static/leo/leo.mp4", "/static/leo/subs.en.vtt"]} poster={thumbnail.src} />

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
