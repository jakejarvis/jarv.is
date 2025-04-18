"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import MenuItem from "../MenuItem";
import ThemeToggle from "../ThemeToggle";
import { menuItems } from "../../lib/config/menu";
import type { ComponentPropsWithoutRef } from "react";

import styles from "./Menu.module.css";

export type MenuProps = ComponentPropsWithoutRef<"ul">;

const Menu = ({ className, ...rest }: MenuProps) => {
  const pathname = usePathname() || "";

  return (
    <ul className={clsx(styles.menu, className)} {...rest}>
      {menuItems.map((item, index) => {
        // kinda weird/hacky way to determine if the *first part* of the current path matches this href
        const isCurrent = item.href === `/${pathname.split("/")[1]}`;

        return (
          <li className={styles.item} key={item.text || index}>
            <MenuItem {...item} current={isCurrent} />
          </li>
        );
      })}

      <li
        className={styles.item}
        style={{
          // manually align the theme toggle with the rest of the menu icons
          paddingTop: "0.2em",
        }}
      >
        <MenuItem
          // @ts-expect-error
          icon={ThemeToggle}
        />
      </li>
    </ul>
  );
};

export default Menu;
