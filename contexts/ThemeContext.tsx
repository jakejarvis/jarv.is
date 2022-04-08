// forked & heavily modified from pacocoursey/next-themes as of v0.0.15:
// https://github.com/pacocoursey/next-themes/blob/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a/index.tsx

import { createContext, useCallback, useEffect, useState, useRef } from "react";
import { darkModeQuery, themeStorageKey } from "../lib/styles/helpers/themes";
import type { Context, PropsWithChildren } from "react";

export const ThemeContext: Context<{
  /** Update the theme */
  setTheme?: (theme: string) => void;
  /** List of all available theme names (probably "light", "dark", and "system") */
  themes?: string[];
  /** Active theme name ("system" if unset) */
  theme?: string;
  /** If the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string;
}> = createContext({});

// provider used once in _app.tsx to wrap entire app
export const ThemeProvider = ({
  classNames,
  enableColorScheme,
  children,
}: PropsWithChildren<{
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  classNames: {
    [themeName: string]: string;
  };
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean;
}>) => {
  // possible themes are derived from given classNames (probably "light" and "dark")
  const themes = Object.keys(classNames);

  // get the user's saved theme preference
  const getUserTheme = (key: string, fallback?: string) => {
    if (typeof window === "undefined") return undefined;

    let theme: string;
    try {
      theme = localStorage.getItem(key) || undefined;
    } catch (e) {} // eslint-disable-line no-empty

    return theme || fallback;
  };

  // get the user's preferred theme via their OS/browser settings
  const getSystemTheme = (e?: MediaQueryList) => {
    if (!e) {
      e = window.matchMedia(darkModeQuery);
    }

    return e.matches ? "dark" : "light";
  };

  const [currentTheme, setCurrentTheme] = useState(() => getUserTheme(themeStorageKey, "system"));
  const [resolvedTheme, setResolvedTheme] = useState(() => getUserTheme(themeStorageKey));

  const changeTheme = useCallback((theme, updateStorage = true, updateDOM = true) => {
    let name = classNames?.[theme] || theme;

    if (updateStorage) {
      try {
        localStorage.setItem(themeStorageKey, theme);
      } catch (e) {} // eslint-disable-line no-empty
    }

    if (theme === "system") {
      const resolved = getSystemTheme();
      name = classNames?.[resolved] || resolved;
    }

    if (updateDOM) {
      // remove all theme classes first to start fresh
      const all = Object.values(classNames);
      const d = document.documentElement;
      d.classList.remove(...all);
      d.classList.add(name);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setTheme = useCallback(
    (newTheme) => {
      changeTheme(newTheme);
      setCurrentTheme(newTheme);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleMediaQuery = useCallback(
    (e?) => {
      const systemTheme = getSystemTheme(e);
      setResolvedTheme(systemTheme);
      if (currentTheme === "system") changeTheme(systemTheme, false);
    },
    [currentTheme] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // ref hack to avoid adding handleMediaQuery as a dependency
  const mediaListener = useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (...args: any) => mediaListener.current(...args);

    // listen to system preference
    const media = window.matchMedia(darkModeQuery);

    // note: intentionally using deprecated listener methods to support older iOS/browsers
    media.addListener(handler);
    handler(media);

    return () => media.removeListener(handler);
  }, []);

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== themeStorageKey) {
        return;
      }

      // use default theme if localstorage === null (happens on local storage manual deletion)
      const theme = e.newValue || "system";
      setTheme(theme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // color-scheme handling
  useEffect(() => {
    if (!enableColorScheme) return;

    const colorScheme =
      currentTheme && themes.includes(currentTheme) // light or dark
        ? currentTheme
        : // preference is unset, use the OS/browser setting
        currentTheme === "system"
        ? resolvedTheme || null
        : null;

    // color-scheme tells browser how to render built-in elements like forms, scrollbars, etc.
    // if color-scheme is null, this will remove the property
    document.documentElement.style.setProperty("color-scheme", colorScheme);
  }, [currentTheme, resolvedTheme]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeContext.Provider
      value={{
        setTheme,
        themes: [...themes, "system"],
        theme: currentTheme,
        resolvedTheme: currentTheme === "system" ? resolvedTheme : currentTheme,
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
