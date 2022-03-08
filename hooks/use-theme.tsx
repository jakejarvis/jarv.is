// forked & modified from pacocoursey/next-themes as of:
// https://github.com/pacocoursey/next-themes/tree/b5c2bad50de2d61ad7b52a9c5cdc801a78507d7a

import { createContext, useCallback, useContext, useEffect, useState, useRef, memo } from "react";
import NextHead from "next/head";
import type { PropsWithChildren } from "react";

interface UseThemeProps {
  /** List of all available theme names */
  themes: string[];
  /** Active theme name */
  theme?: string;
  /** If the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string;
  /** Forced theme name for the current page */
  forcedTheme?: string;
  /** Update the theme */
  setTheme: (theme: string) => void;
}

export interface ThemeProviderProps {
  /** List of all available theme names */
  themes?: string[];
  /** Forced theme name for the current page */
  forcedTheme?: string;
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableColorScheme?: boolean;
  /** Key used to store theme setting in localStorage */
  storageKey?: string;
  /** Default theme name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default theme is light */
  defaultTheme?: string;
  /** HTML attribute modified based on the active theme. Accepts `class` and `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.) */
  attribute?: string | "class";
  /** Mapping of theme name to HTML attribute value. Object where key is the theme name and value is the attribute value */
  value?: ValueObject;
}

const ThemeContext = createContext<UseThemeProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  setTheme: (_) => {},
  themes: [],
});
export const useTheme = () => useContext(ThemeContext);

const colorSchemes = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";

interface ValueObject {
  [themeName: string]: string;
}

export const ThemeProvider = ({
  forcedTheme,
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
      if (theme === "system" && !forcedTheme) changeTheme(systemTheme, false);
    },
    [theme, forcedTheme] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Ref hack to avoid adding handleMediaQuery as a dep
  const mediaListener = useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  const changeTheme = useCallback((theme, updateStorage = true, updateDOM = true) => {
    let name = value?.[theme] || theme;

    if (updateStorage) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (e) {
        // Unsupported
      }
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
      if (forcedTheme) {
        changeTheme(newTheme, true, false);
      } else {
        changeTheme(newTheme);
      }
      setThemeState(newTheme);
    },
    [forcedTheme] // eslint-disable-line react-hooks/exhaustive-deps
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
  }, [setTheme]); // eslint-disable-line react-hooks/exhaustive-deps

  // color-scheme handling
  useEffect(() => {
    if (!enableColorScheme) return;

    const colorScheme =
      // If theme is forced to light or dark, use that
      forcedTheme && colorSchemes.includes(forcedTheme)
        ? forcedTheme
        : // If regular theme is light or dark
        theme && colorSchemes.includes(theme)
        ? theme
        : // If theme is system, use the resolved version
        theme === "system"
        ? resolvedTheme || null
        : null;

    // color-scheme tells browser how to render built-in elements like forms, scrollbars, etc.
    // if color-scheme is null, this will remove the property
    document.documentElement.style.setProperty("color-scheme", colorScheme);
  }, [enableColorScheme, theme, resolvedTheme, forcedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        themes: [...themes, "system"],
        theme,
        resolvedTheme: theme === "system" ? resolvedTheme : theme,
        forcedTheme,
        setTheme,
      }}
    >
      <ThemeScript
        {...{
          forcedTheme,
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

const ThemeScript = memo(
  function ThemeScript({
    forcedTheme,
    storageKey,
    attribute,
    defaultTheme,
    value,
    attrs,
  }: {
    forcedTheme?: string;
    storageKey: string;
    attribute?: string;
    defaultTheme: string;
    value?: ValueObject;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attrs: any;
  }) {
    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      if (attribute === "class") {
        const removeClasses = `d.remove(${attrs.map((t: string) => `"${t}"`).join(",")})`;

        return `var d=document.documentElement.classList;${removeClasses};`;
      } else {
        return `var d=document.documentElement;`;
      }
    })();

    const updateDOM = (name: string, literal?: boolean) => {
      name = value?.[name] || name;
      const val = literal ? name : `"${name}"`;

      if (attribute === "class") {
        return `d.add(${val})`;
      }

      return `d.setAttribute("${attribute}", ${val})`;
    };

    const defaultSystem = defaultTheme === "system";

    return (
      <NextHead>
        {forcedTheme ? (
          <script
            key="next-themes-script"
            dangerouslySetInnerHTML={{
              __html: `!function(){${optimization}${updateDOM(forcedTheme)}}()`,
            }}
          />
        ) : (
          <script
            key="next-themes-script"
            dangerouslySetInnerHTML={{
              __html: `!function(){try{${optimization}var e=localStorage.getItem("${storageKey}");${
                !defaultSystem ? updateDOM(defaultTheme) + ";" : ""
              }if("system"===e||(!e&&${defaultSystem})){var t="${MEDIA}",m=window.matchMedia(t);m.media!==t||m.matches?${updateDOM(
                "dark"
              )}:${updateDOM("light")}}else if(e){${value ? `var x=${JSON.stringify(value)}` : ""}}${updateDOM(
                value ? "x[e]" : "e",
                true
              )}}catch(e){}}()`,
            }}
          />
        )}
      </NextHead>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render when forcedTheme changes
    // the rest of the props should be completely stable
    if (prevProps.forcedTheme !== nextProps.forcedTheme) return false;
    return true;
  }
);

// Helpers
const getTheme = (key: string, fallback?: string) => {
  if (typeof window === "undefined") return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};

const getSystemTheme = (e?: MediaQueryList) => {
  if (!e) {
    e = window.matchMedia(MEDIA);
  }

  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
};
