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
    <div style={{ textAlign: "center" }}>
      <Video src={notFoundVideo} autoPlay style={{ maxWidth: 480, height: "auto" }} />

      <h1 style={{ margin: "0.6em auto 0.2em" }}>Page Not Found 😢</h1>

      <Link href="/">Go home?</Link>
    </div>
  );
};

export default Page;
