import { NextSeo } from "next-seo";
import Link from "../components/Link";
import Video from "../components/Video";
import { styled, theme } from "../lib/styles/stitches.config";

const Center = styled("div", {
  textAlign: "center",
});

const H1 = styled("h1", {
  fontSize: "1.8em",
  fontWeight: 500,
  color: theme.colors.text,

  "@medium": {
    fontSize: "1.6em",
  },
});

const FourOhFour = () => {
  return (
    <>
      <NextSeo title="404 Not Found" />

      <Center>
        <Video
          src={{
            webm: "/static/images/angry-panda.webm",
            mp4: "/static/images/angry-panda.mp4",
          }}
          autoplay
          title="404s make panda angry..."
          responsive={false}
          style={{
            maxWidth: "400px",
          }}
        />

        <H1>404: Page Not Found 😢</H1>

        <Link href="/">Go home?</Link>
      </Center>
    </>
  );
};

export default FourOhFour;
