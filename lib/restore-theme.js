import { themeColorLight, themeColorDark } from "./config";

// Inlined JS in pages/_app.tsx to restore these light/dark theme settings ASAP:
// `<html data-theme="...">`, `<meta name="color-scheme" ...>`, and color-scheme CSS property.
export const restoreThemeScript = `
try {
  var pref = localStorage.getItem("dark_mode"),
      dark = pref === "true" || (!pref && window.matchMedia("(prefers-color-scheme: dark)").matches),
      theme = dark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  document.head.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "${themeColorDark}" : "${themeColorLight}");
} catch (e) {}
`.trim();
