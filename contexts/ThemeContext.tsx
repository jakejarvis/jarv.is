import { createContext, useCallback, useEffect, useState, useRef } from "react";
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
  /** Optionally set `color-scheme` CSS property to change browser appearance. */
  enableColorScheme?: boolean;
}>) => {
  // keep track of if/when the user has set their theme *here*:
  const [preferredTheme, setPreferredTheme] = useLocalStorage(themeStorageKey, null, { raw: true });
  // save the end result no matter how we got there (by preference or by system):
  const [resolvedTheme, setResolvedTheme] = useState("");
  // TODO: remove this and do related stuff more gracefully
  const validThemes = Object.keys(classNames);

  // updates the DOM and optionally saves the new theme to local storage
  const changeTheme = useCallback(
    (theme: string, updateStorage: boolean) => {
      if (updateStorage) {
        setPreferredTheme(theme);
      }

      // remove all theme classes first to start fresh
      const all = Object.values(classNames);
      const d = document.documentElement;
      d.classList.remove(...all);
      d.classList.add(classNames[theme]);
    },
    [classNames, setPreferredTheme]
  );

  // memoize browser media query handler
  const handleMediaQuery = useCallback(
    (e?: MediaQueryList) => {
      // get the user's preferred theme via their OS/browser settings
      const media = e || window.matchMedia(darkModeQuery);
      const systemTheme = media.matches ? "dark" : "light";
      setResolvedTheme(systemTheme);
      // only actually change the theme if preference is unset (and *don't* save new theme to storage)
      if (!preferredTheme || !validThemes.includes(preferredTheme)) changeTheme(systemTheme, false);
    },
    [changeTheme, preferredTheme, validThemes]
  );
  // ref hack to avoid adding handleMediaQuery as a dependency
  const mediaListener = useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  // listen for changes in OS preference
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (...args: any) => mediaListener.current(...args);
    const media = window.matchMedia(darkModeQuery);

    // note: intentionally using deprecated listener methods to support older iOS/browsers
    media.addListener(handler);
    handler(media);

    return () => media.removeListener(handler);
  }, []);

  // color-scheme handling (tells browser how to render built-in elements like forms, scrollbars, etc.)
  useEffect(() => {
    // only "light" and "dark" are valid here
    const colorScheme = ["light", "dark"].includes(preferredTheme) ? preferredTheme : resolvedTheme;

    document.documentElement.style.setProperty("color-scheme", colorScheme);
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
        preferredTheme: validThemes.includes(preferredTheme) ? preferredTheme : undefined,
        resolvedTheme: validThemes.includes(preferredTheme) ? preferredTheme : resolvedTheme,
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
