import PageTitle from "../../components/PageTitle";
import Video from "../../components/Video";
import { addMetadata } from "../../lib/helpers/metadata";

import thumbnail from "./thumbnail.png";

export const metadata = addMetadata({
  title: "🎉 Cranky Birthday Boy on VHS Tape 📼",
  description: "The origin of my hatred for the Happy Birthday song.",
  alternates: {
    canonical: "/birthday",
  },
});

const Page = () => {
  return (
    <>
      <PageTitle canonical="/birthday">1996.mov</PageTitle>

      <Video
        src={[
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/birthday/birthday-9HG65MrSNWJjzg679VtirX7MLPpAaV.webm",
          "https://bcm6wnmyyzj1p5ls.public.blob.vercel-storage.com/videos/birthday/birthday-8iayCEy1jfEHpNGZkdBPvxPFOuGz0g.mp4",
        ]}
        poster={thumbnail.src}
        crossOrigin="anonymous"
      />
    </>
  );
};

export default Page;
