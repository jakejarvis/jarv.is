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
    <ul
      className={cn(
        "flex max-w-2/3 flex-row justify-between md:max-w-none md:justify-end md:gap-4 max-sm:[&>li]:first-of-type:hidden",
        className
      )}
      {...rest}
    >
      {menuItems.map((item) => {
        const isCurrent = item.href?.split("/")[1] === segment;

        return (
          <li className="inline-block" key={item.href}>
            <MenuItem {...item} current={isCurrent} />
          </li>
        );
      })}

      <li className="-mr-2.5 inline-block">
        <MenuItem
          // @ts-ignore
          icon={ThemeToggle}
        />
      </li>
    </ul>
  );
};

export default Menu;
