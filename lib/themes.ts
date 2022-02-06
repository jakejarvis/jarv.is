// Light/dark theme-related CSS variables that are inlined in Layout.tsx and become available globally.
// TODO: Probably invert the object so that *each variable* has a light and dark key.
const themes = {
  light: {
    "background-inner": "#ffffff",
    "background-outer": "#fcfcfc",
    "background-header": "rgba(252, 252, 252, 0.7)",
    text: "#202020",
    "medium-dark": "#515151",
    medium: "#5e5e5e",
    "medium-light": "#757575",
    light: "#d2d2d2",
    "kinda-light": "#e3e3e3",
    "super-light": "#f4f4f4",
    "super-duper-light": "#fbfbfb",
    link: "#0e6dc2",
    "link-underline": "rgba(14, 109, 194, 0.4)",
    success: "#44a248",
    error: "#ff1b1b",
    warning: "#f78200",

    // Syntax Highlighting (light) - modified from Monokai Light: https://github.com/mlgill/pygments-style-monokailight
    "code-text": "#313131",
    "code-background": "#fdfdfd",
    "code-comment": "#656e77",
    "code-keyword": "#029cb9",
    "code-attribute": "#70a800",
    "code-namespace": "#f92672",
    "code-literal": "#ae81ff",
    "code-punctuation": "#111111",
    "code-variable": "#d88200",
    "code-addition": "#44a248",
    "code-deletion": "#ff1b1b",
  },
  dark: {
    "background-inner": "#1e1e1e",
    "background-outer": "#252525",
    "background-header": "rgba(37, 37, 37, 0.85)",
    text: "#f1f1f1",
    "medium-dark": "#d7d7d7",
    medium: "#b1b1b1",
    "medium-light": "#959595",
    light: "#646464",
    "kinda-light": "#535353",
    "super-light": "#272727",
    "super-duper-light": "#1f1f1f",
    link: "#88c7ff",
    "link-underline": "rgba(136, 199, 255, 0.4)",
    success: "#78df55",
    error: "#ff5151",
    warning: "#f2b702",

    // Syntax Highlighting (dark) - modified from Dracula: https://github.com/dracula/pygments
    "code-text": "#e4e4e4",
    "code-background": "#212121",
    "code-comment": "#929292",
    "code-keyword": "#3b9dd2",
    "code-attribute": "#78df55",
    "code-namespace": "#f95757",
    "code-literal": "#d588fb",
    "code-punctuation": "#cccccc",
    "code-variable": "#fd992a",
    "code-addition": "#78df55",
    "code-deletion": "#ff5151",
  },
};

// converts each variable in a given theme object to CSS syntax and returns all of them as one long string
export const toCSS = (theme: Record<string, string>) =>
  Object.entries(theme)
    .map(([name, color]) => `--${name}:${color};`) // `--name: #color`
    .join("");

export default themes;