import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BulbOffIcon, BulbOnIcon } from "../icons";

const ThemeToggle = ({ className = "" }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // avoid hydration mismatch:
  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      title={resolvedTheme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}
      aria-hidden={true}
      style={{
        border: 0,
        padding: 0,
        background: "none",
        cursor: "pointer",
      }}
    >
      {resolvedTheme === "dark" ? (
        <BulbOffIcon className={`icon ${className}`} />
      ) : (
        <BulbOnIcon className={`icon ${className}`} />
      )}
    </button>
  );
};

export default ThemeToggle;
