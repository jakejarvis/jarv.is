"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";
import Button from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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

  const currentItem = menuItems.find((item) => item.href?.split("/")[1] === segment);
  const currentLabel = segment === "" ? "Home" : currentItem?.text || "Menu";

  return (
    <nav data-slot="navigation-menu">
      {/* Desktop: Show all buttons */}
      <div className="hidden items-center gap-1.5 sm:flex">
        {menuItems.map((item, index) => {
          const isCurrent = item.href?.split("/")[1] === segment;

          return (
            <Button
              asChild
              key={index}
              variant="ghost"
              size="sm"
              aria-label={item.text}
              data-current={isCurrent || undefined}
              className="data-current:bg-accent/60 data-current:text-accent-foreground"
            >
              <Link href={item.href}>{item.text}</Link>
            </Button>
          );
        })}
      </div>

      {/* Mobile: Show dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex sm:hidden">
            {currentLabel}
            <ChevronDownIcon className="size-3.5 opacity-60 transition-transform duration-200 data-[state=open]:rotate-180" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[140px]">
          <DropdownMenuItem asChild data-current={segment === ""} aria-current={segment === "" ? "page" : undefined}>
            <Link href="/">Home</Link>
          </DropdownMenuItem>
          {menuItems.map((item, index) => {
            const isCurrent = item.href?.split("/")[1] === segment;

            return (
              <DropdownMenuItem
                asChild
                key={index}
                data-current={isCurrent || undefined}
                aria-current={isCurrent ? "page" : undefined}
              >
                <Link href={item.href}>{item.text}</Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Menu;
