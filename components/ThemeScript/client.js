// @ts-check

// this function is converted to a string verbatim, substitutions are made to insert dynamic values, minified, and then
// finally exported as an inline `<script>` tag in ThemeScript.tsx for _document.tsx to use.
export const restoreTheme = () => {
  // `try/catch` in case I messed something up here bigly... (will default to light theme)
  try {
    // map of themes -> classnames ([0]=light, [1]=dark)
    const classNames = ["__CLASS_NAMES__"];
    // the list of <html>'s current class(es)...
    // eslint-disable-next-line prefer-destructuring
    const classList = document.documentElement.classList;
    // user's saved preference
    const pref = typeof Storage !== "undefined" ? window.localStorage.getItem("__STORAGE_KEY__") : null;

    // restore the local storage preference if it's set, otherwise test CSS media query for browser dark mode preference
    // https://stackoverflow.com/a/57795495/1438024
    const newTheme = (pref && pref === "dark") ?? window.matchMedia("__MEDIA_QUERY__").matches ? 1 : 0;

    // remove both `classNames` to start fresh...
    classList.remove(...classNames);

    // ...and then FINALLY set the root class
    classList.add(classNames[newTheme]);
  } catch (error) {} // eslint-disable-line no-empty
};
