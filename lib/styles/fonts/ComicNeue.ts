import type { AtRule } from "@stitches/react/types/css";

// Legacy
import comicNeueLatin400NormalWoff from "@fontsource/comic-neue/files/comic-neue-latin-400-normal.woff";
import comicNeueLatin400NormalWoff2 from "@fontsource/comic-neue/files/comic-neue-latin-400-normal.woff2";
import comicNeueLatin700NormalWoff from "@fontsource/comic-neue/files/comic-neue-latin-700-normal.woff";
import comicNeueLatin700NormalWoff2 from "@fontsource/comic-neue/files/comic-neue-latin-700-normal.woff2";
import comicNeueLatin400ItalicWoff from "@fontsource/comic-neue/files/comic-neue-latin-400-italic.woff";
import comicNeueLatin400ItalicWoff2 from "@fontsource/comic-neue/files/comic-neue-latin-400-italic.woff2";
import comicNeueLatin700ItalicWoff from "@fontsource/comic-neue/files/comic-neue-latin-700-italic.woff";
import comicNeueLatin700ItalicWoff2 from "@fontsource/comic-neue/files/comic-neue-latin-700-italic.woff2";

export const name = {
  regular: "Comic Neue",
};
export const preloadFonts = [
  {
    key: "comic-neue-700",
    src: comicNeueLatin700NormalWoff2,
    type: "font/woff2",
  },
];
export const family: AtRule.FontFace[] = [
  {
    fontFamily: name.regular,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `url(${comicNeueLatin400NormalWoff2}) format("woff2"), url(${comicNeueLatin400NormalWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 700,
    src: `url(${comicNeueLatin700NormalWoff2}) format("woff2"), url(${comicNeueLatin700NormalWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "italic",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `url(${comicNeueLatin400ItalicWoff2}) format("woff2"), url(${comicNeueLatin400ItalicWoff}) format("woff")`,
  },
  {
    fontFamily: name.regular,
    fontStyle: "italic",
    fontDisplay: "swap",
    fontWeight: 700,
    src: `url(${comicNeueLatin700ItalicWoff2}) format("woff2"), url(${comicNeueLatin700ItalicWoff}) format("woff")`,
  },
];
