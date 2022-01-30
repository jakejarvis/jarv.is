import NextLink from "next/link";
import classNames from "classnames";
import isAbsoluteUrl from "is-absolute-url";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";
import type { LinkProps } from "next/link";

import styles from "./Link.module.css";

export type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  LinkProps &
  PropsWithChildren<{
    target?: string;
    rel?: string;
    forceNewWindow?: boolean;
    className?: string;
  }>;

const CustomLink = ({
  href,
  prefetch = false,
  passHref = true,
  target,
  rel,
  forceNewWindow,
  className,
  ...rest
}: Props) => {
  // this component auto-detects whether or not we should use a normal HTML anchor externally or next/link internally,
  // can be overridden with `forceNewWindow={true}`.
  if (forceNewWindow || isAbsoluteUrl(href.toString())) {
    return (
      <a
        href={href.toString()}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        className={classNames(styles.link, className)}
        {...rest}
      />
    );
  } else {
    return (
      <NextLink href={href} prefetch={prefetch} passHref={passHref}>
        <a className={classNames(styles.link, className)} {...rest} />
      </NextLink>
    );
  }
};

export default CustomLink;
