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
      aria-label="Toggle Theme"
      className="hover:[&_svg]:stroke-warning block bg-transparent p-2.5 hover:cursor-pointer not-dark:[&_.lucide-moon]:hidden dark:[&_.lucide-sun]:hidden"
    >
      <SunIcon {...rest} />
      <MoonIcon {...rest} />
    </button>
  );
};

export default ThemeToggle;
