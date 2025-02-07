import { Geist as GeistSansLoader } from "next/font/google";

const GeistSans = GeistSansLoader({
  subsets: ["latin"],
  display: "swap",
  fallback: [
    // https://github.com/system-fonts/modern-font-stacks#system-ui
    "system-ui",
    "sans-serif",
  ],
  adjustFontFallback: false,
  preload: true,
  variable: "--fonts-sans",
});

export default GeistSans;
