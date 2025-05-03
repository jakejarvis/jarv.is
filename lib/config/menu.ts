import { CodeIcon, HomeIcon, MailIcon, PencilLineIcon } from "lucide-react";
import type { MenuItemProps } from "@/components/ui/menu-item";

export const menuItems: MenuItemProps[] = [
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
    icon: CodeIcon,
  },
  {
    text: "Contact",
    href: "/contact",
    icon: MailIcon,
  },
];
