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
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean;
  /** Key used to store theme setting in localStorage */
  storageKey?: string;
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string;
  /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
  attribute?: string | "class";
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  value?: AttributeValuesMap;
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

  let theme;
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
const ThemeScript = memo(function ThemeScript({
  storageKey,
  attribute,
  defaultTheme,
  value,
  attrs,
}: {
  storageKey: string;
  attribute?: string;
  defaultTheme: string;
  value?: AttributeValuesMap;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs: any;
}) {
  const setDocumentVar = (() => {
    if (attribute === "class") {
      const removeClasses = `d.remove(${attrs.map((t: string) => `"${t}"`).join(",")})`;

      // `d` is the class list of the `<html>` tag
      return `var d=document.documentElement.classList;${removeClasses};`;
    } else {
      // `d` is the entire document, used to set custom attribute of the `<html>` tag (probably `data-*`)
      return `var d=document.documentElement;`;
    }
  })();

  const updateDOM = (name: string, literal?: boolean) => {
    name = value?.[name] || name;
    const val = literal ? name : `"${name}"`;

    // mirrors above logic from setDocumentVar()
    if (attribute === "class") {
      return `d.add(${val})`;
    } else {
      return `d.setAttribute("${attribute}", ${val})`;
    }
  };

  // is the default theme still `system`? (it should be...)
  const defaultSystem = defaultTheme === "system";

  // even though it's the proper method, using next/script with `strategy="beforeInteractive"` still causes flash of
  // white on load. injecting a normal script tag lets us prioritize setting `<html>` attributes even more.
  return (
    <NextHead>
      <script
        key="next-themes-script"
        dangerouslySetInnerHTML={{
          __html: `!function(){try{${setDocumentVar}var e=localStorage.getItem("${storageKey}");${
            !defaultSystem ? updateDOM(defaultTheme) + ";" : ""
          }if("system"===e||(!e&&${defaultSystem})){var t="${MEDIA}",m=window.matchMedia(t);m.media!==t||m.matches?${updateDOM(
            "dark"
          )}:${updateDOM("light")}}else if(e){${value ? `var x=${JSON.stringify(value)}` : ""}}${updateDOM(
            value ? "x[e]" : "e",
            true
          )}}catch(e){}}()`,
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
  defaultTheme = "system",
  attribute = "data-theme",
  value,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [theme, setThemeState] = useState(() => getTheme(storageKey, defaultTheme));
  const [resolvedTheme, setResolvedTheme] = useState(() => getTheme(storageKey));
  const attrs = !value ? themes : Object.values(value);

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
    let name = value?.[theme] || theme;

    if (updateStorage) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (e) {} // eslint-disable-line no-empty
    }

    if (theme === "system") {
      const resolved = getSystemTheme();
      name = value?.[resolved] || resolved;
    }

    if (updateDOM) {
      const d = document.documentElement;

      if (attribute === "class") {
        d.classList.remove(...attrs);
        d.classList.add(name);
      } else {
        d.setAttribute(attribute, name);
      }
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

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      const theme = e.newValue || defaultTheme;
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
      <ThemeScript
        {...{
          storageKey,
          attribute,
          value,
          defaultTheme,
          attrs,
        }}
      />

      {children}
    </ThemeContext.Provider>
  );
};
