import Link from "next/link";
import classNames from "classnames";

import styles from "./MenuItem.module.css";

export type MenuItemProps = {
  href?: string;
  text?: string;
  current?: boolean;
  className?: string;

  // `any` avoids conflicts with @svgr/webpack, see: node_modules/next/image-types/global.d.ts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};

const MenuItem = ({ icon: Icon, href, text, current, className }: MenuItemProps) => {
  const linkContent = (
    <>
      <Icon className={classNames(styles.icon, className)} /> {text && <span className={styles.label}>{text}</span>}
    </>
  );

  // allow both navigational links and/or other interactive react components (e.g. the theme toggle)
  if (href) {
    return (
      <Link href={href} prefetch={false}>
        <a className={classNames(styles.link, current && styles.current, className)}>{linkContent}</a>
      </Link>
    );
  } else {
    return linkContent;
  }
};

export default MenuItem;
