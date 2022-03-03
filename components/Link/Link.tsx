import NextLink from "next/link";
import isAbsoluteUrl from "is-absolute-url";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";
import type { LinkProps as NextLinkProps } from "next/link";

const FancyLink = styled("a", {
  color: "$link",
  textDecoration: "none",
  transition: "background-size 0.25s ease-in-out, color 0.25s ease, border 0.25s ease",

  backgroundPosition: "0% 100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "0% $underline",
  paddingBottom: "0.2rem",

  // sets psuedo linear-gradient() for cool underline effect
  backgroundGradientHack: {},

  "&:hover": {
    backgroundSize: "100% $underline",
  },
});

export type CustomLinkProps = Omit<ComponentProps<typeof FancyLink>, "href"> &
  NextLinkProps & {
    forceNewWindow?: boolean;
  };

const CustomLink = ({
  href,
  prefetch = false,
  passHref = true,
  target,
  rel,
  forceNewWindow,
  ...rest
}: CustomLinkProps) => {
  // this component auto-detects whether or not we should use a normal HTML anchor externally or next/link internally,
  // can be overridden with `forceNewWindow={true}`.
  if (forceNewWindow || isAbsoluteUrl(href.toString())) {
    return (
      <FancyLink href={href.toString()} target={target || "_blank"} rel={rel || "noopener noreferrer"} {...rest} />
    );
  } else {
    return (
      <NextLink href={href} prefetch={prefetch} passHref={passHref}>
        <FancyLink {...rest} />
      </NextLink>
    );
  }
};

export default CustomLink;
