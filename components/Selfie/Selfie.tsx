import { memo } from "react";
import NextLink from "next/link";
import NextImage from "next/image";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";

import selfieJpg from "../../public/static/images/selfie.jpg";

const ConstrainImage = styled("div", {
  width: "50px",
  height: "50px",
  lineHeight: 0,
  padding: 0,

  "@medium": {
    width: "70px",
    height: "70px",
  },
});

const Image = styled(NextImage, {
  border: "1px solid $light !important",
  borderRadius: "50%",

  "@medium": {
    borderWidth: "2px !important",
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
        borderColor: "$linkUnderline !important",
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
      <ConstrainImage>
        <Image
          src={selfieJpg}
          alt="Photo of Jake Jarvis"
          width={70}
          height={70}
          quality={60}
          layout="intrinsic"
          priority
        />
      </ConstrainImage>
      <Name>Jake Jarvis</Name>
    </Link>
  </NextLink>
);

export default memo(Selfie);
