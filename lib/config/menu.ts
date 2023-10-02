import { FiHome, FiEdit3, FiCode, FiMail } from "react-icons/fi";
import type { MenuItemProps } from "../../components/MenuItem";

export const menuItems: MenuItemProps[] = [
  {
    icon: FiHome,
    text: "Home",
    href: "/",
  },
  {
    icon: FiEdit3,
    text: "Notes",
    href: "/notes",
  },
  {
    icon: FiCode,
    text: "Projects",
    href: "/projects",
  },
  {
    icon: FiMail,
    text: "Contact",
    href: "/contact",
  },
];
