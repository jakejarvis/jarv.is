import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

// convenience hook to get access to ThemeContext's state/functions from pages/components/etc.
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside of a ThemeProvider.");
  }

  return context;
};
