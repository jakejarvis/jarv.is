import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import { HomeIcon, NotesIcon, ProjectsIcon, ContactIcon } from "../icons";

import meJpg from "../../public/static/images/me.jpg";

import styles from "./Header.module.css";

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

const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link href="/">
          <a className={styles.name}>
            <div className={styles.selfie}>
              <Image
                src={meJpg}
                alt="Photo of Jake Jarvis"
                width={70}
                height={70}
                quality={60}
                layout="intrinsic"
                priority
              />
            </div>
            <span>Jake Jarvis</span>
          </a>
        </Link>
      </div>

      <div className={styles.right}>
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
      </div>
    </nav>
  </header>
);

export default memo(Header);
