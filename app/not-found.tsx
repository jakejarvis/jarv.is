import Image from "../components/Image";
import Link from "../components/Link";
import type { Metadata } from "next";

import notFoundGif from "./not-found.gif";

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
      <Image src={notFoundGif} alt="Angry panda" placeholder="empty" unoptimized />

      <h1 style={{ margin: "0.2em auto" }}>Page Not Found 😢</h1>

      <Link href="/">Go home?</Link>
    </div>
  );
};

export default Page;
