import clsx from "clsx";
import Selfie from "../Selfie";
import Menu from "../Menu";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Header.module.css";

export type HeaderProps = ComponentPropsWithoutRef<"header">;

const Header = ({ className, ...rest }: HeaderProps) => {
  return (
    <header className={clsx(styles.header, className)} {...rest}>
      <nav className={styles.nav}>
        <Selfie />
        <Menu className={styles.menu} />
      </nav>
    </header>
  );
};

export default Header;
