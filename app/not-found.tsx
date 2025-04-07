import Video from "../components/Video";
import Link from "../components/Link";
import type { Metadata } from "next";

import notFoundVideo from "./not-found.mp4";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: null,
  openGraph: {},
  alternates: {
    canonical: null,
  },
};

const Page = () => {
  return (
    <>
      <Video src={notFoundVideo} autoPlay style={{ maxWidth: 480, aspectRatio: "16/11" }} />

      <div style={{ textAlign: "center", marginTop: "1.5em" }}>
        <h1 style={{ margin: "0.5em 0", fontSize: "2.2em", fontWeight: 500, lineHeight: 1 }}>Page Not Found</h1>

        <Link href="/" style={{ fontSize: "1.2em", fontWeight: 500 }}>
          Go home?
        </Link>
      </div>
    </>
  );
};

export default Page;
