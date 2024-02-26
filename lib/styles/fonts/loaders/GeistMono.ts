import localFont from "next/font/local";

const GeistMono = localFont({
  src: "../../../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: [
    // https://github.com/system-fonts/modern-font-stacks#monospace-code
    "ui-monospace",
    "'Cascadia Code'",
    "'Source Code Pro'",
    "Menlo",
    "Consolas",
    "'DejaVu Sans Mono'",
    "monospace",
  ],
  adjustFontFallback: false,
  preload: true,
});

export default GeistMono;
