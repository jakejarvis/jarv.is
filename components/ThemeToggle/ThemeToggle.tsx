"use client";

import { useHasMounted, useTheme } from "../../hooks";
import { FiSun, FiMoon } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

import styles from "./ThemeToggle.module.css";

export type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const hasMounted = useHasMounted();
  const { theme, setTheme } = useTheme();

  // render a placeholder icon to avoid layout shifting until we're fully mounted and self-aware
  if (!hasMounted) {
    return (
      <div className={styles.toggle}>
        <BsThreeDots className={className} style={{ fill: "var(--colors-mediumLight)" }} />
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
      {theme === "light" ? <FiSun className={className} /> : <FiMoon className={className} />}
    </button>
  );
};

export default ThemeToggle;
