import Name from "./Name";
import Menu from "./Menu";

import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <Name />
      <Menu />
    </nav>
  </header>
);

export default Header;
