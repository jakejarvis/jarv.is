import Link from "next/link";
import classNames from "classnames/bind";

import styles from "./MenuLink.module.css";
const cx = classNames.bind(styles);

export type MenuLinkProps = {
  href?: string;
  text?: string;
  current?: boolean;
  className?: string;

  // `any` avoids conflicts with @svgr/webpack, see: node_modules/next/image-types/global.d.ts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};

const MenuLink = ({ icon: Icon, href, text, current, className }: MenuLinkProps) => {
  // allow both navigational links and/or other interactive react components (e.g. the theme toggle)
  if (href) {
    return (
      <Link href={href} prefetch={false}>
        <a className={cx(styles.link, { current: !!current }, className)}>
          <Icon className={styles.icon} /> <span className={styles.label}>{text}</span>
        </a>
      </Link>
    );
  } else {
    return <Icon className={classNames(styles.icon, className)} />;
  }
};

export default MenuLink;
