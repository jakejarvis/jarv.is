import { Comic_Neue as ComicNeueLoader } from "next/font/google";

const ComicNeue = ComicNeueLoader({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["'Comic Sans MS'", "'Comic Sans'"],
  adjustFontFallback: false,
  preload: false,
});

export default ComicNeue;
