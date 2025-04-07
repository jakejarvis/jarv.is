import clsx from "clsx";
import Link from "../Link";
import type { ComponentPropsWithoutRef } from "react";
import type { LucideIcon } from "lucide-react";

import styles from "./MenuItem.module.css";

export type MenuItemProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  text?: string;
  href?: string;
  icon?: LucideIcon;
  current?: boolean;
};

const MenuItem = ({ text, href, icon, current, className, ...rest }: MenuItemProps) => {
  const Icon = icon;

  const item = (
    <>
      {Icon && <Icon size="1.25em" className={styles.icon} />}
      {text && <span className={styles.label}>{text}</span>}
    </>
  );

  // allow both navigational links and/or other interactive react components (e.g. the theme toggle)
  if (href) {
    return (
      <Link
        href={href}
        aria-label={text}
        plain
        className={clsx(styles.link, current && styles.current, className)}
        {...rest}
      >
        {item}
      </Link>
    );
  }

  return item;
};

export default MenuItem;
