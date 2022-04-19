import Image from "../components/Image";
import Link from "../components/Link";
import { styled } from "../lib/styles/stitches.config";

import pandaGif from "../public/static/images/angry-panda.gif";

const Center = styled("div", {
  textAlign: "center",
});

const H1 = styled("h1", {
  fontSize: "1.8em",
  fontWeight: 500,
  color: "$text",

  "@medium": {
    fontSize: "1.6em",
  },
});

const fourOhFour = () => {
  return (
    <Center>
      <Image src={pandaGif} alt="404s make panda angry..." priority />

      <H1>404: Page Not Found</H1>

      <Link href="/">Go home?</Link>
    </Center>
  );
};

export default fourOhFour;
