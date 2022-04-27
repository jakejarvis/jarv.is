import { createContext, useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { darkModeQuery, themeStorageKey } from "../lib/config/themes";
import type { Context, PropsWithChildren } from "react";

export const ThemeContext: Context<{
  /** Update the theme manually. */
  setTheme?: (theme: string) => void;
  /** The user's website theme setting ("light" or "dark", or undefined if unset). */
  preferredTheme?: string;
  /**
   * If the theme setting is undefined, this returns whether the system preference resolved to "light" or "dark". If the
   * preference is set, the value is identical to `preferredTheme`.
   *
   * Note to self: you probably want this.
   */
  resolvedTheme?: string;
}> = createContext({});

// provider used once in _app.tsx to wrap entire app
export const ThemeProvider = ({
  classNames,
  children,
}: PropsWithChildren<{
  /** Mapping of theme name ("light", "dark") to the corresponding `<html>`'s class names. */
  classNames: {
    [themeName: string]: string;
  };
}>) => {
  // keep track of if/when the user has set their theme *here*:
  const [preferredTheme, setPreferredTheme] = useLocalStorage(themeStorageKey, null, { raw: true });
  // save the end result no matter how we got there (by preference or by system):
  const [resolvedTheme, setResolvedTheme] = useState("");
  // get the theme names (light, dark) via passed-in classnames' keys
  const themeNames = Object.keys(classNames);

  // updates the DOM and optionally saves the new theme to local storage
  const changeTheme = useCallback(
    (theme: string, updateStorage?: boolean) => {
      if (updateStorage) {
        setPreferredTheme(theme);
      }

      // remove all theme classes first to start fresh
      const all = Object.values(classNames);
      document.documentElement.classList.remove(...all);
      document.documentElement.classList.add(classNames[theme]);
    },
    [classNames, setPreferredTheme]
  );

  // memoize browser media query handler
  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      // get the user's preferred theme via their OS/browser settings
      const systemTheme = e.matches ? "dark" : "light";

      // keep track of the resolved theme whether or not we change it below
      setResolvedTheme(systemTheme);

      // only actually change the theme if preference is unset (and *don't* save new theme to storage)
      if (!preferredTheme || !themeNames.includes(preferredTheme)) {
        changeTheme(systemTheme, false);
      }
    },
    [changeTheme, preferredTheme, themeNames]
  );

  // listen for changes in OS preference
  useEffect(() => {
    const media = window.matchMedia(darkModeQuery);
    media.addEventListener("change", handleMediaQuery);
    handleMediaQuery(media);

    // clean up the event listener
    return () => {
      media.removeEventListener("change", handleMediaQuery);
    };
  }, [handleMediaQuery]);

  // color-scheme handling (tells browser how to render built-in elements like forms, scrollbars, etc.)
  useEffect(() => {
    // only "light" and "dark" are valid here
    const colorScheme = ["light", "dark"].includes(preferredTheme) ? preferredTheme : resolvedTheme;

    document.documentElement.style?.setProperty("color-scheme", colorScheme);
  }, [preferredTheme, resolvedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        setTheme: useCallback(
          (theme: string) => {
            // force save to local storage
            changeTheme(theme, true);
          },
          [changeTheme]
        ),
        preferredTheme: themeNames.includes(preferredTheme) ? preferredTheme : undefined,
        resolvedTheme: themeNames.includes(preferredTheme) ? preferredTheme : resolvedTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// debugging help pls
if (process.env.NODE_ENV !== "production") {
  ThemeContext.displayName = "ThemeContext";
}
