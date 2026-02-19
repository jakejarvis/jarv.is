// a weird system but makes it impossible to accidentally end up with multiple imports of the same font. see:
// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#reusing-fonts

import {
  Comic_Neue as ComicNeueLoader,
  Inter as InterLoader,
  JetBrains_Mono as JetBrainsMonoLoader,
} from "next/font/google";

export const Inter = InterLoader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const JetBrainsMono = JetBrainsMonoLoader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
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
