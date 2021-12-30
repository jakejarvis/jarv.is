import dynamic from "next/dynamic";
import MenuItem from "./MenuItem";
import { HomeIcon, NotesIcon, ProjectsIcon, ContactIcon } from "../icons";

import styles from "./Menu.module.scss";

const menuItems = [
  {
    icon: <HomeIcon />,
    text: "Home",
    href: "/",
  },
  {
    icon: <NotesIcon />,
    text: "Notes",
    href: "/notes/",
  },
  {
    icon: <ProjectsIcon />,
    text: "Projects",
    href: "/projects/",
  },
  {
    icon: <ContactIcon />,
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
          <MenuItem {...item} />
        </li>
      ))}
      <li className={`${styles.item} ${styles.theme_toggle}`}>
        <ThemeToggle />
      </li>
    </ul>
  );
}
