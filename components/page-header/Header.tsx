import Name from "./Name";
import Menu from "./Menu";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Name />
        <Menu />
      </nav>
    </header>
  );
}
