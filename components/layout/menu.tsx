"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import MenuItem from "@/components/layout/menu-item";
import ThemeToggle from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { menuItems } from "@/lib/config/menu";
import type { ComponentPropsWithoutRef } from "react";

const Menu = ({ className, ...rest }: ComponentPropsWithoutRef<"ul">) => {
  const segment = useSelectedLayoutSegment() || "";

  return (
    <ul className={cn("flex max-w-2/3 flex-row justify-between md:max-w-none md:justify-end", className)} {...rest}>
      {menuItems.map((item) => {
        const isCurrent = item.href === `/${segment}`;

        return (
          <li className="max-sm:first-of-type:hidden md:ml-4" key={item.href}>
            <MenuItem {...item} current={isCurrent} />
          </li>
        );
      })}

      <li className="-mr-2.5 md:ml-4">
        <MenuItem
          // @ts-ignore
          icon={ThemeToggle}
        />
      </li>
    </ul>
  );
};

export default Menu;
