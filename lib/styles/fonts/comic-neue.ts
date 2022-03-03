// @ts-nocheck

// Legacy
import comicNeueLatin400NormalWoff from "@fontsource/comic-neue/files/comic-neue-latin-400-normal.woff";
import comicNeueLatin400NormalWoff2 from "@fontsource/comic-neue/files/comic-neue-latin-400-normal.woff2";
import comicNeueLatin700NormalWoff from "@fontsource/comic-neue/files/comic-neue-latin-700-normal.woff";
import comicNeueLatin700NormalWoff2 from "@fontsource/comic-neue/files/comic-neue-latin-700-normal.woff2";

export const ComicNeue = [
  {
    fontFamily: "Comic Neue",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `url(${comicNeueLatin400NormalWoff2}) format("woff2"), url(${comicNeueLatin400NormalWoff}) format("woff")`,
  },
  {
    fontFamily: "Comic Neue",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 700,
    src: `url(${comicNeueLatin700NormalWoff2}) format("woff2"), url(${comicNeueLatin700NormalWoff}) format("woff")`,
  },
];
