import { memo } from "react";
import Selfie from "../Selfie/Selfie";
import Menu from "../Menu/Menu";

import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Selfie className={styles.selfie} />
      <Menu className={styles.menu} />
    </nav>
  </header>
);

export default memo(Header);
