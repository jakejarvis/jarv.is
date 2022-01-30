import { useEffect, useState, memo } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "../Icons";

import styles from "./ThemeToggle.module.css";

type Props = {
  className?: string;
};

const ThemeToggle = ({ className }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // render a dummy button until we're fully mounted and self-aware
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <button className={styles.button} aria-hidden={true}>
        <SunIcon className={className} />
      </button>
    );
  }

  return (
    <button
      className={styles.button}
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      title={resolvedTheme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
    >
      {resolvedTheme === "light" ? <SunIcon className={className} /> : <MoonIcon className={className} />}
    </button>
  );
};

export default memo(ThemeToggle);
