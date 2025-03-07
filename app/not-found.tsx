import Link from "../components/Link";
import Video from "../components/Video";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found",
  description: null,
  openGraph: {},
  alternates: {
    canonical: null,
  },
};

export default async function Page() {
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

      <h1>404: Page Not Found 😢</h1>

      <Link href="/">Go home?</Link>
    </div>
  );
}
