import { FiHome, FiEdit3, FiCode, FiMail } from "react-icons/fi";
import type { MenuItemProps } from "../../components/MenuItem";

export const menuItems: MenuItemProps[] = [
  {
    text: "Home",
    href: "/",
    icon: FiHome,
  },
  {
    text: "Notes",
    href: "/notes",
    icon: FiEdit3,
  },
  {
    text: "Projects",
    href: "/projects",
    icon: FiCode,
  },
  {
    text: "Contact",
    href: "/contact",
    icon: FiMail,
  },
];
