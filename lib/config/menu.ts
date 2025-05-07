import { HomeIcon, PencilLineIcon, CodeXmlIcon, MailIcon, type LucideIcon } from "lucide-react";

export type MenuItemConfig = {
  text?: string;
  href?: `/${string}`;
  icon?: LucideIcon;
};

export const menuItems: MenuItemConfig[] = [
  {
    text: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    text: "Notes",
    href: "/notes",
    icon: PencilLineIcon,
  },
  {
    text: "Projects",
    href: "/projects",
    icon: CodeXmlIcon,
  },
  {
    text: "Contact",
    href: "/contact",
    icon: MailIcon,
  },
];
