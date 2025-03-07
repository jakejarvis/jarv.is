import clsx from "clsx";
import Link from "../Link";
import Image from "../Image";
import Menu from "../Menu";
import config from "../../lib/config/constants";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Header.module.css";

import selfieJpg from "./selfie.jpg";

export type HeaderProps = ComponentPropsWithoutRef<"header">;

const Header = ({ className, ...rest }: HeaderProps) => {
  return (
    <header className={clsx(styles.header, className)} {...rest}>
      <nav className={styles.nav}>
        <Link href="/" rel="author" title={config.authorName} plain className={styles.selfieLink}>
          <Image
            src={selfieJpg}
            alt={`Photo of ${config.authorName}`}
            className={styles.selfieImage}
            width={70}
            height={70}
            quality={60}
            placeholder="empty"
            inline
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
