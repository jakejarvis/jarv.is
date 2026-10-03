"use client";

import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="group"
    >
      <IconSun className="group-hover:stroke-orange-600 dark:hidden" aria-hidden="true" />
      <IconMoon className="not-dark:hidden group-hover:stroke-yellow-400" aria-hidden="true" />
    </Button>
  );
};

export { ThemeToggle };
