// @sindresorhus's modern-normalize.css converted to a JS object, with a bit of cruft removed:
// https://github.com/sindresorhus/modern-normalize/blob/b59ec0d3d8654cbb6843bc9ea45aef5f1d680108/modern-normalize.css

export const normalizeCss = {
  "*, ::before, ::after": {
    boxSizing: "border-box",
  },
  html: {
    lineHeight: 1.15,
    tabSize: 4,
    WebkitTextSizeAdjust: "100%",
  },
  hr: {
    height: 0,
    color: "inherit",
  },
  "abbr[title]": {
    textDecoration: "underline dotted",
  },
  "b, strong": {
    fontWeight: "bolder",
  },
  small: {
    fontSize: "80%",
  },
  "sub, sup": {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline",
  },
  sub: {
    bottom: "-0.25em",
  },
  sup: {
    top: "-0.5em",
  },
  table: {
    textIndent: 0,
    borderColor: "inherit",
  },
  "button, input, optgroup, select, textarea": {
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: 1.15,
    margin: 0,
  },
  "button, select": {
    textTransform: "none",
  },
  "button, [type='button'], [type='reset'], [type='submit']": {
    WebkitAppearance: "button",
  },
  "::-moz-focus-inner": {
    borderStyle: "none",
    padding: 0,
  },
  ":-moz-focusring": {
    outline: "1px dotted ButtonText",
  },
  ":-moz-ui-invalid": {
    boxShadow: "none",
  },
  legend: {
    padding: 0,
  },
  progress: {
    verticalAlign: "baseline",
  },
  "::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
    height: "auto",
  },
  "[type='search']": {
    WebkitAppearance: "textfield",
    outlineOffset: "-2px",
  },
  "::-webkit-search-decoration": {
    WebkitAppearance: "none",
  },
  "::-webkit-file-upload-button": {
    WebkitAppearance: "button",
    font: "inherit",
  },
  summary: {
    display: "list-item",
  },
};
