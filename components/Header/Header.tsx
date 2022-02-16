import { memo } from "react";
import classNames from "classnames";
import Selfie from "../Selfie/Selfie";
import Menu from "../Menu/Menu";

import styles from "./Header.module.css";

export type HeaderProps = JSX.IntrinsicElements["header"] & {
  sticky?: boolean;
};

const Header = ({ sticky, className, ...rest }: HeaderProps) => (
  <header className={classNames(styles.header, sticky && styles.sticky, className)} {...rest}>
    <nav className={styles.nav}>
      <Selfie className={styles.selfie} />
      <Menu className={styles.menu} />
    </nav>
  </header>
);

export default memo(Header);
