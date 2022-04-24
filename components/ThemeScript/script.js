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
    // user's saved preference
    var pref = localStorage.getItem("__STORAGE_KEY__");
    // map of theme -> classname
    var classNames = "__CLASS_NAMES__";
    // the list of <html>'s current class(es)...
    var classList = document.documentElement.classList;
    // ...from which `classNames` are removed to start fresh
    classList.remove(classNames[light], classNames[dark]);

    if (pref === light || pref === dark) {
      // simply restore the local storage preference
      newTheme = pref;
    } else {
      // test CSS media query for system dark mode preference
      // https://stackoverflow.com/a/57795495/1438024
      newTheme = window.matchMedia("__MEDIA_QUERY__").matches ? dark : light;
    }

    // FINALLY set the root class
    classList.add(classNames[newTheme]);
  } catch (error) {}
};
