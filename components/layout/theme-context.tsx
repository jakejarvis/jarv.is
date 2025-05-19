"use client";

import { createContext, useEffect, useState } from "react";
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
  // keep track of changes to the user's OS/browser dark mode setting
  const [systemTheme, setSystemTheme] = useState("");
  // hook into system `prefers-dark-mode` setting
  // https://web.dev/prefers-color-scheme/#the-prefers-color-scheme-media-query
  const isSystemDark = useMedia("(prefers-color-scheme: dark)", false);

  // listen for changes in OS preference, but don't save it as a website preference to local storage
  useEffect(() => {
    setSystemTheme(isSystemDark ? "dark" : "light");
  }, [isSystemDark]);

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

// loaded in <head> by layout.tsx to avoid blinding flash of unstyled content (FOUC). irrelevant after the first render
// since the theme provider above takes over.
// unminified JS: https://gist.github.com/jakejarvis/79b0ec8506bc843023546d0d29861bf0
export const ThemeScript = () => (
  <script
    id="restore-theme"
    dangerouslySetInnerHTML={{
      __html:
        "(()=>{try{const e=document.documentElement,t='undefined'!=typeof Storage?window.localStorage.getItem('theme'):null,a=(t&&'dark'===t)??window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';e.dataset.theme=a,e.style.colorScheme=a}catch(e){}})()",
    }}
  />
);
