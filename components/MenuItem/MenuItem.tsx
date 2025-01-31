import clsx from "clsx";
import Link from "../Link";
import type { IconType } from "react-icons";

import styles from "./MenuItem.module.css";

export type MenuItemProps = {
  Icon?: IconType;
  text?: string;
  href?: string;
  current?: boolean;
  className?: string;
};

const MenuItem = ({ Icon, text, href, current, className }: MenuItemProps) => {
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
        underline={false}
        aria-label={text}
      >
        {item}
      </Link>
    );
  }

  return item;
};

export default MenuItem;
