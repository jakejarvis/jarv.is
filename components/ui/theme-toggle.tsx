"use client";

import { useContext } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { ThemeContext } from "@/components/ui/theme-context";
import type { ComponentPropsWithoutRef } from "react";
import type { LucideIcon } from "lucide-react";

export type ThemeToggleProps = ComponentPropsWithoutRef<LucideIcon>;

const ThemeToggle = ({ ...rest }: ThemeToggleProps) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle Theme"
      className="hover:[&>svg]:stroke-warning block bg-none p-2.5 hover:cursor-pointer hover:border-none"
    >
      <SunIcon {...rest} />
      <MoonIcon {...rest} />
    </button>
  );
};

export default ThemeToggle;
