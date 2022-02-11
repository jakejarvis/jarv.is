import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { HomeIcon, NotesIcon, ProjectsIcon, ContactIcon } from "../../components/Icons";
import type { MenuLinkProps } from "../../components/MenuLink/MenuLink";

export const menuLinks: MenuLinkProps[] = [
  {
    icon: HomeIcon,
    text: "Home",
    href: "/",
  },
  {
    icon: NotesIcon,
    text: "Notes",
    href: "/notes",
  },
  {
    icon: ProjectsIcon,
    text: "Projects",
    href: "/projects",
  },
  {
    icon: ContactIcon,
    text: "Contact",
    href: "/contact",
  },
  {
    icon: ThemeToggle,
  },
];
