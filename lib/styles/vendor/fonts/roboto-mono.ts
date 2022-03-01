// @ts-nocheck

// Legacy
import robotoMonoLatin400NormalWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff";
import robotoMonoLatin400NormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff2";
import robotoMonoLatin500NormalWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff";
import robotoMonoLatin500NormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-500-normal.woff2";
import robotoMonoLatin700NormalWoff from "@fontsource/roboto-mono/files/roboto-mono-latin-700-normal.woff";
import robotoMonoLatin700NormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-700-normal.woff2";

// Variable
import robotoMonoLatinVarWghtOnlyNormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-variable-wghtOnly-normal.woff2";
import robotoMonoLatinExtVarWghtOnlyNormalWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-ext-variable-wghtOnly-normal.woff2";
import robotoMonoLatinVarWghtOnlyItalicWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-variable-wghtOnly-italic.woff2";
import robotoMonoLatinExtVarWghtOnlyItalicWoff2 from "@fontsource/roboto-mono/files/roboto-mono-latin-ext-variable-wghtOnly-italic.woff2";

export const RobotoMono = [
  {
    fontFamily: "Roboto Mono",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `url(${robotoMonoLatin400NormalWoff2}) format("woff2"),url(${robotoMonoLatin400NormalWoff}) format("woff")`,
  },
  {
    fontFamily: "Roboto Mono",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 500,
    src: `url(${robotoMonoLatin500NormalWoff2}) format("woff2"),url(${robotoMonoLatin500NormalWoff}) format("woff")`,
  },
  {
    fontFamily: "Roboto Mono",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 700,
    src: `url(${robotoMonoLatin700NormalWoff2}) format("woff2"),url(${robotoMonoLatin700NormalWoff}) format("woff")`,
  },
  {
    fontFamily: "Roboto MonoVariable",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: "100 700",
    src: `url(${robotoMonoLatinVarWghtOnlyNormalWoff2}) format("woff2")`,
    unicodeRange:
      "U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd",
  },
  {
    fontFamily: "Roboto MonoVariable",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: "100 700",
    src: `url(${robotoMonoLatinExtVarWghtOnlyNormalWoff2}) format("woff2")`,
    unicodeRange: "U+0100-024f,U+0259,U+1e??,U+2020,U+20a0-20ab,U+20ad-20cf,U+2113,U+2c60-2c7f,U+a720-a7ff",
  },
  {
    fontFamily: "Roboto MonoVariable",
    fontStyle: "italic",
    fontDisplay: "swap",
    fontWeight: "100 700",
    src: `url(${robotoMonoLatinVarWghtOnlyItalicWoff2}) format("woff2")`,
    unicodeRange:
      "U+00??,U+0131,U+0152-0153,U+02bb-02bc,U+02c6,U+02da,U+02dc,U+2000-206f,U+2074,U+20ac,U+2122,U+2191,U+2193,U+2212,U+2215,U+feff,U+fffd",
  },
  {
    fontFamily: "Roboto MonoVariable",
    fontStyle: "italic",
    fontDisplay: "swap",
    fontWeight: "100 700",
    src: `url(${robotoMonoLatinExtVarWghtOnlyItalicWoff2}) format("woff2")`,
    unicodeRange: "U+0100-024f,U+0259,U+1e??,U+2020,U+20a0-20ab,U+20ad-20cf,U+2113,U+2c60-2c7f,U+a720-a7ff",
  },
];
