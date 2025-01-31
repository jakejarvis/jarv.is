import { FiHome, FiEdit3, FiCode, FiMail } from "react-icons/fi";
import type { MenuItemProps } from "../../components/MenuItem";

export const menuItems: MenuItemProps[] = [
  {
    Icon: FiHome,
    text: "Home",
    href: "/",
  },
  {
    Icon: FiEdit3,
    text: "Notes",
    href: "/notes",
  },
  {
    Icon: FiCode,
    text: "Projects",
    href: "/projects",
  },
  {
    Icon: FiMail,
    text: "Contact",
    href: "/contact",
  },
];
