/* eslint-disable no-empty, no-var, prefer-destructuring */

// this function is converted to a string verbatim, substitutions are made to insert dynamic values, minified, and then
// finally exported as an inline `<script>` tag in ThemeScript.tsx for _document.tsx to use.
export const clientScript = () => {
  // `try/catch` in case I messed something up here bigly... (will default to light theme)
  try {
    // help minifier minify
    var light = "light";
    var dark = "dark";
    var newTheme;
    // the list of <html>'s current class(es)...
    var classList = document.documentElement.classList;
    // map of theme -> classname
    var classNames = "__CLASS_NAMES__";
    // user's saved preference
    var pref = window.localStorage.getItem("__STORAGE_KEY__");

    if (pref === light || pref === dark) {
      // simply restore the local storage preference
      newTheme = pref;
    } else {
      // test CSS media query for system dark mode preference
      // https://stackoverflow.com/a/57795495/1438024
      newTheme = window.matchMedia("__MEDIA_QUERY__").matches ? dark : light;
    }

    // remove both `classNames` to start fresh...
    classList.remove(classNames[light], classNames[dark]);
    // ...and then FINALLY set the root class
    classList.add(classNames[newTheme]);
  } catch (error) {}
};
