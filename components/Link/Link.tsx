import NextLink from "next/link";
import isAbsoluteUrl from "is-absolute-url";
import { styled } from "../../lib/styles/stitches.config";
import type { ComponentProps } from "react";
import type { LinkProps as NextLinkProps } from "next/link";

const FancyLink = styled("a", {
  color: "$link",
  textDecoration: "none",

  variants: {
    // fancy animated link underline effect
    underline: {
      true: {
        // sets psuedo linear-gradient() for the underline's color; see stitches config for the weird calculation behind the
        // local `$$underline` variable.
        setUnderlineVar: { color: "$colors$linkUnderline" },
        backgroundImage: `linear-gradient($$underline, $$underline)`,
        backgroundPosition: "0% 100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "0% $underline",
        transition: "background-size 0.25s ease-in-out",
        paddingBottom: "0.2rem",

        "&:hover": {
          backgroundSize: "100% $underline",
        },
      },
    },
  },

  defaultVariants: {
    underline: true,
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
  const isExternal = isAbsoluteUrl(href.toString());

  if (forceNewWindow || isExternal) {
    return (
      <FancyLink
        href={href.toString()}
        target={target ?? "_blank"}
        rel={[rel, "noopener", isExternal ? "noreferrer" : ""].join(" ").trim()}
        {...rest}
      />
    );
  } else {
    return (
      <NextLink href={href} prefetch={prefetch} passHref={passHref}>
        <FancyLink target={target} rel={rel} {...rest} />
      </NextLink>
    );
  }
};

export default CustomLink;
