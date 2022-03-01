import decamelize from "decamelize";

// Light/dark theme-related CSS variables that are inlined in Layout.tsx and become available globally.
// TODO: Probably invert the object so that *each variable* has a light and dark key.
const themes = {
  light: {
    backgroundInner: "#ffffff",
    backgroundOuter: "#fcfcfc",
    backgroundHeader: "rgba(252, 252, 252, 0.7)",
    text: "#202020",
    mediumDark: "#515151",
    medium: "#5e5e5e",
    mediumLight: "#757575",
    light: "#d2d2d2",
    kindaLight: "#e3e3e3",
    superLight: "#f4f4f4",
    superDuperLight: "#fbfbfb",
    link: "#0e6dc2",
    linkUnderline: "rgba(14, 109, 194, 0.4)",
    success: "#44a248",
    error: "#ff1b1b",
    warning: "#f78200",

    // Syntax Highlighting (light) - modified from Monokai Light: https://github.com/mlgill/pygments-style-monokailight
    codeText: "#313131",
    codeBackground: "#fdfdfd",
    codeComment: "#656e77",
    codeKeyword: "#029cb9",
    codeAttribute: "#70a800",
    codeNamespace: "#f92672",
    codeLiteral: "#ae81ff",
    codePunctuation: "#111111",
    codeVariable: "#d88200",
    codeAddition: "#44a248",
    codeDeletion: "#ff1b1b",
  },
  dark: {
    backgroundInner: "#1e1e1e",
    backgroundOuter: "#252525",
    backgroundHeader: "rgba(37, 37, 37, 0.85)",
    text: "#f1f1f1",
    mediumDark: "#d7d7d7",
    medium: "#b1b1b1",
    mediumLight: "#959595",
    light: "#646464",
    kindaLight: "#535353",
    superLight: "#272727",
    superDuperLight: "#1f1f1f",
    link: "#88c7ff",
    linkUnderline: "rgba(136, 199, 255, 0.4)",
    success: "#78df55",
    error: "#ff5151",
    warning: "#f2b702",

    // Syntax Highlighting (dark) - modified from Dracula: https://github.com/dracula/pygments
    codeText: "#e4e4e4",
    codeBackground: "#212121",
    codeComment: "#929292",
    codeKeyword: "#3b9dd2",
    codeAttribute: "#78df55",
    codeNamespace: "#f95757",
    codeLiteral: "#d588fb",
    codePunctuation: "#cccccc",
    codeVariable: "#fd992a",
    codeAddition: "#78df55",
    codeDeletion: "#ff5151",
  },
};

// JS-friendly camelCase to CSS-friendly kebab-case
const camelToKebab = (camel: string) => decamelize(camel, { separator: "-" });

// converts each variable in a given theme object to CSS syntax and returns all of them as one long string
export const toCSS = (theme: Record<string, string>) =>
  Object.entries(theme)
    .map(([name, color]) => `--${camelToKebab(name)}:${color};`)
    .join("");

export default themes;
