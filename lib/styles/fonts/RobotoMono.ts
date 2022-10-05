import type { AtRule } from "@stitches/react/types/css";

// Legacy
import robotoMonoLatin400NormalWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff";
import robotoMonoLatin400NormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff2";
import robotoMonoLatin500NormalWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff";
import robotoMonoLatin500NormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff2";
import robotoMonoLatin700NormalWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-700-normal.woff";
import robotoMonoLatin700NormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-700-normal.woff2";

// Variable
import robotoMonoLatinVarWghtOnlyNormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-variable-wghtOnly-normal.woff2";

export const name = {
  regular: "Roboto Mono",
  variable: "Roboto Mono var",
};

// re-export hashed URL(s) of the most prominent files so we can preload them in `<head>` (see pages/_document.tsx):
export const preloads = [
  {
    href: robotoMonoLatinVarWghtOnlyNormalWoff2,
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
    fontFamily: name.variable,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: "100 700",
    src: `url(${robotoMonoLatinVarWghtOnlyNormalWoff2}) format("woff2")`,
  },
];
