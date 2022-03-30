// forked & modified from pacocoursey/next-themes as of v0.0.15:
// https://github.com/pacocoursey/next-themes/tree/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a

import { createContext, useCallback, useContext, useEffect, useState, useRef, memo } from "react";
import NextHead from "next/head";
import type { PropsWithChildren } from "react";

// https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query
const MEDIA = "(prefers-color-scheme: dark)";

// default to a simple light or dark binary option
const colorSchemes = ["light", "dark"];

interface AttributeValuesMap {
  [themeName: string]: string;
}

export interface ThemeProviderProps {
  /** List of all available theme names */
  themes?: string[];
  /** Key used to store theme setting in localStorage */
  storageKey?: string;
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  classNames?: AttributeValuesMap;
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean;
}

export interface UseThemeProps {
  /** List of all available theme names */
  themes: string[];
  /** Active theme name */
  theme?: string;
  /** If the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string;
  /** Update the theme */
  setTheme: (theme: string) => void;
}

// get the current theme *after* being set by this script
const getTheme = (key: string, fallback?: string) => {
  if (typeof window === "undefined") return undefined;

  let theme: string;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {} // eslint-disable-line no-empty

  return theme || fallback;
};

// get the user's prefered theme as set via their OS/browser settings
const getSystemTheme = (e?: MediaQueryList) => {
  if (!e) {
    e = window.matchMedia(MEDIA);
  }

  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
};

// useTheme() function to get current theme state from pages/components/etc.
const ThemeContext = createContext<UseThemeProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setTheme: (_) => {},
  themes: [],
});
export const useTheme = () => useContext(ThemeContext);

// the script tag injected manually into `<head>` by provider below
const ThemeScript = memo(function ThemeScript({ storageKey, classNames }: Partial<ThemeProviderProps>) {
  // commenst are up here to avoid having them inside the actual client output:
  //  - `p` is the user's saved preference
  //  - `cn` is the map of theme -> classname
  //  - `cl` is the list of <html>'s current class(es), which the `cn` values are removed to start fresh
  //  - `q` is always the CSS media query set at the top of this file
  //  - `m` is the listener which tests that media query
  //  - `try/catch` is in case I messed something up here bigly... (will default to light theme)
  /* eslint-disable no-empty, no-var, one-var */
  const clientScript = () => {
    try {
      var p = localStorage.getItem("__STORAGE_KEY__"),
        cn = "__CLASS_NAMES__",
        cl = document.documentElement.classList;
      cl.remove("__LIST_OF_CLASSES__");

      if (!p || p === "system") {
        var q = "__MEDIA_QUERY__",
          m = window.matchMedia(q);
        m.media !== q || m.matches ? cl.add(cn["dark"]) : cl.add(cn["light"]);
      } else if (p) {
        cl.add(cn[p]);
      }
    } catch (e) {}
  };
  /* eslint-enable no-empty */

  // since the function above will end up being injected as a plain dumb string, we need to set the dynamic values here:
  const prepareScript = (script: unknown) => {
    const functionString = String(script)
      .replace('"__MEDIA_QUERY__"', `"${MEDIA}"`)
      .replace('"__STORAGE_KEY__"', `"${storageKey}"`)
      .replace('"__CLASS_NAMES__"', JSON.stringify(classNames))
      .replace(
        '"__LIST_OF_CLASSES__"',
        Object.values(classNames)
          .map((t: string) => `"${t}"`)
          .join(",")
      )
      // somewhat "minify" the final code by removing tabs/newlines:
      // https://github.com/sindresorhus/condense-whitespace/blob/main/index.js
      .replace(/\s{2,}/gu, "")
      .trim();

    // make it an IIFE:
    return `(${functionString})()`;
  };

  // even though it's the proper method, using next/script with `strategy="beforeInteractive"` still causes flash of
  // white on load. injecting a normal script tag lets us prioritize setting `<html>` attributes even more.
  return (
    <NextHead>
      <script
        key="next-themes-script"
        dangerouslySetInnerHTML={{
          __html: prepareScript(clientScript),
        }}
      />
    </NextHead>
  );
});

// provider used once in _app.tsx to wrap entire app
export const ThemeProvider = ({
  enableColorScheme = true,
  storageKey = "theme",
  themes = [...colorSchemes],
  classNames,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [theme, setThemeState] = useState(() => getTheme(storageKey, "system"));
  const [resolvedTheme, setResolvedTheme] = useState(() => getTheme(storageKey));

  const handleMediaQuery = useCallback(
    (e?) => {
      const systemTheme = getSystemTheme(e);
      setResolvedTheme(systemTheme);
      if (theme === "system") changeTheme(systemTheme, false);
    },
    [theme] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Ref hack to avoid adding handleMediaQuery as a dep
  const mediaListener = useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  const changeTheme = useCallback((theme, updateStorage = true, updateDOM = true) => {
    let name = classNames?.[theme] || theme;

    if (updateStorage) {
      try {
        localStorage.setItem(storageKey, theme);
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (...args: any) => mediaListener.current(...args);

    // Always listen to System preference
    const media = window.matchMedia(MEDIA);

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handler);
    handler(media);

    return () => media.removeListener(handler);
  }, []);

  const setTheme = useCallback(
    (newTheme) => {
      changeTheme(newTheme);
      setThemeState(newTheme);
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
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
      // If regular theme is light or dark
      theme && colorSchemes.includes(theme)
        ? theme
        : // If theme is system, use the resolved version
        theme === "system"
        ? resolvedTheme || null
        : null;

    // color-scheme tells browser how to render built-in elements like forms, scrollbars, etc.
    // if color-scheme is null, this will remove the property
    document.documentElement.style.setProperty("color-scheme", colorScheme);
  }, [theme, resolvedTheme]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeContext.Provider
      value={{
        themes: [...themes, "system"],
        theme,
        resolvedTheme: theme === "system" ? resolvedTheme : theme,
        setTheme,
      }}
    >
      <ThemeScript {...{ storageKey, classNames }} />

      {children}
    </ThemeContext.Provider>
  );
};
