"use client";

import { ScriptOnce } from "@tanstack/react-router";
import { createContext, use, useEffect, useMemo, useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "system";

/** Same key next-themes used, so visitors keep their saved preference. */
const STORAGE_KEY = "theme";

/** Fired on this window when the theme is changed here ("storage" events only fire in *other* tabs). */
const CHANGE_EVENT = "theme-change";

const darkQuery = () => window.matchMedia("(prefers-color-scheme: dark)");

const subscribeToStoredTheme = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
};

const getStoredTheme = (): Theme => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
};

const subscribeToSystemTheme = (callback: () => void) => {
  const media = darkQuery();
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

const getSystemTheme = (): "light" | "dark" => (darkQuery().matches ? "dark" : "light");

const applyTheme = (resolvedTheme: "light" | "dark") => {
  // briefly disable CSS transitions so colors swap instantly
  const style = document.createElement("style");
  style.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.append(style);

  document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  document.documentElement.style.colorScheme = resolvedTheme;

  // force a reflow before re-enabling transitions
  void window.getComputedStyle(document.body).opacity;
  style.remove();
};

const setTheme = (theme: Theme) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore (e.g. private browsing)
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
};

/** Runs before first paint (and hydration) to set the theme class without a flash. */
const themeScript = `(()=>{try{const t=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});const d=t==="dark"||(t!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch{}})()`;

const ThemeContext = createContext<{
  theme: Theme;
  /** `undefined` until hydrated, since the server can't know it. */
  resolvedTheme: "light" | "dark" | undefined;
  setTheme: (theme: Theme) => void;
}>({
  theme: "system",
  resolvedTheme: undefined,
  setTheme,
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore<Theme>(subscribeToStoredTheme, getStoredTheme, () => "system");
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, () => undefined);
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    if (resolvedTheme) applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme]);

  return (
    <ThemeContext value={value}>
      <ScriptOnce>{themeScript}</ScriptOnce>
      {children}
    </ThemeContext>
  );
};

const useTheme = () => use(ThemeContext);

export { ThemeProvider, useTheme };
