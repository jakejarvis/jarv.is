"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import MenuItem from "@/components/layout/menu-item";
import ThemeToggle from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { HomeIcon, PencilLineIcon, CodeXmlIcon, MailIcon } from "lucide-react";

const menuItems: React.ComponentProps<typeof MenuItem>[] = [
  {
    text: "Home",
    href: "/",
    icon: <HomeIcon />,
  },
  {
    text: "Notes",
    href: "/notes",
    icon: <PencilLineIcon />,
  },
  {
    text: "Projects",
    href: "/projects",
    icon: <CodeXmlIcon />,
  },
  {
    text: "Contact",
    href: "/contact",
    icon: <MailIcon />,
  },
  {
    icon: <ThemeToggle />,
  },
];

const Menu = ({ className, ...rest }: React.ComponentProps<"div">) => {
  const segment = useSelectedLayoutSegment() || "";

  return (
    <div
      className={cn("flex max-w-2/3 flex-row justify-between md:max-w-none md:justify-end md:gap-4", className)}
      {...rest}
    >
      {menuItems.map((item, index) => {
        const isCurrent = item.href?.split("/")[1] === segment;

        return (
          <div
            className="inline-block border-t-3 border-t-transparent last:-mr-2.5 max-sm:first:hidden [&_a,&_button]:p-2.5"
            key={index}
          >
            <MenuItem {...item} current={isCurrent} />
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
