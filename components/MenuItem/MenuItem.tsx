import clsx from "clsx";
import Link from "../Link";
import type { Route } from "next";
import type { IconType } from "react-icons";

import styles from "./MenuItem.module.css";

export type MenuItemProps = {
  text?: string;
  href?: Route;
  icon?: IconType;
  current?: boolean;
  className?: string;
};

const MenuItem = ({ text, href, icon, current, className }: MenuItemProps) => {
  const Icon = icon;

  const item = (
    <>
      {Icon && <Icon className={styles.icon} />}
      {text && <span className={styles.label}>{text}</span>}
    </>
  );

  // allow both navigational links and/or other interactive react components (e.g. the theme toggle)
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(styles.link, current && styles.current, className)}
        title={text}
        plain
        aria-label={text}
      >
        {item}
      </Link>
    );
  }

  return item;
};

export default MenuItem;
