import { theme, darkTheme } from "../styles/stitches.config";

export const themeProviderConfig = {
  // theme classnames are generated dynamically by stitches, so have ThemeProvider pull them from there
  attribute: "class",
  value: {
    light: theme.className,
    dark: darkTheme.className,
  },
};
