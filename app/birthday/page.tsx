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

      <Video src={["/static/birthday/birthday.webm", "/static/birthday/birthday.mp4"]} poster={thumbnail.src} />
    </>
  );
};

export default Page;
