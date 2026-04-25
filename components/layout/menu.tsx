"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { Button } from "@/components/ui/button";

const menuItems = [
  {
    text: "Notes",
    href: "/notes",
  },
  {
    text: "Projects",
    href: "/projects",
  },
] as const;

const Menu = () => {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment() || "";

  return (
    <nav data-slot="navigation-menu" className="flex items-center gap-2">
      {menuItems.map((item) => {
        const isCurrent = item.href?.split("/")[1] === segment;
        const transitionTypes =
          item.href === "/notes" && pathname.startsWith("/notes/")
            ? ["nav-back"]
            : pathname === item.href
              ? undefined
              : ["nav-lateral"];

        return (
          <Button
            key={item.href}
            variant="ghost"
            size="sm"
            nativeButton={false}
            aria-label={item.text}
            data-current={isCurrent || undefined}
            className="data-current:bg-accent/60 data-current:text-accent-foreground text-sm leading-none"
            render={<Link href={item.href} transitionTypes={transitionTypes} />}
          >
            {item.text}
          </Button>
        );
      })}
    </nav>
  );
};

export { Menu };
