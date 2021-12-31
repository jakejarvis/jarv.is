import dynamic from "next/dynamic";
import Link from "next/link";
import { HomeIcon, NotesIcon, ProjectsIcon, ContactIcon } from "../icons";

import styles from "./Menu.module.scss";

const menuItems = [
  {
    icon: <HomeIcon className={`icon ${styles.icon}`} />,
    text: "Home",
    href: "/",
  },
  {
    icon: <NotesIcon className={`icon ${styles.icon}`} />,
    text: "Notes",
    href: "/notes/",
  },
  {
    icon: <ProjectsIcon className={`icon ${styles.icon}`} />,
    text: "Projects",
    href: "/projects/",
  },
  {
    icon: <ContactIcon className={`icon ${styles.icon}`} />,
    text: "Contact",
    href: "/contact/",
  },
];

// ensure the theme toggle isn't evaluated server-side
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

export default function Menu() {
  return (
    <ul className={styles.menu}>
      {menuItems.map((item, index) => (
        <li key={index} className={styles.item}>
          <Link href={item.href} prefetch={false}>
            <a className={styles.link}>
              {item.icon} <span className={styles.text}>{item.text}</span>
            </a>
          </Link>
        </li>
      ))}
      <li className={`${styles.item} ${styles.theme_toggle}`}>
        <ThemeToggle className={styles.icon} />
      </li>
    </ul>
  );
}
