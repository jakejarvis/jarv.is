// a weird system but makes it impossible to accidentally end up with multiple imports of the same font. see:
// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#reusing-fonts

import {
  Comic_Neue as ComicNeueLoader,
  JetBrains_Mono as JetBrainsMonoLoader,
  Schibsted_Grotesk as SchibstedGroteskLoader,
} from "next/font/google";

export const SchibstedGrotesk = SchibstedGroteskLoader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-schibsted-grotesk",
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
