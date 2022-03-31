import { theme, darkTheme } from "../stitches.config";

// theme classnames are generated dynamically by stitches, so have ThemeProvider pull them from there
export const themeClassNames = {
  light: theme.className,
  dark: darkTheme.className,
};

// colors used for `<meta name="theme-color" .../>` (see components/Layout/Layout.tsx)
export const themeColors = {
  light: theme.colors.backgroundOuter?.value,
  dark: darkTheme.colors.backgroundOuter?.value,
};

// default to a simple light or dark binary option
export const colorSchemes = ["light", "dark"];

// https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query
export const darkModeQuery = "(prefers-color-scheme: dark)";

// local storage key
export const themeStorageKey = "theme";
