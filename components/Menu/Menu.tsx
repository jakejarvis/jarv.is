import { useRouter } from "next/router";
import clsx from "clsx";
import MenuItem from "../MenuItem";
import ThemeToggle from "../ThemeToggle";
import { menuItems } from "../../lib/config/menu";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Menu.module.css";

export type MenuProps = ComponentPropsWithoutRef<"ul">;

const Menu = ({ className, ...rest }: MenuProps) => {
  const router = useRouter();

  return (
    <ul className={clsx(styles.menu, className)} {...rest}>
      {menuItems.map((item, index) => {
        // kinda weird/hacky way to determine if the *first part* of the current path matches this href
        const isCurrent = item.href === `/${router.pathname.split("/")[1]}`;

        return (
          <li className={styles.menuItem} key={item.text || index}>
            <MenuItem {...item} current={isCurrent} />
          </li>
        );
      })}

      <li className={styles.menuItem}>
        <MenuItem Icon={ThemeToggle} />
      </li>
    </ul>
  );
};

export default Menu;
