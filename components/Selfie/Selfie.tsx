import Link from "../Link";
import Image from "../Image";
import { styled, theme } from "../../lib/styles/stitches.config";
import { authorName } from "../../lib/config";
import type { ComponentProps } from "react";

import selfieJpg from "../../public/static/images/selfie.jpg";

const CircleImage = styled(Image, {
  width: "50px",
  height: "50px",
  border: `1px solid ${theme.colors.light}`,
  borderRadius: "50%",

  "@medium": {
    width: "70px",
    height: "70px",
    borderWidth: "2px",
  },
});

const SelfieLink = styled(Link, {
  display: "inline-flex",
  alignItems: "center",
  color: theme.colors.mediumDark,

  "&:hover, &:focus-visible": {
    color: theme.colors.link,

    "@medium": {
      [`${CircleImage}`]: {
        borderColor: theme.colors.linkUnderline,
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

export type SelfieProps = Omit<ComponentProps<typeof Link>, "href">;

const Selfie = ({ ...rest }: SelfieProps) => {
  return (
    <SelfieLink href="/" rel="author" title={authorName} underline={false} {...rest}>
      <CircleImage
        src={selfieJpg}
        alt={`Photo of ${authorName}`}
        width={70}
        height={70}
        quality={60}
        placeholder="empty"
        inline
        priority
      />
      <Name>{authorName}</Name>
    </SelfieLink>
  );
};

export default Selfie;
