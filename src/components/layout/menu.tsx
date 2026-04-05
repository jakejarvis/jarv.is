"use client";

import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  {
    text: "Notes",
    to: "/notes",
  },
  {
    text: "Projects",
    to: "/projects",
  },
  {
    text: "Contact",
    to: "/contact",
  },
] as const;

const Menu = () => {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const segment = pathname.split("/")[1] || "";

  const currentItem = menuItems.find((item) => item.to.split("/")[1] === segment);
  const currentLabel = segment === "" ? "Home" : currentItem?.text || "Menu";

  return (
    <nav data-slot="navigation-menu">
      {/* Desktop: Show all buttons */}
      <div className="hidden items-center gap-1 sm:flex">
        {menuItems.map((item) => {
          const isCurrent = item.to.split("/")[1] === segment;

          return (
            <Button
              asChild
              key={item.to}
              variant="ghost"
              size="sm"
              aria-label={item.text}
              data-current={isCurrent || undefined}
              className="text-foreground/70 data-current:text-foreground/90 text-sm leading-none hover:!bg-transparent"
            >
              <Link to={item.to}>{item.text}</Link>
            </Button>
          );
        })}
      </div>

      {/* Mobile: Show dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex gap-2 text-[15px] sm:hidden data-[state=open]:[&_svg]:rotate-180"
          >
            {currentLabel}
            <ChevronDownIcon className="size-3.5 opacity-60 transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[140px]">
          <DropdownMenuItem
            asChild
            data-current={segment === ""}
            aria-current={segment === "" ? "page" : undefined}
          >
            <Link to="/">Home</Link>
          </DropdownMenuItem>
          {menuItems.map((item) => {
            const isCurrent = item.to.split("/")[1] === segment;

            return (
              <DropdownMenuItem
                asChild
                key={item.to}
                data-current={isCurrent || undefined}
                aria-current={isCurrent ? "page" : undefined}
              >
                <Link to={item.to}>{item.text}</Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export { Menu };
