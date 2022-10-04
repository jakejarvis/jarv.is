import type { AtRule } from "@stitches/react/types/css";

// Legacy
import interLatin400NormalWoff from "@fontsource/inter/files/inter-latin-400-normal.woff";
import interLatin400NormalWoff2 from "@fontsource/inter/files/inter-latin-400-normal.woff2";
import interLatin500NormalWoff from "@fontsource/inter/files/inter-latin-500-normal.woff";
import interLatin500NormalWoff2 from "@fontsource/inter/files/inter-latin-500-normal.woff2";
import interLatin700NormalWoff from "@fontsource/inter/files/inter-latin-700-normal.woff";
import interLatin700NormalWoff2 from "@fontsource/inter/files/inter-latin-700-normal.woff2";

// Variable
import interLatinVarWghtOnlyNormalWoff2 from "@fontsource/inter/files/inter-latin-variable-wghtOnly-normal.woff2";

// note: inter does have italics, of course, but google fonts has refused to add them.
// https://github.com/google/fonts/issues/2386

export const name = {
  regular: "Inter",
  variable: "Inter var",
};

// re-export hashed URL(s) of the most prominent files so we can preload them in `<head>` (see pages/_document.tsx):
export const preloads = [
  {
    href: interLatinVarWghtOnlyNormalWoff2,
    type: "font/woff2",
  },
];

export const family: AtRule.FontFace[] = [
  {
    fontFamily: name.regular,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `url(${interLatin400NormalWoff2}) format("woff2"), url(${interLatin400NormalWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 500,
    src: `url(${interLatin500NormalWoff2}) format("woff2"), url(${interLatin500NormalWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 700,
    src: `url(${interLatin700NormalWoff2}) format("woff2"), url(${interLatin700NormalWoff}) format("woff")`,
  },
  {
    fontFamily: name.variable,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: "100 900",
    src: `url(${interLatinVarWghtOnlyNormalWoff2}) format("woff2")`,
  },
];
