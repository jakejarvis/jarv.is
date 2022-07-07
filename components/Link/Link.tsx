import NextLink from "next/link";
import { styled, theme } from "../../lib/styles/stitches.config";
import { baseUrl } from "../../lib/config";
import type { ComponentProps } from "react";

const StyledLink = styled(NextLink, {
  color: theme.colors.link,
  textDecoration: "none",

  variants: {
    underline: {
      // fancy animated link underline effect (on by default)
      true: {
        // sets psuedo linear-gradient() for the underline's color; see stitches config for the weird calculation behind
        // the local `$$underlineColor` variable.
        setUnderlineVars: {},

        backgroundImage: `linear-gradient($$underlineColor, $$underlineColor)`,
        backgroundPosition: "0% 100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: `0% ${theme.borderWidths.underline}`,
        paddingBottom: "0.2rem",

        "@media (prefers-reduced-motion: no-preference)": {
          transition: `background-size ${theme.transitions.linkHover}`,
        },

        "&:hover": {
          backgroundSize: `100% ${theme.borderWidths.underline}`,
        },
      },
      false: {},
    },
  },
});

export type LinkProps = ComponentProps<typeof StyledLink> & {
  openInNewTab?: boolean;
};

const Link = ({ href, rel, target, prefetch = false, underline = true, openInNewTab, ...rest }: LinkProps) => {
  // This component auto-detects whether or not this link should open in the same window (the default for internal
  // links) or a new tab (the default for external links). Defaults can be overridden with `openInNewTab={true}`.
  const isExternal =
    typeof href === "string" && !(href.startsWith("/") || href.startsWith("#") || href.startsWith(baseUrl));

  if (openInNewTab || isExternal) {
    return (
      <StyledLink
        href={href}
        target={target || "_blank"}
        rel={`${rel || ""} noopener ${isExternal ? "noreferrer" : ""}`.trim()}
        underline={underline}
        {...rest}
      />
    );
  }

  // If link is to an internal page, simply pass *everything* along as-is to next/link.
  return <StyledLink {...{ href, rel, target, prefetch, underline, ...rest }} />;
};

export default Link;
