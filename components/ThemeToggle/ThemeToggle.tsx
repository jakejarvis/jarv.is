import { useEffect, useState, memo } from "react";
import { useTheme } from "next-themes";
import BulbIcon from "./BulbIcon";

import styles from "./ThemeToggle.module.css";

type Props = {
  className?: string;
};

const ThemeToggle = ({ className }: Props) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // render a dummy bulb until we're fully mounted and self-aware
  useEffect(() => setMounted(true), []);
  if (!mounted) return <BulbIcon on={false} className={className} />;

  return (
    <button
      className={styles.button}
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      title={resolvedTheme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
      aria-hidden={true}
    >
      <BulbIcon on={resolvedTheme === "light"} className={className} />
    </button>
  );
};

export default memo(ThemeToggle);
