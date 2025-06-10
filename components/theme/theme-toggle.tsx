"use client";

import { useContext } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { ThemeContext } from "@/components/theme/theme-context";
import { cn } from "@/lib/utils";

const ThemeToggle = ({ className, ...rest }: React.ComponentProps<"button">) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
      className={cn("hover:[&_svg]:stroke-warning block cursor-pointer bg-transparent", className)}
      {...rest}
    >
      <SunIcon className="dark:hidden" />
      <MoonIcon className="not-dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};

export default ThemeToggle;
