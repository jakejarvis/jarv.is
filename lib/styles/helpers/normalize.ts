/*! stitches-normalize | MIT License | https://github.com/jakejarvis/stitches-normalize */
/*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */

import type * as Stitches from "@stitches/react";

const normalizeStyles: Record<string, Stitches.CSSProperties> = {
  "*, ::before, ::after": {
    boxSizing: "border-box",
  },
  html: {
    lineHeight: 1.15,
    tabSize: 4,
    // @ts-ignore
    WebkitTextSizeAdjust: "100%",
  },
  body: {
    margin: 0,
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
  "code, kbd, samp, pre": {
    fontSize: "1em",
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
    // @ts-ignore
    WebkitAppearance: "button",
  },
  "button, select": {
    textTransform: "none",
  },
  "button, [type='button'], [type='reset'], [type='submit']": {},
  legend: {
    padding: 0,
  },
  progress: {
    verticalAlign: "baseline",
  },
  summary: {
    display: "list-item",
  },
  "[type='search']": {
    outlineOffset: -2,
    // @ts-ignore
    WebkitAppearance: "textfield",
  },

  // `-webkit` compatibility properties and rules
  "::-webkit-search-decoration": {
    // @ts-ignore
    WebkitAppearance: "none",
  },
  "::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
    height: "auto",
  },
  "::-webkit-file-upload-button": {
    font: "inherit",
    // @ts-ignore
    WebkitAppearance: "button",
  },

  // `-moz` compatibility properties and rules
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
};

export default normalizeStyles;
