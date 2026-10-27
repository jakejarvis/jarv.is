import { Link } from "@tanstack/react-router";

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

const Menu = () => (
  <nav data-slot="navigation-menu" className="flex items-center gap-2">
    {menuItems.map((item) => (
      <Button
        key={item.href}
        variant="ghost"
        size="sm"
        nativeButton={false}
        aria-label={item.text}
        className="px-2.5 py-3.5 text-sm leading-none data-[status=active]:bg-accent/60 data-[status=active]:text-accent-foreground"
        // Link sets data-status="active" on its own when the current path is (or is under) its target
        render={<Link to={item.href} />}
      >
        {item.text}
      </Button>
    ))}
  </nav>
);

export { Menu };
