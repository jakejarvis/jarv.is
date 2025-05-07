"use client";

import { useContext } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { ThemeContext } from "@/components/layout/theme-context";
import type { ComponentPropsWithoutRef } from "react";
import type { LucideIcon } from "lucide-react";

const ThemeToggle = ({ ...rest }: ComponentPropsWithoutRef<LucideIcon>) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      className="hover:*:stroke-warning block cursor-pointer bg-transparent p-2.5 not-dark:[&_.lucide-moon]:hidden dark:[&_.lucide-sun]:hidden"
    >
      <SunIcon {...rest} />
      <MoonIcon {...rest} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle;
