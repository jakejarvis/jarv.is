"use client";

import clsx from "clsx";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "../../hooks";
import type { ComponentPropsWithoutRef } from "react";
import type { LucideIcon } from "lucide-react";

import styles from "./ThemeToggle.module.css";

export type ThemeToggleProps = ComponentPropsWithoutRef<LucideIcon>;

const ThemeToggle = ({ className, ...rest }: ThemeToggleProps) => {
  const [theme, setTheme] = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle Theme"
      className={styles.toggle}
    >
      <SunIcon className={clsx(styles.sun, className)} {...rest} />
      <MoonIcon className={clsx(styles.moon, className)} {...rest} />
    </button>
  );
};

export default ThemeToggle;
