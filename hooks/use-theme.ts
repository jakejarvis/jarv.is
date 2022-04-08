import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

// convenience hook to get access to ThemeContext's state/functions from pages/components/etc.
export const useTheme = () => useContext(ThemeContext);
