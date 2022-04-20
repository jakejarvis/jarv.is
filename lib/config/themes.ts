import { theme, darkTheme } from "../styles/stitches.config";

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

// https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query
export const darkModeQuery = "(prefers-color-scheme: dark)";

// local storage key
export const themeStorageKey = "preferred-theme";
