import { useState, useEffect, useCallback } from "react";
import { BulbOffIcon, BulbOnIcon } from "../icons";

import styles from "./ThemeToggle.module.scss";

// store preference in local storage
const storageKey = "dark_mode";
export const getDarkPref = () => localStorage.getItem(storageKey);
export const setDarkPref = (pref: boolean) => localStorage.setItem(storageKey, pref as unknown as string);

// use the `<html class="...">` as a hint to what the theme was set to outside of the button component
// there's probably (definitely) a cleaner way to do this..?
export const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

// sets appropriate `<html data-theme="...">` CSS property
export const updateDOM = (dark: boolean) => {
  const root = document.documentElement;

  // set `<html data-theme="...">`
  root.setAttribute("data-theme", dark ? "dark" : "light");
};

export default function ThemeToggle() {
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
      className={styles.toggle}
      onClick={handleToggle}
      title={dark ? "Toggle Light Mode" : "Toggle Dark Mode"}
      aria-label={dark ? "Toggle Light Mode" : "Toggle Dark Mode"}
    >
      {dark ? <BulbOffIcon /> : <BulbOnIcon />}
    </button>
  );
}
