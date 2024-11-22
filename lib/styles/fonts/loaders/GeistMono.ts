import { Geist_Mono as GeistMonoLoader } from "next/font/google";

const GeistMono = GeistMonoLoader({
  subsets: ["latin"],
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
