// @ts-nocheck

// Legacy
import interLatin400NormalWoff from "@fontsource/inter/files/inter-latin-400-normal.woff";
import interLatin400NormalWoff2 from "@fontsource/inter/files/inter-latin-400-normal.woff2";
import interLatin500NormalWoff from "@fontsource/inter/files/inter-latin-500-normal.woff";
import interLatin500NormalWoff2 from "@fontsource/inter/files/inter-latin-500-normal.woff2";
import interLatin700NormalWoff from "@fontsource/inter/files/inter-latin-700-normal.woff";
import interLatin700NormalWoff2 from "@fontsource/inter/files/inter-latin-700-normal.woff2";

// Variable
import interLatinVarFullNormalWoff2 from "@fontsource/inter/files/inter-latin-variable-full-normal.woff2";
import interLatinExtVarFullNormalWoff2 from "@fontsource/inter/files/inter-latin-ext-variable-full-normal.woff2";

export const Inter = [
  {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `url(${interLatin400NormalWoff2}) format("woff2"), url(${interLatin400NormalWoff}) format("woff")`,
  },
  {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 500,
    src: `url(${interLatin500NormalWoff2}) format("woff2"), url(${interLatin500NormalWoff}) format("woff")`,
  },
  {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 700,
    src: `url(${interLatin700NormalWoff2}) format("woff2"), url(${interLatin700NormalWoff}) format("woff")`,
  },
  {
    fontFamily: "Inter var",
    fontStyle: "oblique 0deg 10deg",
    fontDisplay: "swap",
    fontWeight: "100 900",
    src: `url(${interLatinVarFullNormalWoff2}) format("woff2")`,
    unicodeRange:
      "U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd",
  },
  {
    fontFamily: "Inter var",
    fontStyle: "oblique 0deg 10deg",
    fontDisplay: "swap",
    fontWeight: "100 900",
    src: `url(${interLatinExtVarFullNormalWoff2}) format("woff2")`,
    unicodeRange: "U+0100-024f,U+0259,U+1e??,U+2020,U+20a0-20ab,U+20ad-20cf,U+2113,U+2c60-2c7f,U+a720-a7ff",
  },
];
