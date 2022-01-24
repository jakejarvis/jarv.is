import { memo } from "react";
import Link from "next/link";
import classNames from "classnames";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { HomeIcon, NotesIcon, ProjectsIcon, ContactIcon } from "../Icons";

import styles from "./Menu.module.css";

type Props = {
  className?: string;
};

const links = [
  {
    icon: <HomeIcon className={classNames("icon", styles.icon)} />,
    text: "Home",
    href: "/",
  },
  {
    icon: <NotesIcon className={classNames("icon", styles.icon)} />,
    text: "Notes",
    href: "/notes/",
  },
  {
    icon: <ProjectsIcon className={classNames("icon", styles.icon)} />,
    text: "Projects",
    href: "/projects/",
  },
  {
    icon: <ContactIcon className={classNames("icon", styles.icon)} />,
    text: "Contact",
    href: "/contact/",
  },
];

const Menu = ({ className }: Props) => (
  <ul className={classNames(styles.menu, className)}>
    {links.map((link, index) => (
      <li key={index} className={styles.menu_item}>
        <Link href={link.href} prefetch={false}>
          <a className={styles.link}>
            {link.icon} <span className={styles.label}>{link.text}</span>
          </a>
        </Link>
      </li>
    ))}

    <li className={classNames(styles.theme_toggle, styles.menu_item)}>
      <ThemeToggle className={styles.icon} />
    </li>
  </ul>
);

export default memo(Menu);
