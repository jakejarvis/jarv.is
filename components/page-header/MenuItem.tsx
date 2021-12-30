import Link from "next/link";

import styles from "./MenuItem.module.scss";

type Props = {
  href: URL | string;
  icon: any;
  text: string;
};

export default function MenuItem({ href, icon, text }: Props) {
  return (
    <Link href={href} prefetch={false}>
      <a className={styles.item_link}>
        <span className={styles.item_icon}>{icon}</span>
        <span className={styles.item_text}>{text}</span>
      </a>
    </Link>
  );
}
