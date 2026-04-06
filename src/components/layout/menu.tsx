"use client";

import { Link, useRouterState } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

const menuItems = [
  {
    text: "Notes",
    to: "/notes",
  },
  {
    text: "Projects",
    to: "/projects",
  },
] as const;

const Menu = () => {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const segment = pathname.split("/")[1] || "";

  return (
    <nav data-slot="navigation-menu" className="flex items-center gap-1">
      {menuItems.map((item) => {
        const isCurrent = item.to.split("/")[1] === segment;

        return (
          <Button
            key={item.to}
            variant="ghost"
            size="sm"
            aria-label={item.text}
            data-current={isCurrent || undefined}
            className="text-foreground/70 data-current:text-foreground/90 data-current:bg-accent/60 text-sm leading-none"
            nativeButton={false}
            render={<Link to={item.to} />}
          >
            {item.text}
          </Button>
        );
      })}
    </nav>
  );
};

export { Menu };
