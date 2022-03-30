import { theme, darkTheme } from "../stitches.config";

// theme classnames are generated dynamically by stitches, so have ThemeProvider pull them from there
export const classNames = {
  light: theme.className,
  dark: darkTheme.className,
};

// https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query
export const query = "(prefers-color-scheme: dark)";

// default to a simple light or dark binary option
export const colorSchemes = ["light", "dark"];

// local storage key
export const storageKey = "theme";
