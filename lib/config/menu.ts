import { CodeIcon, HomeIcon, MailIcon, PencilLineIcon } from "lucide-react";
import MenuItem from "@/components/ui/menu-item";
import { ComponentPropsWithoutRef } from "react";

export const menuItems: Array<ComponentPropsWithoutRef<typeof MenuItem>> = [
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
