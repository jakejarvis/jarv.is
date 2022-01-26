import { memo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames/bind";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { HomeIcon, NotesIcon, ProjectsIcon, ContactIcon } from "../Icons";

import styles from "./Menu.module.css";
const cx = classNames.bind(styles);

type Props = {
  className?: string;
};

const links = [
  {
    icon: <HomeIcon className={classNames("icon", styles.icon)} aria-hidden={true} />,
    text: "Home",
    href: "/",
  },
  {
    icon: <NotesIcon className={classNames("icon", styles.icon)} aria-hidden={true} />,
    text: "Notes",
    href: "/notes",
  },
  {
    icon: <ProjectsIcon className={classNames("icon", styles.icon)} aria-hidden={true} />,
    text: "Projects",
    href: "/projects",
  },
  {
    icon: <ContactIcon className={classNames("icon", styles.icon)} aria-hidden={true} />,
    text: "Contact",
    href: "/contact",
  },
];

const Menu = ({ className }: Props) => {
  const router = useRouter();

  return (
    <ul className={classNames(styles.menu, className)}>
      {links.map((link, index) => (
        <li key={index} className={styles.menu_item}>
          <Link href={link.href} prefetch={false}>
            <a className={cx(styles.link, { active: link.href === `/${router.pathname.split("/")[1]}` })}>
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
};

export default memo(Menu);
