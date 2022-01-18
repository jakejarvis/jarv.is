import { memo } from "react";
import Name from "../Name/Name";
import Menu from "../Menu/Menu";

import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div className={styles.name}>
        <Name />
      </div>

      <div className={styles.menu}>
        <Menu />
      </div>
    </nav>
  </header>
);

export default memo(Header);
