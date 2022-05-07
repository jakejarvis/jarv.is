import NextLink from "next/link";
import isAbsoluteUrl from "is-absolute-url";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";
import type { LinkProps as NextLinkProps } from "next/link";

const FancyLink = styled("a", {
  color: "$link",
  textDecoration: "none",

  variants: {
    underline: {
      // fancy animated link underline effect (on by default)
      true: {
        // sets psuedo linear-gradient() for the underline's color; see stitches config for the weird calculation behind
        // the local `$$underline` variable.
        setUnderlineVar: { color: "$colors$linkUnderline" },
        backgroundImage: `linear-gradient($$underline, $$underline)`,
        backgroundPosition: "0% 100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "0% $underline",
        paddingBottom: "0.2rem",

        "@media (prefers-reduced-motion: no-preference)": {
          transition: "background-size 0.25s ease-in-out",
        },

        "&:hover": {
          backgroundSize: "100% $underline",
        },
      },
      false: {},
    },
  },
});

export type LinkProps = Omit<ComponentProps<typeof FancyLink>, "href"> &
  NextLinkProps & {
    underline?: boolean;
    forceNewWindow?: boolean;
  };

const Link = ({
  href,
  prefetch = false,
  passHref = true,
  target,
  rel,
  underline = true,
  forceNewWindow,
  ...rest
}: LinkProps) => {
  // this component auto-detects whether or not we should use a normal HTML anchor externally or next/link internally,
  // can be overridden with `forceNewWindow={true}`.
  const isExternal = isAbsoluteUrl(href.toString());

  if (forceNewWindow || isExternal) {
    return (
      <FancyLink
        href={href.toString()}
        target={target ?? "_blank"}
        rel={[rel, "noopener", isExternal ? "noreferrer" : ""].join(" ").trim()}
        underline={underline}
        {...rest}
      />
    );
  } else {
    return (
      <NextLink href={href} prefetch={prefetch} passHref={passHref}>
        <FancyLink target={target} rel={rel} underline={underline} {...rest} />
      </NextLink>
    );
  }
};

export default Link;
