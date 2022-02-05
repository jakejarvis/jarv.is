import { memo } from "react";
import classNames from "classnames";
import Selfie from "../Selfie/Selfie";
import Menu from "../Menu/Menu";
import type { HTMLAttributes } from "react";

import styles from "./Header.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

const Header = ({ className }: Props) => (
  <header className={classNames(styles.header, className)}>
    <nav className={styles.nav}>
      <Selfie className={styles.selfie} />
      <Menu className={styles.menu} />
    </nav>
  </header>
);

export default memo(Header);
