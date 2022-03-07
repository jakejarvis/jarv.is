import { useEffect, useState, memo } from "react";
import { useTheme } from "../../hooks/use-theme";
import { styled } from "../../lib/styles/stitches.config";
import { SunIcon, MoonIcon } from "../Icons";

const Button = styled("button", {
  border: 0,
  padding: "0.6em",
  marginRight: "-0.6em",
  background: "none",
  cursor: "pointer",
  color: "$mediumDark",

  "&:hover": {
    color: "$warning",
  },
});

export type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // render a dummy button until we're fully mounted and self-aware
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <Button aria-hidden={true}>
        <SunIcon className={className} />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      title={resolvedTheme === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"}
    >
      {resolvedTheme === "light" ? <SunIcon className={className} /> : <MoonIcon className={className} />}
    </Button>
  );
};

export default memo(ThemeToggle);
