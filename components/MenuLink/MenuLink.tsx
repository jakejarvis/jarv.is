import classNames from "classnames/bind";
import Link from "next/link";
import { ReactNode } from "react";

import styles from "./MenuLink.module.css";
const cx = classNames.bind(styles);

type Props = {
  href: string;
  icon: ReactNode;
  text: string;
  current?: boolean;
  className?: string;
};

const MenuLink = ({ href, icon, text, current, className }: Props) => (
  <Link href={href} prefetch={false}>
    <a className={cx(styles.link, { current: !!current }, className)}>
      {icon} <span className={styles.label}>{text}</span>
    </a>
  </Link>
);

export default MenuLink;
