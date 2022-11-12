import {
  Inter as InterLoader,
  Source_Code_Pro as SourceCodeProLoader,
  Comic_Neue as ComicNeueLoader,
} from "@next/font/google";

// note: subsets are set to 'latin' globally in next.config.js
// https://beta.nextjs.org/docs/optimizing/fonts#specifying-a-subset

export const Inter = InterLoader({
  weight: "variable",
  display: "fallback",
  preload: true,
});

export const SourceCodePro = SourceCodeProLoader({
  weight: "variable",
  display: "fallback",
  preload: true,
});

// only for use in pages/previously.tsx (and tree-shaken out everywhere else in production)
export const ComicNeue = ComicNeueLoader({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["'Comic Sans MS'", "'Comic Sans'"],
  adjustFontFallback: false,
  preload: false,
});
