"use client";

import { createContext, useEffect } from "react";
import { useLocalStorage, useMedia } from "react-use";

export const ThemeContext = createContext<{
  /**
   * If the user's theme preference is unset, this returns whether the system preference resolved to "light" or "dark".
   * If the user's theme preference is set, the preference is returned instead, regardless of their system's theme.
   */
  theme: string;
  /** Update the theme manually and save to local storage. */
  setTheme: (theme: string) => void;
}>({
  theme: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (_) => {},
});

// provider used once in _app.tsx to wrap entire app
export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  // keep track of if/when the user has set their theme *on this site*
  const [preferredTheme, setPreferredTheme] = useLocalStorage<string>("theme", undefined, { raw: true });
  // hook into system `prefers-color-scheme` setting
  // https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query
  const isSystemDark = useMedia("(prefers-color-scheme: dark)", false);
  // Derive system theme directly from media query to avoid setState in effect
  const systemTheme = isSystemDark ? "dark" : "light";

  // actual DOM updates must be done in useEffect
  useEffect(() => {
    // only "light" and "dark" are valid themes
    const resolvedTheme = preferredTheme && ["light", "dark"].includes(preferredTheme) ? preferredTheme : systemTheme;

    // this is what actually changes the CSS variables
    document.documentElement.dataset.theme = resolvedTheme;

    // less important, but tells the browser how to render built-in elements like forms, scrollbars, etc.
    document.documentElement.style?.setProperty("color-scheme", resolvedTheme);
  }, [preferredTheme, systemTheme]);

  const providerValues = {
    theme: preferredTheme ?? systemTheme,
    setTheme: setPreferredTheme,
  };

  return <ThemeContext.Provider value={providerValues}>{children}</ThemeContext.Provider>;
};
