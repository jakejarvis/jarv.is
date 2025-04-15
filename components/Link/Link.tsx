import NextLink from "next/link";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Link.module.css";

export type LinkProps = ComponentPropsWithoutRef<typeof NextLink> & {
  /** Disables fancy text-decoration effect when true. */
  plain?: boolean;

  // https://github.com/vercel/next.js/pull/77866/files#diff-040f76a8f302dd3a8ec7de0867048475271f052b094cd73d2d0751b495c02f7dR30
  dynamicOnHover?: boolean;
};

const Link = ({ href, rel, target, prefetch = false, dynamicOnHover, plain, className, ...rest }: LinkProps) => {
  // This component auto-detects whether or not this link should open in the same window (the default for internal
  // links) or a new tab (the default for external links). Defaults can be overridden with `target="_blank"`.
  const isExternal = typeof href === "string" && !["/", "#"].includes(href[0]);

  return (
    <NextLink
      prefetch={dynamicOnHover ? null : prefetch}
      // @ts-expect-error
      unstable_dynamicOnHover={dynamicOnHover}
      href={href}
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
