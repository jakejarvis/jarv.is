import Link from "../components/Link";
import Video from "../components/Video";
import type { Metadata } from "next";

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
      <Video
        src={["/static/not-found/angry-panda.webm", "/static/not-found/angry-panda.mp4"]}
        autoplay
        responsive={false}
        style={{
          maxWidth: "400px",
        }}
      />

      <h1 style={{ margin: "0.2em auto" }}>Page Not Found 😢</h1>

      <Link href="/">Go home?</Link>
    </div>
  );
};

export default Page;
