import type { AtRule } from "@stitches/react/types/css";

// Legacy
import robotoMonoLatin400NormalWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff";
import robotoMonoLatin400NormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff2";
import robotoMonoLatin500NormalWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff";
import robotoMonoLatin500NormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff2";
import robotoMonoLatin700NormalWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-700-normal.woff";
import robotoMonoLatin700NormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-700-normal.woff2";
import robotoMonoLatin400ItalicWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-400-italic.woff";
import robotoMonoLatin400ItalicWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-400-italic.woff2";
import robotoMonoLatin500ItalicWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-500-italic.woff";
import robotoMonoLatin500ItalicWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-500-italic.woff2";
import robotoMonoLatin700ItalicWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-700-italic.woff";
import robotoMonoLatin700ItalicWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-700-italic.woff2";

// Variable
import robotoMonoLatinVarWghtOnlyNormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-variable-wghtOnly-normal.woff2";
import robotoMonoLatinVarWghtOnlyItalicWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-variable-wghtOnly-italic.woff2";

export const name = {
  regular: "Roboto Mono",
  variable: "Roboto Mono var",
};
// re-export hashed URL(s) of the most prominent file so we can preload it in head:
export const preloadFonts = [
  {
    key: "roboto-mono-var",
    src: robotoMonoLatinVarWghtOnlyNormalWoff2,
    type: "font/woff2",
  },
];
export const family: AtRule.FontFace[] = [
  {
    fontFamily: name.regular,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `url(${robotoMonoLatin400NormalWoff2}) format("woff2"), url(${robotoMonoLatin400NormalWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 500,
    src: `url(${robotoMonoLatin500NormalWoff2}) format("woff2"), url(${robotoMonoLatin500NormalWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 700,
    src: `url(${robotoMonoLatin700NormalWoff2}) format("woff2"), url(${robotoMonoLatin700NormalWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "italic",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `url(${robotoMonoLatin400ItalicWoff2}) format("woff2"), url(${robotoMonoLatin400ItalicWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "italic",
    fontDisplay: "swap",
    fontWeight: 500,
    src: `url(${robotoMonoLatin500ItalicWoff2}) format("woff2"), url(${robotoMonoLatin500ItalicWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "italic",
    fontDisplay: "swap",
    fontWeight: 700,
    src: `url(${robotoMonoLatin700ItalicWoff2}) format("woff2"), url(${robotoMonoLatin700ItalicWoff}) format("woff")`,
  },
  {
    fontFamily: name.variable,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: "100 700",
    src: `url(${robotoMonoLatinVarWghtOnlyNormalWoff2}) format("woff2")`,
  },
  {
    fontFamily: name.variable,
    fontStyle: "italic",
    fontDisplay: "swap",
    fontWeight: "100 700",
    src: `url(${robotoMonoLatinVarWghtOnlyItalicWoff2}) format("woff2")`,
  },
];
