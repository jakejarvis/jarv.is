import dynamic from "next/dynamic";
import Link from "next/link";
import { HomeIcon, NotesIcon, ProjectsIcon, ContactIcon } from "../icons";

import styles from "./Menu.module.scss";

// ensure the theme toggle isn't evaluated server-side
const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

const links = [
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

const Menu = () => (
  <ul className={styles.menu}>
    {links.map((link, index) => (
      <li key={index} className={styles.item}>
        <Link href={link.href} prefetch={false}>
          <a className={styles.link}>
            {link.icon} <span className={styles.text}>{link.text}</span>
          </a>
        </Link>
      </li>
    ))}
    <li className={`${styles.item} ${styles.theme_toggle}`}>
      <ThemeToggle className={styles.icon} />
    </li>
  </ul>
);

export default Menu;
