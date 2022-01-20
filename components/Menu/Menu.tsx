import { memo } from "react";
import Link from "next/link";
import classNames from "classnames";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { HomeIcon, NotesIcon, ProjectsIcon, ContactIcon } from "../Icons";

import styles from "./Menu.module.css";

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

const Menu = () => (
  <ul className={styles.menu}>
    {links.map((link, index) => (
      <li key={index}>
        <Link href={link.href} prefetch={false}>
          <a className={styles.link}>
            {link.icon} <span>{link.text}</span>
          </a>
        </Link>
      </li>
    ))}

    <li className={styles.theme_toggle}>
      <ThemeToggle className={styles.icon} />
    </li>
  </ul>
);

export default memo(Menu);
