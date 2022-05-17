import NextLink from "next/link";
import isAbsoluteUrl from "is-absolute-url";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";
import type { LinkProps as NextLinkProps } from "next/link";

const StyledLink = styled(NextLink, {
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

export type LinkProps = Omit<ComponentProps<typeof StyledLink>, "href"> &
  NextLinkProps & {
    underline?: boolean;
    forceNewWindow?: boolean;
  };

const Link = ({ href, prefetch = false, target, rel, underline = true, forceNewWindow, ...rest }: LinkProps) => {
  // this component auto-detects whether or not we should use a normal HTML anchor externally or next/link internally,
  // can be overridden with `forceNewWindow={true}`.
  const isExternal = isAbsoluteUrl(href.toString());

  if (forceNewWindow || isExternal) {
    return (
      <StyledLink
        href={href.toString()}
        target={target ?? "_blank"}
        rel={[rel, "noopener", isExternal ? "noreferrer" : ""].join(" ").trim()}
        underline={underline}
        {...rest}
      />
    );
  }

  return <StyledLink {...{ href, prefetch, target, rel, underline, ...rest }} />;
};

export default Link;
