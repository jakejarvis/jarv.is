import { memo } from "react";
import { useTheme } from "next-themes";
import { BulbOffIcon, BulbOnIcon } from "../icons";

const ThemeToggle = ({ className = "" }) => {
  const { resolvedTheme, setTheme } = useTheme();

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

export default memo(ThemeToggle);
