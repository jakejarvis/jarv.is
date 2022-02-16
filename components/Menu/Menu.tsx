import { memo } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import MenuItem from "../MenuItem/MenuItem";
import { menuItems } from "../../lib/config/menu";

import styles from "./Menu.module.css";

export type MenuProps = {
  className?: string;
};

const Menu = ({ className }: MenuProps) => {
  const router = useRouter();

  return (
    <ul className={classNames(styles.menu, className)}>
      {menuItems.map((item, index) => (
        <li key={index} className={styles.item}>
          {/* kinda weird/hacky way to determine if the *first part* of the current path matches this href */}
          <MenuItem {...item} current={item.href === `/${router.pathname.split("/")[1]}`} />
        </li>
      ))}
    </ul>
  );
};

export default memo(Menu);
