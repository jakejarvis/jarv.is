import classNames from "classnames/bind";
import Link from "next/link";
import { ReactNode } from "react";

import styles from "./MenuLink.module.css";
const cx = classNames.bind(styles);

type Props = {
  href: string;
  icon: ReactNode;
  text: string;
  active?: boolean;
  className?: string;
};

const MenuLink = ({ href, icon, text, active, className }: Props) => (
  <Link href={href} prefetch={false}>
    <a className={cx(styles.link, { active: active }, className)}>
      {icon} <span className={styles.label}>{text}</span>
    </a>
  </Link>
);

export default MenuLink;
