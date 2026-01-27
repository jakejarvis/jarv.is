"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Button from "@/components/ui/button";
import Link from "@/components/link";

const menuItems = [
  {
    text: "Notes",
    href: "/notes",
  },
  {
    text: "Projects",
    href: "/projects",
  },
  {
    text: "Contact",
    href: "/contact",
  },
] as const;

const Menu = () => {
  const segment = useSelectedLayoutSegment() || "";

  return (
    <div className="flex items-center gap-2">
      {menuItems.map((item, index) => {
        const isCurrent = item.href?.split("/")[1] === segment;

        return (
          <Button key={index} variant="ghost" size="sm" asChild>
            <Link href={item.href} prefetch={false} aria-label={item.text} data-current={isCurrent}>
              {item.text}
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

export default Menu;
