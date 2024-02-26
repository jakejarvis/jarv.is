import localFont from "next/font/local";

const GeistSans = localFont({
  src: "../../../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: [
    // https://github.com/system-fonts/modern-font-stacks#system-ui
    "system-ui",
    "sans-serif",
  ],
  adjustFontFallback: false,
  preload: true,
});

export default GeistSans;
