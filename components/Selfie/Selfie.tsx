import { memo } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

import selfieJpg from "../../public/static/images/selfie.jpg";

const Image = styled(NextImage, {
  display: "block",
  width: "50px",
  height: "50px",
  border: "1px solid $light",
  borderRadius: "50%",

  "@medium": {
    width: "70px",
    height: "70px",
    borderWidth: "2px",
  },
});

const Link = styled("a", {
  display: "inline-flex",
  alignItems: "center",
  color: "$mediumDark",
  textDecoration: "none",

  "&:hover": {
    color: "$link",

    "@medium": {
      [`${Image}`]: {
        borderColor: "$linkUnderline",
      },
    },
  },
});

const Name = styled("span", {
  margin: "0 0.6em",
  fontSize: "1.2em",
  fontWeight: 500,
  lineHeight: 1,

  "@medium": {
    display: "none",
  },
});

export type SelfieProps = ComponentProps<typeof Link>;

const Selfie = ({ ...rest }: SelfieProps) => (
  <NextLink href="/" passHref={true}>
    <Link {...rest}>
      <Image src={selfieJpg} alt="Photo of Jake Jarvis" width={50} height={50} quality={60} layout="raw" priority />
      <Name>Jake Jarvis</Name>
    </Link>
  </NextLink>
);

export default memo(Selfie);
