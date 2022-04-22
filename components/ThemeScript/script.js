/* eslint-disable no-empty, no-var, prefer-destructuring */

// this function is converted to a string verbatim, substitutions are made to insert dynamic values, minified, and then
// finally exported as an inline `<script>` tag in ThemeScript.tsx for _document.tsx to use.
export const clientScript = () => {
  // `try/catch` in case I messed something up here bigly... (will default to light theme)
  try {
    // user's saved preference:
    var pref = localStorage.getItem("__STORAGE_KEY__");
    // map of theme -> classname:
    var classNames = "__CLASS_NAMES__";
    // the list of <html>'s current class(es)...
    var classList = document.documentElement.classList;
    // ...from which `classNames` are removed to start fresh:
    classList.remove("__LIST_OF_CLASSES__");

    if (pref === "light" || pref === "dark") {
      classList.add(classNames[pref]);
    } else {
      // CSS media query for system dark mode preference:
      var darkQuery = "__MEDIA_QUERY__";
      // the listener which tests the above media query:
      var prefersDark = window.matchMedia(darkQuery);
      classList.add(classNames[prefersDark.media !== darkQuery || prefersDark.matches ? "dark" : "light"]);
    }
  } catch (error) {}
};
