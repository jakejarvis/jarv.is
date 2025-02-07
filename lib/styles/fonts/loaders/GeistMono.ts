import { Geist_Mono as GeistMonoLoader } from "next/font/google";

const GeistMono = GeistMonoLoader({
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
  preload: true,
  variable: "--fonts-mono",
});

export default GeistMono;
