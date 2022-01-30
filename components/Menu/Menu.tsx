import { memo } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import MenuLink from "../MenuLink/MenuLink";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { HomeIcon, NotesIcon, ProjectsIcon, ContactIcon } from "../Icons";

import styles from "./Menu.module.css";

type Props = {
  className?: string;
};

const links = [
  {
    icon: <HomeIcon className={styles.icon} aria-hidden={true} />,
    text: "Home",
    href: "/",
  },
  {
    icon: <NotesIcon className={styles.icon} aria-hidden={true} />,
    text: "Notes",
    href: "/notes",
  },
  {
    icon: <ProjectsIcon className={styles.icon} aria-hidden={true} />,
    text: "Projects",
    href: "/projects",
  },
  {
    icon: <ContactIcon className={styles.icon} aria-hidden={true} />,
    text: "Contact",
    href: "/contact",
  },
];

const Menu = ({ className }: Props) => {
  const router = useRouter();

  return (
    <ul className={classNames(styles.menu, className)}>
      {links.map((link, index) => (
        <li key={index} className={styles.link}>
          {/* kinda weird/hacky way to determine if the *first part* of the current path matches this href */}
          <MenuLink {...link} current={link.href === `/${router.pathname.split("/")[1]}`} />
        </li>
      ))}

      <li className={styles.link}>
        <ThemeToggle className={styles.icon} />
      </li>
    </ul>
  );
};

export default memo(Menu);
