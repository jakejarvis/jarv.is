import Image from "next/image";
import clsx from "clsx";
import Link from "../Link";
import Menu from "../Menu";
import * as config from "../../lib/config";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Header.module.css";

import avatarImg from "../../app/avatar.jpg";

export type HeaderProps = ComponentPropsWithoutRef<"header">;

const Header = ({ className, ...rest }: HeaderProps) => {
  return (
    <header className={clsx(styles.header, className)} {...rest}>
      <nav className={styles.nav}>
        <Link dynamicOnHover href="/" rel="author" aria-label={config.authorName} plain className={styles.home}>
          <Image
            src={avatarImg}
            alt={`Photo of ${config.authorName}`}
            className={styles.avatar}
            width={70}
            height={70}
            quality={50}
            priority
          />
          <span className={styles.name}>{config.authorName}</span>
        </Link>

        <Menu className={styles.menu} />
      </nav>
    </header>
  );
};

export default Header;
