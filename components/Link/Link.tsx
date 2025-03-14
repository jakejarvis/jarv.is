import NextLink from "next/link";
import clsx from "clsx";
import objStr from "obj-str";
import { BASE_URL } from "../../lib/config/constants";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Link.module.css";

export type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  plain?: boolean; // disable fancy text-decoration effect
  openInNewTab?: boolean;
};

const Link = ({ href, rel, target, prefetch = false, plain, openInNewTab, className, ...rest }: LinkProps) => {
  // This component auto-detects whether or not this link should open in the same window (the default for internal
  // links) or a new tab (the default for external links). Defaults can be overridden with `openInNewTab={true}`.
  const isExternal = typeof href === "string" && !(["/", "#"].includes(href[0]) || href.startsWith(BASE_URL));

  if (openInNewTab || isExternal) {
    return (
      <NextLink
        href={href}
        target={target || "_blank"}
        rel={objStr({
          [`${rel}`]: rel, // prepend whatever string is passed via optional `rel` prop
          noopener: true,
          noreferrer: isExternal, // don't add "noreferrer" if link isn't external, and only opening in a new tab
        })}
        prefetch={false}
        className={clsx(styles.link, plain && styles.plain, className)}
        {...rest}
      />
    );
  }

  // If link is to an internal page, simply pass *everything* along as-is to next/link.
  return (
    <NextLink
      className={clsx(styles.link, plain && styles.plain, className)}
      {...{ href, rel, target, prefetch, ...rest }}
    />
  );
};

export default Link;
