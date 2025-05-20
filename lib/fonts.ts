// a weird system but makes it impossible to accidentally end up with multiple imports of the same font. see:
// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#reusing-fonts

import {
  Geist as GeistSansLoader,
  Geist_Mono as GeistMonoLoader,
  Comic_Neue as ComicNeueLoader,
} from "next/font/google";

export const GeistSans = GeistSansLoader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
  preload: true,
});

export const GeistMono = GeistMonoLoader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  preload: true,
});

export const ComicNeue = ComicNeueLoader({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["'Comic Sans MS'", "'Comic Sans'", "cursive"],
  preload: false,
});
