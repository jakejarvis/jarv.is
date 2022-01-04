import { useState, useEffect, useCallback } from "react";
import * as config from "../../lib/config";
import { BulbOffIcon, BulbOnIcon } from "../icons";

// store preference in local storage
const storageKey = "dark_mode";
const getDarkPref = () => localStorage.getItem(storageKey);
const setDarkPref = (pref: boolean) => localStorage.setItem(storageKey, pref as unknown as string);

// use the `<html data-theme="...">` as a hint to what the theme was set to outside of the button component
// TODO: there's probably (definitely) a cleaner way to do this, maybe with react hooks..?
const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

// sets appropriate `<html data-theme="...">`, `<meta name="color-scheme" ...>`, and color-scheme CSS property
const updateDOM = (dark: boolean) => {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
  document.head
    .querySelector("meta[name=theme-color]")
    ?.setAttribute("content", dark ? config.themeColorDark : config.themeColorLight);
};

const ThemeToggle = ({ className = "" }) => {
  // sync button up with theme and preference states after initialization
  const [dark, setDark] = useState(isDark());
  const [saved, setSaved] = useState(!!getDarkPref());

  // real-time switching between modes based on user's system if preference isn't set (and it's supported by OS/browser)
  const matchCallback = useCallback((e) => setDark(e.matches), []);
  useEffect(() => {
    try {
      // https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme
      const matcher = window.matchMedia("(prefers-color-scheme: dark)");

      // only listen to OS if the user hasn't specified a preference
      if (!saved) {
        matcher.addEventListener("change", matchCallback, true);
      }

      // cleanup and stop listening if/when preference is explicitly set
      return () => matcher.removeEventListener("change", matchCallback, true);
    } catch (e) {} // eslint-disable-line no-empty
  }, [saved, matchCallback]);

  // sets appropriate HTML when mode changes
  useEffect(() => updateDOM(dark), [dark]);

  const handleToggle = () => {
    // only update the local storage preference if the user explicitly presses the lightbulb
    setDarkPref(!dark);
    setSaved(true);

    // set theme to the opposite of current theme
    setDark(!dark);
  };

  return (
    <button
      onClick={handleToggle}
      title={dark ? "Toggle Light Mode" : "Toggle Dark Mode"}
      aria-label={dark ? "Toggle Light Mode" : "Toggle Dark Mode"}
      style={{
        border: 0,
        padding: 0,
        background: "none",
        cursor: "pointer",
      }}
    >
      {dark ? <BulbOffIcon className={`icon ${className}`} /> : <BulbOnIcon className={`icon ${className}`} />}
    </button>
  );
};

export default ThemeToggle;
