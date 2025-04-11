// a weird system but makes it impossible to accidentally end up with multiple imports of the same font. see:
// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#reusing-fonts

import { Geist as GeistSansLoader, Geist_Mono as GeistMonoLoader } from "next/font/google";

export const GeistSans = GeistSansLoader({
  subsets: ["latin"],
  display: "swap",
  fallback: [
    // https://github.com/system-fonts/modern-font-stacks#system-ui
    "system-ui",
    "sans-serif",
  ],
  variable: "--fonts-sans",
  preload: true,
});

export const GeistMono = GeistMonoLoader({
  subsets: ["latin"],
  display: "swap",
  fallback: [
    // https://github.com/primer/css/blob/4113637b3bb60cad1e2dca82e70d92ad05694399/src/support/variables/typography.scss#L37
    "ui-monospace",
    "SFMono-Regular",
    "'SF Mono'",
    "Menlo",
    "Consolas",
    "'Liberation Mono'",
    "monospace",
  ],
  adjustFontFallback: false,
  variable: "--fonts-mono",
  preload: true,
});
