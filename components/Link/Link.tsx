import NextLink from "next/link";
import isAbsoluteUrl from "is-absolute-url";
import { styled } from "../../stitches.config";
import type { Ref } from "react";
import type { LinkProps as NextLinkProps } from "next/link";

const FancyLink = styled("a", {
  color: "$link",
  textDecoration: "none",
  transition: "background-size 0.25s ease-in-out, color 0.25s ease, border 0.25s ease",
  fancyUnderline: {},
});

export type CustomLinkProps = Omit<JSX.IntrinsicElements["a"], "href"> &
  NextLinkProps & {
    forceNewWindow?: boolean;
    // LegacyRef bug fix:
    ref?: Ref<HTMLAnchorElement>;
  };

const CustomLink = ({
  href,
  prefetch = false,
  passHref = true,
  target,
  rel,
  forceNewWindow,
  className,
  ...rest
}: CustomLinkProps) => {
  // this component auto-detects whether or not we should use a normal HTML anchor externally or next/link internally,
  // can be overridden with `forceNewWindow={true}`.
  if (forceNewWindow || isAbsoluteUrl(href.toString())) {
    return (
      <FancyLink
        href={href.toString()}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        className={className}
        {...rest}
      />
    );
  } else {
    return (
      <NextLink href={href} prefetch={prefetch} passHref={passHref}>
        <FancyLink className={className} {...rest} />
      </NextLink>
    );
  }
};

export default CustomLink;
