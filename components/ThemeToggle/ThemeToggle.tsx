"use client";

import { useHasMounted, useTheme } from "../../hooks";
import { EllipsisIcon, MoonIcon, SunIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import type { LucideIcon } from "lucide-react";

import styles from "./ThemeToggle.module.css";

export type ThemeToggleProps = ComponentPropsWithoutRef<LucideIcon>;

const ThemeToggle = ({ ...rest }: ThemeToggleProps) => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();

  // render a placeholder icon to avoid layout shifting until we're fully mounted and self-aware
  if (!hasMounted) {
    return (
      <div className={styles.toggle}>
        <EllipsisIcon style={{ stroke: "var(--colors-mediumLight)" }} {...rest} />
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={styles.toggle}
      title={theme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
      aria-label={theme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
    >
      {theme === "light" ? <SunIcon {...rest} /> : <MoonIcon {...rest} />}
    </button>
  );
};

export default ThemeToggle;
