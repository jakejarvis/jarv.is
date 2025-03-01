"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useMedia from "../hooks/useMedia";
import type { Context, PropsWithChildren } from "react";

type Themes = "light" | "dark";

export const ThemeContext: Context<{
  /**
   * If the user's theme preference is unset, this returns whether the system preference resolved to "light" or "dark".
   * If the user's theme preference is set, the preference is returned instead, regardless of their system's theme.
   */
  theme: Themes;
  /** Update the theme manually and save to local storage. */
  setTheme: (theme: Themes) => void;
}> = createContext({
  theme: "" as Themes,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (_) => {},
});

// provider used once in _app.tsx to wrap entire app
export const ThemeProvider = ({ children }: PropsWithChildren) => {
  // keep track of if/when the user has set their theme *on this site*
  const [preferredTheme, setPreferredTheme] = useLocalStorage<Themes>("theme");
  // keep track of changes to the user's OS/browser dark mode setting
  const [systemTheme, setSystemTheme] = useState<Themes>("" as Themes);
  // hook into system `prefers-dark-mode` setting
  // https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query
  const isSystemDark = useMedia("(prefers-color-scheme: dark)");

  // updates the DOM and optionally saves the new theme to local storage
  const applyTheme = useCallback(
    (theme: Themes, updateStorage?: boolean) => {
      if (updateStorage) {
        setPreferredTheme(theme);
      }

      document.documentElement.dataset.theme = theme;
    },
    [setPreferredTheme]
  );

  // listen for changes in OS preference
  useEffect(() => {
    // translate boolean to theme string
    const systemResolved = isSystemDark ? "dark" : "light";

    // keep track of the system theme whether or not we override it manually
    setSystemTheme(systemResolved);

    // only actually change the theme if preference is unset (and *don't* save new theme to storage)
    if (!preferredTheme) {
      applyTheme(systemResolved, false);
    }
  }, [applyTheme, preferredTheme, isSystemDark]);

  // color-scheme handling (tells browser how to render built-in elements like forms, scrollbars, etc.)
  useEffect(() => {
    // only "light" and "dark" are valid here
    // https://web.dev/color-scheme/#the-color-scheme-css-property
    const colorScheme = preferredTheme && ["light", "dark"].includes(preferredTheme) ? preferredTheme : systemTheme;

    document.documentElement.style?.setProperty("color-scheme", colorScheme);
  }, [preferredTheme, systemTheme]);

  const providerValues = {
    theme: preferredTheme ?? systemTheme,
    setTheme: (theme: Themes) => {
      // force save to local storage
      applyTheme(theme, true);
    },
  };

  return <ThemeContext.Provider value={providerValues}>{children}</ThemeContext.Provider>;
};

// debugging help pls
if (process.env.NODE_ENV !== "production") {
  ThemeContext.displayName = "ThemeContext";
}
