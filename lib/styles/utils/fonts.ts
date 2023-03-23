import {
  Inter as InterLoader,
  Source_Code_Pro as SourceCodeProLoader,
  Comic_Neue as ComicNeueLoader,
} from "@next/font/google";

const Inter = InterLoader({
  weight: "variable",
  subsets: ["latin"],
  display: "fallback",
  preload: true,
});

const SourceCodePro = SourceCodeProLoader({
  weight: "variable",
  subsets: ["latin"],
  display: "fallback",
  preload: true,
});

// only for use in pages/previously.tsx (and tree-shaken out everywhere else in production)
const ComicNeue = ComicNeueLoader({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["'Comic Sans MS'", "'Comic Sans'"],
  adjustFontFallback: false,
  preload: false,
});

export { Inter, SourceCodePro, ComicNeue };
