// a weird system but makes it impossible to accidentally end up with multiple imports of the same font. see:
// https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#reusing-fonts

// main fonts
export { default as GeistSans } from "./loaders/GeistSans";
export { default as GeistMono } from "./loaders/GeistMono";

// one-off fonts
export { default as ComicNeue } from "./loaders/ComicNeue";
