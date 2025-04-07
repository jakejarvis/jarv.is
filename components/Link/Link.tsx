import NextLink from "next/link";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Link.module.css";

export type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  plain?: boolean; // disable fancy text-decoration effect
};

const Link = ({ href, rel, target, prefetch = false, plain, className, ...rest }: LinkProps) => {
  // This component auto-detects whether or not this link should open in the same window (the default for internal
  // links) or a new tab (the default for external links). Defaults can be overridden with `target="_blank"`.
  const isExternal = typeof href === "string" && !["/", "#"].includes(href[0]);

  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      target={target || (isExternal ? "_blank" : undefined)}
      rel={`${rel ? `${rel} ` : ""}${target === "_blank" || isExternal ? "noopener noreferrer" : ""}` || undefined}
      className={clsx(
        styles.link,
        // eslint-disable-next-line css-modules/no-undef-class
        plain && styles.plain,
        className
      )}
      {...rest}
    />
  );
};

export default Link;
