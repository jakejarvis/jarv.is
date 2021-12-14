import { h, render } from "preact";
import { setDarkClass, storageKey } from "./utils/theme.js";

// react components:
import ThemeToggle from "./components/ThemeToggle.js";

// check for existing preference in local storage
const pref = localStorage.getItem(storageKey);

// do initialization before *any* react-related stuff to avoid white flashes as much as possible
if (pref) {
  // restore user's preference if they've explicitly toggled it in the past
  setDarkClass(pref === "true");
} else {
  // check for OS dark mode preference and switch accordingly
  // https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme
  try {
    setDarkClass(window.matchMedia("(prefers-color-scheme: dark)").matches);
  } catch (e) {}

  // TODO: fix real-time switching (works but bulb icon isn't updated)
  // window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => e.matches && setDark(true));
  // window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", (e) => e.matches && setDark(false));
}

// finally render the nifty lightbulb in the header
if (typeof window !== "undefined" && document.querySelector(".theme-toggle")) {
  render(<ThemeToggle />, document.querySelector(".theme-toggle"));
}
