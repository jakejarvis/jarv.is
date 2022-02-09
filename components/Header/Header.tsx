import { memo } from "react";
import classNames from "classnames";
import Selfie from "../Selfie/Selfie";
import Menu from "../Menu/Menu";

import styles from "./Header.module.css";

type HeaderProps = JSX.IntrinsicElements["div"];

const Header = ({ className }: HeaderProps) => (
  <header className={classNames(styles.header, className)}>
    <nav className={styles.nav}>
      <Selfie className={styles.selfie} />
      <Menu className={styles.menu} />
    </nav>
  </header>
);

export default memo(Header);
