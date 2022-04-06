import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export interface UseThemeProps {
  /** List of all available theme names */
  themes: string[];
  /** Active theme name */
  theme?: string;
  /** If the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string;
  /** Update the theme */
  setTheme: (theme: string) => void;
}

// useTheme() function to get current theme state from pages/components/etc.
export const useTheme = (): UseThemeProps => useContext(ThemeContext);
