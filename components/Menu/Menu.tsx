import { memo } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import MenuLink from "../MenuLink/MenuLink";
import { menuLinks } from "../../lib/config/menu";

import styles from "./Menu.module.css";

type MenuProps = {
  className?: string;
};

const Menu = ({ className }: MenuProps) => {
  const router = useRouter();

  return (
    <ul className={classNames(styles.menu, className)}>
      {menuLinks.map((link, index) => (
        <li key={index} className={styles.item}>
          {/* kinda weird/hacky way to determine if the *first part* of the current path matches this href */}
          <MenuLink {...link} current={link.href === `/${router.pathname.split("/")[1]}`} />
        </li>
      ))}
    </ul>
  );
};

export default memo(Menu);
